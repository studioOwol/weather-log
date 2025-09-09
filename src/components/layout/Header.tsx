import { Bookmark, Cloud, Home, Moon, Sun, LogOut } from "lucide-react"
import { NavLink } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useThemeStore } from "../../stores/useThemeStore"
import { Button } from "../ui/button"
import { signOut } from "../../api/supabase"

export default function Header() {
  const { resolvedTheme, setTheme } = useThemeStore()
  const queryClient = useQueryClient()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const handleSignOut = async () => {
    await signOut()
    queryClient.clear()
  }

  return (
    <header className="sticky bg-background top-0 z-50 w-full border-b border-border-default">
      <div className="h-16 px-4 py-2 flex items-center justify-between text-primary">
        <div className="flex items-center gap-2">
          <Cloud className="size-6 sm:size-7" />
          <h1 className="text-lg sm:text-2xl font-bold">Weather Log</h1>
        </div>

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
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-muted"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <Moon className="size-4 sm:size-5" />
            ) : (
              <Sun className="size-4 sm:size-5" />
            )}
          </Button>

          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-muted"
            aria-label="Sign out"
          >
            <LogOut className="size-4 sm:size-5" />
          </Button>
        </nav>
      </div>
    </header>
  )
}
