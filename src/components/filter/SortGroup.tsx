import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useFilterStore } from "@/stores/useFilterStore"
import { usePageType } from "@/hooks/usePageType"
import type { SortOption } from "@/types"
import { SORT_OPTIONS, SORT_LABELS } from "@/constants/filters"

export default function SortGroup() {
  const filterType = usePageType()
  const { getSortFilter, setSortBy } = useFilterStore()
  const sortFilter = getSortFilter(filterType)

  const handleSortChange = (value: SortOption) => {
    setSortBy(value, filterType)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Sort:</span>
      <Select value={sortFilter.sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[11.25rem] border-border-default text-muted-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-border-default bg-inner text-muted-foreground">
          <SelectItem value={SORT_OPTIONS.DATE_DESC}>
            {SORT_LABELS[SORT_OPTIONS.DATE_DESC]}
          </SelectItem>
          <SelectItem value={SORT_OPTIONS.DATE_ASC}>
            {SORT_LABELS[SORT_OPTIONS.DATE_ASC]}
          </SelectItem>
          <SelectItem value={SORT_OPTIONS.MAX_TEMP_DESC}>
            <div className="flex items-center">{SORT_LABELS[SORT_OPTIONS.MAX_TEMP_DESC]}</div>
          </SelectItem>
          <SelectItem value={SORT_OPTIONS.MAX_TEMP_ASC}>
            <div className="flex items-center">{SORT_LABELS[SORT_OPTIONS.MAX_TEMP_ASC]}</div>
          </SelectItem>
          <SelectItem value={SORT_OPTIONS.MIN_TEMP_DESC}>
            <div className="flex items-center">{SORT_LABELS[SORT_OPTIONS.MIN_TEMP_DESC]}</div>
          </SelectItem>
          <SelectItem value={SORT_OPTIONS.MIN_TEMP_ASC}>
            <div className="flex items-center">{SORT_LABELS[SORT_OPTIONS.MIN_TEMP_ASC]}</div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
