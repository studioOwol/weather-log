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

export interface DateFilter {
  selectedYear: string
  selectedMonth: string
  selectedDay: string
}

export interface SearchFilter {
  memoSearch: string
}

export type SortOption =
  | "date-desc"
  | "date-asc"
  | "maxTemp-desc"
  | "maxTemp-asc"
  | "minTemp-desc"
  | "minTemp-asc"

export interface SortFilter {
  sortBy: SortOption
}

export interface WeatherStore {
  cards: WeatherCardType[]
  homeFilters: DateFilter
  bookmarkFilters: DateFilter
  homeSearchFilter: SearchFilter
  bookmarkSearchFilter: SearchFilter
  homeSortFilter: SortFilter
  bookmarkSortFilter: SortFilter

  addCard: (card: WeatherCardType) => void
  updateCard: (id: string, updatedCard: WeatherCardType) => void
  deleteCard: (id: string) => void
  toggleBookmark: (id: string) => void
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
