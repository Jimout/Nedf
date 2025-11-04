"use client"

import { useState, useEffect } from "react"

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    return () => observer.disconnect()
  }, [])

  const services = [
    {
      name: "Architectural Design",
      description: "Innovative building designs that blend aesthetics and functionality",
    },
    { name: "Interior Design", description: "Creating beautiful and functional interior spaces" },
    { name: "Landscape Design", description: "Outdoor spaces designed with nature and beauty in mind" },
    { name: "Urban Design and Planning", description: "Shaping cities and communities for sustainable living" },
    { name: "Construction Supervision", description: "Expert oversight throughout the construction process" },
    { name: "Contract Administration", description: "Managing contracts and project documentation professionally" },
    { name: "Consultancy", description: "Strategic advice for your architectural and design needs" },
    { name: "Visualization", description: "Bringing concepts to life with stunning visual renderings" },
  ]

  const servicePositions = Array.from({ length: 8 }, (_, i) => {
    // Leave margins on left and right (80px on each side)
    const startX = 80
    const endX = 920
    const availableWidth = endX - startX
    const xSpacing = availableWidth / (services.length - 1)
    const x = startX + (i * xSpacing)
    // Create a wavy pattern - alternating up and down
    const y = 300 + Math.sin((i * Math.PI) / 4) * 150
    return { x, y, label: `${Math.round((i / (services.length - 1)) * 100)}%` }
  })

  return (
    <section id="services" className="bg-white py-20 font-montserrat relative overflow-hidden w-full">
      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="mb-4 text-center relative z-20 pt-8">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Our Services</h2>
        </div>

        <div className="relative w-full h-screen overflow-hidden">
          {/* SVG Curved Line Chart */}
          <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isDark ? "#ec1e24" : "#002e47"} stopOpacity="1" />
                <stop offset="50%" stopColor={isDark ? "#ec1e24" : "#002e47"} stopOpacity="0.9" />
                <stop offset="100%" stopColor={isDark ? "#ec1e24" : "#002e47"} stopOpacity="1" />
              </linearGradient>
              <filter id="shadowFilter">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
              </filter>
            </defs>

            {servicePositions.map((pos, index) => {
              if (index === servicePositions.length - 1) return null

              const nextPos = servicePositions[index + 1]
              const midX = (pos.x + nextPos.x) / 2
              const baseControlY = (pos.y + nextPos.y) / 2 + (index % 2 === 0 ? 40 : -40)

              const waveAmplitude = 8
              const delay = index * 0.2
              
              return (
                <g key={`curve-${index}`}>
                  {/* Animated wavy line */}
                  <path
                    stroke="url(#lineGradient)"
                    strokeWidth="6"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    filter="url(#shadowFilter)"
                  >
                    <animate
                      attributeName="d"
                      values={`
                        M ${pos.x},${pos.y} Q ${midX},${baseControlY - waveAmplitude} ${nextPos.x},${nextPos.y};
                        M ${pos.x},${pos.y} Q ${midX},${baseControlY} ${nextPos.x},${nextPos.y};
                        M ${pos.x},${pos.y} Q ${midX},${baseControlY + waveAmplitude} ${nextPos.x},${nextPos.y};
                        M ${pos.x},${pos.y} Q ${midX},${baseControlY} ${nextPos.x},${nextPos.y};
                        M ${pos.x},${pos.y} Q ${midX},${baseControlY - waveAmplitude} ${nextPos.x},${nextPos.y}
                      `}
                      dur="3s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                      begin={`${delay}s`}
                    />
                  </path>
                </g>
              )
            })}

            {/* Dots on the line */}
            {servicePositions.map((pos, index) => (
              <circle 
                key={index} 
                cx={pos.x} 
                cy={pos.y} 
                r="6" 
                fill={isDark ? "#ffffff" : "#333333"}
              />
            ))}
          </svg>

          {servicePositions.map((pos, index) => {
            const viewBoxWidth = 1000
            const viewBoxHeight = 600
            const xPercent = (pos.x / viewBoxWidth) * 100
            const yPercent = (pos.y / viewBoxHeight) * 100
            const isHovered = hoveredIndex === index

  return (
              <div
                key={index}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: `${xPercent}%`, 
                  top: `${yPercent}%`,
                  maxWidth: '100%',
                  overflow: 'visible'
                }}
              >
                <div 
                  className="absolute top-8 left-1/2 transform -translate-x-1/2 text-5xl font-bold select-none"
                  style={{
                    color: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(51, 51, 51, 0.3)'
                  }}
                >
                  {index + 1}
                </div>
                <div
                  className="absolute top-24 left-1/2 transform -translate-x-1/2 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ 
                    maxWidth: '200px', 
                    overflow: 'visible',
                    perspective: '1000px',
                    width: '200px',
                    height: '80px'
                  }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-500 ease-in-out"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front face - Service Name */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)'
                      }}
                    >
                      <p 
                        className="text-[10px] sm:text-xs font-bold whitespace-nowrap bg-white px-4 py-2.5 rounded shadow-md inline-block"
                        style={{
                          color: isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(51, 51, 51, 0.8)'
                        }}
                      >
                        {services[index].name}
                      </p>
                    </div>
                    {/* Back face - Description */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <p 
                        className="text-[10px] sm:text-xs font-bold whitespace-normal bg-white px-4 py-2.5 rounded shadow-md text-center inline-block max-w-[200px]"
                        style={{
                          color: isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(51, 51, 51, 0.8)'
                        }}
                      >
                        {services[index].description}
                      </p>
                    </div>
                  </div>
                </div>
          </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
