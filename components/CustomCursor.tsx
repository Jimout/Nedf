"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const FOLLOW_SPEED = 0.08
const ROTATION_SPEED = 0.3
const HOVER_SELECTOR = "a, button, [data-cursor-hover]"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const followerPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()
  const rotationRef = useRef(0)

  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const setCursorPosition = useCallback((x: number, y: number) => {
    posRef.current = { x, y }
    setCoords({ x, y })
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
    }
  }, [])

  const animate = useCallback(() => {
    const { x: px, y: py } = posRef.current
    const fx = followerPosRef.current.x + (px - followerPosRef.current.x) * FOLLOW_SPEED
    const fy = followerPosRef.current.y + (py - followerPosRef.current.y) * FOLLOW_SPEED
    followerPosRef.current = { x: fx, y: fy }
    rotationRef.current += ROTATION_SPEED

    if (followerRef.current) {
      followerRef.current.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`
      const ring = followerRef.current.querySelector(".cursor-ring-rotate") as SVGElement | null
      if (ring) ring.style.transform = `rotate(${rotationRef.current}deg)`
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  const checkHover = useCallback((target: EventTarget | null) => {
    const el = target as HTMLElement
    setIsHovering(!!el?.closest?.(HOVER_SELECTOR))
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursorPosition(e.clientX, e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onHoverStart = (e: MouseEvent) => checkHover(e.target)
    const onHoverEnd = (e: MouseEvent) => checkHover(e.relatedTarget)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onHoverStart)
    window.addEventListener("mouseout", onHoverEnd)
    document.documentElement.addEventListener("mouseleave", onLeave)
    document.documentElement.addEventListener("mouseenter", onEnter)
    rafRef.current = requestAnimationFrame(animate)

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches
    if (hasFinePointer) document.body.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onHoverStart)
      window.removeEventListener("mouseout", onHoverEnd)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      document.documentElement.removeEventListener("mouseenter", onEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = ""
    }
  }, [animate, setCursorPosition, checkHover])

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(window.matchMedia("(pointer: fine)").matches)
  }, [])

  if (!mounted) return null

  const opacity = visible ? 1 : 0

  return (
    <>
      {/* Crosshair — dark in light mode, white in dark mode (system foreground) */}
      <div
        ref={cursorRef}
        className="custom-cursor custom-cursor__crosshair text-foreground"
        style={{ opacity }}
        aria-hidden
      >
        <div className="custom-cursor__diamond" />
        <div className="custom-cursor__arm custom-cursor__arm--top" />
        <div className="custom-cursor__arm custom-cursor__arm--bottom" />
        <div className="custom-cursor__arm custom-cursor__arm--left" />
        <div className="custom-cursor__arm custom-cursor__arm--right" />
        <div className="custom-cursor__tick custom-cursor__tick--t1" />
        <div className="custom-cursor__tick custom-cursor__tick--t2" />
        <div className="custom-cursor__tick custom-cursor__tick--b1" />
        <div className="custom-cursor__tick custom-cursor__tick--b2" />
        <div className="custom-cursor__tick custom-cursor__tick--l1" />
        <div className="custom-cursor__tick custom-cursor__tick--l2" />
        <div className="custom-cursor__tick custom-cursor__tick--r1" />
        <div className="custom-cursor__tick custom-cursor__tick--r2" />
      </div>

      {/* Lagging ring — dark in light mode, white in dark mode (system foreground) */}
      <div
        ref={followerRef}
        className="custom-cursor custom-cursor__follower text-foreground"
        style={{ opacity }}
        aria-hidden
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          className="custom-cursor__ring-svg"
          style={{ transform: `scale(${isHovering ? 1.35 : 1})` }}
        >
          <circle
            className="cursor-ring-rotate"
            cx="40"
            cy="40"
            r="34"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="3 6"
            opacity="0.5"
            style={{ transformOrigin: "40px 40px" }}
          />
          <circle
            cx="40"
            cy="40"
            r="22"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.25"
          />
          <line x1="40" y1="6" x2="40" y2="1" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
          <line x1="40" y1="74" x2="40" y2="79" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
          <line x1="6" y1="40" x2="1" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
          <line x1="74" y1="40" x2="79" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
          <line x1="16.1" y1="16.1" x2="12.7" y2="12.7" stroke="currentColor" strokeWidth="1" opacity="0.45" />
          <line x1="63.9" y1="16.1" x2="67.3" y2="12.7" stroke="currentColor" strokeWidth="1" opacity="0.45" />
          <line x1="16.1" y1="63.9" x2="12.7" y2="67.3" stroke="currentColor" strokeWidth="1" opacity="0.45" />
          <line x1="63.9" y1="63.9" x2="67.3" y2="67.3" stroke="currentColor" strokeWidth="1" opacity="0.45" />
          <text x="37" y="14" fontSize="3.5" fill="currentColor" opacity="0.5" fontFamily="monospace">0°</text>
          <text x="37" y="71" fontSize="3.5" fill="currentColor" opacity="0.5" fontFamily="monospace">180°</text>
          <text x="3" y="41.5" fontSize="3.5" fill="currentColor" opacity="0.5" fontFamily="monospace">270°</text>
          <text x="65" y="41.5" fontSize="3.5" fill="currentColor" opacity="0.5" fontFamily="monospace">90°</text>
        </svg>
        <div className="custom-cursor__coords text-foreground/80">
          <span>{String(coords.x).padStart(4, "0")}</span>
          <span className="custom-cursor__coords-sep">×</span>
          <span>{String(coords.y).padStart(4, "0")}</span>
        </div>
      </div>
    </>
  )
}
