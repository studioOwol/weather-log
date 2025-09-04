import type { WeatherApiResponse } from "@/types"
import { RULES } from "@/constants/rules"
import { ERRORS } from "@/constants/messages"

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherApiResponse> => {
  const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,temperature_2m_max&forecast_days=1&timezone=auto`

  try {
    const res = await fetch(API_URL)
    const data = await res.json()

    if (!res.ok) {
      if (data.error) {
        throw new Error(ERRORS.WEATHER.API_ERROR(data.reason))
      } else {
        throw new Error(ERRORS.WEATHER.HTTP_ERROR(res.status))
      }
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("fetch")) {
        throw new Error(ERRORS.NETWORK.FETCH_FAILED)
      }
      if (error.message.includes("JSON")) {
        throw new Error(ERRORS.WEATHER.JSON_PARSE_ERROR)
      }

      throw new Error(ERRORS.WEATHER.GENERIC(error.message))
    }
    throw new Error(ERRORS.WEATHER.UNKNOWN)
  }
}

export const reverseGeocode = async (lat: number, lon: number) => {
  const API_URL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=${RULES.LOCALE}`

  try {
    const res = await fetch(API_URL)
    if (!res.ok) {
      throw new Error(ERRORS.GEOCODE.HTTP_ERROR(res.status))
    }

    const data = await res.json()

    if (!data || !data.address) {
      throw new Error(ERRORS.GEOCODE.NO_RESULTS)
    }

    return {
      country: data.address?.country || "",
      state: data.address?.state || data.address?.province || "",
      city: data.address?.city || data.address?.town || data.address?.village || "",
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("fetch")) {
        throw new Error(ERRORS.NETWORK.FETCH_FAILED)
      }
      if (error.message.includes("JSON")) {
        throw new Error(ERRORS.GEOCODE.JSON_PARSE_ERROR)
      }

      throw new Error(ERRORS.GEOCODE.GENERIC(error.message))
    }
    throw new Error(ERRORS.GEOCODE.UNKNOWN)
  }
}
