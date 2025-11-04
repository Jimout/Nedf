"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CursorAnimation() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const [lastScrollY, setLastScrollY] = useState(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Main cursor position with spring physics
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Trail cursor position (for light trail effect)
  const trailX = useMotionValue(0)
  const trailY = useMotionValue(0)
  const trailXSpring = useSpring(trailX, { damping: 20, stiffness: 150, mass: 0.8 })
  const trailYSpring = useSpring(trailY, { damping: 20, stiffness: 150, mass: 0.8 })

  // Cursor size with spring
  const cursorSize = useMotionValue(12)
  const cursorSizeSpring = useSpring(cursorSize, { damping: 15, stiffness: 300 })

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY ? "down" : "up"
      setScrollDirection(direction)
      setIsScrolling(true)
      setLastScrollY(currentScrollY)

      // Grow cursor slightly when scrolling
      if (direction === "down") {
        cursorSize.set(18)
      } else {
        cursorSize.set(16)
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
        cursorSize.set(12)
      }, 150)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target || typeof target.closest !== "function") return
      if (
        target.tagName === "H1" ||
        target.tagName === "H2" ||
        target.tagName === "H3" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        (target.classList && target.classList.contains("cursor-pointer"))
      ) {
        setIsHovering(true)
        cursorSize.set(32)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target || typeof target.closest !== "function") return
      if (
        target.tagName === "H1" ||
        target.tagName === "H2" ||
        target.tagName === "H3" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        (target.classList && target.classList.contains("cursor-pointer"))
      ) {
        setIsHovering(false)
        cursorSize.set(12)
      }
    }

    // Check for interactive elements on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement
      if (target && typeof target.closest === "function") {
        if (
          target.tagName === "H1" ||
          target.tagName === "H2" ||
          target.tagName === "H3" ||
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          (target.classList && target.classList.contains("cursor-pointer"))
        ) {
          setIsHovering(true)
          cursorSize.set(32)
        } else {
          setIsHovering(false)
          if (!isScrolling) {
            cursorSize.set(12)
          }
        }
      }
    }

    window.addEventListener("mousemove", updateCursor)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter, true)
    document.addEventListener("mouseleave", handleMouseLeave, true)

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mouseenter", handleMouseEnter, true)
      document.removeEventListener("mouseleave", handleMouseLeave, true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      document.body.style.cursor = "auto"
    }
  }, [cursorX, cursorY, trailX, trailY, cursorSize, lastScrollY, isScrolling])

  // Check if device has a mouse (not touch-only)
  const [hasMouse, setHasMouse] = useState(false)

  useEffect(() => {
    const checkMouse = () => {
      setHasMouse(window.matchMedia("(pointer: fine)").matches)
    }
    checkMouse()
    window.addEventListener("resize", checkMouse)
    return () => window.removeEventListener("resize", checkMouse)
  }, [])

  if (!hasMouse) {
    return null // Don't show custom cursor on touch devices
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-white dark:bg-[#ec1e24] transition-colors duration-300"
          style={{
            width: cursorSizeSpring,
            height: cursorSizeSpring,
            boxShadow: isHovering
              ? "0 0 20px rgba(236, 28, 36, 0.6), 0 0 40px rgba(236, 28, 36, 0.3)"
              : isScrolling
                ? scrollDirection === "down"
                  ? "0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.2)"
                  : "0 0 12px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.15)"
                : "0 0 8px rgba(255, 255, 255, 0.3), 0 0 16px rgba(255, 255, 255, 0.1)",
          }}
          animate={{
            scale: isHovering ? 1.2 : isScrolling ? 1.1 : 1,
          }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 300,
          }}
        />
      </motion.div>

      {/* Light trail effect */}
      <motion.div
        ref={cursorTrailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full"
          style={{
            width: isHovering ? 48 : isScrolling ? 24 : 20,
            height: isHovering ? 48 : isScrolling ? 24 : 20,
            background: isHovering
              ? "radial-gradient(circle, rgba(236, 28, 36, 0.4) 0%, rgba(236, 28, 36, 0.1) 50%, transparent 100%)"
              : isScrolling
                ? "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)"
                : "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
            opacity: isHovering ? 0.8 : isScrolling ? 0.6 : 0.4,
          }}
          animate={{
            scale: isHovering ? [1, 1.2, 1] : isScrolling ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Additional glow layers for depth */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] mix-blend-difference"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            className="rounded-full"
            style={{
              width: 64,
              height: 64,
              background: "radial-gradient(circle, rgba(236, 28, 36, 0.2) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </>
  )
}

