"use client"

import { useEffect, useState, useRef } from "react"

// ==================== CONSTANTS ====================

const STATS_DATA = [
  { value: "100+", label: "Projects Completed" },
  { value: "95%", label: "Client Engagement Rate" },
  { value: "98%", label: "Client Satisfaction Rate" },
  { value: "99%", label: "On-Time Project Completion" },
] as const

const ANIMATION_DURATION_MS = 3000 // Longer animation to see the counting
const INTERSECTION_THRESHOLD = 0.3
const SHUFFLE_INTERVAL_MS = 80 // Slower shuffling - more visible

// ==================== TYPES ====================

interface StatItem {
  value: string
  label: string
}

// ==================== COMPONENT ====================

export default function Stats() {
  const [animatedValues, setAnimatedValues] = useState(getInitialValues())
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isShuffling, setIsShuffling] = useState(true)
  const [isCounting, setIsCounting] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const shuffleIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // ==================== HELPERS ====================

  function getInitialValues(): string[] {
    return generateRandomValues()
  }

  function generateRandomValues(): string[] {
    // Generate random futuristic-looking numbers
    return STATS_DATA.map((stat) => {
      const randomNum = Math.floor(Math.random() * 100)
      if (stat.value.includes("%")) return `${randomNum}%`
      if (stat.value.includes("+")) return `${randomNum}+`
      return `${randomNum}`
    })
  }

  function startShuffling() {
    // Rapidly cycle through random numbers for futuristic effect
    shuffleIntervalRef.current = setInterval(() => {
      setAnimatedValues(generateRandomValues())
    }, SHUFFLE_INTERVAL_MS)
  }

  function stopShuffling() {
    if (shuffleIntervalRef.current) {
      clearInterval(shuffleIntervalRef.current)
      shuffleIntervalRef.current = null
    }
    setIsShuffling(false)
  }

  function parseStatValue(value: string | number | undefined): { number: number; suffix: string } {
    const s = typeof value === "string" ? value : String(value ?? "")
    const numberMatch = s.match(/\d+/)
    const number = numberMatch ? parseInt(numberMatch[0], 10) : 0
    const suffix = s.includes("%") ? "%" : s.includes("+") ? "+" : ""
    return { number, suffix }
  }

  function easeOutExpo(x: number): number {
    // Smooth easing function for professional animation
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
  }

  function animateNumbers() {
    stopShuffling() // Stop the random shuffling
    setIsCounting(true) // Mark that we're counting
    
    // Small delay to show transition from shuffle to count
    setTimeout(() => {
      const startTime = performance.now()
      const targetStats = STATS_DATA.map(parseStatValue)
      const startValues = animatedValues.map(parseStatValue) // Start from current shuffled values

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const linearProgress = Math.min(elapsed / ANIMATION_DURATION_MS, 1)
        
        // Apply smooth easing for professional feel
        const progress = easeOutExpo(linearProgress)

        const updatedValues = targetStats.map(({ number, suffix }, index) => {
          const startNum = startValues[index].number
          const range = number - startNum
          const currentNumber = Math.floor(startNum + (progress * range))
          return `${currentNumber}${suffix}`
        })
        
        setAnimatedValues(updatedValues)

        if (linearProgress < 1) {
          requestAnimationFrame(animate)
        } else {
          setIsCounting(false)
        }
      }

      requestAnimationFrame(animate)
    }, 200) // 200ms delay to see the transition
  }

  // ==================== EFFECTS ====================

  // Start futuristic shuffling effect on mount
  useEffect(() => {
    startShuffling()
    
    return () => {
      stopShuffling()
    }
  }, [])

  // Animate to real values when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Wait 1.5 seconds of visible shuffling before animating
          setTimeout(() => {
            animateNumbers()
            setHasAnimated(true)
          }, 1500)
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [hasAnimated])

  // ==================== RENDER ====================

  return (
    <section 
      ref={ref} 
      className="
        w-full relative z-10 
        max-sm:-mt-4
        py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 2xl:py-8
      "
    >
      <div className="
        w-full text-center
        grid grid-cols-2 
        sm:flex sm:flex-row sm:justify-between sm:items-center
        gap-y-5 gap-x-4 
        sm:gap-y-0 sm:gap-x-0
      ">
        {STATS_DATA.map((stat, index) => (
          <StatCard
            key={stat.label}
            value={animatedValues[index]}
            label={stat.label}
            isCounting={isCounting}
          />
        ))}
      </div>
    </section>
  )
}

// ==================== SUB-COMPONENTS ====================

function StatCard({ value, label, isCounting }: { value: string; label: string; isCounting: boolean }) {
  return (
    <div className="
      max-sm:bg-white max-sm:p-3 max-sm:rounded-md max-sm:shadow-md
      dark:max-sm:bg-[#15171a] 
      dark:max-sm:border dark:max-sm:border-[#ec1e24]/20 
      dark:max-sm:shadow-sm dark:max-sm:shadow-[#ec1e24]/5
      transition-all duration-200
    ">
      <div className={`
        font-bold font-mono
        text-[#001F4B] dark:text-[#ec1e24]
        text-base sm:text-lg md:text-xl 
        lg:text-2xl xl:text-2xl 2xl:text-3xl
        transition-all duration-200 ease-out
        ${isCounting ? 'scale-110' : 'scale-100'}
      `}>
        {value}
      </div>
      <div className="
        text-[#333333]/70 dark:text-white/80
        text-[9px] sm:text-[10px] md:text-xs lg:text-sm
        mt-0.5 sm:mt-1
      ">
        {label}
      </div>
    </div>
  )
}
