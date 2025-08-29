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
}

export type FilterType = 'home' | 'bookmarks'

export interface DateFilter {
  selectedYear: string
  selectedMonth: string
  selectedDay: string
}

export interface WeatherStore {
  cards: WeatherCardType[]
  homeFilters: DateFilter
  bookmarkFilters: DateFilter
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
  getFilters: (filterType: FilterType) => DateFilter
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
