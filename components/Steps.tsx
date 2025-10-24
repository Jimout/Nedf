"use client"

import { useEffect, useRef, useState } from "react"

interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
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

function getRotationAngle(t: number, p0: [number, number], p1: [number, number], p2: [number, number]): number {
  const mt = 1 - t
  const dx = 2 * mt * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0])
  const dy = 2 * mt * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])
  return Math.atan2(dy, dx) * (180 / Math.PI)
}

export default function ArcTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)

  useEffect(() => {
    setViewportWidth(window.innerWidth)
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height

      const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))

      setScrollProgress(progress)

      const activeIdx = Math.min(Math.floor(progress * testimonials.length), testimonials.length - 1)
      setActiveIndex(activeIdx)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getActiveAvatarPosition = () => {
    const totalProgress = scrollProgress * testimonials.length
    const activeIdx = Math.floor(totalProgress)
    const localProgress = Math.min(totalProgress - activeIdx, 1)

    const progress = Math.max(0, Math.min(1, localProgress))

    let p0: [number, number], p1: [number, number], p2: [number, number]
    const vw = viewportWidth

    if (vw < 768) {
      // Mobile: 20px avatar
      p0 = [vw * 0.05, 400]
      p1 = [vw * 0.5, 100]
      p2 = [vw * 0.95, 400]
    } else if (vw < 1024) {
      // Tablet: 40px avatar
      p0 = [vw * 0.125, 450]
      p1 = [vw * 0.5, 100]
      p2 = [vw * 0.875, 450]
    } else {
      // Desktop: 60px avatar
      p0 = [vw * 0.083, 500]
      p1 = [vw * 0.5, 100]
      p2 = [vw * 0.917, 500]
    }

    const [arcX, arcY] = getPointOnBezier(progress, p0, p1, p2)
    const rotation = getRotationAngle(progress, p0, p1, p2)

    const scale = 4

    const opacity = Math.abs(Math.cos((progress - 0.5) * Math.PI)) * 0.5 + 0.5

    return { x: arcX, y: arcY, opacity, scale, rotation }
  }

  const getTextAnimation = () => {
    const totalProgress = scrollProgress * testimonials.length
    const localProgress = totalProgress - activeIndex

    const progress = Math.max(0, Math.min(1, localProgress))

    const distanceFromCenter = Math.abs(progress - 0.5)
    const opacity = Math.max(0, 1 - distanceFromCenter * 2)
    const scale = 0.8 + (1 - distanceFromCenter * 2) * 0.2

    return { opacity, scale }
  }

  const activeTestimonial = testimonials[activeIndex] || testimonials[0]
  const { x, y, opacity, scale, rotation } = getActiveAvatarPosition()
  const { opacity: textOpacity, scale: textScale } = getTextAnimation()

  return (
    <div ref={sectionRef} className="relative min-h-screen py-12 sm:py-16 md:py-20">
      {/* Title */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 pb-0">
        <p className="text-center text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-medium text-[#333333] dark:text-[#ec1e24] font-montserrat tracking-wider">
          HOW NEDF WORKS
        </p>
      </div>
      {/* Sticky Arc Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
        <div className="relative w-screen h-full -mx-[calc(50vw-50%)] overflow-visible">
          {/* SVG Arc Path - responsive viewBox */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${viewportWidth} 600`}
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d={
                viewportWidth < 768
                  ? `M ${viewportWidth * 0.05} 400 Q ${viewportWidth * 0.5} 100 ${viewportWidth * 0.95} 400`
                  : viewportWidth < 1024
                    ? `M ${viewportWidth * 0.125} 450 Q ${viewportWidth * 0.5} 100 ${viewportWidth * 0.875} 450`
                    : `M ${viewportWidth * 0.083} 500 Q ${viewportWidth * 0.5} 100 ${viewportWidth * 0.917} 500`
              }
              stroke="#001F4B"
              strokeWidth="3"
              fill="none"
              opacity="0.8"
              filter="url(#glow)"
              className="dark:stroke-[#ec1e24]"
            />
          </svg>

          <div
            className="absolute z-10"
            style={{
              left: `${(x / viewportWidth) * 100}%`,
              top: `${(y / 600) * 100}%`,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
              opacity,
            }}
          >
            <div className="w-[20px] h-[20px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] shadow-lg relative">
              <img 
                src="/LOGO FOR THE WEBISTE-06.png" 
                alt="NEDF Studios Logo" 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span 
                  className="text-[6px] sm:text-[8px] md:text-[10px] font-bold text-white bg-black/50 px-1 py-0.5 rounded transition-opacity duration-300"
                  style={{ 
                    opacity: opacity > 0.9 ? 1 : 0
                  }}
                >
                  {activeTestimonial.avatar}
                </span>
              </div>
            </div>
          </div>

          {/* Description text positioned at bottom with avatar overlaying */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full px-3 sm:px-4 md:px-6 pb-6 sm:pb-8 md:pb-12">
            <div className="max-w-xs sm:max-w-sm md:max-w-2xl mx-auto text-center">
              <div
                style={{
                  opacity: textOpacity,
                  transform: `scale(${textScale})`,
                  transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                  pointerEvents: textOpacity > 0.1 ? "auto" : "none",
                }}
              >
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-foreground leading-relaxed font-light">
                    "{activeTestimonial.quote}"
                  </p>

                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-base sm:text-lg md:text-lg font-semibold text-foreground">
                      {activeTestimonial.name}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{activeTestimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {Array.from({ length: Math.max(5, testimonials.length) }).map((_, i) => (
        <div key={i} className="h-screen" />
      ))}
    </div>
  )
}
