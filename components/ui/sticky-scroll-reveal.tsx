"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useMotionValueEvent, useScroll, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string
    description: string
    content?: React.ReactNode | any
  }[]
  contentClassName?: string
}) => {
  const [activeCard, setActiveCard] = useState(0)
  const ref = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  })
  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const normalizedProgress = Math.max(0, Math.min(1, latest))
    const cardIndex = Math.floor(normalizedProgress * cardLength)
    const newActiveCard = Math.min(cardIndex, cardLength - 1)
    console.log('Scroll progress:', latest, 'Card index:', newActiveCard, 'Total cards:', cardLength)
    setActiveCard(newActiveCard)
  })

  const backgroundColors = ["#15171a"]
  const linearGradients = [
    "linear-gradient(to bottom right, #15171a, #15171a)",
  ]

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0])

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length])
  }, [activeCard])

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex min-h-screen justify-center space-x-4 gap-8 rounded-md p-4 sm:space-x-6 sm:p-6 md:space-x-10 md:p-10 md:gap-12 px-4 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="relative flex items-start px-2 sm:px-4">
        <div className="max-w-xl sm:max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-xl font-bold text-slate-100 sm:text-2xl"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg mt-10 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-60 w-60 overflow-hidden rounded-md bg-white border border-white sm:w-72 md:block lg:w-80",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  )
}
