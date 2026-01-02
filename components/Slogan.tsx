"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

export default function HeroTextFadeScroll() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const firstBlockRef = useRef<HTMLDivElement | null>(null)
  const secondBlockRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (!firstBlockRef.current || !secondBlockRef.current || !sectionRef.current) return

      // Split first block into words
      let splitFirst = new SplitType(firstBlockRef.current, { 
        types: "words",
        tagName: "span"
      })

      // Split second block into words
      let splitSecond = new SplitType(secondBlockRef.current, { 
        types: "words",
        tagName: "span"
      })

      // Get all word elements
      const wordsFirst = splitFirst.words || []
      const wordsSecond = splitSecond.words || []

      if (wordsFirst.length === 0 || wordsSecond.length === 0) return

      // Helper function to create clip-path for reveal (right to left)
      // Starts with right side visible, reveals left side
      const getClipPathReveal = (percent: number) => {
        // When percent is 0, only right edge is visible
        // When percent is 100, full word is visible
        return `polygon(${100 - percent}% 0%, 100% 0%, 100% 100%, ${100 - percent}% 100%)`
      }

      // Helper function to create clip-path for hide (left to right)
      // Starts with full word visible, hides from left to right
      const getClipPathHide = (percent: number) => {
        // When percent is 0, full word is visible
        // When percent is 100, word is completely hidden
        return `polygon(${percent}% 0%, 100% 0%, 100% 100%, ${percent}% 100%)`
      }

      // Set initial state for first block words - hidden (only right edge visible)
      wordsFirst.forEach((word) => {
        gsap.set(word, {
          clipPath: getClipPathReveal(0),
          willChange: "clip-path"
        })
      })

      // Set initial state for second block words - completely hidden
      wordsSecond.forEach((word) => {
        gsap.set(word, {
          clipPath: getClipPathReveal(0),
          opacity: 0,
          willChange: "clip-path, opacity"
        })
      })
      
      // Ensure first block is visible initially
      gsap.set(firstBlockRef.current, { opacity: 1 })
      // Ensure second block is hidden initially
      gsap.set(secondBlockRef.current, { opacity: 0 })

      // Create master timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + (window.innerHeight * 1.5),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Animate first block words in - reveal from right to left
      wordsFirst.forEach((word, index) => {
        tl.to(word, {
          clipPath: getClipPathReveal(100),
          ease: "power2.out",
          duration: 0.15,
        }, index * 0.08)
      })

      // Hold first block visible after all words appear
      tl.to({}, { duration: 0.2 })

      // Fade out entire first block together (not word by word)
      tl.to(firstBlockRef.current, {
        opacity: 0,
        ease: "power2.in",
        duration: 0.4
      })

      // Small gap between blocks
      tl.to({}, { duration: 0.1 })

      // Show second block and animate words in - reveal from right to left
      tl.to(secondBlockRef.current, {
        opacity: 1,
        duration: 0.1
      })
      
      wordsSecond.forEach((word, index) => {
        tl.to(word, {
          clipPath: getClipPathReveal(100),
          ease: "power2.out",
          duration: 0.15,
        }, index * 0.08)
      })

      // Handle resize (rebuild SplitType)
      const handleResize = () => {
        splitFirst.revert()
        splitSecond.revert()
        splitFirst = new SplitType(firstBlockRef.current!, { 
          types: "words",
          tagName: "span"
        })
        splitSecond = new SplitType(secondBlockRef.current!, { 
          types: "words",
          tagName: "span"
        })
        ScrollTrigger.refresh()
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        splitFirst.revert()
        splitSecond.revert()
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex flex-col items-center justify-center min-h-screen text-[#333333] dark:text-[#ec1e24] overflow-hidden"
        style={{
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        {/* First block */}
        <div
          ref={firstBlockRef}
          className="absolute text-center font-bold text-3xl sm:text-4xl md:text-xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.2] tracking-tight px-4 sm:px-6 md:px-8 lg:px-12"
          style={{
            willChange: "clip-path",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)",
            fontFamily: "inherit",
          }}
        >
          WE ARE FULLY INTEGRATED DESIGN FIRM
          <br />
          BASED IN ADDIS ABABA, ETHIOPIA
        </div>

        {/* Second block */}
        <div
          ref={secondBlockRef}
          className="absolute text-center font-bold text-3xl sm:text-4xl md:text-xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.2] tracking-tight px-4 sm:px-6 md:px-8 lg:px-12"
          style={{
            willChange: "clip-path",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)",
            fontFamily: "inherit",
          }}
        >
          WE CRAFT PERFECTION THROUGH EVERY LINE AND FORM
        </div>
      </section>

      {/* Spacer for scroll */}
      <div style={{ height: "200vh" }}></div>
    </>
  )
}
