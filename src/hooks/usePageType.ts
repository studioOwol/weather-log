import { useLocation } from "react-router"
import { ROUTES } from "@/lib/routes"
import type { FilterType } from "@/types"

export const usePageType = (): FilterType => {
  const location = useLocation()
  const isBookmarkPage = location.pathname === ROUTES.BOOKMARKS
  return isBookmarkPage ? 'bookmarks' : 'home'
}