import type { Metadata } from "next"
import type React from "react"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard Login",
  description: "Sign in to the NEDF Studio dashboard.",
  path: "/dashbord-login",
  noIndex: true,
})

export default function DashbordLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
