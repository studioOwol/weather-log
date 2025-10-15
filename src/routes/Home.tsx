import FilterBar from "@/components/FilterBar"
import AddCardModal from "@/components/modal/AddCardModal"
import CardBoard from "@/components/CardBoard"
import { useInfiniteCards } from "@/hooks/queries/useInfiniteCards"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

export default function Home() {
  const { cards, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteCards("home")

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
        <div className="text-foreground">Loading records...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-destructive">Error loading records: {error.message}</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col items-center p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary bg-clip-text">
          All Records
        </h1>
      </div>

      <FilterBar />
      <CardBoard cards={cards} />

      <div ref={ref} className="h-20 flex items-center justify-center">
        {hasNextPage && isFetchingNextPage && (
          <div className="text-muted-foreground">Loading more...</div>
        )}
      </div>

      <AddCardModal />
    </div>
  )
}
