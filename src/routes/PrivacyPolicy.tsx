import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "../constants/i18n"
import { useNavigate } from "react-router"
import { ChevronLeft } from "lucide-react"

export default function PrivacyPolicy() {
  const { t } = useTranslation(I18N_NAMESPACES.PRIVACY)
  const { t: tCommon } = useTranslation(I18N_NAMESPACES.COMMON)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-inner rounded-xl border border-border-default p-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 mb-6 text-primary hover:text-primary/80 transition-colors focus:outline-none"
          >
            <ChevronLeft className="size-5" />
            <span className="text-sm font-medium">{tCommon("button.back")}</span>
          </button>

          <h1 className="text-3xl font-bold text-primary mb-4">{t("title")}</h1>

          <p className="text-muted-foreground mb-6">{t("lastUpdated")}</p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3">{t("sections.overview.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.overview.content")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("sections.infoCollect.title")}</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">{t("sections.infoCollect.account")}</strong>{" "}
                  {t("sections.infoCollect.accountDesc")}
                </p>
                <p>
                  <strong className="text-foreground">{t("sections.infoCollect.weather")}</strong>{" "}
                  {t("sections.infoCollect.weatherDesc")}
                </p>
                <p>
                  <strong className="text-foreground">{t("sections.infoCollect.usage")}</strong>{" "}
                  {t("sections.infoCollect.usageDesc")}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("sections.infoUse.title")}</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                {(t("sections.infoUse.items", { returnObjects: true }) as string[]).map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("sections.googleOauth.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.googleOauth.content")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("sections.infoProtection.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.infoProtection.content")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("sections.infoSharing.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.infoSharing.content")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("sections.userRights.title")}</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                {(t("sections.userRights.items", { returnObjects: true }) as string[]).map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("sections.cookies.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.cookies.content")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("sections.childrenPrivacy.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.childrenPrivacy.content")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("sections.policyChanges.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.policyChanges.content")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("sections.contact.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.contact.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
