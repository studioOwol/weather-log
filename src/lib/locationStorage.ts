interface StoredLocationData {
  lat: number
  lon: number
  country: string
  state: string
  city: string
  timestamp: number
}

interface StoredWeatherData {
  lat: number
  lon: number
  weather: any
  timestamp: number
}

const LOCATION_KEY = 'lastSuccessfulLocation'
const WEATHER_KEY = 'lastSuccessfulWeather'
const EXPIRY_TIME = 24 * 60 * 60 * 1000 // 24 hours

export const locationStorage = {
  saveLocation: (data: Omit<StoredLocationData, 'timestamp'>) => {
    const stored: StoredLocationData = {
      ...data,
      timestamp: Date.now()
    }
    localStorage.setItem(LOCATION_KEY, JSON.stringify(stored))
  },

  getLocation: (): StoredLocationData | null => {
    try {
      const stored = localStorage.getItem(LOCATION_KEY)
      if (!stored) return null
      
      const data: StoredLocationData = JSON.parse(stored)
      
      // Check if data is expired
      if (Date.now() - data.timestamp > EXPIRY_TIME) {
        localStorage.removeItem(LOCATION_KEY)
        return null
      }
      
      return data
    } catch {
      return null
    }
  },

  saveWeather: (lat: number, lon: number, weather: any) => {
    const stored: StoredWeatherData = {
      lat,
      lon,
      weather,
      timestamp: Date.now()
    }
    localStorage.setItem(WEATHER_KEY, JSON.stringify(stored))
  },

  getWeather: (lat?: number, lon?: number): any | null => {
    try {
      const stored = localStorage.getItem(WEATHER_KEY)
      if (!stored) return null
      
      const data: StoredWeatherData = JSON.parse(stored)
      
      // Check if data is expired
      if (Date.now() - data.timestamp > EXPIRY_TIME) {
        localStorage.removeItem(WEATHER_KEY)
        return null
      }
      
      // Check if coordinates match (within reasonable distance)
      if (lat && lon) {
        const distance = Math.sqrt(
          Math.pow(data.lat - lat, 2) + Math.pow(data.lon - lon, 2)
        )
        if (distance > 0.01) return null // ~1km threshold
      }
      
      return data.weather
    } catch {
      return null
    }
  }
}