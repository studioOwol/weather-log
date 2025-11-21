import "./App.css"
import { Routes, Route } from "react-router"
import { useEffect } from "react"
import { useAuthStore } from "./stores/useAuthStore"
import { useLanguageStore } from "./stores/useLanguageStore"
import { useQueryClient } from "@tanstack/react-query"
import Login from "./routes/Login"
import Signup from "./routes/Signup"
import AppRoutes from "./router"
import { LoadingOverlay } from "./components/ui/spinner"

function App() {
  const { user, loading, initialize } = useAuthStore()
  const { language } = useLanguageStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    // Invalidate geocode queries when language changes
    queryClient.invalidateQueries({ queryKey: ["geocode"] })
  }, [language, queryClient])


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <LoadingOverlay />
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  return <AppRoutes />
}

export default App
