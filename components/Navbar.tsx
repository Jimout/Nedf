"use client"

import React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", href: "/", scrollOnLanding: true, sectionId: "" },
  { name: "Services", href: "/#services", scrollOnLanding: true, sectionId: "services" },
  { name: "About", href: "/#TheCrew", scrollOnLanding: true, sectionId: "TheCrew" },
  { name: "Process", href: "/#steps", scrollOnLanding: true, sectionId: "steps" },
  { name: "Team", href: "/#OurTeam", scrollOnLanding: true, sectionId: "OurTeam" },
  { name: "Blog", href: "/#studio-notes", scrollOnLanding: true, sectionId: "studio-notes" },
]

const contactItem = { name: "Contact", href: "/#footer", scrollOnLanding: true, sectionId: "footer" }

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef<HTMLDivElement>(null)

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
        <div className="w-full relative z-20" style={{ pointerEvents: 'auto' }}>
          <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4">
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

            {/* Navigation Links - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1 gap-12 lg:gap-20 ml-12 lg:ml-16">
              {navItems.map((item) => {
                const isActive = pathname === item.href && !item.href.includes("#")
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "transition-all duration-200 ease-out text-sm lg:text-base font-medium font-montserrat whitespace-nowrap",
                      isActive 
                        ? "text-[#002e47] dark:text-[#ec1e24] underline underline-offset-4" 
                        : "text-[#333333] dark:text-white hover:text-[#002e47] dark:hover:text-[#ec1e24]",
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* Right Side - Theme Toggle and Contact Button */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {/* Contact Button */}
              <Link
                href={contactItem.href}
                onClick={(e) => handleNavClick(e, contactItem)}
                className={cn(
                  "hidden md:block px-4 py-2 text-white transition-all duration-200 ease-out text-sm lg:text-base font-medium font-montserrat whitespace-nowrap"
                )}
                style={{
                  backgroundColor: '#002e47',
                  borderRadius: '0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#001f35'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#002e47'
                }}
              >
                {contactItem.name}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
