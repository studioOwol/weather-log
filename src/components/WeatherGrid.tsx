import type { WeatherCardType } from "@/types"
import WeatherCard from "./WeatherCard"

interface WeatherGridProps {
  cards: WeatherCardType[]
  emptyMessage?: string
}

export default function WeatherGrid({ cards, emptyMessage = "No records yet." }: WeatherGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">{emptyMessage}</h3>
        <p className="text-sm text-muted-foreground">
          Click the + button in the bottom right to add your first entry!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {cards.map((card) => (
        <WeatherCard key={card.id} card={card} />
      ))}
    </div>
  )
}
