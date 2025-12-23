import { useState } from "react"
import { useThemeStore } from "@/stores/useThemeStore"
import { useLanguageStore } from "@/stores/useLanguageStore"
import { Switch } from "@/components/ui/switch"
import { signOut } from "@/api/supabase"
import { useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router"
import SignOutModal from "@/components/modal/SignOutModal"
import CustomSelect from "@/components/common/CustomSelect"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"
import { ROUTES } from "@/lib/routes"
import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
import BottomNav from "@/components/shared/BottomNav"

export default function Settings() {
  const { t } = useTranslation(I18N_NAMESPACES.SETTINGS)
  const { t: tCommon } = useTranslation(I18N_NAMESPACES.COMMON)
  const { resolvedTheme, setTheme } = useThemeStore()
  const { language, setLanguage } = useLanguageStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false)

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) {
      queryClient.clear()
      navigate(ROUTES.HOME)
    }
  }

  const languageOptions = [
    { value: "en", label: t("language.english") },
    { value: "ko", label: t("language.korean") },
  ]

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto px-5 sm:px-6 md:px-8">
        <div className="flex flex-col max-w-sm mx-auto min-h-full">
      {/* Header */}
      <div className="mt-6 mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl sm:-ml-1 font-bold text-primary">{t("title")}</h1>
        </div>
      </div>

      <div className="space-y-7">
        {/* Theme */}
        <div className="text-muted-foreground">
          <h3 className="font-medium mb-3">{t("appearance.title")}</h3>
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
          <h3 className="font-medium mb-3">{t("language.title")}</h3>
          <CustomSelect
            value={language}
            placeholder={t("language.select")}
            options={languageOptions}
            onSelect={(value) => setLanguage(value as "en" | "ko")}
          />
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-auto w-full pb-[calc(4rem+18px)] sm:pb-6">
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => setIsSignOutModalOpen(true)}
            className="text-sm font-medium text-destructive hover:text-destructive/80 underline underline-offset-2 transition-colors cursor-pointer focus:outline-none"
          >
            {t("logout")}
          </button>
          <Link
            to={ROUTES.PRIVACY}
            className="text-sm sm:hidden font-medium text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors cursor-pointer focus:outline-none"
          >
            {tCommon("footer.privacyPolicy")}
          </Link>
        </div>
      </div>

        <SignOutModal
          isOpen={isSignOutModalOpen}
          onOpenChange={setIsSignOutModalOpen}
          onConfirm={handleSignOut}
        />
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
