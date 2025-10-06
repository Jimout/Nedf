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
      "Working with NEDF was the best part of our renovation. They listened to what we wanted and delivered more than we imagined.",
  },
  {
    name: "Mac Jessile",
    role: "CEO at MERFB",
    image: "/tes4.png",
    testimonial: "They exceeded our expectations and made the process seamless.",
  },
  {
    name: "Samrawit M",
    role: "Homeowner",
    image: "/test3.png",
    testimonial: "From design to execution, everything was flawless and thoughtful.",
  },
]

export function ClientReflections() {
  const [step, setStep] = useState(0)

  const svgWidth = 700
  const svgHeight = 600
  const centerX = 84
  const centerY = svgHeight / 2
  const radius = 180

  const startAngle = (3 * Math.PI) / 2
  const totalArc = Math.PI
  const angleStep = totalArc / (clients.length - 1)

  const getPosition = (angle: number) => ({
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev - 1 + clients.length) % clients.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const rotatedClients = clients.map((_, i) => {
    const newIndex = (i + step) % clients.length
    return clients[newIndex]
  })

  const visibleClients = rotatedClients.map((client, i) => {
    const angle = startAngle + i * angleStep
    return { ...client, angle }
  })

  const activeClient = visibleClients[1]

  return (
    <section className="relative pt-20">
      <motion.h2
        className="text-center text-[26px] md:text-[30px] font-medium text-[#333333] font-montserrat mb-0 md:ml-8 ml-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        CLIENT REFLECTIONS
      </motion.h2>

      {/* Desktop layout (arc) */}
      <div className="hidden md:flex relative max-w-5xl mx-auto flex-col md:flex-row items-center px-4 gap-4">
        <div className="relative w-full md:w-[55%] flex justify-start items-center">
          <div
            style={{
              width: svgWidth,
              height: svgHeight,
              position: "relative",
              overflow: "visible",
            }}
          >
            <motion.svg
              width={svgWidth}
              height={svgHeight}
              className="absolute inset-0"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.path
                d={`M ${getPosition(startAngle).x} ${getPosition(startAngle).y}
                    A ${radius} ${radius} 0 0 1 ${getPosition(startAngle + totalArc).x} ${
                      getPosition(startAngle + totalArc).y
                    }`}
                stroke="#cbd5e1"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />
            </motion.svg>

            {visibleClients.map((client, index) => {
              const pos = getPosition(client.angle)
              const isActive = index === 1
              const avatarSize = isActive ? 100 : 70
              const zIndex = isActive ? 20 : 10

              return (
                <motion.div
                  key={client.name + index}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: pos.x - avatarSize / 2,
                    top: pos.y - avatarSize / 2,
                    zIndex,
                  }}
                  initial={{
                    scale: isActive ? 1.1 : 0.8,
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    scale: isActive ? 1.25 : 0.9,
                    opacity: isActive ? 1 : 0.6,
                    left: pos.x - avatarSize / 2,
                    top: pos.y - avatarSize / 2,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: index * 0.1,
                  }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Image
                      src={client.image || "/placeholder.svg"}
                      alt={client.name}
                      width={avatarSize}
                      height={avatarSize}
                      className="rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </motion.div>
                  <motion.p
                    className="mt-2 text-sm font-medium text-center text-[#333333]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {client.name}
                  </motion.p>
                  <motion.span
                    className="text-xs text-gray-500 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {client.role}
                  </motion.span>

                  {isActive && (
                    <motion.div
                      className="absolute left-full top-1/2 transform -translate-y-1/2 ml-16 w-[380px]"
                      initial={{ opacity: 0, x: -30, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 30, scale: 0.9 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 0.2,
                      }}
                    >
                      <motion.p
                        className="text-sm font-medium text-[#333333]/80 leading-relaxed pl-6 pr-6 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <motion.span
                          className="absolute -left-4 -top-6 text-6xl font-serif text-gray-300"
                          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: 0.6, duration: 0.4 }}
                        >
                          ❝
                        </motion.span>
                        {activeClient.testimonial}
                        <motion.span
                          className="absolute -right-4 -bottom-6 text-6xl font-serif text-gray-300"
                          initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: 0.8, duration: 0.4 }}
                        >
                          ❞
                        </motion.span>
                      </motion.p>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile layout (card with avatar + testimonial fade) */}
      <motion.div
        className="block md:hidden px-6 mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-white shadow-xl rounded-2xl p-6 text-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex flex-col items-center"
            >
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
                <Image
                  src={clients[step].image || "/placeholder.svg"}
                  alt={clients[step].name}
                  width={100}
                  height={100}
                  className="mx-auto rounded-full border-4 border-gray-200 shadow-lg object-cover"
                />
              </motion.div>
              <motion.h3
                className="mt-4 text-lg font-semibold text-[#333333]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {clients[step].name}
              </motion.h3>
              <motion.p
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {clients[step].role}
              </motion.p>
              <motion.p
                className="mt-4 text-sm text-[#333333]/80 italic leading-relaxed text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                ❝{clients[step].testimonial}❞
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
