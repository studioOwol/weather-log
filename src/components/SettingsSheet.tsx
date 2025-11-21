import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./ui/sheet"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useThemeStore } from "@/stores/useThemeStore"
import { useLanguageStore } from "@/stores/useLanguageStore"
import { Switch } from "./ui/switch"
import { signOut } from "@/api/supabase"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import SignOutModal from "./modal/SignOutModal"
import CustomSelect from "./common/CustomSelect"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"

interface SettingsSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function SettingsSheet({ isOpen, onOpenChange }: SettingsSheetProps) {
  const { t } = useTranslation(I18N_NAMESPACES.SETTINGS)
  const { resolvedTheme, setTheme } = useThemeStore()
  const { language, setLanguage } = useLanguageStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false)

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  const handleSignOut = async () => {
    await signOut()
    queryClient.clear()
    navigate("/", { replace: true })
    onOpenChange(false)
  }

  const languageOptions = [
    { value: "en", label: t("language.english") },
    { value: "ko", label: t("language.korean") },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent showCloseButton={false}>
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <SheetClose className="sm:hidden p-1 -ml-3 text-primary hover:bg-muted rounded-sm transition-colors focus:outline-none">
                <ChevronLeft className="size-6" />
              </SheetClose>
              <SheetTitle className="text-2xl">{t("title")}</SheetTitle>
            </div>
            <SheetClose className="hidden -mr-3 sm:block p-1 cursor-pointer text-primary hover:bg-muted rounded-sm transition-colors focus:outline-none">
              <ChevronRight className="size-6" />
            </SheetClose>
          </div>
          <SheetDescription className="sr-only">{t("description")}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-5rem)]">
          <div className="flex-1 space-y-7">
            {/* Theme */}
            <div className="text-muted-foreground">
              <h3 className="text-md font-medium mb-3">{t("appearance.title")}</h3>
              <div className="flex items-center justify-between">
                <label htmlFor="dark-mode" className="text-sm cursor-pointer">
                  {resolvedTheme === "dark" ? t("appearance.darkMode") : t("appearance.lightMode")}
                </label>
                <Switch
                  id="dark-mode"
                  className="cursor-pointer"
                  checked={resolvedTheme === "dark"}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </div>

            {/* Language selection */}
            <div className="text-muted-foreground">
              <h3 className="text-md font-medium mb-3">{t("language.title")}</h3>
              <CustomSelect
                value={language}
                placeholder={t("language.select")}
                options={languageOptions}
                onSelect={(value) => setLanguage(value as "en" | "ko")}
              />
            </div>
          </div>

          {/* Sign Out - Bottom */}
          <div className="mt-auto ml-auto mb-3">
            <button
              onClick={() => setIsSignOutModalOpen(true)}
              className="text-sm font-medium text-destructive hover:text-destructive/80 underline underline-offset-2 transition-colors cursor-pointer focus:outline-none"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </SheetContent>

      <SignOutModal
        isOpen={isSignOutModalOpen}
        onOpenChange={setIsSignOutModalOpen}
        onConfirm={handleSignOut}
      />
    </Sheet>
  )
}
