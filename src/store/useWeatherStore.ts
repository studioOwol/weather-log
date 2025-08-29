import type { WeatherStore } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      cards: [],
      selectedYear: "",
      selectedMonth: "",
      selectedDay: "",

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

      getBookmarkedCards: () => get().getFilteredCards().filter((card) => card.isBookmarked),

      getFilteredCards: () => {
        const { cards, selectedYear, selectedMonth, selectedDay } = get()
        
        return cards.filter((card) => {
          const cardDate = new Date(card.date)
          
          if (selectedYear && cardDate.getFullYear().toString() !== selectedYear) {
            return false
          }
          
          if (selectedMonth && (cardDate.getMonth() + 1).toString() !== selectedMonth) {
            return false
          }
          
          if (selectedDay && cardDate.getDate().toString() !== selectedDay) {
            return false
          }
          
          return true
        })
      },

      setSelectedYear: (year) =>
        set({
          selectedYear: year,
          selectedMonth: "",
          selectedDay: "",
        }),

      setSelectedMonth: (month) =>
        set({
          selectedMonth: month,
          selectedDay: "",
        }),

      setSelectedDay: (day) =>
        set({ selectedDay: day }),

      clearDateFilter: () =>
        set({
          selectedYear: "",
          selectedMonth: "",
          selectedDay: "",
        }),
    }),
    { name: "weather-cards" }
  )
)
