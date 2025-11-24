"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Stats from "./Stats"

// ==================== CONSTANTS ====================

const ANIMATED_WORDS = ["Creators", "Designers", "Resolvers"]

const ANIMATION_CONFIG = {
  INTERVAL_MS: 1500,
  TRANSITION_DURATION_MS: 400,
  RESET_DELAY_MS: 450,
  RESET_ANIMATION_MS: 50,
} as const

const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const

const LINE_HEIGHTS = {
  MOBILE: 72,
  SM: 90,
  MD: 110,
  LG: 140,
  XL: 180,
  "2XL": 200,
  DEFAULT: 110,
} as const

// ==================== COMPONENT ====================

export default function HeroWithStats() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [lineHeight, setLineHeight] = useState(() => calculateLineHeight())
  const [index, setIndex] = useState(0)
  const [isResetting, setIsResetting] = useState(false)

  // ==================== HELPERS ====================

  function calculateLineHeight(): number {
    if (typeof window === "undefined") return LINE_HEIGHTS.DEFAULT

    const width = window.innerWidth
    if (width >= BREAKPOINTS["2XL"]) return LINE_HEIGHTS["2XL"]
    if (width >= BREAKPOINTS.XL) return LINE_HEIGHTS.XL
    if (width >= BREAKPOINTS.LG) return LINE_HEIGHTS.LG
    if (width >= BREAKPOINTS.MD) return LINE_HEIGHTS.MD
    if (width >= BREAKPOINTS.SM) return LINE_HEIGHTS.SM
    return LINE_HEIGHTS.MOBILE
  }

  // ==================== EFFECTS ====================

  // Update line height on window resize
  useEffect(() => {
    const handleResize = () => setLineHeight(calculateLineHeight())
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Animate word rotation with seamless loop
  useEffect(() => {
    let resetTimeout: NodeJS.Timeout

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1

        if (next >= ANIMATED_WORDS.length) {
          resetTimeout = setTimeout(() => {
            setIsResetting(true)
            setIndex(0)
            setTimeout(() => setIsResetting(false), ANIMATION_CONFIG.RESET_ANIMATION_MS)
          }, ANIMATION_CONFIG.RESET_DELAY_MS)
          
          return ANIMATED_WORDS.length
        }

        return next
      })
    }, ANIMATION_CONFIG.INTERVAL_MS)

    return () => {
      clearInterval(interval)
      if (resetTimeout) clearTimeout(resetTimeout)
    }
  }, [])

  // ==================== RENDER ====================

  const duplicatedWords = [...ANIMATED_WORDS, ...ANIMATED_WORDS]

  return (
    <>
      <HeroSection lineHeight={lineHeight}>
        <HeroContent
          lineHeight={lineHeight}
          index={index}
          isResetting={isResetting}
          words={duplicatedWords}
          containerRef={containerRef}
        />
      </HeroSection>

      <Spacer />
      <Stats />
    </>
  )
}

// ==================== SUB-COMPONENTS ====================

function HeroSection({ 
  children, 
  lineHeight 
}: { 
  children: React.ReactNode
  lineHeight: number 
}) {
  return (
    <section className="
      relative w-full z-10 
      flex items-center justify-center 
      font-montserrat overflow-hidden
      min-h-[45vh] sm:min-h-[48vh] md:min-h-[50vh] 
      lg:min-h-[52vh] xl:min-h-[55vh] 2xl:min-h-[58vh]
      mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16
    ">
      <div className="
        flex items-center justify-center 
        gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12
      ">
        {children}
      </div>
    </section>
  )
}

function HeroLogo() {
  const logoClasses = "object-contain w-[110px] h-[180px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] xl:w-[260px] xl:h-[260px] 2xl:w-[300px] 2xl:h-[300px]"
  
  return (
    <div className="select-none">
      <Image
        src="/NAVIGATION BAR LOGO OPTION 1.png"
        alt="NEDF Logo"
        width={300}
        height={300}
        className={`${logoClasses} dark:hidden`}
        priority
      />
      <Image
        src="/LOGO FOR THE WEBISTE-06.png"
        alt="NEDF Logo Dark"
        width={300}
        height={300}
        className={`${logoClasses} hidden dark:block`}
        priority
      />
    </div>
  )
}

function HeroContent({
  lineHeight,
  index,
  isResetting,
  words,
  containerRef,
}: {
  lineHeight: number
  index: number
  isResetting: boolean
  words: string[]
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <>
      <HeroLogo />
      
      <div className="flex flex-col justify-center sm:mt-[-16px] md:mt-0">
        <div 
          className="flex items-center max-sm:flex-col max-sm:items-start max-sm:justify-center" 
          style={{ height: `${lineHeight}px` }}
        >
          <span className="
            font-thin text-[#333333]/80 dark:text-white/80 
            tracking-wide mr-2 max-sm:mb-[-4px]
            text-[24px] sm:text-[32px] md:text-[40px] 
            lg:text-[48px] xl:text-[68px] 2xl:text-[80px]
            md:font-normal xl:font-normal
          ">
            We Are
          </span>

          <AnimatedWords
            lineHeight={lineHeight}
            index={index}
            isResetting={isResetting}
            words={words}
            containerRef={containerRef}
          />
        </div>
      </div>
    </>
  )
}

function AnimatedWords({
  lineHeight,
  index,
  isResetting,
  words,
  containerRef,
}: {
  lineHeight: number
  index: number
  isResetting: boolean
  words: string[]
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      className="overflow-hidden relative"
      style={{
        height: `${lineHeight}px`,
        maxHeight: `${lineHeight}px`,
        minHeight: `${lineHeight}px`,
        contain: "layout style",
      }}
    >
      <div
        ref={containerRef}
        style={{
          transform: `translateY(-${index * lineHeight}px)`,
          transition: isResetting 
            ? "none" 
            : `transform ${ANIMATION_CONFIG.TRANSITION_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          willChange: "transform",
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="
              block font-medium leading-none whitespace-nowrap
              text-[#002e47] dark:text-[#ec1e24]
              text-[40px] sm:text-[56px] md:text-[68px] 
              lg:text-[84px] xl:text-[116px] 2xl:text-[140px]
            "
            style={{
              height: `${lineHeight}px`,
              lineHeight: `${lineHeight}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingBottom: "8px",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}

function Spacer() {
  return <div className="h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16" />
}
