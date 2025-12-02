import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { signUp } from "../api/supabase"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Spinner } from "../components/ui/spinner"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "../constants/i18n"

export default function Signup() {
  const { t } = useTranslation(I18N_NAMESPACES.AUTH)
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
      setError(t("signUp.errors.passwordMismatch"))
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError(t("signUp.errors.passwordTooShort"))
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password)

    if (error) {
      setError(error.message)
    } else {
      navigate("/", { replace: true })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <img src="/logo-96.webp" alt="Weather Log Logo" className="size-15" />
          </div>
          <h1 className="mt-1 text-3xl font-bold text-primary">Weather Log</h1>
        </div>

        <div className="bg-inner rounded-lg border border-border-default p-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder={t("signUp.email")}
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
                placeholder={t("signUp.password")}
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
                placeholder={t("signUp.confirmPassword")}
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
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" variant="circle" className="text-white" />
                  {t("signUp.loading")}
                </span>
              ) : (
                t("signUp.submit")
              )}
            </Button>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {t("signUp.hasAccount")}{" "}
              <Link to="/" className="text-primary hover:underline">
                {t("signUp.signInLink")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
