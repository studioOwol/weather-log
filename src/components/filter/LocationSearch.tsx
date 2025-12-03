import { MapPin } from "lucide-react"
import { Input } from "../ui/input"
import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { useUrlFilters } from "@/hooks/useUrlFilters"
import { DEBOUNCE_DELAY } from "@/constants/filters"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"

export default function LocationSearch() {
  const { t } = useTranslation(I18N_NAMESPACES.FILTER)
  const { filters, setLocationSearch } = useUrlFilters()
  const { locationSearch } = filters

  const [inputValue, setInputValue] = useState(locationSearch || "")
  const debouncedSearchTerm = useDebounce(inputValue, DEBOUNCE_DELAY)

  useEffect(() => {
    setLocationSearch(debouncedSearchTerm || undefined)
  }, [debouncedSearchTerm, setLocationSearch])

  useEffect(() => {
    setInputValue(locationSearch || "")
  }, [locationSearch])

  return (
    <div className="relative w-full sm:w-44 md:w-48 lg:w-50">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground " />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={t("placeholder.location")}
        className="border-border-default pl-10 text-sm text-muted-foreground focus:placeholder-transparent"
      />
    </div>
  )
}
