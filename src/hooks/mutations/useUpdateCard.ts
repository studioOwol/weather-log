import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCard } from "@/api/supabaseApi"
import { weatherQueryFactory } from "@/lib/weatherQueryFactory"
import type { WeatherCardType } from "@/types"

export default function useUpdateCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updatedCard }: { id: string; updatedCard: WeatherCardType }) =>
      updateCard(id, updatedCard),
    onMutate: async ({ id, updatedCard }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: weatherQueryFactory.cards() })

      // Backup previous data for rollback
      const previousInfiniteData = queryClient.getQueriesData({
        queryKey: weatherQueryFactory.cards(),
      })

      // Optimistically update all infinite query data
      queryClient.setQueriesData(
        {
          queryKey: [...weatherQueryFactory.cards(), "infinite"],
        },
        (oldData: any) => {
          if (!oldData?.pages) return oldData

          return {
            ...oldData,
            pages: oldData.pages.map((page: WeatherCardType[]) =>
              page.map((card: WeatherCardType) =>
                card.id === id ? { ...card, ...updatedCard } : card
              )
            ),
          }
        }
      )

      return { previousInfiniteData }
    },
    onError: (_err, _variables, context) => {
      // Rollback optimistic updates
      if (context?.previousInfiniteData) {
        context.previousInfiniteData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: weatherQueryFactory.cards() })
      queryClient.invalidateQueries({ queryKey: weatherQueryFactory.stats() })
    },
  })
}
