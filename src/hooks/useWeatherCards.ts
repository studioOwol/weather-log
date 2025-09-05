import { useQuery } from '@tanstack/react-query'
import { getAllCards } from '@/api/supabaseApi'

export const useWeatherCards = () => {
  return useQuery({
    queryKey: ['weather-cards'],
    queryFn: getAllCards,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
  })
}