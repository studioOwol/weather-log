import FilterBar from "@/components/FilterBar"
import AddCardModal from "@/components/modal/AddCardModal"
import WeatherGrid from "@/components/WeatherGrid"
import { useFilteredCards } from "@/hooks/useFilteredCards"

export default function Home() {
  const { cards, isLoading, error } = useFilteredCards("home")

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-foreground">Loading cards...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-destructive">Error loading cards: {error.message}</div>
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
      <WeatherGrid cards={cards} />
      <AddCardModal />
    </div>
  )
}
