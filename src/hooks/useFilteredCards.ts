import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { getFilteredCards } from "@/api/supabaseApi"
import { useUrlFilters } from "./useUrlFilters"
import type { FilterType, WeatherCardType } from "@/types"

export const useFilteredCards = (filterType: FilterType) => {
  const { filters } = useUrlFilters()

  const {
    data: cards = [],
    isLoading,
    error,
  } = useQuery<WeatherCardType[]>({
    queryKey: ["filtered-weather-cards", filters],
    queryFn: () => getFilteredCards(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const bookmarkedCards = useMemo(() => {
    return cards.filter((card) => card.isBookmarked)
  }, [cards])

  return {
    cards: filterType === "bookmarks" ? bookmarkedCards : cards,
    isLoading,
    error,
  }
}
