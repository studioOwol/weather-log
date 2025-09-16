import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useUpdateCard } from "@/hooks/queries/useWeatherMutations"
import type { WeatherCardType } from "@/types"
import { formatDate } from "@/lib/dateUtils"
import { RULES } from "@/constants/rules"
import { cn } from "@/lib/utils"

interface EditCardModalProps {
  card: WeatherCardType
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditCardModal({ card, isOpen, onOpenChange }: EditCardModalProps) {
  const [memo, setMemo] = useState(card.memo || "")
  const updateCardMutation = useUpdateCard()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const isClosingRef = useRef(false)

  useEffect(() => {
    setMemo(card.memo || "")
  }, [card.memo])

  useEffect(() => {
    if (isOpen) {
      isClosingRef.current = false
      setIsKeyboardVisible(false)
    }
  }, [isOpen])

  // Cursor moves to the end on textarea focus.
  const handleTextareaFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    textarea.setSelectionRange(textarea.value.length, textarea.value.length)
    setIsKeyboardVisible(true)
  }

  const handleTextareaBlur = () => {
    if (!isClosingRef.current) {
      setIsKeyboardVisible(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updatedCard = {
      ...card,
      memo: memo,
    }

    try {
      await updateCardMutation.mutateAsync({ id: card.id, updatedCard })
      handleClose()
    } catch (error) {
      console.error("Failed to update card:", error)
    }
  }

  const handleClose = () => {
    isClosingRef.current = true
    onOpenChange(false)
    setMemo(card.memo || "")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        ref={dialogRef}
        className="border-none sm:max-w-md text-muted-foreground transition-all duration-300"
      >
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogDescription>Update the note for this weather record.</DialogDescription>
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
              <div className="text-sm">
                {card.minTemp}
                {RULES.TEMP_UNIT}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Max Temp</Label>
              <div className="text-sm">
                {card.maxTemp}
                {RULES.TEMP_UNIT}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">Note</Label>
            <Textarea
              ref={textareaRef}
              id="memo"
              className="resize-none bg-inner border-border-default w-full break-all h-28 overflow-y-auto"
              rows={3}
              value={memo}
              maxLength={300}
              onChange={(e) => setMemo(e.target.value)}
              onFocus={handleTextareaFocus}
              onBlur={handleTextareaBlur}
              tabIndex={-1}
            />
            <div className="flex justify-end">
              <span className="text-xs text-muted-foreground/70">
                {memo.length}/{RULES.NOTE_LENGTH}
              </span>
            </div>
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
            <Button
              type="submit"
              className="flex-1 text-inner"
              disabled={updateCardMutation.isPending}
            >
              {updateCardMutation.isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
