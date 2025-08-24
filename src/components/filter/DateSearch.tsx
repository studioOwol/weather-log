import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Popover } from "../ui/popover"
import { Button } from "../ui/button"
import { Calendar as CalendarPicker } from "../ui/calendar"
import { Calendar } from "lucide-react"

export default function DateSearch() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-start text-left bg-inner border-border-default text-muted-foreground"
        >
          <Calendar className="mr-2 size-4" />
          <span>Search by date</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarPicker
          mode="single"
          className="p-3 pointer-events-auto bg-inner border rounded-lg mt-1 border-border-default"
        />
      </PopoverContent>
    </Popover>
  )
}
