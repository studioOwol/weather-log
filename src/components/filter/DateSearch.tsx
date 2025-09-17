import { Calendar } from "lucide-react"
import { useMemo } from "react"
import { getDaysInMonth } from "../../lib/dateUtils"
import { useUrlFilters } from "@/hooks/useUrlFilters"
import { MONTHS, YEAR_RANGE } from "@/constants/filters"
import { PLACEHOLDERS } from "@/constants/messages"
import CustomSelect from "../common/CustomSelect"

export default function DateSearch() {
  const { filters, setYear, setMonth, setDay } = useUrlFilters()
  const { year: selectedYear, month: selectedMonth, day: selectedDay } = filters

  const handleYearChange = (year: string) => {
    if (year === selectedYear) {
      setYear(undefined)
    } else {
      setYear(year)
    }
  }

  const handleMonthChange = (month: string) => {
    if (month === selectedMonth) {
      setMonth(undefined)
    } else {
      setMonth(month)
    }
  }

  const handleDayChange = (day: string) => {
    if (day === selectedDay) {
      setDay(undefined)
    } else {
      setDay(day)
    }
  }

  // 옵션 데이터 생성
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: YEAR_RANGE }, (_, i) => {
      const year = currentYear - i
      return { value: year.toString(), label: year.toString() }
    })
  }, [])

  const monthOptions = [...MONTHS]

  const dayOptions = useMemo(() => {
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

        <CustomSelect
          value={selectedYear || ""}
          placeholder={PLACEHOLDERS.YEAR}
          options={yearOptions}
          onSelect={handleYearChange}
          className="min-w-20 w-20"
        />

        <CustomSelect
          value={selectedMonth || ""}
          placeholder={PLACEHOLDERS.MONTH}
          options={monthOptions}
          onSelect={handleMonthChange}
          className="min-w-22 w-22"
        />

        <CustomSelect
          value={selectedDay || ""}
          placeholder={PLACEHOLDERS.DAY}
          options={dayOptions}
          onSelect={handleDayChange}
          className="min-w-18 w-18"
        />
      </div>
    </div>
  )
}
