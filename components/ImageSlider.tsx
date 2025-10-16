"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageSliderProps {
  images: string[]
  alts: string[]
  gap?: number
}

export default function ImageSlider({ images, alts, gap = 10 }: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const totalSlides = images.length - 1 // sliding window of 2

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  const isAtStart = currentSlide === 0
  const isAtEnd = currentSlide === totalSlides

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        disabled={isAtStart}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-[#15171a]/80 hover:bg-white dark:hover:bg-[#15171a] rounded-full p-2 shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/80 dark:disabled:hover:bg-[#15171a]/80"
      >
        <ChevronLeft className="w-6 h-6 text-[#001F4B] dark:text-[#ec1e24]" />
      </button>

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((img, idx) => {
          const isMainImage = idx === currentSlide
          const isSecondaryImage = idx === currentSlide + 1

          return (
            <div
              key={idx}
              className="flex-shrink-0 flex"
              style={{
                width: "100%",
                gap: `${gap}px`,
              }}
            >
              <div className="flex-shrink-0" style={{ width: "75%" }}>
                <Image
                  src={img || "/placeholder.svg"}
                  alt={alts[idx]}
                  width={700}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {idx < images.length - 1 && (
                <div className="flex-shrink-0" style={{ width: "25%" }}>
                  <Image
                    src={images[idx + 1] || "/placeholder.svg"}
                    alt={alts[idx + 1]}
                    width={300}
                    height={400}
                    className="w-full h-[400px] object-cover opacity-30"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        disabled={isAtEnd}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-[#15171a]/80 hover:bg-white dark:hover:bg-[#15171a] rounded-full p-2 shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/80 dark:disabled:hover:bg-[#15171a]/80"
      >
        <ChevronRight className="w-6 h-6 text-[#001F4B] dark:text-[#ec1e24]" />
      </button>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalSlides + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? "bg-[#001F4B] dark:bg-[#ec1e24]" : "bg-gray-300 dark:bg-gray-600"}`}
          />
        ))}
      </div>
    </div>
  )
}
