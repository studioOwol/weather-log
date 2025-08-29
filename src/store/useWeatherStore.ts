import type { WeatherStore, FilterType } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      cards: [],
      homeFilters: {
        selectedYear: "",
        selectedMonth: "",
        selectedDay: "",
      },
      bookmarkFilters: {
        selectedYear: "",
        selectedMonth: "",
        selectedDay: "",
      },
      homeSearchFilter: {
        memoSearch: "",
      },
      bookmarkSearchFilter: {
        memoSearch: "",
      },

      addCard: (card) =>
        set((state) => ({
          cards: [...state.cards, card],
        })),

      updateCard: (id, updatedCard) =>
        set((state) => ({
          cards: state.cards.map((card) => (card.id === id ? updatedCard : card)),
        })),

      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
        })),

      toggleBookmark: (id) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, isBookmarked: !card.isBookmarked } : card
          ),
        })),

      getBookmarkedCards: () => get().getFilteredCards('bookmarks').filter((card) => card.isBookmarked),

      getFilteredCards: (filterType: FilterType) => {
        const { cards } = get()
        const filters = get().getFilters(filterType)
        const searchFilter = get().getSearchFilter(filterType)
        const { selectedYear, selectedMonth, selectedDay } = filters
        const { memoSearch } = searchFilter
        
        return cards.filter((card) => {
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
          
          return true
        })
      },

      getFilters: (filterType: FilterType) => {
        const state = get()
        return filterType === 'home' ? state.homeFilters : state.bookmarkFilters
      },

      getSearchFilter: (filterType: FilterType) => {
        const state = get()
        return filterType === 'home' ? state.homeSearchFilter : state.bookmarkSearchFilter
      },

      setMemoSearch: (searchTerm: string, filterType: FilterType) =>
        set({
          [filterType === 'home' ? 'homeSearchFilter' : 'bookmarkSearchFilter']: {
            memoSearch: searchTerm,
          }
        }),

      setSelectedYear: (year: string, filterType: FilterType) =>
        set({
          [filterType === 'home' ? 'homeFilters' : 'bookmarkFilters']: {
            selectedYear: year,
            selectedMonth: "",
            selectedDay: "",
          }
        }),

      setSelectedMonth: (month: string, filterType: FilterType) =>
        set((state) => {
          const filters = filterType === 'home' ? state.homeFilters : state.bookmarkFilters
          return {
            [filterType === 'home' ? 'homeFilters' : 'bookmarkFilters']: {
              ...filters,
              selectedMonth: month,
              selectedDay: "",
            }
          }
        }),

      setSelectedDay: (day: string, filterType: FilterType) =>
        set((state) => {
          const filters = filterType === 'home' ? state.homeFilters : state.bookmarkFilters
          return {
            [filterType === 'home' ? 'homeFilters' : 'bookmarkFilters']: {
              ...filters,
              selectedDay: day,
            }
          }
        }),

      clearDateFilter: (filterType: FilterType) =>
        set({
          [filterType === 'home' ? 'homeFilters' : 'bookmarkFilters']: {
            selectedYear: "",
            selectedMonth: "",
            selectedDay: "",
          }
        }),
    }),
    { name: "weather-cards" }
  )
)
