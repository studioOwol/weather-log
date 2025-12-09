import { useState } from "react"
import { MdHome, MdOutlineHome, MdBookmark, MdBookmarkBorder } from "react-icons/md"
import { TbSettings, TbSettingsFilled } from "react-icons/tb"
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
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors flex-1 text-primary"
          >
            {({ isActive }) =>
              isActive ? <MdHome className="size-6" /> : <MdOutlineHome className="size-6" />
            }
          </NavLink>

          <NavLink
            to="/bookmarks"
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors flex-1 text-primary"
          >
            {({ isActive }) =>
              isActive ? (
                <MdBookmark className="size-6" />
              ) : (
                <MdBookmarkBorder className="size-6" />
              )
            }
          </NavLink>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors flex-1 text-primary"
          >
            {isSettingsOpen ? (
              <TbSettingsFilled className="size-6" />
            ) : (
              <TbSettings className="size-6" />
            )}
          </button>
        </div>
      </nav>

      <SettingsSheet isOpen={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  )
}
