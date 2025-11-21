import en from "./en"

export type TranslationResources = typeof en

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: false
    resources: TranslationResources
  }
}
