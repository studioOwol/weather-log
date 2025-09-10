import { Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select"
import { SelectValue } from "@radix-ui/react-select"
import { useMemo } from "react"
import { getDaysInMonth } from "../../lib/dateUtils"
import { useUrlFilters } from "@/hooks/useUrlFilters"
import { MONTHS, YEAR_RANGE } from "@/constants/filters"
import { PLACEHOLDERS } from "@/constants/messages"

export default function DateSearch() {
  const { filters, setYear, setMonth, setDay } = useUrlFilters()
  const { year: selectedYear, month: selectedMonth, day: selectedDay } = filters

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: YEAR_RANGE }, (_, i) => currentYear - i)
  }, [])

  const days = useMemo(() => {
    // 연도나 월이 선택되지 않은 경우 31일까지 모두 표시
    if (!selectedYear || !selectedMonth) {
      return Array.from({ length: 31 }, (_, i) => ({
        value: (i + 1).toString(),
        label: (i + 1).toString(),
      }))
    }
    return getDaysInMonth(selectedYear, selectedMonth)
  }, [selectedYear, selectedMonth])

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2 min-w-0">
        <Calendar className="size-4 text-muted-foreground" />
        <Select value={selectedYear || ''} onValueChange={(year) => setYear(year || undefined)}>
          <SelectTrigger className="min-w-20 w-20 border border-border-default">
            <SelectValue placeholder={PLACEHOLDERS.YEAR} />
          </SelectTrigger>

          <SelectContent className="bg-inner text-muted-foreground border-border-default">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()} className="focus:text-primary">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedMonth || ''}
          onValueChange={(month) => setMonth(month || undefined)}
        >
          <SelectTrigger className="min-w-20 w-20 border border-border-default">
            <SelectValue placeholder={PLACEHOLDERS.MONTH} />
          </SelectTrigger>
          <SelectContent className="bg-inner text-muted-foreground border-border-default">
            {MONTHS.map((month) => (
              <SelectItem key={month.value} value={month.value} className="focus:text-primary">
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedDay || ''} onValueChange={(day) => setDay(day || undefined)}>
          <SelectTrigger className="min-w-16 w-16 border border-border-default">
            <SelectValue placeholder={PLACEHOLDERS.DAY} />
          </SelectTrigger>
          <SelectContent className="bg-inner text-muted-foreground border-border-default">
            {days.map((day) => (
              <SelectItem key={day.value} value={day.value} className="focus:text-primary">
                {day.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
