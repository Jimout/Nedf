"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{
        opacity: 0,
        scale: 0.98,
        filter: "blur(4px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
        filter: "blur(4px)",
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94], // Premium easing curve
      }}
      style={{
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </motion.div>
  )
}
