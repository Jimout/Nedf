import type { Metadata } from "next"
import type React from "react"
import { createPageMetadata } from "@/lib/seo"
import DashboardLayoutClient from "./DashboardLayoutClient"

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard",
  description: "NEDF Studio content management dashboard.",
  path: "/dashboard",
  noIndex: true,
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>
}
