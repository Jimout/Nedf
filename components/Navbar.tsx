"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio", scrollOnLanding: false },
  { name: "Team", href: "/TheCrew", scrollOnLanding: true },
  { name: "Blog", href: "/blog", scrollOnLanding: false },
]

const ctaItem = { name: "Contact Us", href: "/footer", scrollOnLanding: true }

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="w-full relative z-[100]" style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}>
      <nav
        className="w-full relative bg-white overflow-visible"
        style={{
          maskImage: `
            linear-gradient(to right, white 0%, white 15%, white 85%, white 100%),
            linear-gradient(to top, transparent 0%, white 50%, white 100%),
            linear-gradient(to bottom, transparent 0%, white 50%, white 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskImage: `
            linear-gradient(to right, white 0%, white 15%, white 85%, white 100%),
            linear-gradient(to top, transparent 0%, white 50%, white 100%),
            linear-gradient(to bottom, transparent 0%, white 50%, white 100%)
          `,
          WebkitMaskComposite: "intersect",
          pointerEvents: 'auto',
        }}
      >
        {/* Reduced height navbar */}
        <div className="flex items-center w-full max-w-[95%] mx-auto px-4 md:px-12 2xl:px-32 py-1.5 relative z-20" style={{ pointerEvents: 'auto' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 relative z-30">
            <Image src="/nedf-logo.png" alt="NEDF Studios Logo" width={95} height={35} priority />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-center flex-1 ml-28 2xl:ml-36 space-x-16 2xl:space-x-20">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "transition duration-300 ease-in-out pb-1 whitespace-nowrap text-sm 2xl:text-base",
                    isActive
                      ? "text-[#001F4B] underline underline-offset-4 decoration-[#001F4B]"
                      : "text-[#333333] hover:text-[#003366] hover:scale-105",
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* CTA Button */}
          <Link
            href={ctaItem.href}
            className="hidden md:flex items-center px-5 py-1.5 bg-[#001F4B] text-white rounded-md hover:bg-[#003366] transition duration-300 ease-in-out font-medium text-sm 2xl:text-base whitespace-nowrap"
          >
            {ctaItem.name}
          </Link>

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
          "md:hidden bg-white absolute top-full left-0 w-full flex flex-col items-center space-y-3 overflow-hidden transition-all duration-200 ease-out z-[105] shadow-lg",
          isOpen ? "max-h-80 opacity-100 py-4 pointer-events-auto" : "max-h-0 opacity-0 py-0 pointer-events-none",
        )}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation'
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block transition-all duration-150 ease-out text-base text-[#333333] text-center touch-manipulation select-none px-6 py-3 rounded-md active:bg-gray-100 min-h-[44px] flex items-center justify-center",
                isActive ? "underline underline-offset-4 decoration-[#001F4B] font-medium" : "hover:text-[#003366] active:scale-95",
              )}
              onClick={handleClose}
              onTouchEnd={handleClose}
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
        <Link
          href={ctaItem.href}
          className="block px-8 py-3 bg-[#001F4B] text-white rounded-md hover:bg-[#003366] active:bg-[#002850] transition-all duration-150 ease-out font-medium text-base text-center touch-manipulation select-none active:scale-95 shadow-md min-h-[44px] flex items-center justify-center"
          onClick={handleClose}
          onTouchEnd={handleClose}
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            pointerEvents: 'auto',
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          {ctaItem.name}
        </Link>
      </div>
    </div>
  )
}
