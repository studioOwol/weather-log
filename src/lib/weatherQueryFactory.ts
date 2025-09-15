import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query"
import { keepPreviousData } from "@tanstack/react-query"
import { getFilteredCardsPaginated, getCardsStats } from "@/api/supabaseApi"
import type { FilterType, ServerFilterParams, WeatherCardType } from "@/types"
import { RULES } from "@/constants/rules"

type CardsStatsType = {
  totalCards: number
  totalBookmarks: number
  filteredCards: number
  filteredBookmarks: number
}

export const weatherQueryFactory = {
  // 키 전용 항목
  all: () => ["weather"] as const,
  cards: () => [...weatherQueryFactory.all(), "cards"] as const,
  stats: () => [...weatherQueryFactory.all(), "stats"] as const,

  // queryOptions를 사용한 쿼리 팩토리
  infiniteCards: (filters: ServerFilterParams, filterType: FilterType) =>
    infiniteQueryOptions({
      queryKey: [...weatherQueryFactory.cards(), "infinite", filters, filterType],
      queryFn: async ({ pageParam = 0 }: { pageParam?: number }): Promise<WeatherCardType[]> => {
        const bookmarksOnly = filterType === "bookmarks"
        return getFilteredCardsPaginated(filters, pageParam, bookmarksOnly)
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage: WeatherCardType[], allPages) => {
        if (lastPage.length < RULES.PAGE_SIZE) {
          return undefined
        }
        return allPages.flat().length
      },
      placeholderData: keepPreviousData,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }),

  cardsStats: (filters: ServerFilterParams) =>
    queryOptions({
      queryKey: [...weatherQueryFactory.stats(), "cards", filters],
      queryFn: (): Promise<CardsStatsType> => getCardsStats(filters),
      staleTime: 30 * 1000, // 30초 캐시
      gcTime: 5 * 60 * 1000, // 5분 메모리 보관
    }),
} as const
