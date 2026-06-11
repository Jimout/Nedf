"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={prevSlide}
        disabled={isAtStart}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:translate-y-[-50%] hover:shadow-lg dark:bg-[#15171a]/80 dark:hover:bg-[#15171a] disabled:opacity-30"
      >
        <ChevronLeft className="h-6 w-6 text-[#001F4B] dark:text-[#ec1e24]" />
      </Button>

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((img, idx) => {
          return (
            <div
              key={idx}
              className="flex-shrink-0 flex"
              style={{
                width: "100%",
                gap: `${gap}px`,
              }}
            >
              <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "75%" }}>
                <Image
                  src={img || "/placeholder.svg"}
                  alt={alts[idx]}
                  width={700}
                  height={400}
                  className="h-[340px] w-full max-h-[90svh] object-cover sm:h-[400px] md:h-[480px] lg:h-[580px] xl:h-[680px] 2xl:h-[900px] 3xl:h-[1050px] 4xl:h-[1200px]"
                />
              </div>

              {idx < images.length - 1 && (
                <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "25%" }}>
                  <Image
                    src={images[idx + 1] || "/placeholder.svg"}
                    alt={alts[idx + 1]}
                    width={300}
                    height={400}
                    className="h-[340px] w-full max-h-[90svh] object-cover opacity-30 sm:h-[400px] md:h-[480px] lg:h-[580px] xl:h-[680px] 2xl:h-[900px] 3xl:h-[1050px] 4xl:h-[1200px]"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={nextSlide}
        disabled={isAtEnd}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:translate-y-[-50%] hover:shadow-lg dark:bg-[#15171a]/80 dark:hover:bg-[#15171a] disabled:opacity-30"
      >
        <ChevronRight className="h-6 w-6 text-[#001F4B] dark:text-[#ec1e24]" />
      </Button>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalSlides + 1 }).map((_, idx) => (
          <Button
            key={idx}
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="h-8 w-8 min-h-0 min-w-0 p-0 shadow-none hover:translate-y-0 hover:shadow-none"
          >
            <span
              className={`block rounded-full transition-all ${idx === currentSlide ? "h-2 w-2 bg-[#001F4B] dark:bg-[#ec1e24]" : "h-2 w-2 bg-gray-300 dark:bg-gray-600"}`}
            />
          </Button>
        ))}
      </div>
    </div>
  )
}
