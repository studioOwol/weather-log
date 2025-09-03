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
import { useWeatherStore } from "@/store/useWeatherStore"

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
  const { deleteCard } = useWeatherStore()

  const handleDelete = () => {
    deleteCard(cardId)
    onOpenChange(false)
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
          >
            <span className="text-white">Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
