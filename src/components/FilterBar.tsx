import { FilterIcon, RotateCcw } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import DateSearch from "./filter/DateSearch"
import LocationSearch from "./filter/LocationSearch"
import MemoSearch from "./filter/MemoSearch"
import SortGroup from "./filter/SortGroup"
import { useUrlFilters } from "@/hooks/useUrlFilters"
import { usePageType } from "@/hooks/usePageType"
import { useCardsStats } from "@/hooks/queries/useCardsStats"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"

export default function FilterBar() {
  const { t } = useTranslation(I18N_NAMESPACES.FILTER)
  const filterType = usePageType()
  const isBookmarkPage = filterType === "bookmarks"
  const { filters, clearFilters, updateFilters } = useUrlFilters()
  const { data: stats } = useCardsStats()

  const filteredCount = isBookmarkPage ? stats?.filteredBookmarks || 0 : stats?.filteredCards || 0
  const totalCards = isBookmarkPage ? stats?.totalBookmarks || 0 : stats?.totalCards || 0

  return (
    <div className="space-y-4 mb-6 p-4 rounded-xl bg-inner border border-border-default">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FilterIcon className="size-4 text-muted-foreground" />
          <span className="text-md font-semibold text-muted-foreground">{t("title")}</span>
          <Badge className="bg-foreground rounded-xl text-sm text-inner">
            {filteredCount} / {totalCards}
          </Badge>
        </div>

        <Button
          variant="outline"
          className="bg-inner border border-border-default text-sm text-muted-foreground rounded-2xl cursor-pointer hover:bg-memo active:scale-95 transition-all"
          onClick={() => clearFilters()}
        >
          {t("clearAll")}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 text-muted-foreground">
        <div className="flex items-center gap-2">
          <DateSearch />
          {(filters.year || filters.month || filters.day) && (
            <Button
              variant="outline"
              size="sm"
              className="bg-inner border border-border-default text-xs rounded-lg w-fit sm:px-3 px-2 cursor-pointer hover:bg-memo active:scale-95 transition-all"
              onClick={() => updateFilters({ year: undefined, month: undefined, day: undefined })}
            >
              <span className="sm:inline hidden">{t("clear")}</span>
              <RotateCcw className="size-3 sm:hidden text-muted-foreground" />
            </Button>
          )}
        </div>
        <LocationSearch />
        <MemoSearch />
        <SortGroup />
      </div>
    </div>
  )
}
