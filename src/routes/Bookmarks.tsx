import FilterBar from "@/components/FilterBar"
import CardBoard from "@/components/CardBoard"
import { EMPTY_MESSAGE } from "@/constants/messages"
import { useInfiniteCards } from "@/hooks/queries/useInfiniteCards"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

export default function Bookmarks() {
  const {
    cards: bookmarkedCards,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCards("bookmarks")

  // Intersection Observer for infinite scroll
  const { ref } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  })

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
      <CardBoard cards={bookmarkedCards} emptyMessage={EMPTY_MESSAGE.BOOKMARKS} />

      <div ref={ref} className="h-20 flex items-center justify-center">
        {hasNextPage && isFetchingNextPage && (
          <div className="text-muted-foreground">Loading more...</div>
        )}
      </div>
    </div>
  )
}
