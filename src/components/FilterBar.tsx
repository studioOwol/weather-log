import { FilterIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import DateSearch from "./filter/DateSearch"
import MemoSearch from "./filter/MemoSearch"
import SortGroup from "./filter/SortGroup"
import { useWeatherStore } from "@/store/useWeatherStore"
import { useLocation } from "react-router"
import { ROUTES } from "@/lib/routes"

export default function FilterBar() {
  const location = useLocation()
  const isBookmarkPage = location.pathname === ROUTES.BOOKMARKS
  const filterType = isBookmarkPage ? 'bookmarks' : 'home'
  
  const { cards, getFilters, clearDateFilter, getFilteredCards, getBookmarkedCards } = useWeatherStore()
  const filters = getFilters(filterType)
  const filteredCards = isBookmarkPage ? getBookmarkedCards() : getFilteredCards('home')

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
        <DateSearch filterType={filterType} />
        {filters.selectedYear && (
          <Button
            variant="outline"
            size="sm"
            className="bg-inner border border-border-default text-xs text-muted-foreground rounded-lg w-fit"
            onClick={() => clearDateFilter(filterType)}
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
