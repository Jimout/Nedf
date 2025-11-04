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

      // Split text by lines for smoother animation
      let splitFirst = new SplitType(firstBlockRef.current, { types: "lines" })
      let splitSecond = new SplitType(secondBlockRef.current, { types: "lines" })

      // Set initial state
      gsap.set(splitFirst.lines, { opacity: 1, x: 0 })
      gsap.set(splitSecond.lines, { opacity: 0, x: 50 })

      // Master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 3, // scroll length
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Animate first block out (left + fade)
      tl.to(splitFirst.lines, {
        opacity: 0,
        x: -80,
        stagger: { each: 0.2, from: "end" },
        ease: "power4.inOut",
        duration: 2,
      })

      // Animate second block in (sequential, no overlap)
      tl.fromTo(
        splitSecond.lines,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          stagger: { each: 0.25, from: "start" },
          ease: "power4.inOut",
          duration: 2,
        }
      )

      // Optional: fade out second block near end
      tl.to(splitSecond.lines, {
        opacity: 0,
        x: -60,
        stagger: { each: 0.15, from: "end" },
        ease: "power4.inOut",
        duration: 2,
      }, "+=0.5")

      // Handle resize (rebuild SplitType)
      const handleResize = () => {
        splitFirst.revert()
        splitSecond.revert()
        splitFirst = new SplitType(firstBlockRef.current!, { types: "lines" })
        splitSecond = new SplitType(secondBlockRef.current!, { types: "lines" })
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
        className="relative flex flex-col items-center justify-center min-h-screen text-[#333333] dark:text-[#ec1e24] overflow-hidden bg-white dark:bg-[#111]"
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
          className="text-center font-semibold text-4xl md:text-6xl lg:text-7xl leading-[1.2] tracking-tight"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          <div>We are a fully integrated design firm</div>
          <div className="mt-6">based in Addis Ababa, Ethiopia.</div>
        </div>

        {/* Second block */}
        <div
          ref={secondBlockRef}
          className="absolute text-center font-semibold text-4xl md:text-6xl lg:text-7xl leading-[1.2] tracking-tight"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          We craft perfection through every line and form.
        </div>
      </section>

      {/* Spacer for scroll */}
      <div style={{ height: "200vh" }}></div>
    </>
  )
}
