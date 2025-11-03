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
      if (window.innerWidth >= 1536) return 180
      if (window.innerWidth >= 1280) return 160
      if (window.innerWidth >= 1024) return 140
      if (window.innerWidth < 640) return 72
    }
    return 96
  }

  const [lineHeight, setLineHeight] = useState(() => getLineHeight())
  const [index, setIndex] = useState(0)

  // 📐 Update line height on window resize
  useEffect(() => {
    const updateLineHeight = () => setLineHeight(getLineHeight())
    updateLineHeight()
    window.addEventListener("resize", updateLineHeight)
    return () => window.removeEventListener("resize", updateLineHeight)
  }, [])

  // 🔁 Rotate words every 1.5 seconds - simple cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* 🧭 Hero Section */}
      <section className="relative flex items-center justify-start font-sans overflow-hidden px-1 sm:px-2 lg:px-4 2xl:px-8 max-w-7xl mx-auto min-h-[65vh] mt-16 max-sm:mt-8 z-10">
        <div className="flex items-center max-sm:items-start gap-8 max-sm:gap-6">
          {/* 🪙 Logo */}
          <div className="select-none -ml-2 max-sm:-ml-1">
            <Image
              src="/NAVIGATION BAR LOGO OPTION 1.png"
              alt="NEDF Logo"
              width={140}
              height={140}
              className="object-contain max-sm:w-[110px] max-sm:h-[110px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] 2xl:w-[240px] 2xl:h-[240px] dark:hidden"
            />
            <Image
              src="/LOGO FOR THE WEBISTE-06.png"
              alt="NEDF Logo Dark"
              width={140}
              height={140}
              className="object-contain max-sm:w-[110px] max-sm:h-[110px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] 2xl:w-[240px] 2xl:h-[240px] hidden dark:block"
            />
          </div>

          {/* 📝 Text Block */}
          <div className="flex flex-col justify-center max-sm:mt-[-24px] max-sm:ml-[-6px]">
            <div className="flex items-center max-sm:flex-col max-sm:items-start" style={{ height: `${lineHeight}px` }}>
              <span className="text-[48px] font-thin text-[#333333]/80 dark:text-white/80 tracking-wide mr-2 max-sm:text-[24px] max-sm:mb-[-4px] max-sm:ml-[24px] lg:text-[54px] xl:text-[60px] 2xl:text-[68px] 2xl:font-normal">
                We Are
              </span>

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
                  ref={containerRef}
                  style={{
                    transform: `translateY(-${index * lineHeight}px)`,
                    transition: "transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    willChange: "transform",
                  }}
                >
                  {words.map((word, i) => (
                    <span
                      key={i}
                      className="block font-medium text-[#002E47] dark:text-[#ec1e24] text-[80px] leading-none whitespace-nowrap max-sm:text-[42px] lg:text-[90px] xl:text-[100px] 2xl:text-[110px]"
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
