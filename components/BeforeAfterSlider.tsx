"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
  width?: number | string
  height?: number
  className?: string
}

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  type: 'star' | 'circle' | 'diamond' | 'cross'
  color: string
  duration: number
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
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const sparkleIdRef = useRef(0)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      updatePosition(e.clientX)
    },
    [isDragging, updatePosition]
  )

  const handleTouchStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !e.touches[0]) return
      e.preventDefault()
      updatePosition(e.touches[0].clientX)
    },
    [isDragging, updatePosition]
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Allow click/tap anywhere to move slider
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (!isDragging) {
      updatePosition(e.clientX)
    }
  }, [isDragging, updatePosition])

  const handleContainerTouch = useCallback((e: React.TouchEvent) => {
    if (!isDragging && e.touches[0]) {
      updatePosition(e.touches[0].clientX)
    }
  }, [isDragging, updatePosition])

  // Determine label visibility
  const showAfter = sliderPosition < 80
  const showBefore = sliderPosition > 20

  // Generate 4 star sparkles at the right bottom corner when after image is 80%+ visible
  useEffect(() => {
    if (sliderPosition <= 20) {
      // Create 4 sparkles with staggered appearance
      const sparkleSizes = [24, 30, 36, 28]
      
      const createSparkle = (index: number) => {
        setTimeout(() => {
          // Position sparkles in a spread pattern
          const positions = [
            { x: 88, y: 85 },   // Top-left of corner
            { x: 92, y: 88 },   // Middle area
            { x: 86, y: 91 },   // Bottom-left
            { x: 90, y: 93 },   // Bottom-right
          ]
          
          const pos = positions[index]
          
          const newSparkle: Sparkle = {
            id: sparkleIdRef.current++,
            x: pos.x + Math.random() * 2, // Small random offset
            y: pos.y + Math.random() * 2,
            size: sparkleSizes[index],
            delay: 0,
            type: 'star',
            color: '#FFFFFF',
            duration: 7, // 7 seconds - very slow
          }
          
          setSparkles((prev) => {
            if (prev.length >= 4) return prev
            return [...prev, newSparkle]
          })
          
          // Remove after animation completes
          setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id))
          }, 8000) // Wait 8 seconds before removing
        }, index * 1500) // Spawn each sparkle with 1.5 second delay
      }

      // Create all 4 sparkles with delays
      for (let i = 0; i < 4; i++) {
        createSparkle(i)
      }
    } else {
      setSparkles([])
    }
  }, [sliderPosition])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-ew-resize select-none touch-none bg-white dark:bg-[#15171a] ${className}`}
      style={{ width, height, touchAction: 'none', WebkitTouchCallout: 'none' }}
      onClick={handleContainerClick}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleContainerTouch}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
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

      {/* Elegant White Star Sparkles in Right Bottom Corner */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {sparkles.map((sparkle, index) => (
            <motion.div
              key={sparkle.id}
              className="absolute"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 1)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.4))",
              }}
              initial={{ 
                scale: 0, 
                opacity: 0, 
                rotate: 0,
              }}
              animate={{
                scale: [0, 0.2, 0.4, 0.7, 1, 1, 1, 1, 1, 0.7, 0.4, 0.2, 0],
                opacity: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1, 1, 0.9, 0.7, 0.4, 0.2, 0],
                rotate: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360],
              }}
              exit={{ 
                scale: 0, 
                opacity: 0,
                transition: { duration: 2.5, ease: "easeOut" }
              }}
              transition={{
                duration: sparkle.duration,
                delay: sparkle.delay,
                ease: [0.45, 0.05, 0.55, 0.95], // Very slow and smooth
              }}
            >
              {/* Clean White Star Sparkle */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <filter id={`glow-${sparkle.id}`}>
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <radialGradient id={`grad-${sparkle.id}`}>
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#F5F5F5" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </radialGradient>
                </defs>
                
                {/* Soft outer glow */}
                <circle cx="50" cy="50" r="45" fill={`url(#grad-${sparkle.id})`} opacity="0.4" />
                
                {/* Main star shape */}
                <path
                  d="M50 5 L57 42 L95 50 L57 58 L50 95 L43 58 L5 50 L43 42 Z"
                  fill="white"
                  filter={`url(#glow-${sparkle.id})`}
                />
                
                {/* Inner star for depth */}
                <path
                  d="M50 30 L54 47 L70 50 L54 53 L50 70 L46 53 L30 50 L46 47 Z"
                  fill="white"
                  opacity="0.9"
                />
                
                {/* Bright center */}
                <circle cx="50" cy="50" r="10" fill="white" />
                <circle cx="50" cy="50" r="6" fill="white" opacity="0.95" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
        className="absolute top-0 bottom-0 w-[3px] bg-white dark:bg-[#15171a] shadow-lg z-10 pointer-events-none"
        style={{ 
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)'
        }}
      />

      {/* Slider Handle */}
      <div
        className="absolute top-1/2 w-12 h-12 bg-white dark:bg-[#15171a] shadow-xl border-3 border-gray-300 dark:border-[#ec1e24] rounded-full z-20 flex items-center justify-center cursor-grab active:cursor-grabbing active:scale-110 transition-all duration-200 touch-none"
        style={{ 
          left: `${sliderPosition}%`,
          transform: 'translate(-50%, -50%)',
          touchAction: 'none'
        }}
        onMouseDown={(e) => {
          e.stopPropagation()
          handleMouseDown()
        }}
        onTouchStart={(e) => {
          e.stopPropagation()
          handleTouchStart()
        }}
      >
        <div className="flex gap-1 pointer-events-none">
          <div className="w-[2px] h-5 bg-gray-500 dark:bg-[#ec1e24] rounded-full" />
          <div className="w-[2px] h-5 bg-gray-500 dark:bg-[#ec1e24] rounded-full" />
        </div>
      </div>

      {/* Labels */}
      {showBefore && (
        <div className="absolute top-4 left-4 bg-white dark:bg-[#15171a]/60 text-[#001F4B] dark:text-white/40 px-2 py-1 rounded text-sm font-medium">
          Before
        </div>
      )}
      {showAfter && (
        <div className="absolute top-4 right-4 bg-white dark:bg-[#15171a]/60 text-[#001F4B] dark:text-white/40 px-2 py-1 rounded text-sm font-medium">
          After
        </div>
      )}
    </div>
  )
}
