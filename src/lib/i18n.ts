import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "@/locales/en"
import ko from "@/locales/ko"
// import zh from "@/locales/zh"
// import ja from "@/locales/ja"
import "@/locales/types"

const LANGUAGE_KEY = "language"

const savedLanguage = localStorage.getItem(LANGUAGE_KEY)
const browserLanguage = navigator.language.split("-")[0]

// Determine default language based on browser language
const getDefaultLanguage = () => {
  if (savedLanguage) return savedLanguage

  switch (browserLanguage) {
    case "ko":
      return "ko"
    default:
      return "en"
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en,
    ko,
    // zh,
    // ja,
  },
  lng: getDefaultLanguage(),
  fallbackLng: "en",
  defaultNS: false,
  interpolation: {
    escapeValue: false,
  },
})

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(LANGUAGE_KEY, lng)
})

export default i18n
