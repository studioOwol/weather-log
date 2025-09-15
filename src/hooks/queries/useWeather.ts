import { fetchWeather } from "@/api/api"
import { useQuery } from "@tanstack/react-query"
import { locationStorage } from "@/lib/locationStorage"

export const useWeather = (lat?: number, lon?: number) => {
  const storedWeather = lat && lon ? locationStorage.getWeather(lat, lon) : null

  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: async () => {
      const result = await fetchWeather(lat!, lon!)
      // Save successful result to localStorage
      locationStorage.saveWeather(lat!, lon!, result)
      return result
    },
    enabled: !!lat && !!lon,
    staleTime: 10 * 60000,
    initialData: storedWeather || undefined,
  })
}
