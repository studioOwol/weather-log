import AddButton from "@/components/AddButton"
import FilterBar from "@/components/FilterBar"

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary bg-clip-text">
          All Records
        </h1>
      </div>

      <FilterBar />
      <AddButton />
    </div>
  )
}
