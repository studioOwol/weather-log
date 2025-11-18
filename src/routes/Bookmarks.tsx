import FilterBar from "@/components/FilterBar"
import CardBoard from "@/components/CardBoard"
import { EMPTY_MESSAGE } from "@/constants/messages"
import { useInfiniteCards } from "@/hooks/queries/useInfiniteCards"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { LoadingOverlay, LoadingInline } from "@/components/ui/spinner"

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

  return (
    <div>
      <div className="flex flex-col items-center p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary bg-clip-text">
          Bookmarked Records
        </h1>
      </div>

      <FilterBar />

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingOverlay />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-destructive">Error loading bookmarks: {error.message}</div>
        </div>
      ) : (
        <CardBoard cards={bookmarkedCards} emptyMessage={EMPTY_MESSAGE.BOOKMARKS} />
      )}

      <div ref={ref} className="h-20 flex items-center justify-center">
        {hasNextPage && isFetchingNextPage && (
          <LoadingInline size="md" />
        )}
      </div>
    </div>
  )
}
