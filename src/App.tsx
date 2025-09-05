import "./App.css"
import AuthWrapper from "./components/auth/AuthWrapper"
import AppRoutes from "./router"

function App() {
  return (
    <AuthWrapper>
      <AppRoutes />
    </AuthWrapper>
  )
}

export default App
