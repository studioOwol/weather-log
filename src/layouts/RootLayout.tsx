import Layout from "@/components/layout/Layout"
import { Outlet } from "react-router"

export default function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
