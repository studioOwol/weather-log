import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCard, updateCard, deleteCard, toggleBookmark } from "@/api/supabaseApi"
import type { WeatherCardType } from "@/types"

export const useAddCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCard,
    onSuccess: () => {
      // Invalidate all query keys
      queryClient.invalidateQueries({ queryKey: ["infinite-cards"] })
      queryClient.invalidateQueries({ queryKey: ["cards-stats"] })
    },
  })
}

export const useUpdateCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updatedCard }: { id: string; updatedCard: WeatherCardType }) =>
      updateCard(id, updatedCard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infinite-cards"] })
      queryClient.invalidateQueries({ queryKey: ["cards-stats"] })
    },
  })
}

export const useDeleteCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infinite-cards"] })
      queryClient.invalidateQueries({ queryKey: ["cards-stats"] })
    },
  })
}

export const useToggleBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ cardId, newBookmarkStatus }: { cardId: string; newBookmarkStatus: boolean }) =>
      toggleBookmark(cardId, newBookmarkStatus),
    onMutate: async ({ cardId, newBookmarkStatus }: { cardId: string; newBookmarkStatus: boolean }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["infinite-cards"] })
      await queryClient.cancelQueries({ queryKey: ["cards-stats"] })

      // Backup previous data for rollback
      const previousInfiniteData = queryClient.getQueriesData({ queryKey: ["infinite-cards"] })
      const previousStatsData = queryClient.getQueriesData({ queryKey: ["cards-stats"] })

      // Optimistically update ALL infinite query data (home, bookmarks, etc.)
      queryClient.setQueriesData(
        { queryKey: ["infinite-cards"] },
        (oldData: any) => {
          if (!oldData?.pages) return oldData
          
          return {
            ...oldData,
            pages: oldData.pages.map((page: WeatherCardType[]) =>
              page.map((card: WeatherCardType) =>
                card.id === cardId ? { ...card, isBookmarked: newBookmarkStatus } : card
              )
            ),
          }
        }
      )

      // Optimistically update stats
      queryClient.setQueriesData(
        { queryKey: ["cards-stats"] },
        (oldData: any) => {
          if (!oldData) return oldData
          
          const delta = newBookmarkStatus ? 1 : -1
          return {
            ...oldData,
            totalBookmarks: oldData.totalBookmarks + delta,
            filteredBookmarks: oldData.filteredBookmarks + delta,
          }
        }
      )

      return { previousInfiniteData, previousStatsData }
    },
    onError: (err, variables, context) => {
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
      // Force refetch all infinite cards queries immediately
      queryClient.refetchQueries({ queryKey: ["infinite-cards"] })
      queryClient.refetchQueries({ queryKey: ["cards-stats"] })
    },
    onSettled: () => {
      // Backup invalidation
      queryClient.invalidateQueries({ queryKey: ["infinite-cards"] })
      queryClient.invalidateQueries({ queryKey: ["cards-stats"] })
    },
  })
}
