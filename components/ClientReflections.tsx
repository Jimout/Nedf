"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Client {
  name: string
  role: string
  image: string
  testimonial: string
}

const clients: Client[] = [
  {
    name: "Mac Jessile",
    role: "CEO at NEDFB",
    image: "/test2.png",
    testimonial:
      "Working with NEDF was the best part of our renovation. They listened to what we wanted and delivered more than we imagined. Their attention to detail transformed our space beautifully.",
  },
  {
    name: "Mac Jessile",
    role: "CEO at MERFB",
    image: "/tes4.png",
    testimonial:
      "They exceeded our expectations and made the process seamless from start to finish. The team's expertise and dedication to quality were evident throughout. We couldn't be happier with the results.",
  },
  {
    name: "Samrawit M",
    role: "Homeowner",
    image: "/test3.png",
    testimonial:
      "From design to execution, everything was flawless and thoughtful. The team demonstrated incredible skill while maintaining clear communication. They brought our vision to life beautifully.",
  },
]

export function ClientReflections() {
  const [rotation, setRotation] = useState(0)
  const [svgWidth, setSvgWidth] = useState(1000)
  const [svgHeight, setSvgHeight] = useState(600)
  const [radius, setRadius] = useState(220)
  const [centerX, setCenterX] = useState(300)
  const startAngle = (3 * Math.PI) / 2
  const totalArc = Math.PI

  // Responsive sizing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setSvgWidth(width)
        setSvgHeight(500)
        setRadius(160)
        setCenterX(160)
      } else if (width < 1280) {
        setSvgWidth(width)
        setSvgHeight(550)
        setRadius(200)
        setCenterX(200)
      } else {
        setSvgWidth(width)
        setSvgHeight(800)
        setRadius(300)
        setCenterX(300)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Continuous orbit animation
  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (time: number) => {
      if (startTime === null) startTime = time
      const elapsed = time - startTime
      const speed = 0.00025 // smaller = slower orbit
      setRotation(elapsed * speed)
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const getPosition = (angle: number) => ({
    x: centerX + radius * Math.cos(angle),
    y: svgHeight / 2 + radius * Math.sin(angle),
  })

  // Compute positions dynamically
  const allClients = clients.map((client, i) => {
    const progress = ((i / clients.length) + (rotation % (2 * Math.PI)) / (2 * Math.PI)) % 1
    const angle = startAngle + progress * totalArc
    const middleAngle = startAngle + totalArc / 2
    const distanceFromMiddle = Math.abs(angle - middleAngle)
    const normalized = 1 - distanceFromMiddle / (totalArc / 2)

    return {
      ...client,
      angle,
      normalized,
    }
  })

  // Determine active client (closest to center)
  const middleAngle = startAngle + totalArc / 2
  const activeClient = allClients.reduce((closest, client) => {
    const diff = Math.abs(client.angle - middleAngle)
    const closestDiff = Math.abs(closest.angle - middleAngle)
    return diff < closestDiff ? client : closest
  }, allClients[0])

  return (
    <section className="relative pt-20 w-full flex justify-center overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <motion.h2
          className="text-center text-[26px] md:text-[30px] font-medium text-[#333333] dark:text-[#ec1e24] font-montserrat mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          CLIENT REFLECTIONS
        </motion.h2>

        {/* Desktop */}
        <div className="hidden md:flex relative w-full items-center justify-start">
          <div
            style={{
              width: svgWidth,
              height: svgHeight,
              position: "relative",
            }}
          >
            {/* Arc path */}
            <svg
              width={svgWidth}
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="absolute inset-0"
            >
              <path
                d={`M ${getPosition(startAngle).x} ${getPosition(startAngle).y}
                    A ${radius} ${radius} 0 0 1 ${getPosition(startAngle + totalArc).x} ${
                  getPosition(startAngle + totalArc).y
                }`}
                stroke="#e2e8f0"
                strokeWidth="3"
                strokeOpacity="0.6"
                fill="none"
              />
            </svg>

            {/* Avatars moving along the arc */}
            {allClients.map((client, index) => {
              const pos = getPosition(client.angle)
              const size = 70 + client.normalized * 50
              const opacity = 0.5 + client.normalized * 0.5
              const scale = 0.8 + client.normalized * 0.4
              const zIndex = Math.round(10 + client.normalized * 10)

              return (
                <motion.div
                  key={index}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: pos.x - size / 2,
                    top: pos.y - size / 2,
                    zIndex,
                  }}
                  animate={{
                    left: pos.x - size / 2,
                    top: pos.y - size / 2,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: "tween",
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{ width: size, height: size }}
                  >
                    <Image
                      src={client.image}
                      alt={client.name}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-white shadow-lg object-cover w-full h-full"
                    />
                  </motion.div>
                </motion.div>
              )
            })}

            {/* Active testimonial area */}
            <div
              className="absolute text-left"
              style={{
                left: svgWidth >= 1200 ? centerX + radius + 140 : centerX + radius + 60,
                top: svgHeight / 2 - 60,
                width: svgWidth >= 1200 ? 600 : 400,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClient.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.p className="text-[#333333]/80 dark:text-white/40 text-base md:text-lg xl:text-xl font-medium leading-relaxed relative">
                    <span className="absolute -left-4 -top-6 text-4xl text-gray-300 dark:text-[#ec1e24]/40">
                      ❝
                    </span>
                    {activeClient.testimonial}
                    <span className="absolute -right-4 -bottom-6 text-4xl text-gray-300 dark:text-[#ec1e24]/40">
                      ❞
                    </span>
                  </motion.p>
                  <motion.h3
                    className="mt-6 text-lg font-semibold text-[#333333] dark:text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {activeClient.name}
                  </motion.h3>
                  <p className="text-sm text-gray-500 dark:text-[#ec1e24]/40">
                    {activeClient.role}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="block md:hidden px-6 mt-10">
          <div className="bg-white dark:bg-[#15171a] shadow-xl rounded-2xl p-6 text-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeClient.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <Image
                  src={activeClient.image}
                  alt={activeClient.name}
                  width={100}
                  height={100}
                  className="mx-auto rounded-full border-4 border-gray-200 shadow-lg object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-[#333333] dark:text-white/80">
                  {activeClient.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-[#ec1e24]/40">
                  {activeClient.role}
                </p>
                <p className="mt-4 text-sm xl:text-lg text-[#333333]/80 dark:text-white/40 italic leading-relaxed text-center">
                  ❝{activeClient.testimonial}❞
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}