import type { SortOption } from "@/types"

export const SORT_OPTIONS = {
  DATE_DESC: 'date-desc' as SortOption,
  DATE_ASC: 'date-asc' as SortOption,
  MAX_TEMP_DESC: 'maxTemp-desc' as SortOption,
  MAX_TEMP_ASC: 'maxTemp-asc' as SortOption,
  MIN_TEMP_DESC: 'minTemp-desc' as SortOption,
  MIN_TEMP_ASC: 'minTemp-asc' as SortOption,
} as const

export const DEFAULT_SORT_OPTION = SORT_OPTIONS.DATE_DESC

export const DEBOUNCE_DELAY = 300

export const SORT_LABELS = {
  [SORT_OPTIONS.DATE_DESC]: 'Latest',
  [SORT_OPTIONS.DATE_ASC]: 'Oldest',
  [SORT_OPTIONS.MAX_TEMP_DESC]: 'Max Temp (High)',
  [SORT_OPTIONS.MAX_TEMP_ASC]: 'Max Temp (Low)',
  [SORT_OPTIONS.MIN_TEMP_DESC]: 'Min Temp (High)',
  [SORT_OPTIONS.MIN_TEMP_ASC]: 'Min Temp (Low)',
} as const

export const MONTHS = [
  { value: "1", label: "Jan" },
  { value: "2", label: "Feb" },
  { value: "3", label: "Mar" },
  { value: "4", label: "Apr" },
  { value: "5", label: "May" },
  { value: "6", label: "Jun" },
  { value: "7", label: "Jul" },
  { value: "8", label: "Aug" },
  { value: "9", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
] as const

export const YEAR_RANGE = 6

// Filter store keys
export const FILTER_KEYS = {
  HOME_FILTERS: 'homeFilters',
  BOOKMARK_FILTERS: 'bookmarkFilters',
  HOME_SEARCH_FILTER: 'homeSearchFilter',
  BOOKMARK_SEARCH_FILTER: 'bookmarkSearchFilter',
  HOME_SORT_FILTER: 'homeSortFilter',
  BOOKMARK_SORT_FILTER: 'bookmarkSortFilter',
} as const

// Filter type values
export const FILTER_TYPES = {
  HOME: 'home',
  BOOKMARKS: 'bookmarks',
} as const