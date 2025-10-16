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
        return 160 // 2xl screen - matches smaller dynamic words
      } else if (window.innerWidth >= 1280) {
        return 140 // xl screen - matches smaller dynamic words
      } else if (window.innerWidth >= 1024) {
        return 120 // lg screen - matches smaller dynamic words
      } else if (window.innerWidth < 640) {
        return 60 // mobile line height - matches smaller dynamic words
      }
    }
    return 80 // standard screens - matches smaller dynamic words
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

  // Rotate words every 1.8s for faster, smoother animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-start font-montserrat overflow-hidden px-1 sm:px-2 lg:px-4 2xl:px-8 max-w-7xl mx-auto min-h-[65vh] mt-16 max-sm:mt-8 z-10">
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
              src="/LOGO FOR THE WEBISTE-04.png"
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
              <span className="text-[32px] font-thin text-[#333333]/80 dark:text-white/60 tracking-wide mr-2 max-sm:text-[16px] max-sm:mb-[-4px] max-sm:ml-[24px] lg:text-[38px] xl:text-[42px] 2xl:text-[46px] 2xl:font-normal">
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
                      "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {extendedWords.map((word, i) => (
                    <span
                      key={i}
                      className="block font-medium text-[#001F4B] dark:text-[#ec1e24] text-[55px] leading-none whitespace-nowrap max-sm:text-[28px] lg:text-[65px] xl:text-[75px] 2xl:text-[85px]"
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
