"use client"

import React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", href: "/", scrollOnLanding: true, sectionId: "" },
  { name: "Services", href: "/#services", scrollOnLanding: true, sectionId: "services" },
  { name: "Portfolio", href: "/#portfolio", scrollOnLanding: true, sectionId: "portfolio" },
  { name: "About", href: "/#TheCrew", scrollOnLanding: true, sectionId: "TheCrew" },
  { name: "How It Works", href: "/#steps", scrollOnLanding: true, sectionId: "steps" },
  { name: "Team", href: "/#OurTeam", scrollOnLanding: true, sectionId: "OurTeam" },
  { name: "Testimonial", href: "/#testimonials", scrollOnLanding: true, sectionId: "testimonials" },
  { name: "Blog", href: "/blog", scrollOnLanding: false },
  { name: "Contact", href: "/#footer", scrollOnLanding: true, sectionId: "footer" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Animate navbar expanding from top to bottom smoothly
  useEffect(() => {
    if (navRef.current) {
      const navElement = navRef.current
      // Set initial state: collapsed height
      gsap.set(navElement, { 
        height: 0,
        overflow: 'hidden',
        opacity: 1
      })
      
      // Animate expanding from top to bottom with smooth easing
      gsap.to(navElement, {
        height: 'auto',
        duration: 0.9,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(navElement, { overflow: 'visible' })
        }
      })
    }
  }, [])

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { href: string; scrollOnLanding?: boolean; sectionId?: string }) => {
    if (item.scrollOnLanding) {
      e.preventDefault()
      handleClose()
      
      // Handle Home - scroll to top
      if (item.sectionId === "") {
        if (pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
          router.push("/")
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }, 100)
        }
        return
      }
      
      // Handle other sections with IDs
      if (item.sectionId) {
        const sectionId = item.sectionId // Capture for use in setTimeout
        
        if (pathname === "/") {
          // Already on landing page, just scroll
          const section = document.getElementById(sectionId)
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" })
          } else {
            // Fallback: scroll to top if section not found
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        } else {
          // Navigate to landing page first, then scroll
          router.push("/")
          setTimeout(() => {
            const section = document.getElementById(sectionId)
            if (section) {
              section.scrollIntoView({ behavior: "smooth", block: "start" })
            } else {
              // Fallback: scroll to top if section not found
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          }, 100)
        }
      }
    } else {
      handleClose()
    }
  }

  return (
    <div ref={navRef} className="w-full relative z-[100]" style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}>
      <nav
        className="w-full relative overflow-visible"
        style={{
          pointerEvents: 'auto',
        }}
      >
        {/* Reduced height navbar */}
        <div className="w-full relative z-20" style={{ pointerEvents: 'auto' }}>
          <div className="flex items-start justify-between w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            {/* Logo */}
            <Link href="/" className="flex items-start flex-shrink-0 relative z-30 pt-2">
              <Image 
                src="/NEDF TEXT BASED LOGO-14.png" 
                alt="NEDF Studios Logo" 
                width={100} 
                height={40} 
                priority 
                className="dark:hidden"
              />
              <Image 
                src="/NEDF TEXT BASED LOGO-13.png" 
                alt="NEDF Studios Logo Dark" 
                width={100} 
                height={40} 
                priority 
                className="hidden dark:block"
              />
            </Link>

            {/* Theme Toggle and Hamburger container */}
            <div className="ml-auto flex items-center gap-2 pt-2">
              {/* Theme Toggle */}
              <div className="flex items-center justify-center">
                <ThemeToggle />
              </div>
              
              {/* Spacer for hamburger button (which is fixed positioned) */}
              <div className="w-20 h-20 flex-shrink-0"></div>
            </div>
            
            {/* Hamburger menu for all screens - fixed position to stay visible in menu */}
            <button
              onClick={handleToggle}
              onTouchEnd={handleToggle}
              className={cn(
                "fixed w-20 h-20 flex items-center justify-center focus:outline-none bg-transparent border-0 cursor-pointer z-[120] transition-all duration-150 outline-none",
                "touch-manipulation select-none",
                "top-0 right-4 sm:right-6 lg:right-8 xl:right-12 2xl:right-16"
              )}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              type="button"
              style={{ 
                WebkitTapHighlightColor: 'transparent', 
                touchAction: 'manipulation',
                pointerEvents: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                outline: 'none',
                border: 'none',
                boxShadow: 'none',
                marginTop: '0.5rem'
              }}
            >
              {/* Animated Hamburger to X */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-12 h-12 pointer-events-none text-[#001F4B] dark:text-[#ec1e24]"
                style={{ overflow: 'visible' }}
              >
                {/* Top line - rotates 45deg and translates to center to form X */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 6h20"
                  style={{ 
                    transformOrigin: '12px 12px',
                    transform: isOpen ? 'rotate(45deg) translateY(6px)' : 'rotate(0deg) translateY(0px)',
                    transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    willChange: 'transform',
                  }}
                />
                {/* Middle line - fades out smoothly */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 12h20"
                  style={{ 
                    opacity: isOpen ? 0 : 1,
                    transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
                    transformOrigin: '12px 12px',
                    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    willChange: 'opacity, transform',
                  }}
                />
                {/* Bottom line - rotates -45deg and translates to center to form X */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 18h20"
                  style={{ 
                    transformOrigin: '12px 12px',
                    transform: isOpen ? 'rotate(-45deg) translateY(-6px)' : 'rotate(0deg) translateY(0px)',
                    transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    willChange: 'transform',
                  }}
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[104] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={handleClose}
      />

      {/* Full-width expand menu from top to bottom */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full bg-white dark:bg-[#15171a] z-[105] flex flex-col shadow-2xl overflow-y-auto",
          isOpen ? "scale-y-100 opacity-100 pointer-events-auto" : "scale-y-0 opacity-0 pointer-events-none"
        )}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          transformOrigin: 'top center',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, opacity'
        }}
      >
        {/* Menu Items */}
        <div className="flex flex-col space-y-1 px-6 flex-1 items-center justify-start w-full pt-0">
          {navItems.map((item) => {
            // Active state: exact match for pages, never active for hash/scroll sections
            const isActive = pathname === item.href && !item.href.includes("#")
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "transition-all duration-200 ease-out text-xl sm:text-2xl text-[#333333] dark:text-white touch-manipulation select-none px-4 py-3 font-medium font-montserrat text-center w-full",
                  isActive 
                    ? "text-[#001F4B] dark:text-[#ec1e24] underline underline-offset-4" 
                    : "active:scale-95",
                )}
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  pointerEvents: 'auto',
                  userSelect: 'none',
                  WebkitUserSelect: 'none'
                }}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
