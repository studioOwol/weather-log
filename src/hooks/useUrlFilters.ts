import { useSearchParams } from 'react-router'
import { useCallback } from 'react'
import type { ServerFilterParams } from '@/types'

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Get current filters from URL
  const getFilters = useCallback((): ServerFilterParams => {
    return {
      year: searchParams.get('year') || undefined,
      month: searchParams.get('month') || undefined,
      day: searchParams.get('day') || undefined,
      memoSearch: searchParams.get('memoSearch') || undefined,
      locationSearch: searchParams.get('locationSearch') || undefined,
      sortBy: (searchParams.get('sortBy') as ServerFilterParams['sortBy']) || 'date-desc'
    }
  }, [searchParams])

  // Update filters in URL
  const updateFilters = useCallback((filters: Partial<ServerFilterParams>) => {
    const newParams = new URLSearchParams(searchParams)
    
    // Update or remove each filter parameter
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        newParams.set(key, String(value))
      } else {
        newParams.delete(key)
      }
    })

    setSearchParams(newParams)
  }, [searchParams, setSearchParams])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams())
  }, [setSearchParams])

  // Individual filter setters
  const setYear = useCallback((year: string | undefined) => {
    updateFilters({ year })
  }, [updateFilters])

  const setMonth = useCallback((month: string | undefined) => {
    updateFilters({ month })
  }, [updateFilters])

  const setDay = useCallback((day: string | undefined) => {
    updateFilters({ day })
  }, [updateFilters])

  const setMemoSearch = useCallback((memoSearch: string | undefined) => {
    updateFilters({ memoSearch })
  }, [updateFilters])

  const setLocationSearch = useCallback((locationSearch: string | undefined) => {
    updateFilters({ locationSearch })
  }, [updateFilters])

  const setSortBy = useCallback((sortBy: ServerFilterParams['sortBy']) => {
    updateFilters({ sortBy })
  }, [updateFilters])

  return {
    filters: getFilters(),
    updateFilters,
    clearFilters,
    setYear,
    setMonth,
    setDay,
    setMemoSearch,
    setLocationSearch,
    setSortBy
  }
}