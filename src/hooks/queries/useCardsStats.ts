import { useQuery } from "@tanstack/react-query"
import { getCardsStats } from "@/api/supabaseApi"
import { useUrlFilters } from "../useUrlFilters"

export const useCardsStats = () => {
  const { filters } = useUrlFilters()

  return useQuery({
    queryKey: ["cards-stats", filters],
    queryFn: () => getCardsStats(filters),
    staleTime: 30 * 1000, // 30초 캐시
    gcTime: 5 * 60 * 1000, // 5분 메모리 보관
  })
}
