import Layout from "@/components/shared/Layout"
import { Outlet } from "react-router"

export default function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
