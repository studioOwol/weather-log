import { FaGithub, FaEnvelope } from "react-icons/fa"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-border-default">
      <div className="px-4 py-6">
        <div className="text-center font-bold text-primary">
          <p className="text-sm">© {currentYear} Weather Log. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 mt-3">
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
          </div>
        </div>
      </div>
    </footer>
  )
}
