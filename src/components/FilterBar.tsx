import { FilterIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import DateSearch from "./filter/DateSearch"
import MemoSearch from "./filter/MemoSearch"
import SortGroup from "./filter/SortGroup"
import { useWeatherStore } from "@/store/useWeatherStore"
import type { WeatherCardType } from "@/types"

interface FilterBarProps {
  getCards: () => WeatherCardType[]
}

export default function FilterBar({ getCards }: FilterBarProps) {
  const { cards, selectedYear, clearDateFilter } = useWeatherStore()
  const filteredCards = getCards()

  return (
    <div className="space-y-4 mb-6 p-4 rounded-xl bg-inner border border-border-default">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FilterIcon className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter & Search</span>
          <Badge className="bg-foreground rounded-xl text-sm text-inner">
            {filteredCards.length} / {cards.length}
          </Badge>
        </div>

        <Button
          variant="outline"
          className="bg-inner border border-border-default text-sm text-muted-foreground rounded-2xl cursor-pointer"
        >
          Clear All
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <DateSearch />
        {selectedYear && (
          <Button
            variant="outline"
            size="sm"
            className="bg-inner border border-border-default text-xs text-muted-foreground rounded-lg w-fit"
            onClick={clearDateFilter}
          >
            Clear
          </Button>
        )}
        <MemoSearch />
        <SortGroup />
      </div>
    </div>
  )
}
