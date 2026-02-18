"use client"

import { useEffect, useRef, useState } from "react"

// ==================== TYPES ====================

interface Step {
  id: number
  quote: string
  name: string
  role: string
  avatar: string
}

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

const STEPS_DATA: Step[] = [
  {
    id: 1,
    quote:
      "We start with imagination. Every idea begins with sketches, visuals, and creative concepts that bring your vision to life. Here, we shape the look and feel the story your brand or project will tell.",
    name: "Design",
    role: "Step 1",
    avatar: "Design",
  },
  {
    id: 2,
    quote:
      "We analyze every angle. Strategy meets creativity as we define purpose, functionality, and impact. It's where design decisions are guided by logic, research, and user needs not just aesthetics.",
    name: "Think",
    role: "Step 2",
    avatar: "Think",
  },
  {
    id: 3,
    quote:
      "Ideas become real. Our team transforms concepts into tangible experiences from detailed visuals and prototypes to complete digital and physical solutions.",
    name: "Make",
    role: "Step 3",
    avatar: "Make",
  },
  {
    id: 4,
    quote:
      "We test everything. We look for weaknesses, challenge assumptions, and refine what doesn't work. Because improvement only happens when you're brave enough to break your own work.",
    name: "Break",
    role: "Step 4",
    avatar: "Break",
  },
  {
    id: 5,
    quote:
      "Excellence is a cycle. We evolve, refine, and repeat until every detail aligns with our vision for quality and innovation. Every project makes the next one better.",
    name: "Repeat",
    role: "Step 5",
    avatar: "Repeat",
  },
]

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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [isDark, setIsDark] = useState(false)

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
      if (!sectionRef.current) return

      const progress = calculateScrollProgress(sectionRef.current)
      setScrollProgress(progress)

      const activeIdx = Math.min(
        Math.floor(progress * STEPS_DATA.length), 
        STEPS_DATA.length - 1
      )
      setActiveIndex(activeIdx)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getActiveAvatarPosition = (): ArcPosition => {
    const totalProgress = scrollProgress * STEPS_DATA.length
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
    const totalProgress = scrollProgress * STEPS_DATA.length
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

  const activeStep = STEPS_DATA[activeIndex] || STEPS_DATA[0]
  const { x, y, opacity, scale, rotation, vw, vh } = getActiveAvatarPosition()
  const { opacity: textOpacity, scale: textScale } = getTextAnimation()

  return (
    <div className="w-full max-w-none">
      <div id="steps" ref={sectionRef} className="relative min-h-screen z-30">
        {/* Sticky Arc Container */}
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none z-30">
          {/* Title */}
          <div className="absolute top-[30%] sm:top-[6%] lg:top-[3%] xl:top-[2%] 2xl:top-[1%] 3xl:top-[1%] 4xl:top-[1%] left-1/2 transform -translate-x-1/2 w-full z-30 px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl 4xl:text-6xl font-bold font-montserrat tracking-tight text-foreground/80 dark:text-primary">
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
              <div className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px] 2xl:w-[70px] 2xl:h-[70px] 3xl:w-[80px] 3xl:h-[80px] 4xl:w-[90px] 4xl:h-[90px] relative">
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center bg-foreground dark:bg-primary-foreground"
                >
                  <span 
                    className="text-[4px] sm:text-[5px] md:text-[8px] lg:text-[9px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text-[16px] font-bold text-center px-1 transition-opacity duration-300 text-primary-foreground dark:text-background"
                    style={{ opacity: opacity > 0.9 ? 1 : 0 }}
                  >
                    {activeStep.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="absolute top-[58%] sm:top-[55%] lg:top-[58%] xl:top-[60%] 2xl:top-[62%] left-1/2 transform -translate-x-1/2 w-full">
              <div className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mx-auto text-center px-4 sm:px-6 md:px-8">
                <div
                  style={{
                    opacity: textOpacity,
                    transform: `scale(${textScale})`,
                    transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                    pointerEvents: textOpacity > 0.1 ? "auto" : "none",
                  }}
                >
                  <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-6">
                    <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base text-primary font-medium">
                      {activeStep.role}
                    </p>
                    <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-xl 4xl:text-xl text-foreground leading-relaxed font-light">
                      "{activeStep.quote}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer divs for scroll */}
        {Array.from({ length: STEPS_DATA.length }).map((_, i) => (
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
