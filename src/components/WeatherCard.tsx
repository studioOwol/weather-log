import { useState } from "react"
import type { WeatherCardType } from "@/types"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Bookmark, BookmarkCheck, Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import EditCardModal from "./modal/EditCardModal"
import DeleteCardModal from "./modal/DeleteCardModal"
import { useToggleBookmark } from "@/hooks/queries/useWeatherMutations"
import { useMemoToggle } from "@/hooks/useMemoToggle"
import { RULES } from "@/constants/rules"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"

interface WeatherProps {
  card: WeatherCardType
}

export default function WeatherCard({ card }: WeatherProps) {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.CARD)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const toggleBookmarkMutation = useToggleBookmark()
  const { memoRef, isMemoExpanded, setIsMemoExpanded, shouldToggleMemo } = useMemoToggle(card.memo)

  const formattedDate = new Date(card.date).toLocaleDateString(i18n.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleToggleBookmark = async () => {
    try {
      await toggleBookmarkMutation.mutateAsync({
        cardId: card.id,
        newBookmarkStatus: !card.isBookmarked,
      })
    } catch (error) {
      console.error("Failed to toggle bookmark:", error)
    }
  }

  return (
    <>
      <Card className="bg-inner border-border-default relative">
        <CardHeader className="pb-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-muted-foreground">{formattedDate}</h3>

            <div className="">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleBookmark}
                disabled={toggleBookmarkMutation.isPending}
                className="size-8 p-0 text-muted-foreground hover:bg-secondary/10 cursor-pointer disabled:opacity-50"
              >
                {card.isBookmarked ? <BookmarkCheck /> : <Bookmark />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0 text-muted-foreground hover:bg-secondary/10 cursor-pointer"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit2 />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground/70">
            {card.country} {card.state} {card.city}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-md font-semibold text-muted-foreground">{t("field.minTemp")}</p>
              <p className="text-lg font-semibold text-[#5b9bd5]/90">
                {card.minTemp}
                {RULES.TEMP_UNIT}
              </p>
            </div>
            <div className="text-3xl text-muted-foreground/30">/</div>
            <div className="text-center">
              <p className="text-md font-semibold text-muted-foreground">{t("field.maxTemp")}</p>
              <p className="text-lg font-semibold text-destructive/70">
                {card.maxTemp}
                {RULES.TEMP_UNIT}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-md font-semibold text-muted-foreground">{t("field.note")}</p>
              {shouldToggleMemo && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 text-muted-foreground/50 hover:text-muted-foreground"
                  onClick={() => setIsMemoExpanded(!isMemoExpanded)}
                >
                  {isMemoExpanded ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </Button>
              )}
            </div>
            <div
              className={cn(
                "text-sm p-2 bg-memo transition-all duration-200 rounded-lg border border-border-default/50",
                card.memo ? "text-muted-foreground" : "text-muted-foreground/50 italic"
              )}
            >
              <p
                ref={memoRef}
                className={cn("whitespace-pre-wrap break-words", !isMemoExpanded && "line-clamp-1")}
              >
                {card.memo || t("field.notePlaceholder")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditCardModal card={card} isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} />

      <DeleteCardModal
        cardId={card.id}
        cardDate={card.date}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  )
}
