export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="fixed bottom-0 w-full mt-16 border-t">
      <div className="px-4 py-6">
        <div className="text-center">
          <p className="text-sm">© {currentYear} Weather Log. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
