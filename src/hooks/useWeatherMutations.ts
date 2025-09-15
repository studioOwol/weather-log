import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCard, updateCard, deleteCard, toggleBookmark } from '@/api/supabaseApi'
import type { WeatherCardType } from '@/types'

export const useAddCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCard,
    onSuccess: () => {
      // Invalidate all query keys
      queryClient.invalidateQueries({ queryKey: ['weather-cards'] })
      queryClient.invalidateQueries({ queryKey: ['filtered-weather-cards'] })
      queryClient.invalidateQueries({ queryKey: ['infinite-cards'] })
      queryClient.invalidateQueries({ queryKey: ['cards-stats'] })
    },
  })
}

export const useUpdateCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updatedCard }: { id: string; updatedCard: WeatherCardType }) =>
      updateCard(id, updatedCard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weather-cards'] })
      queryClient.invalidateQueries({ queryKey: ['filtered-weather-cards'] })
      queryClient.invalidateQueries({ queryKey: ['infinite-cards'] })
      queryClient.invalidateQueries({ queryKey: ['cards-stats'] })
    },
  })
}

export const useDeleteCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weather-cards'] })
      queryClient.invalidateQueries({ queryKey: ['filtered-weather-cards'] })
      queryClient.invalidateQueries({ queryKey: ['infinite-cards'] })
      queryClient.invalidateQueries({ queryKey: ['cards-stats'] })
    },
  })
}

export const useToggleBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleBookmark,
    onMutate: async (cardId: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['weather-cards'] })

      // Get current data
      const previousCards = queryClient.getQueryData<WeatherCardType[]>(['weather-cards'])

      // Optimistically update
      if (previousCards) {
        queryClient.setQueryData<WeatherCardType[]>(['weather-cards'], (old) => 
          old?.map((card) => 
            card.id === cardId 
              ? { ...card, isBookmarked: !card.isBookmarked }
              : card
          ) || []
        )
      }

      return { previousCards }
    },
    onError: (err, cardId, context) => {
      // Rollback on error
      if (context?.previousCards) {
        queryClient.setQueryData(['weather-cards'], context.previousCards)
      }
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['weather-cards'] })
      queryClient.invalidateQueries({ queryKey: ['filtered-weather-cards'] })
      queryClient.invalidateQueries({ queryKey: ['infinite-cards'] })
      queryClient.invalidateQueries({ queryKey: ['cards-stats'] })
    },
  })
}