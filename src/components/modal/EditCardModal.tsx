import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useWeatherStore } from "@/store/useWeatherStore"
import type { WeatherCardType } from "@/types"
import { formatDate } from "@/lib/dateUtils"

interface EditCardModalProps {
  card: WeatherCardType
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditCardModal({ card, isOpen, onOpenChange }: EditCardModalProps) {
  const [memo, setMemo] = useState(card.memo || "")
  const { updateCard } = useWeatherStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setMemo(card.memo || "")
  }, [card.memo])

  // Cursor moves to the end on textarea focus.
  const handleTextareaFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    textarea.setSelectionRange(textarea.value.length, textarea.value.length)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedCard = {
      ...card,
      memo: memo,
    }

    updateCard(card.id, updatedCard)
    handleClose()
  }

  const handleClose = () => {
    onOpenChange(false)
    setMemo(card.memo || "")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-none sm:max-w-md text-muted-foreground">
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogDescription>
            Update the note for this weather record.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>
              Date: <div className="text-sm">{formatDate(card.date)}</div>
            </Label>
          </div>

          <div className="space-y-2">
            <Label>
              Location:{" "}
              <div className="text-sm">
                {card.country} {card.state} {card.city}
              </div>
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Temp</Label>
              <div className="text-sm">{card.minTemp}°C</div>
            </div>

            <div className="space-y-2">
              <Label>Max Temp</Label>
              <div className="text-sm">{card.maxTemp}°C</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">Note</Label>
            <Textarea
              ref={textareaRef}
              id="memo"
              className="resize-none bg-inner border-border-default w-full break-all"
              rows={3}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              onFocus={handleTextareaFocus}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-inner border-border-default"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 text-inner">
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
