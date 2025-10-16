"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio", scrollOnLanding: false },
  { name: "Team", href: "/#TheCrew", scrollOnLanding: true, sectionId: "TheCrew" },
  { name: "Blog", href: "/blog", scrollOnLanding: false },
]

const contactItem = { name: "Contact", href: "/#footer", scrollOnLanding: true, sectionId: "footer" }

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

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
        className="w-full relative  overflow-visible"
        style={{
          pointerEvents: 'auto',
        }}
      >
        {/* Reduced height navbar */}
        <div className="flex items-center w-full max-w-[95%] mx-auto px-4 md:px-12 2xl:px-32 py-1.5 relative z-20" style={{ pointerEvents: 'auto' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 relative z-30">
            <Image 
              src="/NAVIGATION BAR LOGO OPTION 1.png" 
              alt="NEDF Studios Logo" 
              width={28} 
              height={10} 
              priority 
              className="dark:hidden"
            />
            <Image 
              src="/LOGO FOR THE WEBISTE-06.png" 
              alt="NEDF Studios Logo Dark" 
              width={28} 
              height={10} 
              priority 
              className="hidden dark:block"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-center flex-1 ml-28 2xl:ml-36 space-x-16 2xl:space-x-20">
            {navItems.map((item) => {
              // Active state: exact match for pages, never active for hash/scroll sections
              const isActive = pathname === item.href && !item.href.includes("#")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    "transition duration-300 ease-in-out pb-1 whitespace-nowrap text-sm 2xl:text-base",
                    isActive
                      ? "text-[#001F4B] dark:text-[#ec1e24] underline underline-offset-4 decoration-[#001F4B] dark:decoration-[#ec1e24]"
                      : "text-[#333333] dark:text-white hover:text-[#003366] dark:hover:text-[#ec1e24] hover:scale-105",
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Contact Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href={contactItem.href}
              onClick={(e) => handleNavClick(e, contactItem)}
              className="flex items-center px-5 py-1.5 bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#003366] dark:hover:bg-[#ec1e24]/80 transition duration-300 ease-in-out font-medium text-sm 2xl:text-base whitespace-nowrap"
            >
              {contactItem.name}
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={handleToggle}
            onTouchEnd={handleToggle}
            className={cn(
              "md:hidden ml-auto relative w-12 h-12 flex items-center justify-center focus:outline-none bg-transparent border-0 cursor-pointer z-[110] rounded-lg transition-all duration-150 active:bg-gray-200 active:scale-95",
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
            {/* Hamburger */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#001F4B"
              strokeWidth={2.5}
              className={cn(
                "w-6 h-6 transition-all duration-150 ease-out pointer-events-none",
                isOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100",
              )}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            {/* Close */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#001F4B"
              strokeWidth={2.5}
              className={cn(
                "absolute w-6 h-6 transition-all duration-150 ease-out pointer-events-none",
                isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75",
              )}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden bg-white dark:bg-[#111010] absolute top-full left-0 w-full flex flex-col items-center space-y-3 overflow-hidden transition-all duration-200 ease-out z-[105] shadow-lg",
          isOpen ? "max-h-80 opacity-100 py-4 pointer-events-auto" : "max-h-0 opacity-0 py-0 pointer-events-none",
        )}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation'
        }}
      >
        {navItems.map((item) => {
          // Active state: exact match for pages, never active for hash/scroll sections
          const isActive = pathname === item.href && !item.href.includes("#")
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={cn(
                "block transition-all duration-150 ease-out text-base text-[#333333] dark:text-white text-center touch-manipulation select-none px-6 py-3 rounded-md active:bg-gray-100 dark:active:bg-gray-800 min-h-[44px] flex items-center justify-center",
                isActive ? "underline underline-offset-4 decoration-[#001F4B] dark:decoration-[#ec1e24] font-medium" : "hover:text-[#003366] dark:hover:text-[#ec1e24] active:scale-95",
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
        <div className="flex flex-col space-y-3 w-full px-6">
          <Link
            href={contactItem.href}
            onClick={(e) => handleNavClick(e, contactItem)}
            className="block px-8 py-3 bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#003366] dark:hover:bg-[#ec1e24]/80 active:bg-[#002850] dark:active:bg-[#ec1e24]/90 transition-all duration-150 ease-out font-medium text-base text-center touch-manipulation select-none active:scale-95 shadow-md min-h-[44px] flex items-center justify-center"
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              pointerEvents: 'auto',
              userSelect: 'none',
              WebkitUserSelect: 'none'
            }}
          >
            {contactItem.name}
          </Link>
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  )
}
