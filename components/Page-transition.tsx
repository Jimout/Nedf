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
        scale: 0.98,
        filter: "blur(4px)",
      }}
      animate={{
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        scale: 0.98,
        filter: "blur(4px)",
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94], // Premium easing curve
      }}
      style={{
        willChange: "transform, filter",
      }}
    >
      {children}
    </motion.div>
  )
}
