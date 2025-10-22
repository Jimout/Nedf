"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Stats from "./Stats"

const words = ["Creators", "Designers", "Resolvers"]

export default function HeroWithStats() {
  const containerRef = useRef<HTMLDivElement>(null)

  // 🧮 Dynamically calculate line height based on screen size
  const getLineHeight = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1536) return 160
      if (window.innerWidth >= 1280) return 140
      if (window.innerWidth >= 1024) return 120
      if (window.innerWidth < 640) return 60
    }
    return 80
  }

  const [lineHeight, setLineHeight] = useState(getLineHeight)
  const [index, setIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)

  // 👇 Duplicate the first word at the end to make the loop smooth
  const extendedWords = [...words, words[0]]

  // 📐 Update line height on window resize
  useEffect(() => {
    const updateLineHeight = () => setLineHeight(getLineHeight())
    updateLineHeight()
    window.addEventListener("resize", updateLineHeight)
    return () => window.removeEventListener("resize", updateLineHeight)
  }, [])

  // 🔁 Rotate words every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  // 🪄 When we hit the fake last slide (duplicate), snap back to 0 without transition
  useEffect(() => {
    if (index === extendedWords.length - 1) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false)
        setIndex(0)
      }, 400) // match transition duration
      return () => clearTimeout(timeout)
    } else {
      setIsTransitioning(true)
    }
  }, [index, extendedWords.length])

  return (
    <>
      {/* 🧭 Hero Section */}
      <section className="relative flex items-center justify-start font-montserrat overflow-hidden px-1 sm:px-2 lg:px-4 2xl:px-8 max-w-7xl mx-auto min-h-[65vh] mt-16 max-sm:mt-8 z-10">
        <div className="flex items-center max-sm:items-start gap-8 max-sm:gap-6">
          {/* 🪙 Logo */}
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

          {/* 📝 Text Block */}
          <div className="flex flex-col justify-center max-sm:mt-[-24px] max-sm:ml-[-6px]">
            <div
              className="flex items-center max-sm:flex-col max-sm:items-start"
              style={{ height: `${lineHeight}px` }}
            >
              <span className="text-[32px] font-thin text-[#333333]/80 dark:text-white/80 tracking-wide mr-2 max-sm:text-[16px] max-sm:mb-[-4px] max-sm:ml-[24px] lg:text-[38px] xl:text-[42px] 2xl:text-[46px] 2xl:font-normal">
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
                  style={{
                    transform: `translateY(-${index * lineHeight}px)`,
                    transition: isTransitioning
                      ? "transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                      : "none",
                  }}
                >
                  {extendedWords.map((word, i) => (
                    <span
                      key={i}
                      className="block font-medium text-[#001F4B] dark:text-[#ec1e24] text-[55px] leading-none whitespace-nowrap max-sm:text-[28px] lg:text-[65px] xl:text-[75px] 2xl:text-[85px]"
                      style={{
                        height: `${lineHeight}px`,
                        lineHeight: `${lineHeight}px`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
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

      {/* 🕳️ Gap before Stats */}
      <div className="h-16 max-sm:h-12"></div>

      {/* 📊 Stats Section */}
      <Stats />
    </>
  )
}
