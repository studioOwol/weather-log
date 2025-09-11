import { useMemo } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getFilteredCardsPaginated } from "@/api/supabaseApi"
import { useUrlFilters } from "./useUrlFilters"
import type { FilterType, WeatherCardType } from "@/types"
import { RULES } from "@/constants/rules"

export const useInfiniteCards = (filterType: FilterType) => {
  const { filters } = useUrlFilters()
  const bookmarksOnly = filterType === "bookmarks"

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["infinite-cards", filters, filterType],
      queryFn: async ({ pageParam = 0 }: { pageParam?: number }) => {
        return getFilteredCardsPaginated(filters, pageParam, bookmarksOnly)
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage: WeatherCardType[], allPages) => {
        // 마지막 페이지가 PAGE_SIZE보다 작으면 더 이상 페이지가 없음
        if (lastPage.length < RULES.PAGE_SIZE) {
          return undefined
        }

        // 다음 오프셋 계산
        const nextOffset = allPages.flat().length
        return nextOffset
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    })

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
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
