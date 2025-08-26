export interface WeatherCard {
  id: string
  date: string
  location: { lat: number; lon: number }
  country: string
  city: string
  state: string
  memo: string
  min: number
  max: number
}

export interface WeatherStore {
  cards: WeatherCard[]
  addCard: (card: WeatherCard) => void
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
