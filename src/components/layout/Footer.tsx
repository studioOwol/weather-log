export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-border-default">
      <div className="px-4 py-6">
        <div className="text-center font-bold text-primary">
          <p className="text-sm">© {currentYear} Weather Log. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
