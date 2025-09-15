import { useQuery } from "@tanstack/react-query"
import { useUrlFilters } from "../useUrlFilters"
import { weatherQueryFactory } from "../../lib/weatherQueryFactory"

export const useCardsStats = () => {
  const { filters } = useUrlFilters()

  return useQuery(weatherQueryFactory.cardsStats(filters))
}
