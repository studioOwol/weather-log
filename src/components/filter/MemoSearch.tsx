import { Search } from "lucide-react"
import { Input } from "../ui/input"

export default function MemoSearch() {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground " />
      <Input
        placeholder="Search notes..."
        className="border-border-default pl-10 text-muted-foreground focus:placeholder-transparent"
      />
    </div>
  )
}
