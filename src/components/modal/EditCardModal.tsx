import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useUpdateCard } from "@/hooks/queries/useWeatherMutations"
import { useGeocode } from "@/hooks/queries/useGeocode"
import type { WeatherCardType } from "@/types"
import { RULES } from "@/constants/rules"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"
import { formatLocalizedDate } from "@/lib/dateUtils"
import { RefreshCw, Loader2 } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

interface EditCardModalProps {
  card: WeatherCardType
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditCardModal({ card, isOpen, onOpenChange }: EditCardModalProps) {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.CARD)
  const queryClient = useQueryClient()
  const [memo, setMemo] = useState(card.memo || "")
  const [address, setAddress] = useState({
    country: card.country,
    state: card.state,
    city: card.city,
  })
  const [lastFetchedLanguage, setLastFetchedLanguage] = useState<string | null>(card.language)
  const updateCardMutation = useUpdateCard()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const {
    data: locationInfo,
    isLoading: isRefreshing,
    isError: isRefreshError,
    refetch,
  } = useGeocode(card.location.lat, card.location.lon, false)

  // Check if refresh is needed (last fetched language is null or different from current)
  const needsRefresh = !lastFetchedLanguage || lastFetchedLanguage !== i18n.language

  const hasChanges =
    memo !== (card.memo || "") ||
    address.country !== card.country ||
    address.state !== card.state ||
    address.city !== card.city

  const formattedDate = formatLocalizedDate(card.date, i18n.language)

  useEffect(() => {
    setMemo(card.memo || "")
    setAddress({
      country: card.country,
      state: card.state,
      city: card.city,
    })
    setLastFetchedLanguage(card.language)
  }, [card.memo, card.country, card.state, card.city, card.language, isOpen])

  useEffect(() => {
    if (locationInfo) {
      setAddress({
        country: locationInfo.country,
        state: locationInfo.state,
        city: locationInfo.city,
      })
      // Mark current language as fetched to prevent duplicate requests
      setLastFetchedLanguage(i18n.language)
    }
  }, [locationInfo, i18n.language])

  // Cursor moves to the end on textarea focus.
  const handleTextareaFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    textarea.setSelectionRange(textarea.value.length, textarea.value.length)
  }

  const handleRefreshAddress = () => {
    // Remove cached query to force fresh data
    queryClient.removeQueries({
      queryKey: ["geocode", card.location.lat, card.location.lon, i18n.language],
    })
    refetch()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updatedCard = {
      ...card,
      memo: memo,
      country: address.country,
      state: address.state,
      city: address.city,
      language: i18n.language,
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
        <DialogHeader className="mb-1">
          <DialogTitle>{t("edit.title")}</DialogTitle>
          <DialogDescription className="sr-only">{t("edit.description")}</DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label>
              {t("field.date")}: <div className="text-sm">{formattedDate}</div>
            </Label>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Label>{t("field.location")}:</Label>
                  <span className="text-sm">
                    {address.country} {address.state} {address.city}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRefreshAddress}
                  disabled={isRefreshing || !needsRefresh}
                  className="h-6 px-2 text-xs cursor-pointer"
                >
                  {isRefreshing ? (
                    <>
                      <Loader2 className="size-3 mr-1 animate-spin" />
                      {t("button.refreshing")}
                    </>
                  ) : (
                    <>
                      <RefreshCw className="size-3 mr-1" />
                      {t("button.refresh")}
                    </>
                  )}
                </Button>
              </div>
              {isRefreshError && (
                <p className="text-xs text-destructive">{t("error.addressRefreshFailed")}</p>
              )}
            </div>
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
              className="flex-1 bg-inner border-border-default cursor-pointer"
              onClick={handleClose}
            >
              {t("button.cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1 text-inner cursor-pointer"
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
