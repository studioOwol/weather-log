import { useState } from "react"
import { MdOutlineHome, MdBookmarkBorder } from "react-icons/md"
import { TbSettings } from "react-icons/tb"
import { NavLink, Link } from "react-router"
import { Button } from "../ui/button"
import SettingsSheet from "../SettingsSheet"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"

export default function Header() {
  const { t } = useTranslation(I18N_NAMESPACES.COMMON)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <header className="sticky bg-background top-0 z-50 w-full border-b border-border-default">
      <div className="h-16 px-4 py-2 flex items-center justify-between text-primary">
        <Link to="/" className="flex items-center gap-1">
          <img src="/logo-96.webp" alt="Weather Log Logo" className="size-9 sm:size-10" />
          <h1 className="text-lg sm:text-2xl font-bold">Weather Log</h1>
        </Link>

        <nav className="hidden sm:flex items-center gap-2 sm:gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-sm sm:text-lg rounded-lg font-bold transition-colors ${
                isActive ? "text-inner bg-primary" : "text-primary hover:bg-muted"
              }`
            }
          >
            <MdOutlineHome className="size-4 sm:size-5" />
            <span className="hidden sm:inline">{t("navigation.home")}</span>
          </NavLink>

          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              `flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-sm sm:text-lg rounded-lg font-bold transition-colors ${
                isActive ? "text-inner bg-primary" : "text-primary hover:bg-muted"
              }`
            }
          >
            <MdBookmarkBorder className="size-4 sm:size-5" />
            <span className="hidden sm:inline">{t("navigation.bookmarks")}</span>
          </NavLink>

          <Button
            onClick={() => setIsSettingsOpen(true)}
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-muted cursor-pointer"
            aria-label="Settings"
          >
            <TbSettings className="size-4 sm:size-5" />
          </Button>
        </nav>
      </div>

      <SettingsSheet isOpen={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </header>
  )
}
