import type { Metadata } from "next"
import type React from "react"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard Login",
  description: "Sign in to the NEDF Studio dashboard.",
  path: "/dashboard-login",
  noIndex: true,
})

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}

