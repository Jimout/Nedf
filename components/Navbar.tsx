"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", href: "/", scrollOnLanding: true, sectionId: "" },
  { name: "Service", href: "/#services", scrollOnLanding: true, sectionId: "services" },
  { name: "Portfolio", href: "/#portfolio", scrollOnLanding: true, sectionId: "portfolio" },
  { name: "About", href: "/#TheCrew", scrollOnLanding: true, sectionId: "TheCrew" },
  { name: "Blog", href: "/#studio-notes", scrollOnLanding: true, sectionId: "studio-notes" },
]

const contactItem = { name: "Contact", href: "/#footer", scrollOnLanding: true, sectionId: "footer" }

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef<HTMLDivElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

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

    // Add fadeInUp animation for mobile menu
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { href: string; scrollOnLanding?: boolean; sectionId?: string }) => {
    if (item.scrollOnLanding) {
      e.preventDefault()
      
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
        {/* Navbar */}
        <div 
          className="w-full relative z-20 backdrop-blur-md bg-white/80 dark:bg-[#15171a]/80 border-b border-gray-200/50 dark:border-white/10" 
          style={{ pointerEvents: 'auto' }}
        >
          <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-5 md:py-6">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center flex-shrink-0 relative z-30 transition-transform duration-300 hover:scale-105"
            >
              <Image 
                src="/NEDF TEXT BASED LOGO-14.png" 
                alt="NEDF Studios Logo" 
                width={100} 
                height={40} 
                priority 
                className="dark:hidden transition-opacity duration-300"
              />
              <Image 
                src="/NEDF TEXT BASED LOGO-13.png" 
                alt="NEDF Studios Logo Dark" 
                width={100} 
                height={40} 
                priority 
                className="hidden dark:block transition-opacity duration-300"
              />
            </Link>

            {/* Navigation Links - Centered (desktop) */}
            <div className="hidden md:flex items-center justify-center flex-1 gap-6 md:gap-8 lg:gap-12 xl:gap-16 ml-6 md:ml-8 lg:ml-12">
              {navItems.map((item) => {
                const isActive = pathname === item.href && !item.href.includes("#")
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "relative transition-all duration-300 ease-out text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-medium font-montserrat whitespace-nowrap group",
                      isActive 
                        ? "text-[#002e47] dark:text-[#ec1e24]" 
                        : "text-[#333333] dark:text-white hover:text-[#002e47] dark:hover:text-[#ec1e24]",
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* Animated underline */}
                    <span 
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 bg-[#002e47] dark:bg-[#ec1e24] transition-all duration-300 ease-out",
                        isActive 
                          ? "w-full" 
                          : "w-0 group-hover:w-full"
                      )}
                      style={{ transform: 'translateY(4px)' }}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Right Side - Theme Toggle, Contact Button, Mobile Toggle */}
            <div className="flex items-center gap-3 sm:gap-4">
              <ThemeToggle />
              {/* Contact Button */}
              <Link
                href={contactItem.href}
                onClick={(e) => handleNavClick(e, contactItem)}
                className={cn(
                  "hidden md:block px-5 md:px-6 py-2.5 md:py-3 text-white transition-all duration-300 ease-out text-sm md:text-base lg:text-base xl:text-lg font-medium font-montserrat whitespace-nowrap shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                )}
                style={{
                  backgroundColor: '#002e47',
                  boxShadow: '0 4px 6px -1px rgba(0, 46, 71, 0.2), 0 2px 4px -1px rgba(0, 46, 71, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#001f35'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 46, 71, 0.3), 0 4px 6px -2px rgba(0, 46, 71, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#002e47'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 46, 71, 0.2), 0 2px 4px -1px rgba(0, 46, 71, 0.1)'
                }}
              >
                {contactItem.name}
              </Link>

              {/* Mobile menu button (hamburger morphs to X) */}
              <button
                aria-label="Toggle navigation"
                aria-expanded={mobileOpen}
                className="md:hidden inline-flex items-center justify-center p-2 text-[#333333] dark:text-white"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <div className="relative w-6 h-6">
                  <span
                    className={cn(
                      "absolute left-0 right-0 h-0.5 bg-current transition-transform duration-300 ease-out",
                      mobileOpen ? "top-3 rotate-45" : "top-1.5 rotate-0"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 right-0 h-0.5 bg-current transition-opacity duration-200 ease-out",
                      mobileOpen ? "top-3 opacity-0" : "top-1/2 -translate-y-1/2 opacity-100"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 right-0 h-0.5 bg-current transition-transform duration-300 ease-out",
                      mobileOpen ? "top-3 -rotate-45" : "bottom-1.5 rotate-0"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel - overlays content with smooth expand/collapse */}
      <div
        className="md:hidden absolute left-0 right-0 top-full bg-white/95 dark:bg-[#15171a]/95 backdrop-blur-md border-t border-gray-200/50 dark:border-white/10 shadow-xl z-[120] transition-all duration-300 ease-out overflow-hidden"
        style={{
          maxHeight: mobileOpen ? '70vh' : 0,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none'
        }}
      >
          <div className="px-4 py-4 flex flex-col gap-1 max-h-[70vh] overflow-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item)
                  setMobileOpen(false)
                }}
                className="py-3 px-3 text-sm sm:text-base font-medium text-[#333333] dark:text-white rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/5 hover:pl-4 hover:text-[#002e47] dark:hover:text-[#ec1e24]"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={contactItem.href}
              onClick={(e) => {
                handleNavClick(e, contactItem)
                setMobileOpen(false)
              }}
              className="mt-2 w-full text-center px-4 py-3 text-white text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: '#002e47' }}
            >
              {contactItem.name}
            </Link>
          </div>
      </div>
    </div>
  )
}
