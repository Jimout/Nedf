import { useState, useRef, useCallback, useEffect } from "react"
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
  width = "100%",
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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      updatePosition(e.clientX)
    },
    [isDragging, updatePosition]
  )

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return
      e.preventDefault()
      updatePosition(e.touches[0].clientX)
    },
    [isDragging, updatePosition]
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Desktop only: click anywhere on container to move slider
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (!isDragging) {
      updatePosition(e.clientX)
    }
  }, [isDragging, updatePosition])

  useEffect(() => {
    if (isDragging) {
      const onMove = (e: MouseEvent) => handleMouseMove(e)
      const onUp = () => handleMouseUp()
      const onTouchMove = (e: TouchEvent) => handleTouchMove(e)
      const onTouchEnd = () => handleTouchEnd()

      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
      document.addEventListener('touchmove', onTouchMove, { passive: false })
      document.addEventListener('touchend', onTouchEnd)

      return () => {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
        document.removeEventListener('touchmove', onTouchMove)
        document.removeEventListener('touchend', onTouchEnd)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  const showAfter = sliderPosition < 80
  const showBefore = sliderPosition > 20

  useEffect(() => {
    if (sliderPosition <= 20) {
      const sparkleSizes = [24, 30, 36, 28]
      const createSparkle = (index: number) => {
        setTimeout(() => {
          const positions = [
            { x: 88, y: 85 },
            { x: 92, y: 88 },
            { x: 86, y: 91 },
            { x: 90, y: 93 },
          ]
          const pos = positions[index]
          const newSparkle: Sparkle = {
            id: sparkleIdRef.current++,
            x: pos.x + Math.random() * 2,
            y: pos.y + Math.random() * 2,
            size: sparkleSizes[index],
            delay: 0,
            type: 'star',
            color: '#FFFFFF',
            duration: 7,
          }
          setSparkles((prev) => {
            if (prev.length >= 4) return prev
            return [...prev, newSparkle]
          })
          setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id))
          }, 8000)
        }, index * 1500)
      }
      for (let i = 0; i < 4; i++) createSparkle(i)
    } else {
      setSparkles([])
    }
  }, [sliderPosition])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none bg-background ${className}`}
      style={{ width, height }}
      onClick={handleContainerClick}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage || "/placeholder.svg"}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                filter: "drop-shadow(0 0 10px rgba(255,255,255,1)) drop-shadow(0 0 20px rgba(255,255,255,0.7))",
              }}
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{
                scale: [0, 0.2, 0.4, 0.7, 1, 1, 1, 1, 1, 0.7, 0.4, 0.2, 0],
                opacity: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1, 1, 0.9, 0.7, 0.4, 0.2, 0],
                rotate: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360],
              }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 2.5, ease: "easeOut" } }}
              transition={{ duration: sparkle.duration, delay: sparkle.delay, ease: [0.45, 0.05, 0.55, 0.95] }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <filter id={`glow-${sparkle.id}`}>
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <radialGradient id={`grad-${sparkle.id}`}>
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#F5F5F5" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill={`url(#grad-${sparkle.id})`} opacity="0.4" />
                <path d="M50 5 L57 42 L95 50 L57 58 L50 95 L43 58 L5 50 L43 42 Z" fill="white" filter={`url(#glow-${sparkle.id})`} />
                <path d="M50 30 L54 47 L70 50 L54 53 L50 70 L46 53 L30 50 L46 47 Z" fill="white" opacity="0.9" />
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
        <img
          src={beforeImage || "/placeholder.svg"}
          alt={beforeAlt}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Line and Handle */}
      <div
        className="absolute top-0 bottom-0 z-20"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-white dark:bg-foreground shadow-lg left-1/2 pointer-events-none"
          style={{ transform: 'translateX(-50%)', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}
        />

        {/* Handle - ONLY this is touch-interactive on mobile */}
        <div
          className={`absolute top-1/2 w-12 h-12 bg-white dark:bg-background shadow-xl border-2 border-muted-foreground/30 dark:border-primary rounded-full flex items-center justify-center transition-all duration-200 ${
            isDragging ? 'cursor-grabbing scale-110 shadow-2xl' : 'cursor-grab hover:scale-105'
          }`}
          style={{
            left: '50%',
            transform: 'translate(-50%, -50%)',
            touchAction: 'none',
            userSelect: 'none',
          }}
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); handleMouseDown(e) }}
          onTouchStart={(e) => { e.stopPropagation(); handleTouchStart(e) }}
        >
          <div className="flex gap-1 pointer-events-none">
            <div className="w-[2px] h-5 bg-muted-foreground dark:bg-primary rounded-full" />
            <div className="w-[2px] h-5 bg-muted-foreground dark:bg-primary rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      {showBefore && (
        <div className="absolute top-4 left-4 bg-background/80 text-foreground px-2 py-1 rounded text-sm font-medium">
          Before
        </div>
      )}
      {showAfter && (
        <div className="absolute top-4 right-4 bg-background/80 text-foreground px-2 py-1 rounded text-sm font-medium">
          After
        </div>
      )}
    </div>
  )
}
