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
      p0 = [0, window.innerHeight * 0.55]
      p1 = [vw * 0.5, window.innerHeight * 0.08]
      p2 = [vw, window.innerHeight * 0.55]
    } else if (vw < 1024) {
      // Tablet: 40px avatar
      p0 = [0, window.innerHeight * 0.6]
      p1 = [vw * 0.5, window.innerHeight * 0.08]
      p2 = [vw, window.innerHeight * 0.6]
    } else {
      // Desktop: 60px avatar
      p0 = [0, window.innerHeight * 0.65]
      p1 = [vw * 0.5, window.innerHeight * 0.08]
      p2 = [vw, window.innerHeight * 0.65]
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
    <div ref={sectionRef} className="relative min-h-screen">
      {/* Sticky Arc Container - Full Height */}
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
          {/* Title */}
          <div className="absolute top-[6%] left-1/2 transform -translate-x-1/2 w-full px-3 sm:px-4 md:px-6 z-20">
          <h2 className="text-center text-4xl font-bold sm:text-5xl font-montserrat tracking-tight" style={{ color: '#ec1e24' }}>
            HOW NEDF WORKS
          </h2>
        </div>
        <div className="relative w-screen h-full -mx-[calc(50vw-50%)] overflow-visible">
          {/* SVG Arc Path - responsive viewBox */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${viewportWidth} ${window.innerHeight}`}
            preserveAspectRatio="none"
            style={{ overflow: "visible" }}
          >
            <path
              d={
                viewportWidth < 768
                  ? `M 0 ${window.innerHeight * 0.55} Q ${viewportWidth * 0.5} ${window.innerHeight * 0.08} ${viewportWidth} ${window.innerHeight * 0.55}`
                  : viewportWidth < 1024
                    ? `M 0 ${window.innerHeight * 0.6} Q ${viewportWidth * 0.5} ${window.innerHeight * 0.08} ${viewportWidth} ${window.innerHeight * 0.6}`
                    : `M 0 ${window.innerHeight * 0.65} Q ${viewportWidth * 0.5} ${window.innerHeight * 0.08} ${viewportWidth} ${window.innerHeight * 0.65}`
              }
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity="1"
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
              {/* Circle background */}
              <div className="w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center">
                {/* Title text */}
                <span 
                  className="text-[6px] sm:text-[8px] md:text-[10px] font-bold text-center px-1 transition-opacity duration-300"
                  style={{ 
                    opacity: opacity > 0.9 ? 1 : 0,
                    color: '#15171a'
                  }}
                >
                  {activeTestimonial.name}
                </span>
              </div>
            </div>
          </div>

          {/* Description text positioned below the arc */}
          <div className="absolute top-[62%] left-1/2 transform -translate-x-1/2 w-full px-3 sm:px-4 md:px-6">
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
