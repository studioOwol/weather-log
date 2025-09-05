import FilterBar from "@/components/FilterBar"
import WeatherGrid from "@/components/WeatherGrid"
import { EMPTY_MESSAGE, SUB_MESSAGE } from "@/constants/messages"
import { useFilteredCards } from "@/hooks/useFilteredCards"

export default function Bookmarks() {
  const { cards: bookmarkedCards, isLoading, error } = useFilteredCards("bookmarks")

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-foreground">Loading bookmarks...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-destructive">Error loading bookmarks: {error.message}</div>
      </div>
    )
  }

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
