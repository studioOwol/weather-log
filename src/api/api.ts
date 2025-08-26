import type { WeatherApiResponse } from "@/types"

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherApiResponse> => {
  const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,temperature_2m_max&forecast_days=1&timezone=auto`

  try {
    const res = await fetch(API_URL)

    if (!res.ok) {
      throw new Error(`Weather API error: ${res.status} ${res.statusText}`)
    }

    const data: WeatherApiResponse = await res.json()

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`날씨 정보를 가져올 수 없습니다: ${error.message}`)
    }
    throw new Error("알 수 없는 오류가 발생했습니다.")
  }
}

export const reverseGeocode = async (lat: number, lon: number) => {
  const API_URL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`

  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("주소 변환 실패")
  const data = await res.json()

  return {
    country: data.address?.country || "",
    state: data.address?.state || data.address?.province || "",
    city: data.address?.city || data.address?.town || data.address?.village || "",
  }
}
