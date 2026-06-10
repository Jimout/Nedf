import { Navbar } from "@/components/Navbar"
import CustomCursor from "@/components/CustomCursor"
import { cn } from "@/lib/utils"
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
      <div
        className={cn(
          "mx-auto w-full min-w-0 max-w-full overflow-x-clip",
          /* Keep in sync with LANDING_MAIN_GUTTERS in lib/constants.ts */
          "lg:px-12 xl:px-14 2xl:px-28 3xl:px-32 4xl:px-36"
        )}
      >
        {children}
      </div>
      <CustomCursor />
    </div>
  )
}
