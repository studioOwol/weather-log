import type { WeatherStore } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      cards: [],
      addCard: (card) =>
        set((state) => ({
          cards: [...state.cards, card],
        })),
      updateCard: (id, updatedCard) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? updatedCard : card
          ),
        })),
      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
        })),
    }),
    { name: "weather-cards" }
  )
)
