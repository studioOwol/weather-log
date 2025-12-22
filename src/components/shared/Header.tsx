import { MdOutlineHome, MdBookmarkBorder } from "react-icons/md"
import { TbSettings } from "react-icons/tb"
import { NavLink, Link } from "react-router"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"
import { ROUTES } from "@/lib/routes"

export default function Header() {
  const { t } = useTranslation(I18N_NAMESPACES.COMMON)

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
            to={ROUTES.BOOKMARKS}
            className={({ isActive }) =>
              `flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-sm sm:text-lg rounded-lg font-bold transition-colors ${
                isActive ? "text-inner bg-primary" : "text-primary hover:bg-muted"
              }`
            }
          >
            <MdBookmarkBorder className="size-4 sm:size-5" />
            <span className="hidden sm:inline">{t("navigation.bookmarks")}</span>
          </NavLink>

          <NavLink
            to={ROUTES.SETTINGS}
            className={({ isActive }) =>
              `flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-sm sm:text-lg rounded-lg font-bold transition-colors ${
                isActive ? "text-inner bg-primary" : "text-primary hover:bg-muted"
              }`
            }
          >
            <TbSettings className="size-4 sm:size-5" />
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
