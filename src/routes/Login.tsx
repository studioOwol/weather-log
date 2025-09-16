import { useState } from "react"
import { Link } from "react-router"
import { signInWithPassword } from "../api/supabase"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await signInWithPassword(email, password)
    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-7">
        <div className="text-center">
          <div className="flex justify-center">
            <img
              src="https://res.cloudinary.com/durvfabtg/image/upload/w_96,h_96,f_webp,q_90,c_fit/v1758015446/weather-log-logo_xvovfd.png"
              alt="Weather Log Logo"
              className="size-15"
            />
          </div>
          <h1 className="mt-2 text-3xl font-bold text-foreground">Weather Log</h1>
          <p className="mt-3 text-muted-foreground">Sign in to start tracking your weather</p>
        </div>

        <div className="bg-inner rounded-lg border border-border-default p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-12 px-3 border-border-default bg-background text-foreground"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="h-12 px-3 border-border-default bg-background text-foreground"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white hover:opacity-90"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
