import type { WeatherStore, FilterType } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { DEFAULT_SORT_OPTION, SORT_OPTIONS, FILTER_KEYS, FILTER_TYPES } from "@/constants/filters"

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      cards: [],
      homeFilters: {
        selectedYear: "",
        selectedMonth: "",
        selectedDay: "",
      },
      bookmarkFilters: {
        selectedYear: "",
        selectedMonth: "",
        selectedDay: "",
      },
      homeSearchFilter: {
        memoSearch: "",
      },
      bookmarkSearchFilter: {
        memoSearch: "",
      },
      homeSortFilter: {
        sortBy: DEFAULT_SORT_OPTION,
      },
      bookmarkSortFilter: {
        sortBy: DEFAULT_SORT_OPTION,
      },

      addCard: (card) =>
        set((state) => ({
          cards: [...state.cards, card],
        })),

      updateCard: (id, updatedCard) =>
        set((state) => ({
          cards: state.cards.map((card) => (card.id === id ? updatedCard : card)),
        })),

      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
        })),

      toggleBookmark: (id) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, isBookmarked: !card.isBookmarked } : card
          ),
        })),

      getBookmarkedCards: () =>
        get()
          .getFilteredCards("bookmarks")
          .filter((card) => card.isBookmarked),

      getFilteredCards: (filterType: FilterType) => {
        const { cards } = get()
        const filters = get().getFilters(filterType)
        const searchFilter = get().getSearchFilter(filterType)
        const sortFilter = get().getSortFilter(filterType)
        const { selectedYear, selectedMonth, selectedDay } = filters
        const { memoSearch } = searchFilter
        const { sortBy } = sortFilter

        // Filter cards
        let filteredCards = cards.filter((card) => {
          const cardDate = new Date(card.date)

          // Date filtering
          if (selectedYear && cardDate.getFullYear().toString() !== selectedYear) {
            return false
          }

          if (selectedMonth && (cardDate.getMonth() + 1).toString() !== selectedMonth) {
            return false
          }

          if (selectedDay && cardDate.getDate().toString() !== selectedDay) {
            return false
          }

          // Memo search filtering
          if (memoSearch && !card.memo.toLowerCase().includes(memoSearch.toLowerCase())) {
            return false
          }

          return true
        })

        // Sort cards
        return filteredCards.sort((a, b) => {
          let result = 0

          switch (sortBy) {
            case SORT_OPTIONS.DATE_DESC:
              result = new Date(b.date).getTime() - new Date(a.date).getTime()
              if (result === 0) {
                return b.createdAt - a.createdAt
              }
              return result
            case SORT_OPTIONS.DATE_ASC:
              result = new Date(a.date).getTime() - new Date(b.date).getTime()
              if (result === 0) {
                return a.createdAt - b.createdAt
              }
              return result
            case SORT_OPTIONS.MAX_TEMP_DESC:
              result = b.maxTemp - a.maxTemp
              break
            case SORT_OPTIONS.MAX_TEMP_ASC:
              result = a.maxTemp - b.maxTemp
              break
            case SORT_OPTIONS.MIN_TEMP_DESC:
              result = b.minTemp - a.minTemp
              break
            case SORT_OPTIONS.MIN_TEMP_ASC:
              result = a.minTemp - b.minTemp
              break
            default:
              result = new Date(b.date).getTime() - new Date(a.date).getTime()
              if (result === 0) {
                return b.createdAt - a.createdAt
              }
              return result
          }

          // 같은 값이면 생성시간 최신순으로 정렬
          if (result === 0) {
            return b.createdAt - a.createdAt
          }

          return result
        })
      },

      getFilters: (filterType: FilterType) => {
        const state = get()
        return filterType === FILTER_TYPES.HOME ? state.homeFilters : state.bookmarkFilters
      },

      getSearchFilter: (filterType: FilterType) => {
        const state = get()
        return filterType === FILTER_TYPES.HOME ? state.homeSearchFilter : state.bookmarkSearchFilter
      },

      getSortFilter: (filterType: FilterType) => {
        const state = get()
        return filterType === FILTER_TYPES.HOME ? state.homeSortFilter : state.bookmarkSortFilter
      },

      setMemoSearch: (searchTerm: string, filterType: FilterType) =>
        set({
          [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_SEARCH_FILTER : FILTER_KEYS.BOOKMARK_SEARCH_FILTER]: {
            memoSearch: searchTerm,
          },
        }),

      setSortBy: (sortBy, filterType: FilterType) =>
        set({
          [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_SORT_FILTER : FILTER_KEYS.BOOKMARK_SORT_FILTER]: {
            sortBy,
          },
        }),

      setSelectedYear: (year: string, filterType: FilterType) =>
        set((state) => {
          const filters = filterType === FILTER_TYPES.HOME ? state.homeFilters : state.bookmarkFilters
          return {
            [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_FILTERS : FILTER_KEYS.BOOKMARK_FILTERS]: {
              ...filters,
              selectedYear: year,
            },
          }
        }),

      setSelectedMonth: (month: string, filterType: FilterType) =>
        set((state) => {
          const filters = filterType === FILTER_TYPES.HOME ? state.homeFilters : state.bookmarkFilters
          return {
            [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_FILTERS : FILTER_KEYS.BOOKMARK_FILTERS]: {
              ...filters,
              selectedMonth: month,
            },
          }
        }),

      setSelectedDay: (day: string, filterType: FilterType) =>
        set((state) => {
          const filters = filterType === FILTER_TYPES.HOME ? state.homeFilters : state.bookmarkFilters
          return {
            [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_FILTERS : FILTER_KEYS.BOOKMARK_FILTERS]: {
              ...filters,
              selectedDay: day,
            },
          }
        }),

      clearDateFilter: (filterType: FilterType) =>
        set({
          [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_FILTERS : FILTER_KEYS.BOOKMARK_FILTERS]: {
            selectedYear: "",
            selectedMonth: "",
            selectedDay: "",
          },
        }),

      clearAllFilters: (filterType: FilterType) =>
        set({
          [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_FILTERS : FILTER_KEYS.BOOKMARK_FILTERS]: {
            selectedYear: "",
            selectedMonth: "",
            selectedDay: "",
          },
          [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_SEARCH_FILTER : FILTER_KEYS.BOOKMARK_SEARCH_FILTER]: {
            memoSearch: "",
          },
          [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_SORT_FILTER : FILTER_KEYS.BOOKMARK_SORT_FILTER]: {
            sortBy: DEFAULT_SORT_OPTION,
          },
        }),
    }),
    { name: "weather-cards" }
  )
)
