import { Navbar } from "@/components/Navbar"
import CustomCursor from "@/components/CustomCursor"
import { JsonLd } from "@/components/JsonLd"
import { LANDING_MAIN_GUTTERS } from "@/lib/constants"
import { getOrganizationJsonLd } from "@/lib/seo"
import { cn } from "@/lib/utils"
import type React from "react"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col gap-2">
      <JsonLd data={getOrganizationJsonLd()} />
      {/* Navbar: full width; mobile/tablet hamburger, desktop full menu */}
      <Navbar />
      {/* Main content: template.tsx wraps children with PageTransition (blur/scale on route change) */}
      <div
        className={cn(
          "mx-auto w-full min-w-0 max-w-full overflow-x-clip",
          LANDING_MAIN_GUTTERS
        )}
      >
        {children}
      </div>
      <CustomCursor />
    </div>
  )
}
