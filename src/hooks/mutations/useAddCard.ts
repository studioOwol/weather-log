import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCard } from "@/api/supabaseApi"
import { weatherQueryFactory } from "@/lib/weatherQueryFactory"

export default function useAddCard() {
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
