import { useState } from "react"
import type { WeatherCardType } from "@/types"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Bookmark, BookmarkCheck, Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import EditCardModal from "./modal/EditCardModal"
import DeleteCardModal from "./modal/DeleteCardModal"
import { useToggleBookmark } from "@/hooks/queries/useWeatherMutations"
import { useScreenSize } from "@/hooks/useScreenSize"
import { RULES } from "@/constants/rules"

interface WeatherProps {
  card: WeatherCardType
}

export default function WeatherCard({ card }: WeatherProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isMemoExpanded, setIsMemoExpanded] = useState(false)
  const toggleBookmarkMutation = useToggleBookmark()
  const charLimit = useScreenSize()

  const shouldToggleMemo = card.memo && card.memo.length >= charLimit

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
            <h3 className="text-xl font-semibold text-muted-foreground">{card.date}</h3>

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
              <p className="text-md font-semibold text-muted-foreground">Min Temp</p>
              <p className="text-lg font-semibold text-[#5b9bd5]/90">
                {card.minTemp}
                {RULES.TEMP_UNIT}
              </p>
            </div>
            <div className="text-3xl text-muted-foreground/30">/</div>
            <div className="text-center">
              <p className="text-md font-semibold text-muted-foreground">Max Temp</p>
              <p className="text-lg font-semibold text-destructive/70">
                {card.maxTemp}
                {RULES.TEMP_UNIT}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-md font-semibold text-muted-foreground">Note:</p>
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
            <div className="relative">
              <div
                className={cn(
                  "text-sm p-2 bg-memo transition-all duration-200 rounded-lg border border-border-default/50",
                  card.memo ? "text-muted-foreground" : "text-muted-foreground/50 italic",
                  "max-h-20 overflow-hidden"
                )}
              >
                <p className="line-clamp-1 whitespace-pre-wrap break-words">
                  {card.memo || "Add a note to remember this day..."}
                </p>
              </div>
              {isMemoExpanded && card.memo && (
                <div className="absolute top-0 left-0 right-0 z-10 text-sm p-2 bg-memo rounded-lg border border-border-default/50 text-muted-foreground">
                  <p className="whitespace-pre-wrap break-words">{card.memo}</p>
                </div>
              )}
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
