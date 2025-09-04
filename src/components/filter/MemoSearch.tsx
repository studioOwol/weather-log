import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { useWeatherStore } from "@/stores/useWeatherStore"
import { usePageType } from "@/hooks/usePageType"
import { DEBOUNCE_DELAY } from "@/constants/filters"
import { PLACEHOLDERS } from "@/constants/messages"

export default function MemoSearch() {
  const filterType = usePageType()

  const { getSearchFilter, setMemoSearch } = useWeatherStore()
  const searchFilter = getSearchFilter(filterType)

  const [inputValue, setInputValue] = useState(searchFilter.memoSearch)
  const debouncedSearchTerm = useDebounce(inputValue, DEBOUNCE_DELAY)

  useEffect(() => {
    setMemoSearch(debouncedSearchTerm, filterType)
  }, [debouncedSearchTerm, filterType, setMemoSearch])

  useEffect(() => {
    setInputValue(searchFilter.memoSearch)
  }, [searchFilter.memoSearch])

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground " />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={PLACEHOLDERS.SEARCH_NOTES}
        className="border-border-default pl-10 text-muted-foreground focus:placeholder-transparent"
      />
    </div>
  )
}
