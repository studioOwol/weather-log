import { useState } from "react"
import { Bookmark, Home, Settings } from "lucide-react"
import { NavLink, Link } from "react-router"
import { Button } from "../ui/button"
import SettingsSheet from "../SettingsSheet"

export default function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <header className="sticky bg-background top-0 z-50 w-full border-b border-border-default">
      <div className="h-16 px-4 py-2 flex items-center justify-between text-primary">
        <Link to="/" className="flex items-center gap-1">
          <img
            src="https://res.cloudinary.com/durvfabtg/image/upload/w_80,h_80,f_webp,q_90,c_fit/v1758015446/weather-log-logo_xvovfd.png"
            alt="Weather Log Logo"
            className="size-9 sm:size-10"
          />
          <h1 className="text-lg sm:text-2xl font-bold">Weather Log</h1>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-sm sm:text-lg rounded-lg font-bold transition-colors ${
                isActive ? "text-inner bg-primary" : "text-primary hover:bg-muted"
              }`
            }
          >
            <Home className="size-4 sm:size-5" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              `flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-sm sm:text-lg rounded-lg font-bold transition-colors ${
                isActive ? "text-inner bg-primary" : "text-primary hover:bg-muted"
              }`
            }
          >
            <Bookmark className="size-4 sm:size-5" />
            <span className="hidden sm:inline">Bookmarks</span>
          </NavLink>

          <Button
            onClick={() => setIsSettingsOpen(true)}
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-muted cursor-pointer"
            aria-label="Settings"
          >
            <Settings className="size-4 sm:size-5" />
          </Button>
        </nav>
      </div>

      <SettingsSheet isOpen={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </header>
  )
}
