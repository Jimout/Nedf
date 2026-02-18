"use client"

import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { gsap } from "gsap"
import { ThemeToggle } from "@/components/theme-toggle"

// ==================== CONSTANTS ====================

const NAV_ITEMS = [
  { name: "Home", href: "/", sectionId: "" },
  { name: "Service", href: "/#services", sectionId: "services" },
  { name: "Portfolio", href: "/portfolio", sectionId: "" },
  { name: "About", href: "/#TheCrew", sectionId: "TheCrew" },
  { name: "Blog", href: "/blog", sectionId: "" },
] as const

const CONTACT_ITEM = { 
  name: "Contact", 
  href: "/#footer", 
  sectionId: "footer" 
} as const

const NAVIGATION_DELAY_MS = 100

// ==================== TYPES ====================

interface NavItem {
  name: string
  href: string
  sectionId: string
}

// ==================== MAIN COMPONENT ====================

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef<HTMLDivElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    animateNavbarEntrance()
  }, [])

  function animateNavbarEntrance() {
    if (!navRef.current) return

    gsap.set(navRef.current, { height: 0, overflow: 'hidden', opacity: 1 })
    gsap.to(navRef.current, {
      height: 'auto',
      duration: 0.9,
      ease: "power2.out",
      onComplete: () => {
        if (navRef.current) {
          gsap.set(navRef.current, { overflow: 'visible' })
        }
      }
    })
  }

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) {
    // Check if this is a regular page navigation (not a section scroll)
    const isPageNavigation = item.href.startsWith("/") && !item.href.includes("#")
    
    if (isPageNavigation) {
      // Let the Link component handle regular page navigation
      return
    }

    // Handle section scrolling
    e.preventDefault()

    if (item.sectionId === "") {
      scrollToTop()
    } else {
      scrollToSection(item.sectionId)
    }
  }

  function scrollToTop() {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), NAVIGATION_DELAY_MS)
    }
  }

  function scrollToSection(sectionId: string) {
    if (pathname === "/") {
      scrollToElement(sectionId)
    } else {
      router.push("/")
      setTimeout(() => scrollToElement(sectionId), NAVIGATION_DELAY_MS)
    }
  }

  function scrollToElement(sectionId: string) {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  function closeMobileMenu() {
    setMobileOpen(false)
  }

  return (
    <div ref={navRef} className="w-full relative z-[100]">
      <nav className="w-full relative">
        <NavbarContent
          pathname={pathname}
          mobileOpen={mobileOpen}
          onNavClick={handleNavClick}
          onToggleMobile={() => setMobileOpen((v) => !v)}
          onCloseMobile={closeMobileMenu}
        />
      </nav>
    </div>
  )
}

// ==================== SUB-COMPONENTS ====================

function NavbarContent({
  pathname,
  mobileOpen,
  onNavClick,
  onToggleMobile,
  onCloseMobile,
}: {
  pathname: string
  mobileOpen: boolean
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void
  onToggleMobile: () => void
  onCloseMobile: () => void
}) {
  return (
    <>
      <div className="
        w-full relative z-20 
        backdrop-blur-md 
        bg-background/80 
      ">
        <div className="
          flex items-center justify-between w-full 
          px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-16 3xl:px-20 4xl:px-24
          py-2.5 md:py-3
        ">
          <NavLogo />
          <DesktopNavLinks pathname={pathname} onNavClick={onNavClick} />
          <NavActions 
            onNavClick={onNavClick} 
            mobileOpen={mobileOpen} 
            onToggleMobile={onToggleMobile} 
          />
        </div>
      </div>
      <MobileMenu 
        isOpen={mobileOpen} 
        onNavClick={onNavClick} 
        onClose={onCloseMobile} 
      />
    </>
  )
}

function NavLogo() {
  const logoClasses = "transition-opacity duration-300 w-[60px] h-auto sm:w-[70px] md:w-[80px] lg:w-[88px] xl:w-[96px] 2xl:w-[100px]"

  return (
    <Link 
      href="/" 
      className="flex items-center flex-shrink-0 relative z-30 transition-transform duration-300 hover:scale-105"
    >
      <Image 
        src="/NEDF TEXT BASED LOGO-14.png" 
        alt="NEDF Studios Logo" 
        width={100} 
        height={32} 
        priority 
        className={cn(logoClasses, "dark:hidden")}
      />
      <Image 
        src="/NEDF TEXT BASED LOGO-13.png" 
        alt="NEDF Studios Logo Dark" 
        width={100} 
        height={32} 
        priority 
        className={cn(logoClasses, "hidden dark:block")}
      />
    </Link>
  )
}

function DesktopNavLinks({
  pathname,
  onNavClick,
}: {
  pathname: string
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void
}) {
  return (
    <div className="
      hidden lg:flex items-center justify-center flex-1 
      gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-9 
      ml-4 md:ml-6 lg:ml-8 xl:ml-10 2xl:ml-12
    ">
      {NAV_ITEMS.map((item) => (
        <NavLink 
          key={item.name} 
          item={item} 
          pathname={pathname} 
          onClick={onNavClick} 
        />
      ))}
    </div>
  )
}

function NavLink({
  item,
  pathname,
  onClick,
}: {
  item: NavItem
  pathname: string
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void
}) {
  const isActive = pathname === item.href && !item.href.includes("#")

  return (
    <Link
      href={item.href}
      onClick={(e) => onClick(e, item)}
      className={cn(
        "transition-all duration-300 ease-out font-medium font-montserrat whitespace-nowrap",
        // Tap targets (desktop): keep visual style, ensure >=44px click height.
        "px-2 py-2",
        "text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-sm",
        "hover:scale-110",
        isActive 
          ? "text-primary" 
          : "text-foreground"
      )}
    >
      {item.name}
    </Link>
  )
}

function NavActions({
  onNavClick,
  mobileOpen,
  onToggleMobile,
}: {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void
  mobileOpen: boolean
  onToggleMobile: () => void
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4 xl:gap-4 2xl:gap-5">
      <ThemeToggle />
      <ContactButton onClick={onNavClick} />
      <HamburgerButton isOpen={mobileOpen} onClick={onToggleMobile} />
    </div>
  )
}

function ContactButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void
}) {
  return (
    <Link
      href={CONTACT_ITEM.href}
      onClick={(e) => onClick(e, CONTACT_ITEM)}
      className={cn(
        // Desktop-only; minimum tap target height.
        "hidden lg:inline-flex lg:items-center lg:justify-center min-h-[44px] text-primary-foreground font-medium font-montserrat whitespace-nowrap",
        "px-3.5 md:px-4 lg:px-5 xl:px-5 2xl:px-6",
        "py-1.5 md:py-2 lg:py-2 xl:py-2.5 2xl:py-2.5",
        "text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base",
        "bg-primary hover:bg-primary/90",
        "shadow-md hover:shadow-lg",
        "transition-all duration-300 ease-out",
        "hover:scale-105 active:scale-95"
      )}
    >
      {CONTACT_ITEM.name}
    </Link>
  )
}

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <button
      aria-label="Toggle navigation"
      aria-expanded={isOpen}
      onClick={onClick}
      className="
        lg:hidden inline-flex items-center justify-center 
        min-w-[44px] min-h-[44px] p-2.5 -mr-2 rounded-lg
        text-foreground
        active:bg-muted
        transition-colors duration-150
        touch-manipulation
      "
    >
      <div className="relative w-5 h-5">
        <HamburgerLine isOpen={isOpen} position="top" />
        <HamburgerLine isOpen={isOpen} position="middle" />
        <HamburgerLine isOpen={isOpen} position="bottom" />
      </div>
    </button>
  )
}

function HamburgerLine({
  isOpen,
  position,
}: {
  isOpen: boolean
  position: 'top' | 'middle' | 'bottom'
}) {
  const baseClasses = "absolute left-0 right-0 h-0.5 bg-current"
  
  const variants = {
    top: cn(
      baseClasses,
      "transition-transform duration-300 ease-out",
      isOpen ? "top-2.5 rotate-45" : "top-1 rotate-0"
    ),
    middle: cn(
      baseClasses,
      "transition-opacity duration-200 ease-out",
      isOpen ? "top-2.5 opacity-0" : "top-1/2 -translate-y-1/2 opacity-100"
    ),
    bottom: cn(
      baseClasses,
      "transition-transform duration-300 ease-out",
      isOpen ? "top-2.5 -rotate-45" : "bottom-1 rotate-0"
    ),
  }

  return <span className={variants[position]} />
}

function MobileMenu({
  isOpen,
  onNavClick,
  onClose,
}: {
  isOpen: boolean
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void
  onClose: () => void
}) {
  return (
    <div
      className="
        lg:hidden absolute left-0 right-0 top-full z-[120]
        bg-background/95 backdrop-blur-md
        border-t border-border shadow-xl
        overflow-hidden
      "
      style={{
        maxHeight: isOpen ? '70vh' : 0,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-in-out'
      }}
    >
      <div className="px-4 py-4 flex flex-col gap-1 max-h-[70vh] overflow-auto">
        {NAV_ITEMS.map((item) => (
          <MobileNavLink
            key={item.name}
            item={item}
            onClick={(e) => {
              onNavClick(e, item)
              onClose()
            }}
          />
        ))}
        <MobileContactButton
          onClick={(e) => {
            onNavClick(e, CONTACT_ITEM)
            onClose()
          }}
        />
      </div>
    </div>
  )
}

function MobileNavLink({
  item,
  onClick,
}: {
  item: NavItem
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="
        py-3 px-3 rounded-lg font-medium
        text-sm sm:text-base
        text-foreground
        hover:bg-muted
        hover:pl-4 hover:text-primary
        transition-all duration-200
      "
    >
      {item.name}
    </Link>
  )
}

function MobileContactButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <Link
      href={CONTACT_ITEM.href}
      onClick={onClick}
      className="
        mt-2 w-full text-center px-4 py-3
        text-primary-foreground font-medium
        text-sm sm:text-base
        bg-primary
        hover:bg-primary/90
        shadow-md hover:shadow-lg
        transition-all duration-300
        hover:scale-[1.02] active:scale-95
      "
    >
      {CONTACT_ITEM.name}
    </Link>
  )
}
