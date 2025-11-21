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
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"

interface SignOutModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export default function SignOutModal({ isOpen, onOpenChange, onConfirm }: SignOutModalProps) {
  const { t } = useTranslation(I18N_NAMESPACES.AUTH)

  const handleLogout = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-none text-muted-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("signOut.title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("signOut.description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-inner border-border-default">
            {t("signOut.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-destructive hover:bg-destructive/90"
          >
            <span className="text-white">{t("signOut.confirm")}</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
