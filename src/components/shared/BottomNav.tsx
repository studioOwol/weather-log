import { useState } from "react"
import { Bookmark, Home, Settings } from "lucide-react"
import { NavLink } from "react-router"
import SettingsSheet from "../SettingsSheet"

export default function BottomNav() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <>
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border-default pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-16 px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors flex-1 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            <Home className="size-6" />
          </NavLink>

          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors flex-1 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            <Bookmark className="size-6" />
          </NavLink>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors flex-1 text-muted-foreground hover:text-primary"
          >
            <Settings className="size-6" />
          </button>
        </div>
      </nav>

      <SettingsSheet isOpen={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  )
}
