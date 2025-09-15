import { Route, Routes, Navigate } from "react-router"
import RootLayout from "./layouts/RootLayout"
import Home from "./routes/Home"
import { ROUTES } from "./lib/routes"
import Bookmarks from "./routes/Bookmarks"

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.BOOKMARKS} element={<Bookmarks />} />
        {/* 인증된 사용자가 잘못된 경로에 접근하면 홈으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
