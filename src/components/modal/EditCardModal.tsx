import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useUpdateCard } from "@/hooks/queries/useWeatherMutations"
import type { WeatherCardType } from "@/types"
import { RULES } from "@/constants/rules"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"

interface EditCardModalProps {
  card: WeatherCardType
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditCardModal({ card, isOpen, onOpenChange }: EditCardModalProps) {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.CARD)
  const [memo, setMemo] = useState(card.memo || "")
  const updateCardMutation = useUpdateCard()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const hasChanges = memo !== (card.memo || "")

  const formattedDate = new Date(card.date).toLocaleDateString(i18n.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  useEffect(() => {
    setMemo(card.memo || "")
  }, [card.memo, isOpen])

  // Cursor moves to the end on textarea focus.
  const handleTextareaFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    textarea.setSelectionRange(textarea.value.length, textarea.value.length)
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
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-none sm:max-w-md text-muted-foreground">
        <DialogHeader className="mb-3">
          <DialogTitle>{t("edit.title")}</DialogTitle>
          <DialogDescription className="sr-only">{t("edit.description")}</DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>
              {t("field.date")}: <div className="text-sm">{formattedDate}</div>
            </Label>
          </div>

          <div className="space-y-2">
            <Label>
              {t("field.location")}:{" "}
              <div className="text-sm">
                {card.country} {card.state} {card.city}
              </div>
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("field.minTemp")}</Label>
              <div className="text-sm">
                {card.minTemp}
                {RULES.TEMP_UNIT}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("field.maxTemp")}</Label>
              <div className="text-sm">
                {card.maxTemp}
                {RULES.TEMP_UNIT}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">{t("field.note")}</Label>
            <Textarea
              ref={textareaRef}
              id="memo"
              className="resize-none bg-inner border-border-default w-full break-all h-28 overflow-y-auto"
              rows={3}
              value={memo}
              maxLength={300}
              onChange={(e) => setMemo(e.target.value)}
              onFocus={handleTextareaFocus}
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
              {t("button.cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1 text-inner"
              disabled={updateCardMutation.isPending || !hasChanges}
            >
              {updateCardMutation.isPending ? t("button.updating") : t("button.update")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
