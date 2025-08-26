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
    }),
    { name: "weather-cards" }
  )
)
