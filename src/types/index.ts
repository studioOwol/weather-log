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
  language: string | null
}

export type FilterType = "home" | "bookmarks"

export type SortOption =
  | "date-desc"
  | "date-asc"
  | "maxTemp-desc"
  | "maxTemp-asc"
  | "minTemp-desc"
  | "minTemp-asc"

// Server-side filtering types for URL parameters and API calls
export interface DateFilterParams {
  year?: string
  month?: string
  day?: string
}

export interface SearchFilterParams {
  memoSearch?: string
  locationSearch?: string
}

export interface ServerFilterParams extends DateFilterParams, SearchFilterParams {
  sortBy?: SortOption
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

// i18n types
export type I18nNamespace = "common" | "settings" | "auth" | "filter" | "card" | "privacy"
