"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import Image from "next/image"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
  width?: number | string
  height?: number
  className?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  width = "100%", // full width by default
  height = 600,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(() => setIsDragging(true), [])
  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    },
    [isDragging]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    },
    [isDragging]
  )

  // Determine label visibility
  const showBefore = sliderPosition < 80
  const showAfter = sliderPosition > 20

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-ew-resize select-none ${className}`}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (Background) */}
      <Image
        src={afterImage || "/placeholder.svg"}
        alt={afterAlt}
        width={width === "100%" ? 1200 : (width as number)}
        height={height}
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage || "/placeholder.svg"}
          alt={beforeAlt}
          width={width === "100%" ? 1200 : (width as number)}
          height={height}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-lg z-10 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      />

      {/* Slider Handle */}
      <div
        className="absolute top-1/2 w-8 h-8 bg-white shadow-lg border-2 border-gray-300 transform -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="flex gap-0.5">
          <div className="w-[1px] h-4 bg-gray-400" />
          <div className="w-[1px] h-4 bg-gray-400" />
        </div>
      </div>

      {/* Labels */}
      {showBefore && (
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          Before
        </div>
      )}
      {showAfter && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          After
        </div>
      )}
    </div>
  )
}
