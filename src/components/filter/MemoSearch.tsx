import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { useUrlFilters } from "@/hooks/useUrlFilters"
import { DEBOUNCE_DELAY } from "@/constants/filters"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"

export default function MemoSearch() {
  const { t } = useTranslation(I18N_NAMESPACES.FILTER)
  const { filters, setMemoSearch } = useUrlFilters()
  const { memoSearch } = filters

  const [inputValue, setInputValue] = useState(memoSearch || "")
  const debouncedSearchTerm = useDebounce(inputValue, DEBOUNCE_DELAY)

  useEffect(() => {
    setMemoSearch(debouncedSearchTerm || undefined)
  }, [debouncedSearchTerm, setMemoSearch])

  useEffect(() => {
    setInputValue(memoSearch || "")
  }, [memoSearch])

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground " />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={t("placeholder.memo")}
        className="border-border-default text-sm pl-10 text-muted-foreground focus:placeholder-transparent"
      />
    </div>
  )
}
