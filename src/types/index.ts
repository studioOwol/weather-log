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
}

export interface WeatherStore {
  cards: WeatherCardType[]
  addCard: (card: WeatherCardType) => void
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
