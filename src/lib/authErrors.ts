import i18n from "@/lib/i18n"
import type { SupabaseErrorKey } from "@/types"

const KNOWN_SUPABASE_ERRORS = [
  "invalid_credentials",
  "email_not_confirmed",
  "user_already_exists",
] as const

export const getSupabaseErrorMessage = (errorCode: string | undefined): string => {
  if (
    errorCode &&
    KNOWN_SUPABASE_ERRORS.includes(errorCode as (typeof KNOWN_SUPABASE_ERRORS)[number])
  ) {
    return i18n.t(`supabaseErrors.${errorCode}` as SupabaseErrorKey, { ns: "auth" })
  }
  return i18n.t("supabaseErrors.unknown" as SupabaseErrorKey, { ns: "auth" })
}
