import { Route, Routes } from "react-router"
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
      </Route>
    </Routes>
  )
}
