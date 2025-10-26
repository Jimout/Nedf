"use client"

import { useEffect, useRef, useState } from "react"

interface PanoramaViewerProps {
  imageUrl?: string
  iframeUrl?: string
  title?: string
}

export default function PanoramaViewer({ imageUrl, iframeUrl, title = "360° Virtual Tour" }: PanoramaViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If using iframe URL, skip Pannellum initialization
    if (iframeUrl) {
      setIsLoading(false)
      return
    }

    // Load Pannellum library
    const loadPannellum = async () => {
      try {
        setIsLoading(true)
        setError(null)

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
          script.onerror = () => {
            setError("Failed to load Pannellum library")
            setIsLoading(false)
          }
          document.body.appendChild(script)

          await new Promise((resolve, reject) => {
            script.onload = resolve
            script.onerror = reject
          })
        }

        // Initialize viewer
        if (viewerRef.current && window.pannellum && imageUrl) {
          try {
            const viewerId = viewerRef.current.id || `panorama-viewer-${Math.random().toString(36).substr(2, 9)}`
            if (!viewerRef.current.id) {
              viewerRef.current.id = viewerId
            }
            window.pannellum.viewer(viewerId, {
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
            setIsLoading(false)
          } catch (initError) {
            console.error("Error initializing Pannellum:", initError)
            setError("Failed to initialize 360° viewer")
            setIsLoading(false)
          }
        } else {
          setError("Missing required parameters for 360° viewer")
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error loading Pannellum:", error)
        setError("Failed to load 360° viewer")
        setIsLoading(false)
      }
    }

    loadPannellum()
  }, [imageUrl, iframeUrl])

  // If iframe URL is provided, use iframe instead
  if (iframeUrl) {
    return (
      <div className="w-full h-full relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Loading 360° tour...</p>
            </div>
          </div>
        )}
        <iframe
          src={iframeUrl}
          title={title}
          className="w-full h-full border-0 rounded-lg"
          allowFullScreen
          allow="accelerometer; gyroscope; magnetometer; vr; xr-spatial-tracking; fullscreen"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError("Failed to load 360° tour")
            setIsLoading(false)
          }}
          style={{
            touchAction: "auto",
            pointerEvents: "auto",
            position: "relative",
            zIndex: 1,
          }}
        />
        {error && (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-20">
            <div className="text-center p-4">
              <p className="text-red-500 mb-2">Error loading 360° tour</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{error}</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Otherwise use Pannellum viewer
  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Loading 360° viewer...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-20">
          <div className="text-center p-4">
            <p className="text-red-500 mb-2">Error loading 360° viewer</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{error}</p>
          </div>
        </div>
      )}
      <div 
        ref={viewerRef} 
        className="w-full h-full rounded-lg overflow-hidden" 
        style={{ minHeight: "600px" }}
        id={`panorama-viewer-${Math.random().toString(36).substr(2, 9)}`}
      />
    </div>
  )
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
