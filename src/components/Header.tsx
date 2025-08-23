import { Bookmark, Cloud, Home } from "lucide-react"
import { Link } from "react-router"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-default">
      <div className="h-16 p-4 flex items-center justify-between text-primary">
        <div className="flex items-center gap-2">
          <Cloud className="size-6" />
          <h1 className="text-xl font-bold">Weather Log</h1>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Home className="size-5" />
            <span className="text-[16px]">Home</span>
          </Link>

          <Link to="/bookmark" className="flex items-center gap-1 text-xl font-bold text-primary">
            <Bookmark className="size-5" />
            <span className="text-[16px]">Bookmark</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
