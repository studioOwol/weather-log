import { Plus } from "lucide-react"
import { Button } from "./ui/button"

export default function AddButton() {
  return (
    <Button className="fixed bottom-22 right-4 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full transition-all duration-200 z-50 bg-primary shadow-lg hover:shadow-xl">
      <Plus className="size-5 sm:size-6 text-background" />
    </Button>
  )
}
