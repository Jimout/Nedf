"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    title1: "Architectural",
    title2: "Design",
    images: [
      { src: "/room1.jpg", alt: "Room1" },
      { src: "/room2.jpg", alt: "Room2" },
      { src: "/room3.jpg", alt: "Room3" },
    ],
  },
  {
    title1: "Interior",
    title2: "Design",
    images: [
      { src: "/interior1.jpg", alt: "Interior1" },
      { src: "/interior2.jpg", alt: "Interior2" },
      { src: "/interior3.jpg", alt: "Interior3" },
    ],
  },
  {
    title1: "Visualization",
    title2: "",
    images: [
      { src: "/visual1.jpg", alt: "Visual1" },
      { src: "/visual2.jpg", alt: "Visual2" },
      { src: "/visual3s.jpg", alt: "Visual3" },
    ],
  },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setTransitioning(true)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % slides.length)
        }, 300)
        setTimeout(() => {
          setTransitioning(false)
        }, 600)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsNavigating(true)
    setTimeout(() => {
      router.push("/portfolio")
    }, 600)
  }

  const slide = slides[currentIndex]

  return (
    <>
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Full-width Section */}
      <section className="pt-20 font-montserrat relative overflow-hidden w-full">
        <div
          className={`flex justify-center items-center gap-14 text-[12px] text-gray-500 mb-12 flex-wrap md:flex-nowrap transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <span
            className={`tracking-widest transition-all duration-700 delay-100 dark:text-[#ec1e24]/60 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            2023
          </span>
          <h1
            className={`text-[40px] font-light text-[#1a1a1a] dark:text-[#ec1e24] font-montserrat whitespace-nowrap tracking-wider transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            PORTFOLIO
          </h1>
          <span
            className={`tracking-widest transition-all duration-700 delay-300 dark:text-[#ec1e24]/60 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            Present
          </span>
        </div>

        {/* Full-width container with minimal padding */}
        <div className="relative w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 w-full">
            <div className="hidden md:flex justify-center items-start gap-14 w-full max-w-[1800px] mx-auto">
              {/* Left column */}
              <div className="flex flex-col w-[22%] lg:w-[20%] xl:w-[18%] items-start">
                <div
                  className={`relative w-full h-[400px] overflow-hidden shadow-2xl shadow-gray-400/20 dark:shadow-[#ec1e24]/30 transition-all duration-[900ms] ${
                    transitioning
                      ? "transform -translate-x-[120%] opacity-0 scale-95"
                      : "transform translate-x-0 opacity-100 scale-100"
                  }`}
                  style={{
                    transitionDelay: transitioning ? "0ms" : "150ms",
                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <Image
                    src={slide.images[0].src || "/placeholder.svg"}
                    alt={slide.images[0].alt}
                    fill
                    className="object-cover transition-all duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div
                  className={`mt-6 transition-all duration-700 ${
                    transitioning ? "transform translate-y-8 opacity-0" : "transform translate-y-0 opacity-100"
                  }`}
                  style={{
                    transitionDelay: transitioning ? "0ms" : "400ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] dark:text-white leading-[1.1] mb-4 tracking-tight">
                    {slide.title1 === "Architectural" ? (
                      <>
                        Architectural{" "}
                        <span className="font-medium bg-gradient-to-r from-gray-800 to-gray-600 dark:from-[#ec1e24] dark:to-[#ec1e24] bg-clip-text text-transparent">
                          Design
                        </span>
                      </>
                    ) : slide.title1 === "Interior" ? (
                      <>
                        Interior{" "}
                        <span className="font-medium bg-gradient-to-r from-gray-800 to-gray-600 dark:from-[#ec1e24] dark:to-[#ec1e24] bg-clip-text text-transparent">
                          Design
                        </span>
                      </>
                    ) : (
                      slide.title1
                    )}
                  </h2>
                  <Button
                    variant="outline"
                    onClick={handleExploreClick}
                    className="rounded-full px-6 py-2 text-sm transition-all duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-1 group active:scale-100 active:translate-y-0 dark:border-[#ec1e24] dark:text-[#ec1e24] dark:hover:bg-[#ec1e24] dark:hover:text-white"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <span className="group-hover:tracking-wide transition-all duration-500">Explore More</span>
                  </Button>
                </div>
              </div>

              {/* Middle Image */}
              <div
                className={`relative w-[35%] lg:w-[38%] xl:w-[36%] h-[400px] overflow-hidden shadow-2xl shadow-gray-400/20 dark:shadow-[#ec1e24]/30 transition-all duration-[1000ms] ${
                  transitioning ? "transform scale-90 opacity-0" : "transform scale-100 opacity-100"
                }`}
                style={{
                  transitionDelay: transitioning ? "100ms" : "250ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <Image
                  src={slide.images[1].src || "/placeholder.svg"}
                  alt={slide.images[1].alt}
                  fill
                  className="object-cover transition-all duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 border border-white/20 pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none" />
              </div>

              {/* Right column */}
              <div
                className={`relative w-[33%] lg:w-[26%] xl:w-[24%] h-[400px] overflow-hidden shadow-2xl shadow-gray-400/20 dark:shadow-[#ec1e24]/30 transition-all duration-[900ms] ${
                  transitioning ? "transform translate-x-[120%] opacity-0 scale-95" : "transform translate-x-0 opacity-100 scale-100"
                }`}
                style={{
                  transitionDelay: transitioning ? "0ms" : "500ms",
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <Image
                  src={slide.images[2].src || "/placeholder.svg"}
                  alt={slide.images[2].alt}
                  fill
                  className="object-cover transition-all duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden w-full flex flex-col items-center">
              <div
                className={`relative w-11/12 h-72 sm:h-96 overflow-hidden shadow-xl transition-all duration-[900ms] ${
                  transitioning ? "transform translate-y-[100%] opacity-0 scale-98" : "transform translate-y-0 opacity-100 scale-100"
                }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <Image
                  src={slide.images[0].src || "/placeholder.svg"}
                  alt={slide.images[0].alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 border border-white/20 pointer-events-none" />
              </div>
              <h2
                className={`text-2xl font-light text-[#001F4B] dark:text-white leading-tight mt-6 whitespace-nowrap text-center transition-all duration-700 ${
                  transitioning ? "transform translate-y-6 opacity-0" : "transform translate-y-0 opacity-100"
                }`}
                style={{
                  transitionDelay: transitioning ? "0ms" : "350ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {slide.title1 === "Architectural" ? (
                  <>
                    Architectural{" "}
                    <span className="font-medium bg-gradient-to-r from-[#001F4B] to-blue-600 dark:from-[#ec1e24] dark:to-[#ec1e24] bg-clip-text text-transparent">
                      Design
                    </span>
                  </>
                ) : slide.title1 === "Interior" ? (
                  <>
                    Interior{" "}
                    <span className="font-medium bg-gradient-to-r from-[#001F4B] to-blue-600 dark:from-[#ec1e24] dark:to-[#ec1e24] bg-clip-text text-transparent">
                      Design
                    </span>
                  </>
                ) : (
                  slide.title1
                )}
              </h2>
              <Button
                variant="outline"
                onClick={handleExploreClick}
                className={`rounded-full px-6 py-2 text-sm mt-4 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-1 group active:scale-100 active:translate-y-0 dark:border-[#ec1e24] dark:text-[#ec1e24] dark:hover:bg-[#ec1e24] dark:hover:text-white ${
                  transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
                style={{
                  transitionDelay: transitioning ? "0ms" : "550ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <span className="group-hover:tracking-wide transition-all duration-500">Explore More</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 gap-3">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-500 cursor-pointer hover:scale-125 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 dark:from-[#ec1e24] dark:to-[#ec1e24]/80 w-8 h-2 shadow-md"
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-[#ec1e24]/30 dark:hover:bg-[#ec1e24]/50 w-2 h-2"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onClick={() => {
                if (index !== currentIndex) {
                  setTransitioning(true)
                  setTimeout(() => setCurrentIndex(index), 150)
                  setTimeout(() => setTransitioning(false), 450)
                }
              }}
            />
          ))}
        </div>
      </section>
    </>
  )
}
