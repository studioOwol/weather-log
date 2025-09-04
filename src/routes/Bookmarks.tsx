import FilterBar from "@/components/FilterBar"
import WeatherGrid from "@/components/WeatherGrid"
import { EMPTY_MESSAGE, SUB_MESSAGE } from "@/constants/messages"
import { useWeatherStore } from "@/stores/useWeatherStore"

export default function Bookmarks() {
  const { getBookmarkedCards } = useWeatherStore()
  const bookmarkedCards = getBookmarkedCards()

  return (
    <div>
      <div className="flex flex-col items-center p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary bg-clip-text">
          Bookmarked Records
        </h1>
      </div>

      <FilterBar />
      <WeatherGrid
        cards={bookmarkedCards}
        emptyMessage={EMPTY_MESSAGE.BOOKMARKS}
        subMessage={SUB_MESSAGE.BOOKMARKS}
      />
    </div>
  )
}
