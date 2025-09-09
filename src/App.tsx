import "./App.css"
import { Routes, Route } from "react-router"
import { useEffect } from "react"
import { useAuthStore } from "./stores/useAuthStore"
import Login from "./routes/Login"
import Signup from "./routes/Signup"
import AppRoutes from "./router"

function App() {
  const { user, loading, initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="text-foreground">Loading...</div>
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
