import { useQuery } from '@tanstack/react-query'
import { getAllCards } from '@/api/supabaseApi'

export const useWeatherCards = () => {
  return useQuery({
    queryKey: ['weather-cards'],
    queryFn: getAllCards,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 24 * 60 * 60 * 1000, // 24 hours - 하루종일 캐시 유지
    refetchOnWindowFocus: false, // 포커스 시 재요청 안함
    refetchOnMount: false, // 마운트 시 캐시가 있으면 재요청 안함
    refetchOnReconnect: false, // 재연결 시 재요청 안함
  })
}