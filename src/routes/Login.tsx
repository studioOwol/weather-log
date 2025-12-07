import { useState } from "react"
import { Link } from "react-router"
import { signInWithPassword, signInWithGoogle } from "../api/supabase"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Spinner } from "../components/ui/spinner"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "../constants/i18n"
import { ROUTES } from "@/lib/routes"
import { loginSchema } from "@/lib/validation"
import { getSupabaseErrorMessage } from "@/lib/authErrors"
import type { ValidationMessageKey } from "@/types"

export default function Login() {
  const { t } = useTranslation(I18N_NAMESPACES.AUTH)
  const { t: tCommon } = useTranslation(I18N_NAMESPACES.COMMON)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})

  const validateField = (field: "email" | "password") => {
    const value = field === "email" ? email : password
    const result = loginSchema.shape[field].safeParse(value)
    if (!result.success) {
      const message = result.error.issues[0].message
      setFieldErrors((prev) => ({ ...prev, [field]: t(message as ValidationMessageKey) }))
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})

    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {
      const errors: { email?: string; password?: string } = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as "email" | "password"
        if (!errors[field]) {
          errors[field] = t(issue.message as ValidationMessageKey)
        }
      })
      setFieldErrors(errors)
      return
    }

    setLoading(true)
    const { error } = await signInWithPassword(email, password)
    if (error) {
      setError(getSupabaseErrorMessage(error.code))
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setError("")
    const { error } = await signInWithGoogle()
    if (error) {
      setError(getSupabaseErrorMessage(error.code))
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <img src="/logo-96.webp" alt="Weather Log Logo" className="size-15" />
          </div>
          <h1 className="mt-1 text-3xl font-bold text-primary">Weather Log</h1>
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
            Track your daily weather and create personal weather logs
          </p>
        </div>

        <div className="bg-inner rounded-xl border border-border-default p-6">
          <form onSubmit={handleLogin} noValidate className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder={t("signIn.email")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }))
                }}
                onBlur={() => validateField("email")}
                autoComplete="email"
                className="h-12 px-3 border-border-default bg-background text-muted-foreground rounded-xl"
              />
              {fieldErrors.email && (
                <p className="text-destructive text-sm mt-2 ml-2">{fieldErrors.email}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder={t("signIn.password")}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (fieldErrors.password)
                    setFieldErrors((prev) => ({ ...prev, password: undefined }))
                }}
                onBlur={() => validateField("password")}
                autoComplete="current-password"
                className="h-12 px-3 border-border-default bg-background text-muted-foreground rounded-xl"
              />
              {fieldErrors.password && (
                <p className="text-destructive text-sm mt-2 ml-2">{fieldErrors.password}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-white hover:opacity-90 rounded-xl cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Spinner size="sm" variant="circle" className="text-white" />
                    {t("signIn.loading")}
                  </span>
                ) : (
                  t("signIn.submit")
                )}
              </Button>

              {/* Google Login */}
              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full h-12 bg-primary text-white hover:opacity-90 rounded-xl cursor-pointer relative"
              >
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                  <div className="size-6 rounded-full bg-white flex items-center justify-center -ml-8 mr-3 shrink-0">
                    <img
                      src="/google-logo.png"
                      alt="Google"
                      className="size-4 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span>{t("signIn.continueWithGoogle")}</span>
                </div>
              </Button>
            </div>

            {error && <p className="text-destructive text-sm text-center">{error}</p>}
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {t("signIn.noAccount")}{" "}
              <Link to="/signup" className="text-primary hover:underline">
                {t("signIn.signUpLink")}
              </Link>
            </p>
          </div>

          <div className="mt-2 text-center">
            <Link
              to={ROUTES.PRIVACY}
              className="text-xs text-muted-foreground hover:text-primary hover:underline transition-colors"
            >
              {tCommon("footer.privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
