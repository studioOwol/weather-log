import FilterBar from "@/components/FilterBar"
import AddCardModal from "@/components/modal/AddCardModal"
import WeatherGrid from "@/components/WeatherGrid"
import { useWeatherStore } from "@/store/useWeatherStore"

export default function Home() {
  const { cards } = useWeatherStore()

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
