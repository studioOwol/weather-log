import { FaGithub, FaEnvelope } from "react-icons/fa"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { I18N_NAMESPACES } from "@/constants/i18n"
import { ROUTES } from "@/lib/routes"

export default function Footer() {
  const { t } = useTranslation(I18N_NAMESPACES.COMMON)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="hidden sm:block border-t border-border-default">
      <div className="px-4 py-5">
        <div className="text-center font-bold text-primary">
          <div className="flex items-center justify-center gap-4 mb-2">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=from.owol@gmail.com"
              rel="noreferrer"
              target="_blank"
              className="text-primary  hover:text-muted-foreground transition-colors"
              aria-label="Email"
            >
              <FaEnvelope className="size-5" />
            </a>
            <a
              href="https://github.com/studioOwol/weather-log"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary  hover:text-muted-foreground transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="size-5" />
            </a>
            <Link
              to={ROUTES.PRIVACY}
              className="text-xs text-primary hover:text-muted-foreground transition-colors underline underline-offset-2"
            >
              {t("footer.privacyPolicy")}
            </Link>
          </div>

          <p className="text-sm mt-2">© {currentYear} Weather Log. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
