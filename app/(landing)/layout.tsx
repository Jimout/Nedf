import { Navbar } from "@/components/Navbar"
import type React from "react"
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col gap-2">
      {/* Navbar - Full width, outside padding */}
      <Navbar />
      {/* Content wrapper with responsive padding */}
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20">
        {children}
      </div>
    </div>
  )
}
