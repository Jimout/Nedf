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
      "We believe in creating spaces that are both functional and inspiring, combining modern aesthetics with local cultural influences.",
    name: "Design Philosophy",
    role: "Core Value",
    avatar: "DP",
  },
  {
    id: 2,
    quote:
      "Our expertise spans across architecture, interior design, and product design, offering comprehensive solutions from concept to completion.",
    name: "Sustainability & Innovation",
    role: "Approach",
    avatar: "SI",
  },
  {
    id: 3,
    quote:
      "Committed to eco-friendly practices, we integrate sustainable materials and cutting-edge technology to minimize environmental impact.",
    name: "Services Offered",
    role: "Commitment",
    avatar: "SO",
  },
  {
    id: 4,
    quote:
      "Rooted in Addis Ababa's rich heritage, we collaborate with local artisans and craftsmen to celebrate culture in every project.",
    name: "Community & Culture",
    role: "Foundation",
    avatar: "CC",
  },
  {
    id: 5,
    quote:
      "Every project is a journey of discovery, where we listen to our clients' vision and transform it into reality with precision and creativity.",
    name: "Client-Centric Design",
    role: "Philosophy",
    avatar: "CD",
  },
  {
    id: 6,
    quote:
      "We push boundaries and challenge conventions to create spaces that inspire, innovate, and leave a lasting impact on communities.",
    name: "Vision & Impact",
    role: "Mission",
    avatar: "VI",
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

  const activeTestimonial = testimonials[activeIndex]
  const { x, y, opacity, scale, rotation } = getActiveAvatarPosition()
  const { opacity: textOpacity, scale: textScale } = getTextAnimation()

  return (
    <div ref={sectionRef} className="relative min-h-screen py-12 sm:py-16 md:py-20">
      {/* Title */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 pb-0">
        <p className="text-center text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-medium text-[#333333] dark:text-[#ec1e24] font-montserrat tracking-wider">
          CLIENT REFLECTION
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
            <path
              d={
                viewportWidth < 768
                  ? `M ${viewportWidth * 0.05} 400 Q ${viewportWidth * 0.5} 100 ${viewportWidth * 0.95} 400`
                  : viewportWidth < 1024
                    ? `M ${viewportWidth * 0.125} 450 Q ${viewportWidth * 0.5} 100 ${viewportWidth * 0.875} 450`
                    : `M ${viewportWidth * 0.083} 500 Q ${viewportWidth * 0.5} 100 ${viewportWidth * 0.917} 500`
              }
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
              className="text-foreground"
            />
          </svg>

          <div
            className="absolute"
            style={{
              left: `${(x / viewportWidth) * 100}%`,
              top: `${(y / 600) * 100}%`,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
              opacity,
            }}
          >
            <div className="w-[20px] h-[20px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs sm:text-sm md:text-base shadow-lg">
              {activeTestimonial.avatar}
            </div>
          </div>

          {/* Description text positioned at bottom with avatar overlaying */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full px-3 sm:px-4 md:px-6 pb-6 sm:pb-8 md:pb-12">
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
