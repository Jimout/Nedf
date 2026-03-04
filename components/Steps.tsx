"use client"

import { useEffect, useRef, useState } from "react"
import { loadSteps, type StepItem } from "@/lib/landing-steps"

// ==================== TYPES ====================

interface ArcPosition {
  x: number
  y: number
  opacity: number
  scale: number
  rotation: number
  vw: number
  vh: number
}

interface TextAnimation {
  opacity: number
  scale: number
}

// ==================== CONSTANTS ====================

const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1280,
  ULTRA_WIDE: 1536,
} as const

const ARC_CONFIG = {
  MOBILE: { startY: 0.65, endY: 0.65, peakY: 0.35 },
  TABLET: { startY: 0.65, endY: 0.65, peakY: 0.08 },
  DESKTOP: { startY: 0.65, endY: 0.65, peakY: 0.08 },
} as const

const ANIMATION_CONFIG = {
  CIRCLE_SCALE: 4,
  TEXT_MIN_OPACITY: 0.15,
  TEXT_BASE_SCALE: 0.65,
  TEXT_SCALE_RANGE: 0.35,
} as const

// ==================== HELPER FUNCTIONS ====================

function getPointOnBezier(
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
): [number, number] {
  const mt = 1 - t
  const x = mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0]
  const y = mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1]
  return [x, y]
}

function getRotationAngle(
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number]
): number {
  const mt = 1 - t
  const dx = 2 * mt * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0])
  const dy = 2 * mt * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])
  return Math.atan2(dy, dx) * (180 / Math.PI)
}

function getArcConfig(viewportWidth: number) {
  if (viewportWidth < BREAKPOINTS.TABLET) return ARC_CONFIG.MOBILE
  if (viewportWidth < BREAKPOINTS.DESKTOP) return ARC_CONFIG.TABLET
  return ARC_CONFIG.DESKTOP
}

function calculateScrollProgress(element: HTMLDivElement): number {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const elementTop = rect.top
  const elementHeight = rect.height

  return Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))
}

// ==================== MAIN COMPONENT ====================

export default function Steps() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [stepsData, setStepsData] = useState<StepItem[]>(() => loadSteps())
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setStepsData(loadSteps())
  }, [])

  // Track dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  // Track viewport width
  useEffect(() => {
    setViewportWidth(window.innerWidth)
    
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || stepsData.length === 0) return

      const progress = calculateScrollProgress(sectionRef.current)
      setScrollProgress(progress)

      const activeIdx = Math.min(
        Math.floor(progress * stepsData.length),
        stepsData.length - 1
      )
      setActiveIndex(activeIdx)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [stepsData.length])

  const getActiveAvatarPosition = (): ArcPosition => {
    const totalProgress = scrollProgress * stepsData.length
    const localProgress = Math.min(totalProgress - Math.floor(totalProgress), 1)
    const progress = Math.max(0, Math.min(1, localProgress))

    // Guard against `window` during server render. On the server we don't
    // have a real viewport, so we fall back to 0 and let the client-side
    // effect populate the correct values after hydration.
    const isBrowser = typeof window !== "undefined"
    const vw = viewportWidth || (isBrowser ? window.innerWidth : 0)
    const vh = isBrowser ? window.innerHeight : 0
    
    const arcConfig = getArcConfig(vw)
    
    const p0: [number, number] = [0, vh * arcConfig.startY]
    const p1: [number, number] = [vw * 0.5, vh * arcConfig.peakY]
    const p2: [number, number] = [vw, vh * arcConfig.endY]

    const [arcX, arcY] = getPointOnBezier(progress, p0, p1, p2)
    const rotation = getRotationAngle(progress, p0, p1, p2)
    const opacity = Math.abs(Math.cos((progress - 0.5) * Math.PI)) * 0.5 + 0.5

    return { 
      x: arcX, 
      y: arcY, 
      opacity, 
      scale: ANIMATION_CONFIG.CIRCLE_SCALE, 
      rotation, 
      vw, 
      vh 
    }
  }

  const getTextAnimation = (): TextAnimation => {
    const totalProgress = scrollProgress * stepsData.length
    const localProgress = Math.min(totalProgress - Math.floor(totalProgress), 1)
    const progress = Math.max(0, Math.min(1, localProgress))

    const distanceFromCenter = Math.abs(progress - 0.5) * 2

    let opacity: number
    if (distanceFromCenter > 0.8) {
      opacity = ANIMATION_CONFIG.TEXT_MIN_OPACITY
    } else if (distanceFromCenter > 0.4) {
      opacity = ANIMATION_CONFIG.TEXT_MIN_OPACITY + 
        ((0.8 - distanceFromCenter) / 0.4) * 0.5
    } else {
      opacity = 0.65 + ((0.4 - distanceFromCenter) / 0.4) * 0.35
    }

    opacity = Math.max(0, Math.min(1, opacity))
    const scale = ANIMATION_CONFIG.TEXT_BASE_SCALE + 
      (opacity * ANIMATION_CONFIG.TEXT_SCALE_RANGE)

    return { opacity, scale }
  }

  const activeStep = stepsData[activeIndex] || stepsData[0]
  if (!activeStep) {
    return null
  }
  const { x, y, opacity, scale, rotation, vw, vh } = getActiveAvatarPosition()
  const { opacity: textOpacity, scale: textScale } = getTextAnimation()

  return (
    <div className="w-full max-w-none pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 2xl:pt-20 3xl:pt-24 4xl:pt-28 pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 3xl:pb-24 4xl:pb-28">
      <div id="steps" ref={sectionRef} className="relative min-h-screen z-30">
        {/* Sticky Arc Container */}
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none z-30">
          {/* Title */}
          <div className="absolute top-[30%] sm:top-[6%] lg:top-[3%] xl:top-[2%] 2xl:top-[1%] 3xl:top-[1%] 4xl:top-[1%] left-1/2 transform -translate-x-1/2 w-full z-30 px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-8xl 3xl:text-9xl 4xl:text-[7.5rem] font-bold font-montserrat tracking-tight text-foreground/80 dark:text-primary">
              HOW NEDF WORKS
            </h2>
          </div>
          {/* Arc Path SVG */}
          <div className="relative w-screen h-full -mx-[calc(50vw-50%)] overflow-visible">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${vw} ${vh}`}
              preserveAspectRatio="none"
              style={{ overflow: "visible" }}
            >
              <ArcPath 
                viewportWidth={vw} 
                viewportHeight={vh} 
                isDark={isDark} 
              />
            </svg>

            {/* Animated Circle */}
            <div
              className="absolute z-10"
              style={{
                left: `${(x / vw) * 100}%`,
                top: `${(y / vh) * 100}%`,
                transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
                opacity,
              }}
            >
              <div className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] md:w-[40px] md:h-[40px] lg:w-[44px] lg:h-[44px] xl:w-[60px] xl:h-[60px] 2xl:w-[110px] 2xl:h-[110px] 3xl:w-[130px] 3xl:h-[130px] 4xl:w-[150px] 4xl:h-[150px] relative">
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center bg-foreground dark:bg-primary-foreground"
                >
                  <span 
                    className="text-[4px] sm:text-[5px] md:text-[8px] lg:text-[8px] xl:text-[10px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-bold text-center px-1 transition-opacity duration-300 text-primary-foreground dark:text-background"
                    style={{ opacity: opacity > 0.9 ? 1 : 0 }}
                  >
                    {activeStep.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Description Text - gap from circle only on sm/md/lg */}
            <div className="absolute top-[58%] sm:top-[55%] lg:top-[58%] xl:top-[60%] 2xl:top-[62%] left-1/2 transform -translate-x-1/2 w-full mt-10 sm:mt-14 md:mt-20 lg:mt-24 xl:mt-0">
              <div className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl 3xl:max-w-[80rem] 4xl:max-w-[96rem] mx-auto text-center px-4 sm:px-6 md:px-8">
                <div
                  style={{
                    opacity: textOpacity,
                    transform: `scale(${textScale})`,
                    transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                    pointerEvents: textOpacity > 0.1 ? "auto" : "none",
                  }}
                >
                  <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-8 3xl:space-y-10 4xl:space-y-12">
                    <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl text-primary font-medium">
                      {activeStep.role}
                    </p>
                    <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl text-foreground leading-relaxed 2xl:leading-loose 3xl:leading-loose 4xl:leading-[1.8] font-light">
                      "{activeStep.quote}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer divs for scroll */}
        {Array.from({ length: stepsData.length }).map((_, i) => (
          <div key={i} className="h-screen" />
        ))}
      </div>
    </div>
  )
}

// ==================== SUB-COMPONENTS ====================

function ArcPath({ 
  viewportWidth, 
  viewportHeight, 
  isDark 
}: { 
  viewportWidth: number
  viewportHeight: number
  isDark: boolean
}) {
  const arcConfig = getArcConfig(viewportWidth)
  const pathData = `M 0 ${viewportHeight * arcConfig.startY} Q ${viewportWidth * 0.5} ${viewportHeight * arcConfig.peakY} ${viewportWidth} ${viewportHeight * arcConfig.endY}`

  return (
    <path
      d={pathData}
      stroke={isDark ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground) / 0.8)"}
      strokeWidth="2"
      fill="none"
      opacity="1"
    />
  )
}
