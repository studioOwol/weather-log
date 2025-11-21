import { create } from "zustand"
import i18n from "@/lib/i18n"

export type Language = "en" | "ko" // | "zh" | "ja"

interface LanguageStore {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: (i18n.language as Language) || "en",
  setLanguage: (language: Language) => {
    i18n.changeLanguage(language)
    set({ language })
  },
}))

i18n.on("languageChanged", (lng) => {
  useLanguageStore.setState({ language: lng as Language })
})
