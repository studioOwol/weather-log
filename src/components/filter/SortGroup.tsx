import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export default function SortGroup() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Sort:</span>
      <Select defaultValue="date-desc">
        <SelectTrigger className="w-[11.25rem] border-border-default text-muted-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-border-default bg-inner text-muted-foreground">
          <SelectItem value="date-desc">Latest</SelectItem>
          <SelectItem value="date-asc">Oldest</SelectItem>
          <SelectItem value="maxTemp-desc">
            <div className="flex items-center">Max Temp (High)</div>
          </SelectItem>
          <SelectItem value="maxTemp-asc">
            <div className="flex items-center">Max Temp (Low)</div>
          </SelectItem>
          <SelectItem value="minTemp-desc">
            <div className="flex items-center">Min Temp (High)</div>
          </SelectItem>
          <SelectItem value="minTemp-asc">
            <div className="flex items-center">Min Temp (Low)</div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
