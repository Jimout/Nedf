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
    setCurrentSlide((prev) => (prev + 1 > totalSlides ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 < 0 ? totalSlides : prev - 1))
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-[#001F4B]" />
      </button>

      {/* Images Container */}
      <div className="flex transition-transform duration-700 ease-in-out">
        {images.map((img, idx) => {
          let width = "0%" // default hidden
          if (idx === currentSlide)
            width = "75%" // first image in pair
          else if (idx === currentSlide + 1) width = "25%" // second image in pair

          return (
            <div
              key={idx}
              className="flex-shrink-0"
              style={{ width, marginRight: `${gap}px`, transition: "width 0.7s" }}
            >
              {(idx === currentSlide || idx === currentSlide + 1) && (
                <Image
                  src={img || "/placeholder.svg"}
                  alt={alts[idx]}
                  width={700}
                  height={400}
                  className={`w-full h-[400px] object-cover transition-opacity duration-300 ${
                    idx === currentSlide + 1 ? "opacity-30" : ""
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronRight className="w-6 h-6 text-[#001F4B]" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? "bg-[#001F4B]" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  )
}
