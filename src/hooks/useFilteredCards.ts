import { useMemo } from 'react'
import { useWeatherCards } from './useWeatherCards'
import { useFilterStore } from '@/stores/useFilterStore'
import type { WeatherCardType, FilterType } from '@/types'
import { SORT_OPTIONS } from '@/constants/filters'

export const useFilteredCards = (filterType: FilterType) => {
  const { data: cards = [], isLoading, error } = useWeatherCards()
  const { getFilters, getSearchFilter, getSortFilter } = useFilterStore()
  
  const filters = getFilters(filterType)
  const searchFilter = getSearchFilter(filterType)
  const sortFilter = getSortFilter(filterType)

  const filteredCards = useMemo(() => {
    if (!cards) return []

    const { selectedYear, selectedMonth, selectedDay } = filters
    const { memoSearch, locationSearch } = searchFilter
    const { sortBy } = sortFilter

    // Filter cards
    let filtered = cards.filter((card: WeatherCardType) => {
      const cardDate = new Date(card.date)

      // Date filtering
      if (selectedYear && cardDate.getFullYear().toString() !== selectedYear) {
        return false
      }

      if (selectedMonth && (cardDate.getMonth() + 1).toString() !== selectedMonth) {
        return false
      }

      if (selectedDay && cardDate.getDate().toString() !== selectedDay) {
        return false
      }

      // Memo search filtering
      if (memoSearch && !card.memo.toLowerCase().includes(memoSearch.toLowerCase())) {
        return false
      }

      // Location search filtering
      if (locationSearch) {
        const locationString = `${card.country} ${card.state} ${card.city}`.toLowerCase()
        if (!locationString.includes(locationSearch.toLowerCase())) {
          return false
        }
      }

      return true
    })

    // Sort cards
    return filtered.sort((a, b) => {
      let result = 0

      switch (sortBy) {
        case SORT_OPTIONS.DATE_DESC:
          result = new Date(b.date).getTime() - new Date(a.date).getTime()
          if (result === 0) {
            return b.createdAt - a.createdAt
          }
          return result
        case SORT_OPTIONS.DATE_ASC:
          result = new Date(a.date).getTime() - new Date(b.date).getTime()
          if (result === 0) {
            return a.createdAt - b.createdAt
          }
          return result
        case SORT_OPTIONS.MAX_TEMP_DESC:
          result = b.maxTemp - a.maxTemp
          break
        case SORT_OPTIONS.MAX_TEMP_ASC:
          result = a.maxTemp - b.maxTemp
          break
        case SORT_OPTIONS.MIN_TEMP_DESC:
          result = b.minTemp - a.minTemp
          break
        case SORT_OPTIONS.MIN_TEMP_ASC:
          result = a.minTemp - b.minTemp
          break
        default:
          result = new Date(b.date).getTime() - new Date(a.date).getTime()
          if (result === 0) {
            return b.createdAt - a.createdAt
          }
          return result
      }

      // If same value, sort by creation time (newest first)
      if (result === 0) {
        return b.createdAt - a.createdAt
      }

      return result
    })
  }, [cards, filters, searchFilter, sortFilter])

  const bookmarkedCards = useMemo(() => {
    return filteredCards.filter(card => card.isBookmarked)
  }, [filteredCards])

  return {
    cards: filterType === 'bookmarks' ? bookmarkedCards : filteredCards,
    isLoading,
    error
  }
}