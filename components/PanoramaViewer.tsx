"use client"

import { useEffect, useRef } from "react"

interface PanoramaViewerProps {
  imageUrl?: string
  iframeUrl?: string
  title?: string
}

export default function PanoramaViewer({ imageUrl, iframeUrl, title = "360° Virtual Tour" }: PanoramaViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If using iframe URL, skip Pannellum initialization
    if (iframeUrl) return

    // Load Pannellum library
    const loadPannellum = async () => {
      // Add Pannellum CSS
      if (!document.getElementById("pannellum-css")) {
        const link = document.createElement("link")
        link.id = "pannellum-css"
        link.rel = "stylesheet"
        link.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"
        document.head.appendChild(link)
      }

      // Add Pannellum JS
      if (!window.pannellum) {
        const script = document.createElement("script")
        script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
        script.async = true
        document.body.appendChild(script)

        await new Promise((resolve) => {
          script.onload = resolve
        })
      }

      // Initialize viewer
      if (viewerRef.current && window.pannellum && imageUrl) {
        window.pannellum.viewer(viewerRef.current, {
          type: "equirectangular",
          panorama: imageUrl,
          autoLoad: true,
          showControls: true,
          showFullscreenCtrl: true,
          showZoomCtrl: true,
          mouseZoom: true,
          draggable: true,
          friction: 0.15,
          hfov: 100,
          minHfov: 50,
          maxHfov: 120,
          pitch: 0,
          yaw: 0,
          compass: false,
        })
      }
    }

    loadPannellum()
  }, [imageUrl, iframeUrl])

  // If iframe URL is provided, use iframe instead
  if (iframeUrl) {
    return (
      <div className="w-full h-full">
        <iframe
          src={iframeUrl}
          title={title}
          className="w-full h-full border-0"
          allowFullScreen
          allow="accelerometer; gyroscope; magnetometer; vr; xr-spatial-tracking; fullscreen"
          loading="lazy"
          style={{
            touchAction: "auto",
            pointerEvents: "auto",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>
    )
  }

  // Otherwise use Pannellum viewer
  return <div ref={viewerRef} className="w-full h-full" style={{ minHeight: "600px" }} />
}

declare global {
  interface Window {
    pannellum: {
      viewer: (container: string, config: Record<string, unknown>) => {
        addEventListener: (event: string, callback: () => void) => void
        removeEventListener: (event: string, callback: () => void) => void
        destroy: () => void
      }
    }
  }
}
