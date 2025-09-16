export const EMPTY_MESSAGE = {
  HOME: "No records",
  BOOKMARKS: "No bookmarked records",
}

export const PLACEHOLDERS = {
  YEAR: "Year",
  MONTH: "Month",
  DAY: "Day",
  SEARCH_NOTES: "Search notes...",
} as const

export const ERRORS = {
  // Network related errors
  NETWORK: {
    FETCH_FAILED: "Please check your network connection",
    TIMEOUT: "Request timed out",
  },

  // Open-meteo API related errors
  WEATHER: {
    HTTP_ERROR: (status: number) => `Open-meteo API connection failed: ${status}`,
    API_ERROR: (reason: string) => `Weather data error: ${reason}`,
    JSON_PARSE_ERROR: "Weather data format is invalid",
    GENERIC: (message: string) => `Failed to fetch weather data: ${message}`,
    UNKNOWN: "Failed to fetch weather data",
  },

  // Nominatim API related errors
  GEOCODE: {
    HTTP_ERROR: (status: number) => `Nominatim API connection failed: ${status}`,
    NO_RESULTS: "Address not found for this location",
    JSON_PARSE_ERROR: "Address data format is invalid",
    GENERIC: (message: string) => `Failed to fetch address data: ${message}`,
    UNKNOWN: "Failed to fetch address data",
  },

  // Common errors
  COMMON: {
    UNKNOWN: "An unknown error occurred",
    INVALID_PARAMS: "Invalid parameters",
  },
}

export const DISPLAY_MESSAGES = {
  LOADING: {
    LOCATION: "Getting location...",
    WEATHER: "Getting weather...",
  },
  ERROR: {
    LOCATION_NOT_FOUND: "Location info not available",
    WEATHER_NOT_FOUND: "Weather info not available",
  },
}
