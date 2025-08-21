import { Route, Routes } from 'react-router'
import RootLayout from './layouts/RootLayout'
import Home from './routes/Home'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}
