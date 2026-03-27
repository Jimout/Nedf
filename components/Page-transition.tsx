"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Opacity-only: `transform` / `filter` on an ancestor breaks GSAP ScrollTrigger `pin`
 * (and slogan text visibility) by creating a new containing block for `position: fixed`.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
