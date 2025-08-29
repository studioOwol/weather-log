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

export interface WeatherStore {
  cards: WeatherCardType[]
  selectedYear: string
  selectedMonth: string
  selectedDay: string
  addCard: (card: WeatherCardType) => void
  updateCard: (id: string, updatedCard: WeatherCardType) => void
  deleteCard: (id: string) => void
  toggleBookmark: (id: string) => void
  getBookmarkedCards: () => WeatherCardType[]
  getFilteredCards: () => WeatherCardType[]
  setSelectedYear: (year: string) => void
  setSelectedMonth: (month: string) => void
  setSelectedDay: (day: string) => void
  clearDateFilter: () => void
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
