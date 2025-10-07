"use client"

import { useEffect, useRef, useState } from "react"
import Stats from "./Stats"

const words = ["Designers", "Creators", "Resolvers"]

export default function HeroWithStats() {
  const extendedWords = [...words, words[0]]
  const containerRef = useRef<HTMLDivElement>(null)

  // Dynamically set lineHeight based on screen size
  const getLineHeight = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1536) {
        return 180 // 2xl screen
      } else if (window.innerWidth < 640) {
        return 64 // mobile line height (increased for visibility)
      }
    }
    return 96 // standard screens
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
    const interval = setInterval(() => setIndex((prev) => prev + 1), 2600)
    return () => clearInterval(interval)
  }, [])

  // Reset animation when reaching the last word
  useEffect(() => {
    if (index === words.length) {
      const timeout = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "none"
          setIndex(0)
          containerRef.current.style.transform = `translateY(0px)`
          containerRef.current.offsetHeight // force reflow
          containerRef.current.style.transition =
            "transform 700ms cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        }
      }, 700)
      return () => clearTimeout(timeout)
    }
  }, [index])

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-start font-montserrat overflow-hidden px-1 sm:px-2 lg:px-4 2xl:px-8 max-w-7xl mx-auto min-h-[65vh] -mt-4 max-sm:-mt-20">
        <div className="flex items-center max-sm:items-start gap-2 max-sm:gap-1">
          {/* Rotated NEDF */}
          <div className="select-none text-[#001F4B] tracking-wider text-[80px] rotate-[-90deg] max-sm:text-[48px] font-extralight 2xl:font-light 2xl:text-[100px] -ml-2 max-sm:-ml-1">
            NEDF
          </div>

          {/* Text Block */}
          <div className="flex flex-col justify-center max-sm:mt-[-24px] max-sm:ml-[-6px]">
            <div
              className="flex items-center max-sm:flex-col max-sm:items-start"
              style={{ height: `${lineHeight}px` }}
            >
              <span className="text-[58px] font-thin text-[#333333]/80 tracking-wide mr-2 max-sm:text-[26px] max-sm:mb-[-4px] max-sm:ml-[24px] 2xl:text-[70px] 2xl:font-normal">
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
                      className="block font-medium text-[#001F4B] text-[85px] leading-none whitespace-nowrap max-sm:text-[44px] 2xl:text-[110px]"
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

      {/* Stats Section */}
      <Stats />
    </>
  )
}
