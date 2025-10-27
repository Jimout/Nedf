"use client"

import { useState } from "react"
import { PinContainer } from "@/components/ui/3d-pin"

interface Service {
  id: number
  title: string
  description?: string
  isSpecial?: boolean
}

const services: Service[] = [
  {
    id: 1,
    title: "GRAPHIC DESIGN",
    description: "Creative visual solutions that captivate and communicate your brand message effectively.",
  },
  {
    id: 2,
    title: "BRAND DESIGN",
    description: "Comprehensive branding strategies that establish your unique identity in the market.",
  },
  {
    id: 3,
    title: "WEB DEVELOPMENT",
    description: "Cutting-edge web solutions built with modern technologies and best practices.",
  },
  {
    id: 4,
    title: "SMM",
    description: "Strategic social media management to grow your online presence and engagement.",
  },
  {
    id: 5,
    title: "MEDIA PRODUCTION",
    description: "Professional media content creation tailored to your brand's unique story.",
  },
  {
    id: 6,
    title: "PHOTOGRAPHY",
    description: "Stunning visual storytelling through professional photography services.",
  },
  {
    id: 7,
    title: "VIDEO EDITING",
    description: "Polished video content that brings your vision to life with precision and creativity.",
  },
  {
    id: 8,
    title: "COPYWRITING",
    description: "Compelling written content that resonates with your audience and drives results.",
  },
]

export function Services() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const firstRow = services.slice(0, 4)
  const secondRow = services.slice(4, 8)

  return (
    <section className="w-full py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="mb-16">
          <h2 className="text-center text-4xl font-bold sm:text-5xl font-montserrat tracking-tight mb-12" style={{ color: '#ec1e24' }}>
            OUR SERVICES
          </h2>
        </div>

        <div 
          className="overflow-x-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`flex gap-16 mb-4 ${!isHovered ? 'animate-slide-right' : ''}`} style={{ width: '200%' }}>
          {[...firstRow, ...firstRow].map((service, index) => {
            return (
              <div key={`${service.id}-${index}`} className="flex justify-center flex-shrink-0">
                <PinContainer
                  title={service.title}
                  description={service.description}
                  href="#"
                  containerClassName="w-full"
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex flex-col items-center justify-center text-center min-h-[220px] w-[350px] sm:w-[380px] md:w-[400px]">
                    <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider line-clamp-3">
                      {hoveredId === service.id ? service.description : service.title}
                    </h3>
                  </div>
                </PinContainer>
              </div>
            )
          })}
          </div>
        </div>

        <div 
          className="overflow-x-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`flex gap-16 mb-12 ${!isHovered ? 'animate-slide-left' : ''}`} style={{ width: '200%' }}>
          {[...secondRow, ...secondRow].map((service, index) => {
            return (
              <div key={`${service.id}-${index}`} className="flex justify-center flex-shrink-0">
                <PinContainer
                  title={service.title}
                  description={service.description}
                  href="#"
                  containerClassName="w-full"
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex flex-col items-center justify-center text-center min-h-[220px] w-[350px] sm:w-[380px] md:w-[400px]">
                    <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider line-clamp-3">
                      {hoveredId === service.id ? service.description : service.title}
                    </h3>
                  </div>
                </PinContainer>
              </div>
            )
          })}
          </div>
        </div>

        <style jsx>{`
          @keyframes slide-right {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          @keyframes slide-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(50%);
            }
          }
          .animate-slide-right {
            animation: slide-right 30s linear infinite;
          }
          .animate-slide-left {
            animation: slide-left 30s linear infinite;
          }
        `}</style>
      </div>
    </section>
  )
}
