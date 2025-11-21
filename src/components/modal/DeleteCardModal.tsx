import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { useDeleteCard } from "@/hooks/queries/useWeatherMutations"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"
import { formatLocalizedDate } from "@/lib/dateUtils"

interface DeleteCardModalProps {
  cardId: string
  cardDate: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function DeleteCardModal({
  cardId,
  cardDate,
  isOpen,
  onOpenChange,
}: DeleteCardModalProps) {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.CARD)
  const deleteCardMutation = useDeleteCard()

  const formattedDate = formatLocalizedDate(cardDate, i18n.language)

  const handleDelete = async () => {
    try {
      await deleteCardMutation.mutateAsync(cardId)
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to delete card:", error)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-none text-muted-foreground sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-3">{t("delete.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-2">
              <p>{t("delete.description", { date: formattedDate })}</p>
              <p>{t("delete.warning")}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel className="bg-inner border-border-default cursor-pointer">
            {t("button.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90 cursor-pointer"
            disabled={deleteCardMutation.isPending}
          >
            <span className="text-white">
              {deleteCardMutation.isPending ? t("button.deleting") : t("button.delete")}
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
