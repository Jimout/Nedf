"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  company: string
  avatar: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "NEDF transformed our office space into a modern, functional environment that perfectly reflects our company culture. The attention to detail and innovative design solutions exceeded our expectations.",
    name: "Sarah Johnson",
    role: "CEO",
    company: "Tech Solutions Inc.",
    avatar: "SJ",
    rating: 5
  },
  {
    id: 2,
    quote: "Working with NEDF was an incredible experience. They understood our vision and brought it to life with creativity and precision. Our new headquarters is now a landmark in the city.",
    name: "Michael Chen",
    role: "Founder",
    company: "Innovation Labs",
    avatar: "MC",
    rating: 5
  },
  {
    id: 3,
    quote: "The team's expertise in sustainable design helped us create an eco-friendly workspace that not only looks amazing but also reduces our environmental footprint significantly.",
    name: "Emily Rodriguez",
    role: "Director",
    company: "Green Future Co.",
    avatar: "ER",
    rating: 5
  },
  {
    id: 4,
    quote: "NEDF's ability to blend traditional elements with modern design created a unique space that honors our heritage while embracing the future. Simply outstanding work.",
    name: "Ahmed Hassan",
    role: "Managing Partner",
    company: "Heritage Foundation",
    avatar: "AH",
    rating: 5
  },
  {
    id: 5,
    quote: "From concept to completion, NEDF delivered beyond our wildest dreams. Their collaborative approach and innovative solutions made the entire process seamless and enjoyable.",
    name: "Lisa Thompson",
    role: "Operations Manager",
    company: "Creative Studios",
    avatar: "LT",
    rating: 5
  },
  {
    id: 6,
    quote: "The attention to detail and commitment to excellence is evident in every corner of our new space. NEDF didn't just design a building, they created an experience.",
    name: "David Kim",
    role: "President",
    company: "Global Enterprises",
    avatar: "DK",
    rating: 5
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

export default function AnimatedTestimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
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

  return (
    <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat tracking-tight mb-4"
            style={{ color: isDark ? '#ec1e24' : '#333333' }}
          >
            What Clients Say
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Trusted by leading companies worldwide
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              <div 
                className="h-full dark:bg-[#15171a] border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                style={{ backgroundColor: isDark ? '#15171a' : '#FAF8F6' }}
              >
                {/* Decorative Background Element */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 blur-3xl"
                  style={{ 
                    backgroundColor: isDark ? '#ec1e24' : '#001F4B'
                  }}
                />

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill={i < testimonial.rating ? "#ec1e24" : "currentColor"}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote Icon */}
                <div className="mb-4">
                  <svg 
                    className="w-8 h-8" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    style={{ color: isDark ? '#ec1e24' : '#001F4B', opacity: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-6 relative z-10">
                  {testimonial.quote}
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-white/10 relative z-10">
                  {/* Avatar */}
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ 
                      backgroundColor: isDark ? '#ec1e24' : '#001F4B'
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  
                  {/* Name and Role */}
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-bold text-sm md:text-base truncate"
                      style={{ 
                        color: isDark ? '#ec1e24' : '#001F4B'
                      }}
                    >
                      {testimonial.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 truncate">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div 
                  className="absolute inset-0 rounded-2xl border-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    borderColor: isDark ? '#ec1e24' : '#001F4B'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center"
        >
          <div>
            <div 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: isDark ? '#ec1e24' : '#001F4B' }}
            >
              100+
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Happy Clients
            </div>
          </div>
          <div>
            <div 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: isDark ? '#ec1e24' : '#001F4B' }}
            >
              500+
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Projects Completed
            </div>
          </div>
          <div>
            <div 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: isDark ? '#ec1e24' : '#001F4B' }}
            >
              98%
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Client Satisfaction
            </div>
          </div>
          <div>
            <div 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: isDark ? '#ec1e24' : '#001F4B' }}
            >
              5.0
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Average Rating
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


