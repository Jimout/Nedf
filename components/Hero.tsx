"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
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
  "3XL": 1920,
  "4XL": 2560,
} as const

const LINE_HEIGHTS = {
  MOBILE: 58,
  SM: 72,
  MD: 88,
  LG: 110,
  XL: 140,
  "2XL": 180,
  "3XL": 200,
  "4XL": 224,
  DEFAULT: 88,
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
    if (width >= BREAKPOINTS["4XL"]) return LINE_HEIGHTS["4XL"]
    if (width >= BREAKPOINTS["3XL"]) return LINE_HEIGHTS["3XL"]
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
      min-h-[28vh] sm:min-h-[30vh] md:min-h-[32vh] lg:min-h-[34vh] xl:min-h-[36vh] 2xl:min-h-[40vh] 3xl:min-h-[44vh] 4xl:min-h-[48vh]
      mt-4 sm:mt-5 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-14 3xl:mt-16 4xl:mt-20
    ">
      <div className="
        flex items-center justify-center 
        gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 2xl:gap-12 3xl:gap-14 4xl:gap-16
      ">
        {children}
      </div>
    </section>
  )
}

function HeroLogo() {
  const logoClasses = "object-contain w-[80px] h-[130px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] lg:w-[130px] lg:h-[130px] xl:w-[180px] xl:h-[180px] 2xl:w-[260px] 2xl:h-[260px] 3xl:w-[300px] 3xl:h-[300px] 4xl:w-[340px] 4xl:h-[340px]"
  
  return (
    <div className="select-none">
      <Image
        src="/NAVIGATION BAR LOGO OPTION 1.png"
        alt="NEDF Logo"
        width={300}
        height={300}
        className={cn(logoClasses, "dark:hidden")}
        priority
      />
      <Image
        src="/LOGO FOR THE WEBISTE-06.png"
        alt="NEDF Logo Dark"
        width={300}
        height={300}
        className={cn(logoClasses, "hidden dark:block")}
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
            font-thin text-foreground/80
            tracking-wide mr-2 max-sm:mb-[-4px]
            text-[20px] sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[52px] 2xl:text-[70px] 3xl:text-[80px] 4xl:text-[90px]
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
        ref={containerRef as React.RefObject<HTMLDivElement>}
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
            className={cn(
              "block font-medium leading-none whitespace-nowrap text-primary",
              "text-[32px] sm:text-[44px] md:text-[54px] lg:text-[66px] xl:text-[90px] 2xl:text-[120px] 3xl:text-[136px] 4xl:text-[156px]"
            )}
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
  return <div className="h-2 sm:h-3 md:h-4 lg:h-5 xl:h-6 2xl:h-8 3xl:h-10 4xl:h-12" />
}
