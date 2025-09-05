import { useState } from "react"
import { signInWithMagicLink, signInWithPassword } from "../../api/supabase"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [usePassword, setUsePassword] = useState(true)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (usePassword) {
      const { error } = await signInWithPassword(email, password)
      if (error) {
        setError(error.message)
      }
    } else {
      const { error } = await signInWithMagicLink(email)
      if (error) {
        setError(error.message)
      } else {
        setSent(true)
      }
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-inner rounded-lg border border-border-default">
        <h2 className="text-xl font-bold mb-4 text-foreground">Check your email</h2>
        <p className="text-foreground mb-4">
          We've sent a login link to <strong>{email}</strong>
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Click the link in your email to sign in automatically.
        </p>
        <button onClick={() => setSent(false)} className="text-primary text-sm hover:underline">
          Try different email
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-inner rounded-lg border border-border-default">
      <h2 className="text-xl font-bold mb-4 text-foreground">Sign in</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="h-12 px-3 border-border-default bg-background text-foreground"
        />
        {usePassword && (
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="h-12 px-3 border-border-default bg-background text-foreground"
          />
        )}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-primary text-white hover:opacity-90"
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
        {error && <p className="text-destructive text-sm text-center">{error}</p>}
      </form>
      <Button
        variant="link"
        onClick={() => setUsePassword(!usePassword)}
        className="w-full mt-4 text-primary text-sm hover:underline h-auto p-0"
      >
        {usePassword ? "Use magic link instead" : "Use password instead"}
      </Button>
    </div>
  )
}
