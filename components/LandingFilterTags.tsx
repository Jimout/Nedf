"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function getVisibleTagCount(width: number, tagCount: number): number {
  if (width < 640) return Math.min(3, tagCount)
  if (width < 768) return Math.min(4, tagCount)
  if (width < 1024) return Math.min(5, tagCount)
  if (width < 1280) return Math.min(6, tagCount)
  if (width < 1536) return Math.min(7, tagCount)
  return tagCount
}

interface LandingFilterTagsProps<T extends string> {
  id: string
  tags: readonly T[]
  activeTag: T
  onTagChange: (tag: T) => void
}

export default function LandingFilterTags<T extends string>({
  id,
  tags,
  activeTag,
  onTagChange,
}: LandingFilterTagsProps<T>) {
  const [windowStart, setWindowStart] = useState(0)
  const [visibleCount, setVisibleCount] = useState(tags.length)

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleTagCount(window.innerWidth, tags.length))
    }

    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [tags.length])

  const maxWindowStart = Math.max(0, tags.length - visibleCount)
  const safeWindowStart = Math.min(windowStart, maxWindowStart)
  const visibleTags = tags.slice(safeWindowStart, safeWindowStart + visibleCount)

  useEffect(() => {
    const activeIndex = tags.indexOf(activeTag)
    if (activeIndex < 0) return

    setWindowStart((prev) => {
      const maxStart = Math.max(0, tags.length - visibleCount)
      if (activeIndex < prev) return activeIndex
      if (activeIndex >= prev + visibleCount) {
        return Math.min(activeIndex - visibleCount + 1, maxStart)
      }
      return prev
    })
  }, [activeTag, tags, visibleCount])

  useEffect(() => {
    setWindowStart((prev) => Math.min(prev, maxWindowStart))
  }, [maxWindowStart])

  const handleTagClick = (tag: T) => {
    const globalIndex = tags.indexOf(tag)
    const relativeIndex = globalIndex - safeWindowStart

    onTagChange(tag)

    if (relativeIndex === visibleCount - 1 && safeWindowStart < maxWindowStart) {
      setWindowStart((prev) => Math.min(prev + 1, maxWindowStart))
    } else if (relativeIndex === 0 && safeWindowStart > 0) {
      setWindowStart((prev) => Math.max(prev - 1, 0))
    }
  }

  return (
    <div
      id={id}
      className="border-b border-border mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10 2xl:mb-12 overflow-hidden"
    >
      <motion.div
        key={safeWindowStart}
        initial={{ opacity: 0.6, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="flex gap-8 sm:gap-9 md:gap-10 lg:gap-11 xl:gap-12 2xl:gap-14"
      >
        {visibleTags.map((tag) => {
          const isActive = activeTag === tag
          return (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className={`pb-1 sm:pb-1 md:pb-1.5 lg:pb-1.5 xl:pb-2 2xl:pb-2 text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base font-medium whitespace-nowrap shrink-0 border-b-2 transition-all duration-300 ease-out hover:scale-[1.04] active:scale-[0.98] ${
              isActive
                ? "text-primary border-primary hover:text-primary/75 hover:border-primary/60"
                : "text-muted-foreground border-transparent hover:text-primary hover:border-primary/40"
            }`}
          >
            {tag}
          </button>
          )
        })}
      </motion.div>
    </div>
  )
}
