import type { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"
import BottomNav from "./BottomNav"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 px-5 sm:px-6 md:px-8 pb-17 sm:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  )
}
