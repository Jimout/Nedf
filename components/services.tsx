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

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes waveTravel {
        0% { 
          transform: translateX(-50%) translateY(0px) rotate(0deg);
        }
        12.5% { 
          transform: translateX(-50%) translateY(-3px) rotate(0.8deg);
        }
        25% { 
          transform: translateX(-50%) translateY(-4px) rotate(1deg);
        }
        37.5% { 
          transform: translateX(-50%) translateY(-3px) rotate(0.8deg);
        }
        50% { 
          transform: translateX(-50%) translateY(0px) rotate(0deg);
        }
        62.5% { 
          transform: translateX(-50%) translateY(3px) rotate(-0.8deg);
        }
        75% { 
          transform: translateX(-50%) translateY(4px) rotate(-1deg);
        }
        87.5% { 
          transform: translateX(-50%) translateY(3px) rotate(-0.8deg);
        }
        100% { 
          transform: translateX(-50%) translateY(0px) rotate(0deg);
        }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const services = [
    {
      name: "Design Service",
      subServices: [
        "Architectural Design",
        "Interior Design",
        "Landscape Design",
        "Urban Design and Planning"
      ]
    },
    {
      name: "Project Management",
      subServices: [
        "Construction Supervision",
        "Contract Administration",
        "Consultancy"
      ]
    },
    {
      name: "Visualization",
      subServices: [
        "Exterior Visualization",
        "Interior Visualization",
        "Site & Context Visualization"
      ]
    }
  ]

  const servicePositions = Array.from({ length: 3 }, (_, i) => {
    // Leave margins on left and right (80px on each side)
    const startX = 80
    const endX = 920
    const availableWidth = endX - startX
    const xSpacing = availableWidth / (services.length - 1)
    const x = startX + (i * xSpacing)
    // Create a wavy pattern - alternating up and down, positioned higher
    const y = 140 + Math.sin((i * Math.PI) / 4) * 100
    return { x, y }
  })

  return (
    <section id="services" className="bg-white pt-20 font-montserrat relative overflow-hidden w-full">
      <div className="relative w-full">
        <div className="mb-8 text-center relative z-20 pt-2">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Our Services</h2>
        </div>

        <div className="w-full max-w-none">
          <div className="relative w-full h-[600px] overflow-hidden">
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
              const baseControlY = (pos.y + nextPos.y) / 2 + (index % 2 === 0 ? 100 : -100)

              const waveAmplitude = 15
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
                {isDark && (
                  <div 
                    className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 text-5xl font-bold select-none"
                    style={{
                      color: 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    {index + 1}
                  </div>
                )}
                {/* Line connecting dot to card - extends from dot to card */}
                <div 
                  className="absolute left-1/2 pointer-events-none"
                  style={{
                    top: '0px', // Start from dot center
                    width: '4px',
                    height: '100px', // Extend down to reach card area  
                    background: isDark ? '#ec1e24' : '#002e47',
                    opacity: 0.9,
                    zIndex: 9, // Above most elements but below card content
                    borderRadius: '2px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    animation: 'waveTravel 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
                    animationDelay: `${index * 0.5}s`,
                    transformOrigin: 'top center',
                    willChange: 'transform'
                  }}
                />
                <div
                  className="absolute left-1/2 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ 
                    top: '2px', // Very close to dot (2px below center)
                    animation: 'waveTravel 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
                    animationDelay: `${index * 0.5}s`,
                    willChange: 'transform',
                    maxWidth: '320px', 
                    overflow: 'visible',
                    perspective: '1000px',
                    width: '320px',
                    height: '220px',
                    zIndex: 10
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
                        className="text-base sm:text-lg font-bold whitespace-nowrap bg-white px-6 py-4 rounded shadow-md inline-block"
                        style={{
                          color: isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(51, 51, 51, 0.8)'
                        }}
                      >
                        {services[index].name}
                </p>
              </div>
                    {/* Back face - Sub Services */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div 
                        className="bg-white px-6 py-5 rounded shadow-md inline-block max-w-[320px]"
                        style={{
                          color: isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(51, 51, 51, 0.8)'
                        }}
                      >
                        <ul className="text-left space-y-3" style={{ paddingLeft: '0', listStyle: 'none' }}>
                          {services[index].subServices.map((subService, idx) => (
                            <li 
                              key={idx}
                              className="flex items-start"
                              style={{
                                color: isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(51, 51, 51, 0.8)'
                              }}
                            >
                              <span 
                                style={{ 
                                  color: isDark ? '#ec1e24' : 'rgba(51, 51, 51, 0.8)',
                                  fontSize: '1.2rem',
                                  fontWeight: 'bold',
                                  marginRight: '8px',
                                  lineHeight: '1.2'
                                }}
                              >
                                •
                              </span>
                              <span 
                                className="text-sm sm:text-base font-semibold"
                                style={{ 
                                  flex: 1,
                                  fontWeight: '600',
                                  lineHeight: '1.5',
                                  color: isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(51, 51, 51, 0.8)'
                                }}
                              >
                                {subService}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
            </div>
            </div>
          </div>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}