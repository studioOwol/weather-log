import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCard, updateCard, deleteCard, toggleBookmark } from "@/api/supabaseApi"
import { weatherQueryFactory } from "../../lib/weatherQueryFactory"
import type { WeatherCardType } from "@/types"

export const useAddCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCard,
    onSuccess: () => {
      // Invalidate all query keys using Query Factory
      queryClient.invalidateQueries({ queryKey: weatherQueryFactory.cards() })
      queryClient.invalidateQueries({ queryKey: weatherQueryFactory.stats() })
    },
  })
}

export const useUpdateCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updatedCard }: { id: string; updatedCard: WeatherCardType }) =>
      updateCard(id, updatedCard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: weatherQueryFactory.cards() })
      queryClient.invalidateQueries({ queryKey: weatherQueryFactory.stats() })
    },
  })
}

export const useDeleteCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: weatherQueryFactory.cards() })
      queryClient.invalidateQueries({ queryKey: weatherQueryFactory.stats() })
    },
  })
}

export const useToggleBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ cardId, newBookmarkStatus }: { cardId: string; newBookmarkStatus: boolean }) =>
      toggleBookmark(cardId, newBookmarkStatus),
    onMutate: async ({
      cardId,
      newBookmarkStatus,
    }: {
      cardId: string
      newBookmarkStatus: boolean
    }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: weatherQueryFactory.cards() })
      await queryClient.cancelQueries({ queryKey: weatherQueryFactory.stats() })

      // Backup previous data for rollback
      const previousInfiniteData = queryClient.getQueriesData({ queryKey: weatherQueryFactory.cards() })
      const previousStatsData = queryClient.getQueriesData({ queryKey: weatherQueryFactory.stats() })

      // Optimistically update infinite query data for each page type
      // Update home page data (just change bookmark status)
      queryClient.setQueriesData(
        {
          queryKey: [...weatherQueryFactory.cards(), "infinite"],
          predicate: (query) => {
            return query.queryKey[4] === "home" // filterType position
          },
        },
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

      // Update bookmarks page data (remove card if unbookmarked)
      queryClient.setQueriesData(
        {
          queryKey: [...weatherQueryFactory.cards(), "infinite"],
          predicate: (query) => {
            return query.queryKey[4] === "bookmarks" // filterType position
          },
        },
        (oldData: any) => {
          if (!oldData?.pages) return oldData

          return {
            ...oldData,
            pages: oldData.pages.map((page: WeatherCardType[]) => {
              if (!newBookmarkStatus) {
                // Remove card from bookmarks page when unbookmarked
                return page.filter((card: WeatherCardType) => card.id !== cardId)
              } else {
                // Add/update card when bookmarked
                return page.map((card: WeatherCardType) =>
                  card.id === cardId ? { ...card, isBookmarked: newBookmarkStatus } : card
                )
              }
            }),
          }
        }
      )

      // Optimistically update stats
      queryClient.setQueriesData({ queryKey: weatherQueryFactory.stats() }, (oldData: any) => {
        if (!oldData) return oldData

        const delta = newBookmarkStatus ? 1 : -1
        return {
          ...oldData,
          totalBookmarks: oldData.totalBookmarks + delta,
          filteredBookmarks: oldData.filteredBookmarks + delta,
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
      // Force refetch all infinite cards queries immediately
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
