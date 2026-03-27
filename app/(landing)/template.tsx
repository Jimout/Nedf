import type { ReactNode } from "react"
import { PageTransition } from "@/components/Page-transition"

/**
 * Remounts on each navigation within (landing). PageTransition uses opacity only so
 * GSAP ScrollTrigger (slogan) is not broken by transform/filter on an ancestor.
 */
export default function LandingTemplate({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <PageTransition>{children}</PageTransition>
}
