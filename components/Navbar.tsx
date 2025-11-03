"use client"

import React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Service", href: "/#services", scrollOnLanding: true, sectionId: "services" },
  { name: "Portfolio", href: "/portfolio", scrollOnLanding: false },
  { name: "About Us", href: "/#TheCrew", scrollOnLanding: true, sectionId: "TheCrew" },
  { name: "Process", href: "/#steps", scrollOnLanding: true, sectionId: "steps" },
  { name: "Team", href: "/#OurTeam", scrollOnLanding: true, sectionId: "OurTeam" },
  { name: "Testimonial", href: "/#testimonials", scrollOnLanding: true, sectionId: "testimonials" },
  { name: "Blog", href: "/blog", scrollOnLanding: false },
  { name: "Subscribe", href: "/#subscription", scrollOnLanding: true, sectionId: "subscription" },
]

const contactItem = { name: "Contact", href: "/#footer", scrollOnLanding: true, sectionId: "footer" }

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

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

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { href: string; scrollOnLanding?: boolean; sectionId?: string }) => {
    if (item.scrollOnLanding && item.sectionId) {
      e.preventDefault()
      handleClose()
      
      const sectionId = item.sectionId // Capture for use in setTimeout
      
      if (pathname === "/") {
        // Already on landing page, just scroll
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      } else {
        // Navigate to landing page first, then scroll
        router.push("/")
        setTimeout(() => {
          const section = document.getElementById(sectionId)
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }, 100)
      }
    } else {
      handleClose()
    }
  }

  return (
    <div className="w-full relative z-[100]" style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}>
      <nav
        className="w-full relative overflow-visible"
        style={{
          pointerEvents: 'auto',
        }}
      >
        {/* Reduced height navbar */}
        <div className="w-full py-1.5 relative z-20" style={{ pointerEvents: 'auto' }}>
          <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 relative z-30">
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

            {/* Hamburger menu for all screens */}
            <button
              onClick={handleToggle}
              onTouchEnd={handleToggle}
              className={cn(
                "ml-auto relative w-20 h-20 flex items-center justify-center focus:outline-none bg-transparent border-0 cursor-pointer z-[110] transition-all duration-150 active:bg-gray-200 active:scale-95",
                "touch-manipulation select-none",
              )}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              type="button"
              style={{ 
                WebkitTapHighlightColor: 'transparent', 
                touchAction: 'manipulation',
                pointerEvents: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none'
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
              >
                {/* Top line - rotates and moves to form top part of X */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 6h20"
                  className={cn(
                    "transition-all duration-700 ease-out",
                    isOpen ? "rotate-45 translate-y-3" : "rotate-0 translate-y-0"
                  )}
                  style={{ transformOrigin: '12px 12px' }}
                />
                {/* Middle line - fades out */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 12h10"
                  className={cn(
                    "transition-all duration-500 ease-out",
                    isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  )}
                />
                {/* Bottom line - rotates and moves to form bottom part of X */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 18h20"
                  className={cn(
                    "transition-all duration-700 ease-out",
                    isOpen ? "-rotate-45 -translate-y-3" : "rotate-0 translate-y-0"
                  )}
                  style={{ transformOrigin: '12px 12px' }}
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

      {/* Full-width slide-in menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full bg-white dark:bg-[#15171a] z-[105] flex flex-col shadow-2xl transition-transform duration-300 ease-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation'
        }}
      >
        {/* Header with close button */}
        <div className="flex justify-end p-6">
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            {/* Same X icon as the transformed hamburger */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-8 h-8 text-[#001F4B] dark:text-[#ec1e24]"
            >
              {/* X shape - same as hamburger when transformed */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 6h20"
                className="rotate-45 translate-y-3"
                style={{ transformOrigin: '12px 12px' }}
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 18h20"
                className="-rotate-45 -translate-y-3"
                style={{ transformOrigin: '12px 12px' }}
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col space-y-1 px-6 flex-1 items-center max-w-md mx-auto w-full">
          {navItems.map((item) => {
            // Active state: exact match for pages, never active for hash/scroll sections
            const isActive = pathname === item.href && !item.href.includes("#")
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "transition-all duration-200 ease-out text-lg text-[#333333] dark:text-white text-center touch-manipulation select-none px-4 py-3 font-medium font-montserrat w-full",
                  isActive 
                    ? "bg-[#001F4B]/10 dark:bg-[#ec1e24]/10 text-[#001F4B] dark:text-[#ec1e24] underline underline-offset-4" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95",
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

        {/* Bottom Section */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800 space-y-4 max-w-md mx-auto w-full">
          <Link
            href={contactItem.href}
            onClick={(e) => handleNavClick(e, contactItem)}
            className="block px-6 py-3 bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#003366] dark:hover:bg-[#ec1e24] active:bg-[#002850] dark:active:bg-[#ec1e24] transition-all duration-200 ease-out font-medium text-base text-center touch-manipulation select-none active:scale-95 shadow-md font-montserrat"
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              pointerEvents: 'auto',
              userSelect: 'none',
              WebkitUserSelect: 'none'
            }}
          >
            {contactItem.name}
          </Link>
        </div>
      </div>
    </div>
  )
}
