import { FilterIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import DateSearch from "./filter/DateSearch"
import LocationSearch from "./filter/LocationSearch"
import MemoSearch from "./filter/MemoSearch"
import SortGroup from "./filter/SortGroup"
import { useFilterStore } from "@/stores/useFilterStore"
import { usePageType } from "@/hooks/usePageType"
import { useFilteredCards } from "@/hooks/useFilteredCards"
import { useWeatherCards } from "@/hooks/useWeatherCards"

export default function FilterBar() {
  const filterType = usePageType()
  const isBookmarkPage = filterType === "bookmarks"
  const { getFilters, clearDateFilter, clearAllFilters } = useFilterStore()
  const { data: allCards = [] } = useWeatherCards()
  const { cards: filteredCards } = useFilteredCards(filterType)
  
  const filters = getFilters(filterType)
  const totalCards = isBookmarkPage
    ? allCards.filter((card) => card.isBookmarked).length
    : allCards.length

  return (
    <div className="space-y-4 mb-6 p-4 rounded-xl bg-inner border border-border-default">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FilterIcon className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter & Search</span>
          <Badge className="bg-foreground rounded-xl text-sm text-inner">
            {filteredCards.length} / {totalCards}
          </Badge>
        </div>

        <Button
          variant="outline"
          className="bg-inner border border-border-default text-sm text-muted-foreground rounded-2xl cursor-pointer"
          onClick={() => clearAllFilters(filterType)}
        >
          Clear All
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 text-muted-foreground">
        <DateSearch filterType={filterType} />
        {(filters.selectedYear || filters.selectedMonth || filters.selectedDay) && (
          <Button
            variant="outline"
            size="sm"
            className="bg-inner border border-border-default text-xs rounded-lg w-fit"
            onClick={() => clearDateFilter(filterType)}
          >
            Clear
          </Button>
        )}
        <LocationSearch />
        <MemoSearch />
        <SortGroup />
      </div>
    </div>
  )
}
