"use client"

import { useEffect, useState, useRef } from "react"

// ==================== CONSTANTS ====================

const STATS_DATA = [
  { value: "100+", label: "Projects Completed" },
  { value: "95%", label: "Client Engagement Rate" },
  { value: "98%", label: "Client Satisfaction Rate" },
  { value: "99%", label: "On-Time Project Completion" },
] as const

const ANIMATION_DURATION_MS = 1800
const INTERSECTION_THRESHOLD = 0.3
const SHUFFLE_INTERVAL_MS = 60

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
      const targetStats = STATS_DATA.map((stat) => parseStatValue(stat.value))
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
          setTimeout(() => {
            animateNumbers()
            setHasAnimated(true)
          }, 800)
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
        w-full relative z-10 flex-shrink-0
        mt-auto pt-4 pb-8 sm:pb-10 md:pb-12
        lg:mt-6 lg:py-6 xl:py-7 2xl:py-8
        px-5 sm:px-7 md:px-9 lg:px-0
      "
    >
      <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-row lg:justify-between lg:items-end lg:gap-0">
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
    <div
      className="
        flex items-start gap-2.5 sm:gap-3
        rounded-md bg-muted/45 px-3 py-3.5 sm:px-4 sm:py-4
        dark:bg-muted/25
        lg:flex-1 lg:flex-col lg:items-center lg:rounded-none lg:bg-transparent lg:dark:bg-transparent lg:px-0 lg:py-0 lg:text-center
      "
    >
      <span
        className="mt-1 h-8 w-px shrink-0 bg-primary/70 lg:hidden"
        aria-hidden
      />
      <div className="min-w-0 flex-1 lg:flex lg:flex-col lg:items-center w-full">
        <span
          className={`
            block font-mono font-semibold text-foreground leading-none tabular-nums
            text-2xl sm:text-[1.75rem] md:text-3xl
            lg:font-bold lg:text-primary
            lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-3xl 4xl:text-3xl
            transition-transform duration-200 ease-out
            ${isCounting ? "scale-105" : "scale-100"}
          `}
        >
          {value}
        </span>
        <span
          className="
            mt-1.5 block font-montserrat text-muted-foreground leading-snug
            text-[10px] sm:text-[11px] md:text-xs break-words
            lg:mt-1
            2xl:text-base 3xl:text-lg 4xl:text-lg
          "
        >
          {label}
        </span>
      </div>
    </div>
  )
}
