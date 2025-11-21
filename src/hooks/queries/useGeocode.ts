import { reverseGeocode } from "@/api/api"
import { useQuery } from "@tanstack/react-query"
import i18n from "@/lib/i18n"

export const useGeocode = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ["geocode", lat, lon, i18n.language],
    queryFn: async () => {
      const result = await reverseGeocode(lat!, lon!)
      return result
    },
    enabled: !!lat && !!lon,
    staleTime: 30 * 60000,
  })
}