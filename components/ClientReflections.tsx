 "use client"

import { useEffect, useState, useRef } from "react"

interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  avatar: string
  photo: string
  work: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "NEDF transformed our office space into a modern, functional environment that perfectly reflects our company culture. The attention to detail and innovative design solutions exceeded our expectations.",
    name: "Sarah Johnson",
    role: "CEO",
    avatar: "SJ",
    photo: "/placeholder-user.jpg",
    work: "Tech Solutions Inc."
  },
  {
    id: 2,
    quote:
      "Working with NEDF was an incredible experience. They understood our vision and brought it to life with creativity and precision. Our new headquarters is now a landmark in the city.",
    name: "Michael Chen",
    role: "Founder",
    avatar: "MC",
    photo: "/placeholder-user.jpg",
    work: "Innovation Labs"
  },
  {
    id: 3,
    quote:
      "The team's expertise in sustainable design helped us create an eco-friendly workspace that not only looks amazing but also reduces our environmental footprint significantly.",
    name: "Emily Rodriguez",
    role: "Director",
    avatar: "ER",
    photo: "/placeholder-user.jpg",
    work: "Green Future Co."
  },
  {
    id: 4,
    quote:
      "NEDF's ability to blend traditional elements with modern design created a unique space that honors our heritage while embracing the future. Simply outstanding work.",
    name: "Ahmed Hassan",
    role: "Managing Partner",
    avatar: "AH",
    photo: "/placeholder-user.jpg",
    work: "Heritage Foundation"
  },
  {
    id: 5,
    quote:
      "From concept to completion, NEDF delivered beyond our wildest dreams. Their collaborative approach and innovative solutions made the entire process seamless and enjoyable.",
    name: "Lisa Thompson",
    role: "Operations Manager",
    avatar: "LT",
    photo: "/placeholder-user.jpg",
    work: "Creative Studios"
  },
  {
    id: 6,
    quote:
      "The attention to detail and commitment to excellence is evident in every corner of our new space. NEDF didn't just design a building, they created an experience.",
    name: "David Kim",
    role: "President",
    avatar: "DK",
    photo: "/placeholder-user.jpg",
    work: "Global Enterprises"
  },
]

export default function SlidingTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return
    const x = e.touches[0].pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div id="testimonials" className="relative py-12 sm:py-16 md:py-20 xl:py-24 2xl:py-28">
      {/* Title */}
      <div className="w-full pb-8 xl:pb-10 2xl:pb-12">
        <p 
          className="text-center text-3xl font-bold sm:text-4xl xl:text-5xl 2xl:text-6xl font-montserrat tracking-tight dark:text-[#ec1e24]"
          style={{ color: 'rgba(51, 51, 51, 0.8)' }}
        >
          CLIENT REFLECTION
        </p>
      </div>

      {/* Auto-scrolling Cards Container */}
      <div className="relative">
        <div 
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={(e) => {
            handleMouseLeave()
            setIsHovered(false)
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsHovered(true)}
        >
          <div className={`flex gap-6 xl:gap-8 2xl:gap-10 ${!isDragging && !isHovered ? 'animate-scroll' : ''}`} style={{ width: '200%' }}>
            {/* Duplicate cards for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-80 sm:w-96 md:w-[500px] xl:w-[560px] 2xl:w-[640px] bg-white dark:bg-[#15171a] p-6 xl:p-7 2xl:p-8 border border-gray-300 dark:border-white/10 mb-8 xl:mb-10 2xl:mb-12 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {/* Quotation Marks */}
                <div className="text-6xl xl:text-7xl 2xl:text-8xl text-gray-300 dark:text-[#ec1e24] font-bold mb-4 xl:mb-5 2xl:mb-6">
                  "
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-[#333333] dark:text-gray-300 text-base xl:text-lg 2xl:text-xl leading-relaxed mb-6 xl:mb-7 2xl:mb-8">
                  {testimonial.quote}
                </blockquote>

                {/* Author Information */}
                <div className="flex items-center gap-3 xl:gap-4 2xl:gap-5">
                  {/* Profile Picture */}
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full object-cover"
                  />
                  
                  {/* Name and Title */}
                  <div>
                      <h3 className="font-bold text-[#333333] dark:text-[#ec1e24] text-sm xl:text-base 2xl:text-lg">
                        {testimonial.name}
                      </h3>
                    <p className="text-[#333333] dark:text-gray-400 text-xs xl:text-sm 2xl:text-base">
                      {testimonial.role}, {testimonial.work}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          animation-timing-function: linear;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .cursor-grab {
          cursor: grab;
        }
        .cursor-grabbing {
          cursor: grabbing;
        }
      `}</style>
    </div>
  )
}