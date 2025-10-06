"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"

const slides = [
  {
    title1: "Architectural",
    title2: "Design",
    images: [
      { src: "/Room1.jpg", alt: "Room1" },
      { src: "/Room2.jpg", alt: "Room2" },
      { src: "/Room3.jpg", alt: "Room3" },
    ],
  },
  {
    title1: "Interior",
    title2: "Design",
    images: [
      { src: "/Interior1.jpg", alt: "Interior1" },
      { src: "/Interior2.jpg", alt: "Interior2" },
      { src: "/Interior1.jpg", alt: "Interior3" },
    ],
  },
  {
    title1: "Visualization",
    title2: "",
    images: [
      { src: "/Visual1.jpg", alt: "Visual1" },
      { src: "/Visual2.jpg", alt: "Visual2" },
      { src: "/Visual3.jpg", alt: "Visual3" },
    ],
  },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length)
      }, 200) // Reduced timing for faster transitions

      setTimeout(() => {
        setTransitioning(false)
      }, 400) // Reduced timing for faster transitions
    }, 3000) // Increased interval for better viewing time

    return () => clearInterval(interval)
  }, [])

  const slide = slides[currentIndex]

  return (
    <section className="sm:px-6 md:px-16 pt-20 font-montserrat relative overflow-hidden bg-gradient-to-b from-gray-50/30">
      <div
        className={`flex justify-center items-center gap-14 text-[12px] text-gray-500 mb-12 flex-wrap md:flex-nowrap transition-all duration-1000 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        <span
          className={`tracking-widest transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          2023
        </span>
        <h1
          className={`text-[40px] font-light text-[#1a1a1a] font-montserrat whitespace-nowrap tracking-wider transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          PORTFOLIO
        </h1>
        <span
          className={`tracking-widest transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          Present
        </span>
      </div>

      {/* Slide Section */}
      <div className="relative flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
        {/* Desktop view */}
        <div className="hidden md:flex gap-16 items-start">
          <div className="flex flex-col w-[240px] items-start">
            <div
              className={`relative w-full h-[320px] overflow-hidden shadow-lg transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                transitioning
                  ? "transform -translate-x-[150%] opacity-0 scale-90 rotate-[-2deg]"
                  : "transform translate-x-0 opacity-100 scale-100 rotate-0"
              }`}
              style={{
                transitionDelay: transitioning ? "0ms" : "100ms",
              }}
            >
              <Image
                src={slide.images[0].src || "/placeholder.svg"}
                alt={slide.images[0].alt}
                fill
                className="object-cover transition-all duration-700 ease-out hover:scale-110 hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div
              className={`mt-6 max-w-[240px] transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                transitioning
                  ? "transform translate-y-12 opacity-0 blur-sm"
                  : "transform translate-y-0 opacity-100 blur-0"
              }`}
              style={{
                transitionDelay: transitioning ? "0ms" : "300ms",
              }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] leading-[1.1] mb-4 tracking-tight">
                {slide.title1} <br />
                <span className="font-medium bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {slide.title2}
                </span>
              </h2>
              <Button
                variant="outline"
                className="rounded-full px-6 py-2 text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 bg-white/90 backdrop-blur-sm border-gray-200 hover:border-gray-400 hover:bg-white group"
              >
                <span className="group-hover:tracking-wide transition-all duration-300">Explore More</span>
              </Button>
            </div>
          </div>

          <div
            className={`relative w-[400px] h-[380px] overflow-hidden shadow-2xl transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              transitioning
                ? "transform scale-[0.2] opacity-0 rotate-12 blur-md"
                : "transform scale-100 opacity-100 rotate-0 blur-0"
            }`}
            style={{
              transitionDelay: transitioning ? "50ms" : "200ms",
            }}
          >
            <Image
              src={slide.images[1].src || "/placeholder.svg"}
              alt={slide.images[1].alt}
              fill
              className="object-cover transition-all duration-700 ease-out hover:scale-110"
            />
            <div className="absolute inset-0 border border-white/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </div>

          <div
            className={`relative w-[280px] h-[400px] mt-8 overflow-hidden shadow-lg transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              transitioning
                ? "transform translate-x-[150%] opacity-0 scale-90 rotate-2"
                : "transform translate-x-0 opacity-100 scale-100 rotate-0"
            }`}
            style={{
              transitionDelay: transitioning ? "0ms" : "400ms",
            }}
          >
            <Image
              src={slide.images[2].src || "/placeholder.svg"}
              alt={slide.images[2].alt}
              fill
              className="object-cover transition-all duration-700 ease-out hover:scale-110 hover:rotate-[-1deg]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="md:hidden w-full flex flex-col items-center">
          <div
            className={`relative w-11/12 h-72 sm:h-96 overflow-hidden shadow-xl transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              transitioning
                ? "transform translate-y-[120%] opacity-0 scale-95 rotate-1"
                : "transform translate-y-0 opacity-100 scale-100 rotate-0"
            }`}
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
            className={`text-2xl font-light text-[#001F4B] leading-tight mt-6 whitespace-nowrap text-center transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              transitioning ? "transform translate-y-8 opacity-0 blur-sm" : "transform translate-y-0 opacity-100 blur-0"
            }`}
            style={{
              transitionDelay: transitioning ? "0ms" : "300ms",
            }}
          >
            {slide.title1}{" "}
            <span className="font-medium bg-gradient-to-r from-[#001F4B] to-blue-600 bg-clip-text text-transparent">
              {slide.title2}
            </span>
          </h2>
          <Button
            variant="outline"
            className={`rounded-full px-6 py-2 text-sm mt-4 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:-translate-y-1 bg-[#001F4B]/90 text-white border-[#001F4B] hover:bg-[#001F4B] group ${
              transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
            style={{
              transitionDelay: transitioning ? "0ms" : "500ms",
            }}
          >
            <span className="group-hover:tracking-wide transition-all duration-300">Explore More</span>
          </Button>
        </div>
      </div>

      <div className="flex justify-center mt-12 gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer hover:scale-125 ${
              index === currentIndex
                ? "bg-gradient-to-r from-gray-400 to-gray-500 w-8 h-2 shadow-md"
                : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
            }`}
            onClick={() => {
              if (index !== currentIndex) {
                setTransitioning(true)
                setTimeout(() => setCurrentIndex(index), 100) // Reduced from 200ms to 100ms
                setTimeout(() => setTransitioning(false), 300) // Reduced from 600ms to 300ms
              }
            }}
          />
        ))}
      </div>
    </section>
  )
}
