export interface WeatherCardType {
  id: string
  date: string
  location: { lat: number; lon: number }
  country: string
  city: string
  state: string
  memo: string
  minTemp: number
  maxTemp: number
  isBookmarked: boolean
  createdAt: number
}

export type FilterType = "home" | "bookmarks"

// Client-side filter types (will be removed)
// export interface DateFilter {
//   selectedYear: string
//   selectedMonth: string
//   selectedDay: string
// }

// export interface SearchFilter {
//   memoSearch: string
//   locationSearch: string
// }

// export interface SortFilter {
//   sortBy: SortOption
// }

export type SortOption =
  | "date-desc"
  | "date-asc"
  | "maxTemp-desc"
  | "maxTemp-asc"
  | "minTemp-desc"
  | "minTemp-asc"

// Server-side filtering types for URL parameters and API calls
export interface DateFilterParams {
  year?: number
  month?: number  
  day?: number
}

export interface SearchFilterParams {
  memoSearch?: string
  locationSearch?: string
}

export interface ServerFilterParams extends DateFilterParams, SearchFilterParams {
  sortBy?: SortOption
}

export interface WeatherStore {
  cards: WeatherCardType[]
  homeFilters: DateFilter
  bookmarkFilters: DateFilter
  homeSearchFilter: SearchFilter
  bookmarkSearchFilter: SearchFilter
  homeSortFilter: SortFilter
  bookmarkSortFilter: SortFilter

  loadCards: () => Promise<void>
  addCard: (card: WeatherCardType) => Promise<void>
  updateCard: (id: string, updatedCard: WeatherCardType) => Promise<void>
  deleteCard: (id: string) => Promise<void>
  toggleBookmark: (id: string) => Promise<void>
  getBookmarkedCards: () => WeatherCardType[]
  getFilteredCards: (filterType: FilterType) => WeatherCardType[]
  setSelectedYear: (year: string, filterType: FilterType) => void
  setSelectedMonth: (month: string, filterType: FilterType) => void
  setSelectedDay: (day: string, filterType: FilterType) => void
  clearDateFilter: (filterType: FilterType) => void
  clearAllFilters: (filterType: FilterType) => void
  getFilters: (filterType: FilterType) => DateFilter
  getSearchFilter: (filterType: FilterType) => SearchFilter
  getSortFilter: (filterType: FilterType) => SortFilter
  setMemoSearch: (searchTerm: string, filterType: FilterType) => void
  setLocationSearch: (searchTerm: string, filterType: FilterType) => void
  setSortBy: (sortBy: SortOption, filterType: FilterType) => void
}

export interface WeatherApiResponse {
  daily: {
    temperature_2m_min: number[]
    temperature_2m_max: number[]
  }
  daily_units: {
    temperature_2m_min: string
    temperature_2m_max: string
  }
}
