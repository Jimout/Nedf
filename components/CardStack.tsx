"use client"
import { useEffect, useState, useRef } from "react"
import type React from "react"

import { motion } from "framer-motion"

type Card = {
  id: number
  name: string
  designation: string
  content: React.ReactNode
}

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[]
  offset?: number
  scaleFactor?: number
}) => {
  const CARD_OFFSET = offset || 10
  const SCALE_FACTOR = scaleFactor || 0
  const [cards, setCards] = useState<Card[]>(items)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastScrollRef = useRef(0)
  const scrollThresholdRef = useRef(0)
  const isTransitioningRef = useRef(false)
  const SCROLL_THRESHOLD = 150

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isTransitioningRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0

      if (isInView) {
        const currentScroll = window.scrollY
        const scrollDelta = currentScroll - lastScrollRef.current

        scrollThresholdRef.current += Math.abs(scrollDelta)

        if (scrollThresholdRef.current >= SCROLL_THRESHOLD) {
          isTransitioningRef.current = true

          setCards((prevCards: Card[]) => {
            const newArray = [...prevCards]
            newArray.unshift(newArray.pop()!)
            return newArray
          })

          scrollThresholdRef.current = 0

          setTimeout(() => {
            isTransitioningRef.current = false
          }, 800)
        }

        lastScrollRef.current = currentScroll
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative h-80 w-full max-w-2xl md:h-80">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-80 w-full rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              duration: 0.8,
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">{card.content}</div>
            <div>
              <p className="text-neutral-500 font-medium dark:text-white">{card.name}</p>
              <p className="text-neutral-400 font-normal dark:text-neutral-200">{card.designation}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
