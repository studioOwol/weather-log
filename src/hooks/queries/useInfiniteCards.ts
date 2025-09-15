import { useMemo } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useUrlFilters } from "../useUrlFilters"
import { weatherQueryFactory } from "../../lib/weatherQueryFactory"
import type { FilterType } from "@/types"

export const useInfiniteCards = (filterType: FilterType) => {
  const { filters } = useUrlFilters()

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPlaceholderData,
  } = useInfiniteQuery(weatherQueryFactory.infiniteCards(filters, filterType))

  const allCards = useMemo(() => {
    if (!data) return []
    const flatCards = data.pages.flat()
    // ID로 중복 제거
    const uniqueCards = flatCards.filter(
      (card, index, self) => index === self.findIndex((c) => c.id === card.id)
    )
    return uniqueCards
  }, [data])

  return {
    cards: allCards,
    isLoading: isLoading || (isFetching && !isPlaceholderData && allCards.length === 0),
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
