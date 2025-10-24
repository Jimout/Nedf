"use client"

import { useState } from "react"

interface Service {
  id: number
  number: string
  title: string
  description: string
}

const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "ARCHITECTURAL DESIGN",
    description: "Innovative and sustainable architectural solutions tailored to your vision and requirements.",
  },
  {
    id: 2,
    number: "02",
    title: "INTERIOR DESIGN",
    description: "Transform your spaces with creative interior design that combines aesthetics and functionality.",
  },
  {
    id: 3,
    number: "03",
    title: "LANDSCAPE DESIGN",
    description: "Beautiful outdoor spaces designed to enhance your property and create lasting impressions.",
  },
  {
    id: 4,
    number: "04",
    title: "URBAN DESIGN AND PLANNING",
    description: "Strategic urban planning solutions that shape vibrant and sustainable communities.",
  },
  {
    id: 5,
    number: "05",
    title: "CONSTRUCTION SUPERVISION",
    description: "Expert oversight and management throughout the construction process to ensure quality delivery.",
  },
  {
    id: 6,
    number: "06",
    title: "CONTRACT ADMINISTRATION",
    description: "Professional contract management and administration services for seamless project execution.",
  },
  {
    id: 7,
    number: "07",
    title: "CONSULTANCY",
    description: "Strategic consulting services to guide your projects from conception to completion.",
  },
  {
    id: 8,
    number: "08",
    title: "VISUALIZATION",
    description: "High-quality 3D renderings and visualizations to bring your designs to life.",
  },
]

export function Services() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="w-full py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Title */}
        <div className="pb-12 sm:pb-16">
          <p className="text-center text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-medium text-[#333333] dark:text-[#ec1e24] font-montserrat tracking-wider">
            OUR SERVICES
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center">
      {services.map((service) => (
        <div
          key={service.id}
          onMouseEnter={() => setHoveredId(service.id)}
          onMouseLeave={() => setHoveredId(null)}
          className={`relative h-48 sm:h-56 lg:h-64 overflow-hidden cursor-pointer transition-all duration-300 ${
            hoveredId === service.id
              ? "bg-primary text-primary-foreground shadow-lg scale-105"
              : "bg-white dark:bg-[#15171a] text-foreground border border-border shadow-lg shadow-[#001F4B]/20 dark:shadow-[#ec1e24]/20"
          }`}
        >
          {/* Content Container */}
          <div className="h-full flex flex-col justify-between p-3 sm:p-4 lg:p-6">
            {/* Number and Title - Default State */}
            <div className={`transition-all duration-300 h-full flex flex-col justify-center ${
              hoveredId === service.id ? "opacity-0" : "opacity-100"
            }`}>
              <div className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#001F4B] dark:text-[#ec1e24] mb-1">{service.number}/</div>
              <h3 className="text-sm sm:text-base lg:text-lg font-medium leading-tight text-[#001F4B] dark:text-foreground opacity-70 dark:opacity-80">{service.title}</h3>
            </div>

            {/* Description Only - Visible on Hover */}
            <div
              className={`transition-all duration-300 h-full flex flex-col justify-start ${
                hoveredId === service.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-xs sm:text-sm font-medium leading-tight">{service.description}</p>
            </div>
          </div>

          {/* Accent Line */}
          <div
            className={`absolute bottom-0 left-0 h-1 bg-primary dark:bg-primary transition-all duration-300 ${
              hoveredId === service.id ? "w-full" : "w-0"
            }`}
          />
        </div>
      ))}
        </div>
      </div>
    </section>
  )
}
