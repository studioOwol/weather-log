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
  const deleteCardMutation = useDeleteCard()

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
      <AlertDialogContent className="border-none text-muted-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Record</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the record for {cardDate}? <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-inner border-border-default">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90"
            disabled={deleteCardMutation.isPending}
          >
            <span className="text-white">
              {deleteCardMutation.isPending ? "Deleting..." : "Delete"}
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
