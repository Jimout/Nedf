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

export default function Portfolio() {
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
            className="fixed inset-0 z-50 pointer-events-none bg-background"
          />
        )}
      </AnimatePresence>

      {/* Full-width Section */}
      <section id="portfolio" className="pt-12 sm:pt-14 md:pt-16 lg:pt-20 xl:pt-20 2xl:pt-24 3xl:pt-[112px] 4xl:pt-32 font-montserrat relative overflow-hidden w-full">
        <div className="2xl:-mx-12 2xl:px-16 3xl:-mx-16 3xl:px-20 4xl:-mx-20 4xl:px-24">
        <div
          className={`flex justify-center items-center gap-4 sm:gap-5 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 3xl:gap-16 4xl:gap-20 mb-8 sm:mb-9 md:mb-10 lg:mb-11 xl:mb-12 2xl:mb-14 3xl:mb-16 4xl:mb-20 flex-nowrap transition-all duration-300 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <span
            className={`text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base tracking-widest transition-all duration-100 delay-50 text-muted-foreground ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            2024
          </span>
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl 4xl:text-6xl font-bold text-center whitespace-nowrap tracking-tight transition-all duration-100 delay-100 text-foreground/80 dark:text-primary ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            PORTFOLIO
          </h1>
          <span
            className={`text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base tracking-widest transition-all duration-100 delay-150 text-muted-foreground ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            Present
          </span>
        </div>

        {/* Full-width container aligned with navbar */}
        <div className="relative w-full">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-5 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 w-full">
            <div className="hidden md:flex justify-between items-start gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 w-full">
              {/* Left column */}
              <div className="flex flex-col w-[28%] lg:w-[27%] xl:w-[26%] 2xl:w-[25%] items-start">
                <div
                  className={`relative w-full h-[320px] md:h-[360px] lg:h-[400px] xl:h-[460px] 2xl:h-[520px] overflow-hidden shadow-xl shadow-border/20 dark:shadow-background/40 transition-all duration-[900ms] ${
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
                  <div className="absolute inset-0 opacity-0 dark:opacity-10 bg-background" />
                </div>

                <div
                  className={`mt-4 md:mt-5 lg:mt-6 xl:mt-7 2xl:mt-8 transition-all duration-700 ${
                    transitioning ? "transform translate-y-8 opacity-0" : "transform translate-y-0 opacity-100"
                  }`}
                  style={{
                    transitionDelay: transitioning ? "0ms" : "400ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light text-foreground leading-[1.1] mb-3 md:mb-3 lg:mb-4 xl:mb-4 2xl:mb-5 tracking-tight">
                    {slide.title1 === "Architectural" ? (
                      <>
                        Architectural{" "}
                        <span className="font-medium text-primary">Design</span>
                      </>
                    ) : slide.title1 === "Interior" ? (
                      <>
                        Interior{" "}
                        <span className="font-medium text-primary">Design</span>
                      </>
                    ) : (
                      slide.title1
                    )}
                  </h2>
                  <Button
                    variant="outline"
                    onClick={handleExploreClick}
                    className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-9 py-2 md:py-2.5 lg:py-2.5 xl:py-3 2xl:py-3 text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg transition-all duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-1 group active:scale-100 active:translate-y-0"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <span className="group-hover:tracking-wide transition-all duration-500">Explore More</span>
                  </Button>
                </div>
              </div>

              {/* Middle Image */}
              <div
                className={`relative min-w-0 w-[40%] lg:w-[40%] xl:w-[40%] 2xl:w-[42%] h-[320px] md:h-[360px] lg:h-[400px] xl:h-[460px] 2xl:h-[520px] overflow-hidden shadow-xl shadow-border/20 dark:shadow-background/40 transition-all duration-[1000ms] ${
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
                <div className="absolute inset-0 opacity-0 dark:opacity-10 bg-background" />
              </div>

              {/* Right column */}
              <div
                className={`relative w-[28%] lg:w-[27%] xl:w-[26%] 2xl:w-[25%] h-[320px] md:h-[360px] lg:h-[400px] xl:h-[460px] 2xl:h-[520px] overflow-hidden shadow-xl shadow-border/20 dark:shadow-background/40 transition-all duration-[900ms] ${
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
                <div className="absolute inset-0 opacity-0 dark:opacity-10 bg-background" />
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden w-full flex flex-col items-center">
              <div
                className={`relative w-11/12 h-72 sm:h-80 overflow-hidden shadow-xl shadow-border/20 dark:shadow-background/40 transition-all duration-[900ms] ${
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
                <div className="absolute inset-0 opacity-0 dark:opacity-10 bg-background" />
              </div>
              <h2
                className={`text-xl sm:text-2xl font-light text-foreground leading-tight mt-4 sm:mt-5 whitespace-nowrap text-center transition-all duration-700 ${
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
                    <span className="font-medium text-primary">Design</span>
                  </>
                ) : slide.title1 === "Interior" ? (
                  <>
                    Interior{" "}
                    <span className="font-medium text-primary">Design</span>
                  </>
                ) : (
                  slide.title1
                )}
              </h2>
              <Button
                variant="outline"
                onClick={handleExploreClick}
                className={`rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm mt-3 sm:mt-4 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-1 group active:scale-100 active:translate-y-0 ${
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
        <div className="flex justify-center mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-9 3xl:mt-10 4xl:mt-12 gap-2 sm:gap-2.5 md:gap-3 lg:gap-3 xl:gap-3.5 2xl:gap-4 3xl:gap-4 4xl:gap-5">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-500 cursor-pointer hover:scale-125 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-muted-foreground to-muted dark:from-primary dark:to-primary/80 w-6 sm:w-7 md:w-8 lg:w-9 xl:w-10 2xl:w-11 h-1.5 sm:h-1.5 md:h-2 lg:h-2 xl:h-2.5 2xl:h-2.5 shadow-md"
                  : "bg-muted hover:bg-muted-foreground/50 dark:bg-primary/30 dark:hover:bg-primary/50 w-1.5 sm:w-1.5 md:w-2 lg:w-2 xl:w-2.5 2xl:w-2.5 h-1.5 sm:h-1.5 md:h-2 lg:h-2 xl:h-2.5 2xl:h-2.5"
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
        </div>
      </section>
    </>
  )
}
