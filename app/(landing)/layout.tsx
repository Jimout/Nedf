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
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 3xl:px-20 4xl:px-24">
        {children}
      </div>
    </div>
  )
}
