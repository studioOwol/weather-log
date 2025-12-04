import type { I18nNamespace } from "@/types"

export const I18N_NAMESPACES: Record<string, I18nNamespace> = {
  COMMON: "common",
  SETTINGS: "settings",
  AUTH: "auth",
  FILTER: "filter",
  CARD: "card",
  PRIVACY: "privacy",
} as const
