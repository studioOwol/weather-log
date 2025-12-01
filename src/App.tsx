import "./App.css"
import { Routes, Route } from "react-router"
import { useEffect } from "react"
import { useAuthStore } from "./stores/useAuthStore"
import { supabase } from "./api/supabase"
import Login from "./routes/Login"
import Signup from "./routes/Signup"
import AppRoutes from "./router"
import { LoadingOverlay } from "./components/ui/spinner"

function App() {
  const { user, loading, setAuth } = useAuthStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth(session?.user ?? null, false)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session?.user ?? null, false)
    })

    return () => data.subscription.unsubscribe()
  }, [setAuth])

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
