import { useUrlFilters } from "@/hooks/useUrlFilters"
import type { SortOption } from "@/types"
import { SORT_OPTIONS } from "@/constants/filters"
import CustomSelect from "../common/CustomSelect"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"

export default function SortGroup() {
  const { t } = useTranslation(I18N_NAMESPACES.FILTER)
  const { filters, setSortBy } = useUrlFilters()
  const { sortBy } = filters

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption)
  }

  const sortOptions = useMemo(
    () => [
      { value: SORT_OPTIONS.DATE_DESC, label: t("sort.latest") },
      { value: SORT_OPTIONS.DATE_ASC, label: t("sort.oldest") },
      { value: SORT_OPTIONS.MAX_TEMP_DESC, label: t("sort.maxTempHigh") },
      { value: SORT_OPTIONS.MAX_TEMP_ASC, label: t("sort.maxTempLow") },
      { value: SORT_OPTIONS.MIN_TEMP_DESC, label: t("sort.minTempHigh") },
      { value: SORT_OPTIONS.MIN_TEMP_ASC, label: t("sort.minTempLow") },
    ],
    [t]
  )

  return (
    <div className="flex items-center gap-2">
      <CustomSelect
        value={sortBy || "date-desc"}
        placeholder={t("placeholder.sort")}
        options={sortOptions}
        onSelect={handleSortChange}
        className="w-[11.25rem]"
      />
    </div>
  )
}
