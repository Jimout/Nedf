import { Navbar } from "@/components/Navbar"
import type React from "react"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col gap-2">
      {/* Navbar: full width; mobile/tablet hamburger, desktop full menu */}
      <Navbar />
      {/* Main content: template.tsx wraps children with PageTransition (blur/scale on route change) */}
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-12 xl:px-12 2xl:px-24 3xl:px-28 4xl:px-32">
        {children}
      </div>
    </div>
  )
}
