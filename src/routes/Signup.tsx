import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { signUp } from "../api/supabase"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Spinner } from "../components/ui/spinner"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "../constants/i18n"
import { ROUTES } from "@/lib/routes"
import { signupSchema } from "@/lib/validation"
import { getSupabaseErrorMessage } from "@/lib/authErrors"
import type { ValidationMessageKey } from "@/types"

export default function Signup() {
  const { t } = useTranslation(I18N_NAMESPACES.AUTH)
  const { t: tCommon } = useTranslation(I18N_NAMESPACES.COMMON)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string
    password?: string
    confirmPassword?: string
  }>({})
  const navigate = useNavigate()

  const validateField = (field: "email" | "password" | "confirmPassword") => {
    if (field === "confirmPassword") {
      if (confirmPassword && password !== confirmPassword) {
        setFieldErrors((prev) => ({
          ...prev,
          confirmPassword: t("validation.passwordMismatch" as ValidationMessageKey),
        }))
      }
      return
    }
    const value = field === "email" ? email : password
    const result = signupSchema.shape[field].safeParse(value)
    if (!result.success) {
      const message = result.error.issues[0].message
      setFieldErrors((prev) => ({ ...prev, [field]: t(message as ValidationMessageKey) }))
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})

    const result = signupSchema.safeParse({ email, password, confirmPassword })
    if (!result.success) {
      const errors: { email?: string; password?: string; confirmPassword?: string } = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as "email" | "password" | "confirmPassword"
        if (!errors[field]) {
          errors[field] = t(issue.message as ValidationMessageKey)
        }
      })
      setFieldErrors(errors)
      return
    }

    setLoading(true)
    const { error } = await signUp(email, password)

    if (error) {
      setError(getSupabaseErrorMessage(error.code))
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
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
            Track your daily weather and create personal weather logs
          </p>
        </div>

        <div className="bg-inner rounded-xl border border-border-default p-6">
          <form onSubmit={handleSignup} noValidate className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder={t("signUp.email")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }))
                }}
                onBlur={() => validateField("email")}
                autoComplete="email"
                className="h-12 px-3 border-border-default bg-background text-foreground rounded-xl"
              />
              {fieldErrors.email && (
                <p className="text-destructive text-sm mt-2 ml-2">{fieldErrors.email}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder={t("signUp.password")}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (fieldErrors.password)
                    setFieldErrors((prev) => ({ ...prev, password: undefined }))
                }}
                onBlur={() => validateField("password")}
                autoComplete="new-password"
                className="h-12 px-3 border-border-default bg-background text-foreground rounded-xl"
              />
              {fieldErrors.password && (
                <p className="text-destructive text-sm mt-2 ml-2">{fieldErrors.password}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder={t("signUp.confirmPassword")}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (fieldErrors.confirmPassword)
                    setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }))
                }}
                onBlur={() => validateField("confirmPassword")}
                autoComplete="new-password"
                className="h-12 px-3 border-border-default bg-background text-foreground rounded-xl"
              />
              {fieldErrors.confirmPassword && (
                <p className="text-destructive text-sm mt-2 ml-2">{fieldErrors.confirmPassword}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white hover:opacity-90 rounded-xl cursor-pointer"
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
