import type { WeatherCardType } from "@/types"
import WeatherCard from "./WeatherCard"
import Masonry from "react-masonry-css"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"

interface CardBoardProps {
  cards: WeatherCardType[]
  emptyMessage?: string
  subMessage?: string
}

export default function CardBoard({ cards, emptyMessage }: CardBoardProps) {
  const { t } = useTranslation(I18N_NAMESPACES.COMMON)
  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-foreground mb-2">
          {emptyMessage ?? t("empty.home")}
        </h3>
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
