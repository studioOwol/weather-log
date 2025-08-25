import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { Textarea } from "../ui/textarea"

export default function AddCardModal() {
  const [isOpen, setIsOpen] = useState(false)
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        console.log("Dialog state changing:", open)
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button className="fixed bottom-22 right-4 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full transition-all duration-200 z-50 bg-primary shadow-lg hover:shadow-xl">
          <Plus className="size-5 sm:size-6 text-background" />
        </Button>
      </DialogTrigger>

      <DialogContent className="border-none sm:max-w-md text-muted-foreground">
        <DialogHeader>
          <DialogTitle>Add New Record</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label>
              Date: <div className="text-sm">{today}</div>
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Temp</Label>
              <div className="text-sm">0°C</div>
            </div>

            <div className="space-y-2">
              <Label>Max Temp</Label>
              <div className="text-sm">10°C</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">Notes</Label>
            <Textarea id="memo" className="resize-none bg-inner border-border-default" rows={3} />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-inner border-border-default"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 text-inner">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
