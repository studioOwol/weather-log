import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { signUp } from "../api/supabase"
import { supabase } from "../api/supabase"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Cloud } from "lucide-react"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password)

    if (error) {
      setError(error.message)
    } else {
      // 회원가입 성공 후 로그아웃하여 로그인 페이지로
      await supabase.auth.signOut()
      navigate("/", { replace: true })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-7">
        <div className="text-center">
          <div className="flex justify-center">
            <Cloud className="size-12 text-primary" />
          </div>
          <h1 className="mt-2 text-3xl font-bold text-foreground">Weather Log</h1>
          <p className="mt-3 text-muted-foreground">Create an account to start tracking weather</p>
        </div>

        <div className="bg-inner rounded-lg border border-border-default p-6">
          <form onSubmit={handleSignup} className="space-y-4">
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
                placeholder="Password (6+ characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="h-12 px-3 border-border-default bg-background text-foreground"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="h-12 px-3 border-border-default bg-background text-foreground"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white hover:opacity-90"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
