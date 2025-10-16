"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Stats from "./Stats"

const words = ["Designers", "Creators", "Resolvers"]

export default function HeroWithStats() {
  const extendedWords = words
  const containerRef = useRef<HTMLDivElement>(null)

  // Dynamically set lineHeight based on screen size to match logo
  const getLineHeight = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1536) {
        return 220 // 2xl screen - matches 220px logo
      } else if (window.innerWidth >= 1280) {
        return 200 // xl screen - matches 200px logo
      } else if (window.innerWidth >= 1024) {
        return 180 // lg screen - matches 180px logo
      } else if (window.innerWidth < 640) {
        return 100 // mobile line height - matches 100px logo
      }
    }
    return 120 // standard screens - matches 120px logo
  }

  const [lineHeight, setLineHeight] = useState(getLineHeight)
  const [index, setIndex] = useState(0)

  // Update lineHeight on resize
  useEffect(() => {
    function updateLineHeight() {
      setLineHeight(getLineHeight())
    }

    updateLineHeight()
    window.addEventListener("resize", updateLineHeight)
    return () => window.removeEventListener("resize", updateLineHeight)
  }, [])

  // Rotate words every 2.6s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-start font-montserrat overflow-hidden px-1 sm:px-2 lg:px-4 2xl:px-8 max-w-7xl mx-auto min-h-[65vh] mt-16 max-sm:mt-8">
        <div className="flex items-center max-sm:items-start gap-8 max-sm:gap-6">
          {/* Rotated Logo */}
          <div className="select-none -ml-2 max-sm:-ml-1">
            <Image
              src="/HERO SECTION LOGO.png"
              alt="NEDF Logo"
              width={120}
              height={120}
              className="object-contain max-sm:w-[100px] max-sm:h-[100px] lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px] 2xl:w-[220px] 2xl:h-[220px] dark:hidden"
            />
            <Image
              src="/LOGO FOR THE WEBISTE-04.PNG"
              alt="NEDF Logo Dark"
              width={120}
              height={120}
              className="object-contain max-sm:w-[100px] max-sm:h-[100px] lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px] 2xl:w-[220px] 2xl:h-[220px] hidden dark:block"
            />
          </div>

          {/* Text Block */}
          <div className="flex flex-col justify-center max-sm:mt-[-24px] max-sm:ml-[-6px]">
            <div
              className="flex items-center max-sm:flex-col max-sm:items-start"
              style={{ height: `${lineHeight}px` }}
            >
              <span className="text-[58px] font-thin text-[#333333]/80 dark:text-white/80 tracking-wide mr-2 max-sm:text-[26px] max-sm:mb-[-4px] max-sm:ml-[24px] lg:text-[65px] xl:text-[70px] 2xl:text-[75px] 2xl:font-normal">
                We Are
              </span>

              <div
                className="overflow-hidden relative"
                style={{
                  height: `${lineHeight}px`,
                  maxHeight: `${lineHeight}px`,
                }}
              >
                <div
                  ref={containerRef}
                  className="will-change-transform"
                  style={{
                    transform: `translateY(-${index * lineHeight}px)`,
                    transition:
                      "transform 700ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                  }}
                >
                  {extendedWords.map((word, i) => (
                    <span
                      key={i}
                      className="block font-medium text-[#001F4B] dark:text-[#ec1e24] text-[85px] leading-none whitespace-nowrap max-sm:text-[44px] lg:text-[95px] xl:text-[105px] 2xl:text-[115px]"
                      style={{
                        height: `${lineHeight}px`,
                        lineHeight: `${lineHeight}px`,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gap before Stats */}
      <div className="h-16 max-sm:h-12"></div>

      {/* Stats Section */}
      <Stats />
    </>
  )
}
