import { reverseGeocode } from "@/api/api"
import { useQuery } from "@tanstack/react-query"
import { locationStorage } from "@/lib/locationStorage"

export const useGeocode = (lat?: number, lon?: number) => {
  const storedLocation = lat && lon ? locationStorage.getLocation() : null
  const hasMatchingCoords = storedLocation && 
    Math.abs(storedLocation.lat - (lat || 0)) < 0.01 && 
    Math.abs(storedLocation.lon - (lon || 0)) < 0.01

  return useQuery({
    queryKey: ["geocode", lat, lon],
    queryFn: async () => {
      const result = await reverseGeocode(lat!, lon!)
      // Save successful result to localStorage
      locationStorage.saveLocation({
        lat: lat!,
        lon: lon!,
        country: result.country,
        state: result.state,
        city: result.city
      })
      return result
    },
    enabled: !!lat && !!lon,
    staleTime: 30 * 60000,
    initialData: hasMatchingCoords ? {
      country: storedLocation.country,
      state: storedLocation.state,
      city: storedLocation.city
    } : undefined,
  })
}