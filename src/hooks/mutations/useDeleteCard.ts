import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCard } from "@/api/supabaseApi"
import { weatherQueryFactory } from "@/lib/weatherQueryFactory"
import type { WeatherCardType } from "@/types"

export default function useDeleteCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCard,
    onMutate: async (cardId: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: weatherQueryFactory.cards() })
      await queryClient.cancelQueries({ queryKey: weatherQueryFactory.stats() })

      // Backup previous data for rollback
      const previousInfiniteData = queryClient.getQueriesData({
        queryKey: weatherQueryFactory.cards(),
      })
      const previousStatsData = queryClient.getQueriesData({
        queryKey: weatherQueryFactory.stats(),
      })

      // Optimistically remove card from all infinite query data
      queryClient.setQueriesData(
        {
          queryKey: [...weatherQueryFactory.cards(), "infinite"],
        },
        (oldData: any) => {
          if (!oldData?.pages) return oldData

          return {
            ...oldData,
            pages: oldData.pages.map((page: WeatherCardType[]) =>
              page.filter((card: WeatherCardType) => card.id !== cardId)
            ),
          }
        }
      )

      // Optimistically update stats
      queryClient.setQueriesData({ queryKey: weatherQueryFactory.stats() }, (oldData: any) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          totalCards: oldData.totalCards - 1,
          filteredCards: oldData.filteredCards - 1,
          // If the deleted card was bookmarked, decrease bookmark count too
          // Note: We don't know if it was bookmarked here, but stats will be refetched anyway
        }
      })

      return { previousInfiniteData, previousStatsData }
    },
    onError: (_err, _variables, context) => {
      // Rollback optimistic updates
      if (context?.previousInfiniteData) {
        context.previousInfiniteData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      if (context?.previousStatsData) {
        context.previousStatsData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSuccess: () => {
      // Refetch to ensure data consistency
      queryClient.refetchQueries({ queryKey: weatherQueryFactory.cards() })
      queryClient.refetchQueries({ queryKey: weatherQueryFactory.stats() })
    },
    onSettled: () => {
      // Backup invalidation
      queryClient.invalidateQueries({ queryKey: weatherQueryFactory.cards() })
      queryClient.invalidateQueries({ queryKey: weatherQueryFactory.stats() })
    },
  })
}
