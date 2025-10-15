import type { WeatherCardType } from "@/types"
import WeatherCard from "./WeatherCard"
import { EMPTY_MESSAGE } from "@/constants/messages"
import Masonry from "react-masonry-css"

interface CardBoardProps {
  cards: WeatherCardType[]
  emptyMessage?: string
  subMessage?: string
}

export default function CardBoard({
  cards,
  emptyMessage = EMPTY_MESSAGE.HOME,
}: CardBoardProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">{emptyMessage}</h3>
      </div>
    )
  }

  const breakpointColumns = {
    default: 4,
    768: 2,
    640: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-5 w-auto"
      columnClassName="pl-5 bg-clip-padding"
    >
      {cards.map((card) => (
        <div key={card.id} className="mb-5">
          <WeatherCard card={card} />
        </div>
      ))}
    </Masonry>
  )
}
