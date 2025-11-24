"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// ============================================================================
// CONSTANTS
// ============================================================================

const SPLASH_DURATION_MS = 3000

const LOGO_CONFIG = {
  src: "/NAVIGATION BAR LOGO OPTION 2.png",
  alt: "NEDF Studios",
  baseWidth: 280,
  baseHeight: 112,
} as const

const TAGLINE = "Less, but Better."

const LOADING_DOTS_COUNT = 3

const ANIMATION_CONFIG = {
  container: {
    initial: {},
    animate: {},
    exit: { scale: 1.05 },
    transition: { duration: 0.6, ease: "easeInOut" as const },
  },
  logo: {
    initial: { scale: 0.95, y: 5 },
    animate: { scale: 1, y: 0 },
    exit: { scale: 0.95, y: -10 },
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  footer: {
    initial: {},
    animate: {},
    transition: { delay: 0.1, duration: 0.3 },
  },
  tagline: {
    initial: { y: 5 },
    animate: { y: 0 },
    transition: { delay: 0.2, duration: 0.3 },
  },
  dot: {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.5, 1, 0.5],
    },
    transition: {
      duration: 1,
      repeat: Number.POSITIVE_INFINITY,
    },
  },
}

const DOT_DELAY_MS = 150

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Logo component with responsive sizing
 */
function Logo() {
  return (
    <div className="relative drop-shadow-2xl">
      <Image
        src={LOGO_CONFIG.src}
        alt={LOGO_CONFIG.alt}
        width={LOGO_CONFIG.baseWidth}
        height={LOGO_CONFIG.baseHeight}
        priority
        className="object-contain w-[180px] h-auto sm:w-[200px] md:w-[240px] lg:w-[260px] xl:w-[280px] 2xl:w-[320px]"
      />
    </div>
  )
}

/**
 * Tagline with responsive text sizing
 */
function TagLine() {
  return (
    <motion.p
      initial={ANIMATION_CONFIG.tagline.initial}
      animate={ANIMATION_CONFIG.tagline.animate}
      transition={ANIMATION_CONFIG.tagline.transition}
      className="text-center text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-600 dark:text-white/80 mb-3 sm:mb-4 md:mb-4 lg:mb-5 xl:mb-5 2xl:mb-6 tracking-wider font-light"
    >
      {TAGLINE}
    </motion.p>
  )
}

/**
 * Loading dots animation with responsive sizing
 */
function LoadingDots() {
  return (
    <div className="flex gap-1.5 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2.5 2xl:gap-2.5 justify-center">
      {Array.from({ length: LOADING_DOTS_COUNT }).map((_, index) => (
        <motion.div
          key={index}
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2 md:h-2 lg:w-2 lg:h-2 xl:w-2.5 xl:h-2.5 2xl:w-2.5 2xl:h-2.5 rounded-full bg-gray-600 dark:bg-white/80"
          animate={ANIMATION_CONFIG.dot.animate}
          transition={{
            ...ANIMATION_CONFIG.dot.transition,
            delay: index * (DOT_DELAY_MS / 1000),
          }}
        />
      ))}
    </div>
  )
}

/**
 * Footer section with tagline and loading animation
 */
function SplashFooter() {
  return (
    <motion.div
      className="absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-14 xl:bottom-16 2xl:bottom-20 left-1/2 -translate-x-1/2"
      initial={ANIMATION_CONFIG.footer.initial}
      animate={ANIMATION_CONFIG.footer.animate}
      transition={ANIMATION_CONFIG.footer.transition}
    >
      <TagLine />
      <LoadingDots />
    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * SplashScreen - Full-screen loading screen displayed on initial page load
 * Automatically hides after SPLASH_DURATION_MS milliseconds
 */
export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, SPLASH_DURATION_MS)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-white dark:bg-[#15171a]"
          initial={ANIMATION_CONFIG.container.initial}
          animate={ANIMATION_CONFIG.container.animate}
          exit={ANIMATION_CONFIG.container.exit}
          transition={ANIMATION_CONFIG.container.transition}
          style={{ pointerEvents: "auto" }}
        >
          <motion.div
            initial={ANIMATION_CONFIG.logo.initial}
            animate={ANIMATION_CONFIG.logo.animate}
            exit={ANIMATION_CONFIG.logo.exit}
            transition={ANIMATION_CONFIG.logo.transition}
            className="relative"
          >
            <Logo />
          </motion.div>

          <SplashFooter />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
