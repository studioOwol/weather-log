import { MapPin } from "lucide-react"
import { Input } from "../ui/input"
import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { useWeatherStore } from "@/store/useWeatherStore"
import { usePageType } from "@/hooks/usePageType"
import { DEBOUNCE_DELAY } from "@/constants/filters"

export default function LocationSearch() {
  const filterType = usePageType()

  const { getSearchFilter, setLocationSearch } = useWeatherStore()
  const searchFilter = getSearchFilter(filterType)

  const [inputValue, setInputValue] = useState(searchFilter.locationSearch)
  const debouncedSearchTerm = useDebounce(inputValue, DEBOUNCE_DELAY)

  useEffect(() => {
    setLocationSearch(debouncedSearchTerm, filterType)
  }, [debouncedSearchTerm, filterType, setLocationSearch])

  useEffect(() => {
    setInputValue(searchFilter.locationSearch)
  }, [searchFilter.locationSearch])

  return (
    <div className="relative w-full sm:w-44 md:w-48 lg:w-50">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground " />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search locations..."
        className="border-border-default pl-10 text-muted-foreground focus:placeholder-transparent"
      />
    </div>
  )
}
