import { useUrlFilters } from "@/hooks/useUrlFilters"
import type { SortOption } from "@/types"
import { SORT_OPTIONS, SORT_LABELS } from "@/constants/filters"
import CustomSelect from "../common/CustomSelect"
import { useMemo } from "react"

export default function SortGroup() {
  const { filters, setSortBy } = useUrlFilters()
  const { sortBy } = filters

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption)
  }

  const sortOptions = useMemo(
    () => [
      { value: SORT_OPTIONS.DATE_DESC, label: SORT_LABELS[SORT_OPTIONS.DATE_DESC] },
      { value: SORT_OPTIONS.DATE_ASC, label: SORT_LABELS[SORT_OPTIONS.DATE_ASC] },
      { value: SORT_OPTIONS.MAX_TEMP_DESC, label: SORT_LABELS[SORT_OPTIONS.MAX_TEMP_DESC] },
      { value: SORT_OPTIONS.MAX_TEMP_ASC, label: SORT_LABELS[SORT_OPTIONS.MAX_TEMP_ASC] },
      { value: SORT_OPTIONS.MIN_TEMP_DESC, label: SORT_LABELS[SORT_OPTIONS.MIN_TEMP_DESC] },
      { value: SORT_OPTIONS.MIN_TEMP_ASC, label: SORT_LABELS[SORT_OPTIONS.MIN_TEMP_ASC] },
    ],
    []
  )

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Sort:</span>
      <CustomSelect
        value={sortBy || "date-desc"}
        placeholder="Select sort option"
        options={sortOptions}
        onSelect={handleSortChange}
        className="w-[11.25rem]"
      />
    </div>
  )
}
