import { FilterIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

export default function FilterBar() {
  return (
    <div className="space-y-4 mb-6 p-4 rounded-xl bg-inner border border-border-default">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FilterIcon className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter & Search</span>
          <Badge className="bg-foreground rounded-xl text-sm text-inner">0 / 0</Badge>
        </div>

        <Button
          variant="outline"
          className="bg-inner border border-border-default text-sm text-muted-foreground rounded-2xl cursor-pointer"
        >
          Clear All
        </Button>
      </div>
    </div>
  )
}
