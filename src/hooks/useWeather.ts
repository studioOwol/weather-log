import { fetchWeather } from "@/api/api"
import { useQuery } from "@tanstack/react-query"

export const useWeather = (lat?: number, lon?: number) =>
  useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat!, lon!),
    enabled: !!lat && !!lon,
    staleTime: 10 * 60000,
  })
