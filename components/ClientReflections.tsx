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
  const [step, setStep] = useState(0)
  const [svgWidth, setSvgWidth] = useState(700)
  const [svgHeight, setSvgHeight] = useState(600)
  const [radius, setRadius] = useState(180)
  const [centerX, setCenterX] = useState(350)
  const [visiblePositions, setVisiblePositions] = useState(3) // Number of visible avatars

  const startAngle = Math.PI // Start at left side (180 degrees)
  const endAngle = 0 // End at right side (0 degrees)
  const totalArc = Math.PI // Full semicircle
  const angleStep = totalArc / (visiblePositions - 1) // Dynamic based on visible positions

  const getPosition = (angle: number) => ({
    x: centerX + radius * Math.cos(angle),
    y: svgHeight / 2 + radius * Math.sin(angle),
  })

  // Auto-rotate continuously - increment step to move avatars along the arc
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => prev + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Responsive scaling - aligned with TheCrew dimensions
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const containerWidth = Math.min(width * 0.9, 1400) // Slightly bigger container
      
      if (width < 768) {
        // Mobile
        const scaledWidth = Math.min(700, containerWidth)
        setSvgWidth(scaledWidth)
        setSvgHeight(450)
        setRadius(140)
        setCenterX(scaledWidth / 2)
        setVisiblePositions(3)
      } else if (width < 1280) {
        // Standard screens (md/lg) - 3 avatars, bigger arc
        const scaledWidth = Math.min(750, containerWidth)
        setSvgWidth(scaledWidth)
        setSvgHeight(450)
        setRadius(130)
        setCenterX(scaledWidth / 2)
        setVisiblePositions(3)
      } else if (width < 1600) {
        // Large screens - 3 avatars with bigger size
        const scaledWidth = Math.min(850, containerWidth)
        setSvgWidth(scaledWidth)
        setSvgHeight(500)
        setRadius(150)
        setCenterX(scaledWidth / 2)
        setVisiblePositions(3)
      } else {
        // XL screens - 3 avatars for consistency
        const scaledWidth = Math.min(1000, containerWidth)
        setSvgWidth(scaledWidth)
        setSvgHeight(600)
        setRadius(180)
        setCenterX(scaledWidth / 2)
        setVisiblePositions(3)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate positions for smooth arc rotation along the arc line
  // Dynamic number of avatars based on screen size (3 or 4)
  const allPositions = clients.map((client, clientIndex) => {
    // Calculate the continuous position along the arc
    // This determines which slot (0, 1, 2) each client occupies as they rotate
    const continuousPosition = (clientIndex - step) % clients.length
    // Normalize to positive values
    const normalizedContinuousPosition = continuousPosition < 0 
      ? continuousPosition + clients.length 
      : continuousPosition
    
    // Only show clients in visible positions (3 for standard, 4 for XL)
    const isVisible = normalizedContinuousPosition < visiblePositions
    
    // Calculate the exact angle on the arc for this position
    // The angle corresponds directly to a point on the arc line
    // Position spacing adjusts automatically based on visiblePositions
    const angle = startAngle + (normalizedContinuousPosition * angleStep)
    
    // Normalized position for smooth interpolation of size/opacity
    // 0 = at edges, 0.5 = at middle (for 3 avatars), 0.33/0.66 (for 4 avatars)
    const normalizedPosition = normalizedContinuousPosition / (visiblePositions - 1)
    
    return {
      ...client,
      angle,
      continuousPosition: normalizedContinuousPosition,
      normalizedPosition,
      clientIndex,
      isVisible,
    }
  })

  // Filter to show only visible clients (on the visible arc)
  const visibleClients = allPositions.filter(client => client.isVisible)

  // Find the active client (middle position of the visible avatars)
  // For 3 avatars: position 1 (middle)
  // For 4 avatars: position 1 or 2 (closer to middle)
  const middlePosition = Math.floor((visiblePositions - 1) / 2)
  const activeClient = visibleClients.find(client => 
    client.continuousPosition === middlePosition || 
    client.continuousPosition === middlePosition + 1
  ) || visibleClients[middlePosition] || visibleClients[0]

  return (
    <section className="relative pt-20 w-full flex justify-center">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <motion.h2
          className="text-center text-[26px] md:text-[30px] font-medium text-[#333333] font-montserrat mb-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          CLIENT REFLECTIONS
        </motion.h2>

        {/* Desktop layout (arc) */}
        <div className="hidden md:flex relative w-full flex-col items-center justify-center">
          <div className="relative flex justify-start items-center w-full">
            <div
              style={{
                width: svgWidth,
                height: svgHeight,
                position: "relative",
                overflow: "visible",
                maxWidth: '100%',
              }}
            >
            <motion.svg
              width="100%"
              height="100%"
              className="absolute inset-0"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Filters and gradients */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>
              
              {/* Background arc layer with glow */}
              <motion.path
                d={`M ${getPosition(startAngle).x} ${getPosition(startAngle).y}
                    A ${radius} ${radius} 0 0 1 ${getPosition(endAngle).x} ${getPosition(endAngle).y}`}
                stroke="#e2e8f0"
                strokeWidth="4"
                strokeOpacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />
              
              {/* Main orbital path - this is the exact path avatars follow */}
              <motion.path
                d={`M ${getPosition(startAngle).x} ${getPosition(startAngle).y}
                    A ${radius} ${radius} 0 0 1 ${getPosition(endAngle).x} ${getPosition(endAngle).y}`}
                stroke="url(#arcGradient)"
                strokeWidth="2.5"
                filter="url(#glow)"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />
              
              {/* Position markers on the arc to show exact points */}
              {Array.from({ length: visiblePositions }).map((_, position) => {
                const markerAngle = startAngle + (position * angleStep)
                const markerPos = getPosition(markerAngle)
                const isMiddle = position === middlePosition || position === middlePosition + 1
                return (
                  <motion.circle
                    key={`marker-${position}`}
                    cx={markerPos.x}
                    cy={markerPos.y}
                    r="4"
                    fill={isMiddle ? "#001F4B" : "#94a3b8"}
                    opacity="0.4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + position * 0.1, duration: 0.3 }}
                  />
                )
              })}
            </motion.svg>

            <AnimatePresence>
              {visibleClients.map((client) => {
                const pos = getPosition(client.angle)
                
                // Calculate dynamic styling based on continuous position along arc
                // normalizedPosition: 0 = top, 0.5 = middle, 1 = bottom
                const distanceFromMiddle = Math.abs(client.normalizedPosition - 0.5) * 2 // 0 to 1
                const proximityToMiddle = 1 - distanceFromMiddle // 1 = at middle, 0 = at edges
                
                // Check if this is the active client
                const isActive = client.clientIndex === activeClient?.clientIndex
                
                // Smooth interpolation for size and opacity based on position
                // Scale based on screen size: small screens < large screens < XL screens
                const baseSize = svgWidth >= 1200 ? 75 : svgWidth >= 850 ? 48 : 45
                const maxSize = svgWidth >= 1200 ? 100 : svgWidth >= 850 ? 68 : 65
                const avatarSize = baseSize + (proximityToMiddle * (maxSize - baseSize))
                
                const minOpacity = 0.55
                const maxOpacity = 1
                const opacity = minOpacity + (proximityToMiddle * (maxOpacity - minOpacity))
                
                const minScale = 0.8
                const maxScale = 1.2
                const scale = minScale + (proximityToMiddle * (maxScale - minScale))
                
                const zIndex = Math.round(10 + (proximityToMiddle * 10))

                return (
                  <motion.div
                    key={`client-${client.clientIndex}`}
                    className="absolute flex flex-col items-center"
                    style={{
                      zIndex,
                    }}
                    initial={{
                      left: pos.x - avatarSize / 2,
                      top: pos.y - avatarSize / 2,
                      scale: 0.5,
                      opacity: 0,
                    }}
                    animate={{
                      left: pos.x - avatarSize / 2,
                      top: pos.y - avatarSize / 2,
                      scale: scale,
                      opacity: opacity,
                    }}
                    exit={{
                      scale: 0.5,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeOut" }
                    }}
                    transition={{
                      duration: 3.8,
                      ease: "easeInOut",
                    }}
                  >
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.2 }}
                    style={{ width: avatarSize, height: avatarSize }}
                  >
                    <Image
                      src={client.image || "/placeholder.svg"}
                      alt={client.name}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-white shadow-lg object-cover w-full h-full"
                    />
                  </motion.div>
                  <motion.p
                    className="mt-2 font-medium text-center text-[#333333]"
                    style={{
                      fontSize: svgWidth >= 1200 ? '14px' : svgWidth >= 850 ? '10px' : '9px',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    {client.name}
                  </motion.p>
                  <motion.span
                    className="text-gray-500 text-center"
                    style={{
                      fontSize: svgWidth >= 1200 ? '12px' : svgWidth >= 850 ? '8px' : '8px',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {client.role}
                  </motion.span>
                </motion.div>
              )
            })}
            </AnimatePresence>
            
            {/* Testimonial display area - positioned below the arc */}
            <div 
              className="absolute overflow-hidden"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                top: svgHeight - 50,
                width: Math.min(svgWidth * 0.8, 500),
                textAlign: 'center',
              }}
            >
              <AnimatePresence mode="wait">
                {activeClient && (
                  <motion.div
                    key={`testimonial-display-${activeClient.clientIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.p
                      className="text-xs md:text-sm xl:text-lg font-medium text-[#333333]/80 leading-relaxed md:leading-relaxed xl:leading-loose pl-4 pr-4 relative min-h-[100px] md:min-h-[100px] xl:min-h-[140px]"
                      style={{
                        fontSize: svgWidth >= 1200 ? undefined : svgWidth >= 850 ? '12px' : '11px',
                        lineHeight: svgWidth >= 1200 ? undefined : svgWidth >= 850 ? '1.45' : '1.4',
                      }}
                    >
                      <motion.span
                        className="absolute font-serif text-gray-300"
                        style={{
                          fontSize: svgWidth >= 1200 ? '56px' : svgWidth >= 850 ? '28px' : '26px',
                          left: svgWidth >= 1200 ? "-20px" : "-6px",
                          top: svgWidth >= 1200 ? "-32px" : "-14px",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        ❝
                      </motion.span>
                      {activeClient.testimonial}
                      <motion.span
                        className="absolute font-serif text-gray-300"
                        style={{
                          fontSize: svgWidth >= 1200 ? '56px' : svgWidth >= 850 ? '28px' : '26px',
                          right: svgWidth >= 1200 ? "-20px" : "-6px",
                          bottom: svgWidth >= 1200 ? "-32px" : "-14px",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        ❞
                      </motion.span>
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <motion.div
        className="block md:hidden px-6 mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-white shadow-xl rounded-2xl p-6 text-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeClient && (
              <motion.div
                key={`mobile-${activeClient.clientIndex}`}
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
                    src={activeClient.image || "/placeholder.svg"}
                    alt={activeClient.name}
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
                  {activeClient.name}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {activeClient.role}
                </motion.p>
                <motion.p
                  className="mt-4 text-sm xl:text-lg text-[#333333]/80 italic leading-relaxed text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  ❝{activeClient.testimonial}❞
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      </div>
    </section>
  )
}
