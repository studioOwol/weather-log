import { Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select"
import { SelectValue } from "@radix-ui/react-select"
import { useState, useMemo } from "react"
import { getDaysInMonth } from "../../lib/dateUtils"

export default function DateSearch() {
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const [selectedDay, setSelectedDay] = useState<string>("")

  const months = useMemo(
    () => [
      { value: "1", label: "Jan" },
      { value: "2", label: "Feb" },
      { value: "3", label: "Mar" },
      { value: "4", label: "Apr" },
      { value: "5", label: "May" },
      { value: "6", label: "Jun" },
      { value: "7", label: "Jul" },
      { value: "8", label: "Aug" },
      { value: "9", label: "Sep" },
      { value: "10", label: "Oct" },
      { value: "11", label: "Nov" },
      { value: "12", label: "Dec" },
    ],
    []
  )

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 6 }, (_, i) => currentYear - i)
  }, [])

  const days = useMemo(
    () => getDaysInMonth(selectedYear, selectedMonth),
    [selectedYear, selectedMonth]
  )

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2 flex-wrap">
        <Calendar className="size-4 text-muted-foreground" />

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-24 border border-border-default">
            <SelectValue placeholder="Year" />
          </SelectTrigger>

          <SelectContent className="bg-inner text-muted-foreground border-border-default">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()} className="focus:text-primary">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMonth} onValueChange={setSelectedMonth} disabled={!selectedYear}>
          <SelectTrigger className="w-24 border border-border-default">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent className="bg-inner text-muted-foreground border-border-default">
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value} className="focus:text-primary">
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDay} onValueChange={setSelectedDay} disabled={!selectedMonth}>
          <SelectTrigger className="w-20 border border-border-default">
            <SelectValue placeholder="Day" />
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
