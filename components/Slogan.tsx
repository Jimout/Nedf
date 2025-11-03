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

    if (firstBlockRef.current && secondBlockRef.current && sectionRef.current) {
      // Split the text into words for each block
      const splitFirst = new SplitType(firstBlockRef.current, { types: "words" })
      const splitSecond = new SplitType(secondBlockRef.current, { types: "words" })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

       // First block fade in from right to left
       tl.fromTo(
         splitFirst.words,
         { opacity: 0, x: 20 },
         { opacity: 1, x: 0, stagger: { each: 0.08, from: "end" }, duration: 1, ease: "none" }
       )
       // First block fade out to left
       tl.to(splitFirst.words, { opacity: 0, x: -20, stagger: { each: 0.05, from: "end" }, duration: 1, ease: "none" })

       // Second block fade in from right to left
       tl.fromTo(
         splitSecond.words,
         { opacity: 0, x: 20 },
         { opacity: 1, x: 0, stagger: { each: 0.08, from: "end" }, duration: 1, ease: "none" }
       )
       // Second block fade out to left
       tl.to(splitSecond.words, { opacity: 0, x: -20, stagger: { each: 0.05, from: "end" }, duration: 1, ease: "none" })
    }
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex flex-col items-center justify-center min-h-screen text-[#333333] dark:text-[#ec1e24] overflow-hidden"
        style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
      >
        {/* First block: all text in one visual block */}
        <div
          ref={firstBlockRef}
          className="text-center font-semibold text-6xl md:text-7xl lg:text-8xl leading-relaxed tracking-wide mb-12"
          style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        >
           <div>We are a fully integrated Design firm</div>
           <div className="mt-8">based in Addis Ababa, Ethiopia.</div>
        </div>

        {/* Second block */}
        <div
          ref={secondBlockRef}
          className="text-center font-semibold text-6xl md:text-7xl lg:text-8xl leading-relaxed tracking-wide"
          style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        >
          We craft perfection through every line and form.
        </div>
      </section>

      {/* Spacer so scroll works */}
      <div style={{ height: "200vh" }}></div>
    </>
  )
}
