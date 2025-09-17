import type { WeatherCardType } from "@/types"
import WeatherCard from "./WeatherCard"
import { EMPTY_MESSAGE } from "@/constants/messages"

interface WeatherGridProps {
  cards: WeatherCardType[]
  emptyMessage?: string
  subMessage?: string
}

export default function WeatherGrid({
  cards,
  emptyMessage = EMPTY_MESSAGE.HOME,
}: WeatherGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">{emptyMessage}</h3>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      {cards.map((card) => (
        <WeatherCard key={card.id} card={card} />
      ))}
    </div>
  )
}
