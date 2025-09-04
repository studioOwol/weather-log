import { reverseGeocode } from "@/api/api"
import { useQuery } from "@tanstack/react-query"

export const useGeocode = (lat?: number, lon?: number) =>
  useQuery({
    queryKey: ["geocode", lat, lon],
    queryFn: () => reverseGeocode(lat!, lon!),
    enabled: !!lat && !!lon,
    staleTime: 30 * 60000,
  })