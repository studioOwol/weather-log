import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { DateFilter, SearchFilter, SortFilter, FilterType } from "@/types"
import { DEFAULT_SORT_OPTION, FILTER_KEYS, FILTER_TYPES } from "@/constants/filters"

interface FilterStore {
  homeFilters: DateFilter
  bookmarkFilters: DateFilter
  homeSearchFilter: SearchFilter
  bookmarkSearchFilter: SearchFilter
  homeSortFilter: SortFilter
  bookmarkSortFilter: SortFilter

  getFilters: (filterType: FilterType) => DateFilter
  getSearchFilter: (filterType: FilterType) => SearchFilter
  getSortFilter: (filterType: FilterType) => SortFilter
  setSelectedYear: (year: string, filterType: FilterType) => void
  setSelectedMonth: (month: string, filterType: FilterType) => void
  setSelectedDay: (day: string, filterType: FilterType) => void
  clearDateFilter: (filterType: FilterType) => void
  clearAllFilters: (filterType: FilterType) => void
  setMemoSearch: (searchTerm: string, filterType: FilterType) => void
  setLocationSearch: (searchTerm: string, filterType: FilterType) => void
  setSortBy: (sortBy: string, filterType: FilterType) => void
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
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
        locationSearch: "",
      },
      bookmarkSearchFilter: {
        memoSearch: "",
        locationSearch: "",
      },
      homeSortFilter: {
        sortBy: DEFAULT_SORT_OPTION,
      },
      bookmarkSortFilter: {
        sortBy: DEFAULT_SORT_OPTION,
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
        set((state) => {
          const currentFilter = filterType === FILTER_TYPES.HOME ? state.homeSearchFilter : state.bookmarkSearchFilter
          return {
            [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_SEARCH_FILTER : FILTER_KEYS.BOOKMARK_SEARCH_FILTER]: {
              ...currentFilter,
              memoSearch: searchTerm,
            },
          }
        }),

      setLocationSearch: (searchTerm: string, filterType: FilterType) =>
        set((state) => {
          const currentFilter = filterType === FILTER_TYPES.HOME ? state.homeSearchFilter : state.bookmarkSearchFilter
          return {
            [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_SEARCH_FILTER : FILTER_KEYS.BOOKMARK_SEARCH_FILTER]: {
              ...currentFilter,
              locationSearch: searchTerm,
            },
          }
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
            locationSearch: "",
          },
          [filterType === FILTER_TYPES.HOME ? FILTER_KEYS.HOME_SORT_FILTER : FILTER_KEYS.BOOKMARK_SORT_FILTER]: {
            sortBy: DEFAULT_SORT_OPTION,
          },
        }),
    }),
    { name: "weather-filters" }
  )
)