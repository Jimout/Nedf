"use client"

import { CardStack } from "@/components/CardStack"

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
  },
  {
    id: 2,
    title: "BRAND DESIGN",
  },
  {
    id: 3,
    title: "WEB DEVELOPMENT",
  },
  {
    id: 4,
    title: "SMM",
  },
  {
    id: 5,
    title: "MEDIA PRODUCTION",
  },
  {
    id: 6,
    title: "PHOTOGRAPHY",
  },
  {
    id: 7,
    title: "VIDEO EDITING",
  },
  {
    id: 8,
    title: "COPYWRITING",
  },
  {
    id: 9,
    title: "ROHA SPECIAL",
    description:
      "A touch of Roha Digitals creative spark, given to you with no strings attached (except maybe good vibes).",
    isSpecial: true,
  },
]

export function Services() {
  const regularServices = services.filter((s) => !s.isSpecial)
  const specialService = services.find((s) => s.isSpecial)

  const cardStackItems = regularServices.map((service) => ({
    id: service.id,
    name: service.title,
    designation: "Service",
    content: <p className="text-sm">{service.title}</p>,
  }))

  if (specialService) {
    cardStackItems.push({
      id: specialService.id,
      name: specialService.title,
      designation: "Special",
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-20 h-20 mb-4 flex items-center justify-center" style={{ color: '#ec1e24' }}>
            <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM128,40a88,88,0,0,0-88,88,8,8,0,0,1-16,0A104,104,0,0,1,128,24a8,8,0,0,1,0,16Zm0,176a8,8,0,0,1,0-16,88,88,0,0,0,88-88,8,8,0,0,1,16,0A104,104,0,0,1,128,216ZM40,128a8,8,0,0,1,16,0,88,88,0,0,0,88,88,8,8,0,0,1,0,16A104,104,0,0,1,40,128Zm176,0a104,104,0,0,1-104,104,8,8,0,0,1,0-16,88,88,0,0,0,88-88A8,8,0,0,1,216,128ZM128,64a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64Zm0,112a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176Zm0-80a32,32,0,1,0,32,32A32,32,0,0,0,128,96Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,128,144Z"/>
            </svg>
          </div>
          <p className="text-xs text-center leading-relaxed max-w-xs">{specialService.description}</p>
        </div>
      ),
    })
  }

  return (
    <section className="w-full">
      {/* Sticky CardStack Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Left Section - Text Content */}
            <div className="flex-1 lg:max-w-md">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white uppercase tracking-wider mb-6">
                EXPERTISE
              </h2>
              <div className="space-y-2 mb-8">
                <p className="text-2xl lg:text-3xl xl:text-4xl font-bold" style={{ color: '#ec1e24' }}>We craft experiences, not just structures.</p>
              </div>
              <p className="text-sm lg:text-base text-white mb-8">
                Every detail <span style={{ color: '#ec1e24' }}>reflects</span> intent and innovation.
              </p>
            </div>

            {/* Right Section - CardStack Component */}
            <div className="flex-1 lg:max-w-2xl w-full flex items-center justify-center">
              <CardStack items={cardStackItems} offset={10} scaleFactor={0.06} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Spacer - provides scroll space for the animation */}
      {Array.from({ length: Math.max(5, cardStackItems.length) }).map((_, i) => (
        <div key={i} className="h-screen" />
      ))}
    </section>
  )
}
