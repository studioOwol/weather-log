import { TrendingDown, TrendingUp } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

export default function SortGroup() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <span className="text-sm font-medium text-muted-foreground">Sort by:</span>

      <ToggleGroup type="single" className="justify-start text-muted-foreground flex-wrap gap-1">
        <ToggleGroupItem value="date-desc" className="text-xs hover:rounded-md px-3 py-2 min-w-fit">
          Date (Latest)
        </ToggleGroupItem>
        <ToggleGroupItem value="date-asc" className="text-xs hover:rounded-md px-3 py-2 min-w-fit">
          Date (Oldest)
        </ToggleGroupItem>
        <ToggleGroupItem
          value="maxTemp-desc"
          className="text-xs hover:rounded-md px-3 py-2 min-w-fit"
        >
          <TrendingUp className="size-3 mr-1" />
          Max Temp
        </ToggleGroupItem>
        <ToggleGroupItem
          value="maxTemp-asc"
          className="text-xs hover:rounded-md px-3 py-2 min-w-fit"
        >
          <TrendingDown className="size-3 mr-1" />
          Max Temp
        </ToggleGroupItem>
        <ToggleGroupItem
          value="minTemp-desc"
          className="text-xs hover:rounded-md px-3 py-2 min-w-fit"
        >
          <TrendingUp className="size-3 mr-1" />
          Min Temp
        </ToggleGroupItem>
        <ToggleGroupItem
          value="minTemp-asc"
          className="text-xs hover:rounded-md px-3 py-2 min-w-fit"
        >
          <TrendingDown className="size-3 mr-1" />
          Min Temp
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
