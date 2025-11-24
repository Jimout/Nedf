"use client"

import { Suspense, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import BeforeAfterSlider from "@/components/BeforeAfterSlider"
import ImageSlider from "@/components/ImageSlider"
import PanoramaViewer from "@/components/PanoramaViewer"

// ============================================================================
// TYPES
// ============================================================================

interface ProjectData {
  id: string
  title: string
  year: string
  client: string
  location: string
  area: string
  topology: string
  role: string
  status: string
  inspiration: string
  description: string
  features: string[]
  materials: string[]
  colorPalette: string[]
  beforeAfterImages: [string, string]
  galleryImages: string[]
  galleryAlts: string[]
}

// ============================================================================
// CONSTANTS
// ============================================================================

const PROJECTS_DATA: ProjectData[] = [
  {
    id: "p1",
    title: "HIDASSE TELECOM",
    year: "2024",
    client: "Snap Trading and Industry PLC",
    location: "Golagol 22, Addis Ababa",
    area: "958 m²",
    topology: "(4B+G+15+T) Mixed Use Building",
    role: "Design & Supervision",
    status: "Underconstruction",
    inspiration: "Inspired By Natural Light, Open-Plan Living, And Seamless Indoor-Outdoor Integration.",
    description:
      "This Residential Project Emphasizes Open-Plan Living And Seamless Integration With The Surrounding Environment. The Design Prioritizes Natural Light And Sustainable Materials, Creating A Home That Is Both Functional And Aesthetically Harmonious. Terraces And Green Spaces Are Carefully Incorporated To Blend Indoor And Outdoor Areas, Offering Panoramic Views And A Strong Connection To Nature.",
    features: [
      "Sustainable Building Materials",
      "Open-Plan Layout With Panoramic Views",
      "Terraces And Green Spaces Integrated",
    ],
    materials: ["Upholstery", "Marble", "Wood"],
    colorPalette: ["#E3E3D8", "#FDFDFD", "#7A4D12", "#54514A"],
    beforeAfterImages: ["/room1.jpg", "/room2.jpg"],
    galleryImages: ["/room2.jpg", "/room3.jpg", "/interior1.jpg", "/interior2.jpg"],
    galleryAlts: ["Room 2", "Room 3", "Interior 1", "Interior 2"],
  },
  {
    id: "p2",
    title: "ARROW PROJECT",
    year: "2024",
    client: "Arrow Development",
    location: "Bole, Addis Ababa",
    area: "1200 m²",
    topology: "Commercial Building",
    role: "Design & Supervision",
    status: "Completed",
    inspiration: "Modern commercial design with sustainable features.",
    description: "A contemporary commercial building designed for optimal functionality and aesthetic appeal.",
    features: [
      "Sustainable Design Features",
      "Modern Commercial Layout",
      "Energy Efficient Systems",
    ],
    materials: ["Glass", "Steel", "Concrete"],
    colorPalette: ["#FFFFFF", "#000000", "#808080", "#FF0000"],
    beforeAfterImages: ["/room1.jpg", "/room2.jpg"],
    galleryImages: ["/room2.jpg", "/room3.jpg", "/interior1.jpg", "/interior2.jpg"],
    galleryAlts: ["Room 2", "Room 3", "Interior 1", "Interior 2"],
  },
]

const ANIMATION_CONFIG = {
  fadeUp: {
    hidden: { y: 30 },
    visible: { y: 0, transition: { duration: 0.6 } },
  },
} as const

const VIEWPORT_CONFIG = {
  once: true,
  margin: "-100px",
} as const

const CONTENT_SECTIONS = [
  {
    type: "text" as const,
    content:
      "The architectural design seamlessly blends modern aesthetics with functional spaces, creating an environment that promotes both productivity and comfort. Every detail has been carefully considered to enhance the user experience, from the strategic placement of windows to maximize natural light, to the selection of materials that provide both durability and visual appeal. The building's facade reflects a contemporary approach while respecting the surrounding urban context, creating a harmonious relationship between the structure and its environment. Interior spaces are designed with flexibility in mind, allowing for various configurations that can adapt to changing needs over time.",
  },
  {
    type: "image" as const,
    src: "/interior3.jpg",
    alt: "Project showcase 2",
  },
  {
    type: "text" as const,
    content:
      "Innovative spatial planning ensures optimal flow throughout the building, while sustainable materials and energy-efficient systems demonstrate our commitment to environmental responsibility. The design incorporates advanced building technologies that reduce energy consumption and minimize environmental impact, including high-performance glazing systems, efficient HVAC solutions, and renewable energy integration. Circulation paths are carefully planned to create intuitive navigation throughout the space, while strategic zoning separates public and private areas to enhance functionality. The material palette combines natural elements with contemporary finishes, creating a sophisticated aesthetic that will remain timeless for years to come.",
  },
  {
    type: "video" as const,
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Project video",
  },
  {
    type: "text" as const,
    content:
      "The integration of natural light throughout the space creates a warm and inviting atmosphere, while carefully selected materials add texture and depth to the overall design aesthetic. Large windows and strategically placed skylights ensure that daylight penetrates deep into the interior spaces, reducing the need for artificial lighting and creating a connection with the outdoor environment. The interplay of light and shadow throughout the day adds a dynamic quality to the spaces, highlighting architectural features and creating visual interest. Material selections emphasize tactile qualities and natural textures, from smooth polished surfaces to rough-hewn stone, creating a rich sensory experience that engages occupants on multiple levels.",
  },
  {
    type: "image" as const,
    src: "/Bermel_Animation_For-GIF.gif.mp4",
    alt: "Project animation",
  },
  {
    type: "text" as const,
    content:
      "Advanced construction techniques and attention to detail ensure that every aspect of the building meets the highest standards of quality and durability, creating a lasting legacy for generations to come. The construction process employed cutting-edge methodologies and rigorous quality control measures at every stage, from foundation to finishing touches. Skilled craftspeople worked alongside advanced technology to achieve precision in execution, ensuring that the architect's vision was realized with exacting accuracy. The building systems are designed for longevity and ease of maintenance, with careful consideration given to future adaptability and potential expansion. This commitment to excellence in construction ensures that the building will continue to serve its purpose effectively for decades to come.",
  },
  {
    type: "image" as const,
    src: "/visual1.jpg",
    alt: "Project showcase 3",
  },
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function isSpecialProject(title: string): boolean {
  return title.includes("HIDASSE") || title.includes("ARROW")
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Project title with responsive sizing
 */
function ProjectTitle({ title }: { title: string }) {
  const titleClass = isSpecialProject(title)
    ? "text-[#001F4B] dark:text-[#ec1e24]"
    : "text-[#001F4B] dark:text-white"

  return (
    <h1
      className={`text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-normal tracking-wide mb-2 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-3 2xl:mb-4 ${titleClass}`}
    >
      {title}
    </h1>
  )
}

/**
 * Project year and divider
 */
function ProjectYear({ year }: { year: string }) {
  return (
    <>
      <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-[#001f4b]/70 dark:text-white/70 mb-3 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-5 2xl:mb-6">
        {year}
      </p>
      <hr className="mb-8 sm:mb-9 md:mb-10 lg:mb-11 xl:mb-12 2xl:mb-14 border-b-1 border-[#001F4B]/20 dark:border-white/20" />
    </>
  )
}

/**
 * Project metadata info section
 */
function ProjectInfo({ project }: { project: ProjectData }) {
  const infoItems = [
    { label: "CLIENT", value: project.client },
    { label: "LOCATION", value: project.location },
    { label: "AREA", value: project.area },
    { label: "TOPOLOGY", value: project.topology },
    { label: "ROLE", value: project.role },
    { label: "STATUS", value: project.status },
  ]

  return (
    <div className="space-y-1.5 sm:space-y-2 md:space-y-2 lg:space-y-2 xl:space-y-2.5 2xl:space-y-3 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10 2xl:mb-12 leading-relaxed">
      {infoItems.map(({ label, value }) => (
        <p key={label} className="font-medium text-[#333333] dark:text-white">
          {label}: <span className="font-normal text-[#333333]/60 dark:text-white/70">{value}</span>
        </p>
      ))}
    </div>
  )
}

/**
 * Section header with responsive sizing
 */
function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-medium text-[#333333] dark:text-white mb-4 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-6 2xl:mb-7">
      {title}
    </h2>
  )
}

/**
 * Text paragraph with responsive sizing
 */
function TextParagraph({ content }: { content: string }) {
  return (
    <p className="text-[#333333] dark:text-white/70 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg font-normal leading-6 sm:leading-6 md:leading-7 lg:leading-7 xl:leading-8 2xl:leading-8 text-justify">
      {content}
    </p>
  )
}

/**
 * Image showcase with responsive sizing
 */
function ImageShowcase({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full max-h-[280px] sm:max-h-[320px] md:max-h-[360px] lg:max-h-[280px] xl:max-h-[320px] 2xl:max-h-[360px] min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[240px] xl:min-h-[280px] 2xl:min-h-[300px] overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-[#15171a]/50">
      <img src={src} alt={alt} className="w-full h-full object-contain" />
    </div>
  )
}

/**
 * Video embed section
 */
function VideoEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[400px] 2xl:h-[480px] overflow-hidden shadow-lg dark:shadow-[#ec1e24]/10">
      <iframe
        width="100%"
        height="100%"
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}

/**
 * Animated section wrapper
 */
function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      className="mb-8 sm:mb-9 md:mb-10 lg:mb-11 xl:mb-12 2xl:mb-14"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={ANIMATION_CONFIG.fadeUp}
    >
      {children}
    </motion.section>
  )
}

/**
 * Static section without animation
 */
function StaticSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="mb-8 sm:mb-9 md:mb-10 lg:mb-11 xl:mb-12 2xl:mb-14">{children}</section>
  )
}

/**
 * Color palette display
 */
function ColorPalette({ colors }: { colors: string[] }) {
  return (
    <div className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-7 2xl:gap-8 mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10 2xl:mb-12 flex-wrap">
      {colors.map((hex, index) => (
        <div key={index} className="text-center">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 xl:w-18 xl:h-18 2xl:w-20 2xl:h-20 border border-gray-300 dark:border-white/20"
            style={{ backgroundColor: hex }}
          />
          <p className="text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-base mt-1.5 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-2.5 2xl:mt-3 text-[#333333] dark:text-white/70">
            {hex}
          </p>
        </div>
      ))}
    </div>
  )
}

/**
 * Main project detail content
 */
function ProjectDetailContent() {
  const params = useParams()
  const id = params?.id
  const project = PROJECTS_DATA.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-white/70 text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
          Project not found
        </p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden scroll-smooth">
      <div className="relative mx-auto w-full py-8 sm:py-9 md:py-10 lg:py-11 xl:py-12 2xl:py-14 bg-white dark:bg-[#15171a]">
        <main className="text-gray-800 dark:text-white relative font-montserrat">
          <ProjectTitle title={project.title} />
          <ProjectYear year={project.year} />
          <ProjectInfo project={project} />

          {/* Before/After Slider */}
          <div className="mb-8 sm:mb-9 md:mb-10 lg:mb-11 xl:mb-12 2xl:mb-14 flex justify-center">
            <BeforeAfterSlider
              beforeImage={project.beforeAfterImages[0]}
              afterImage={project.beforeAfterImages[1]}
              beforeAlt="Project before renovation"
              afterAlt="Project after renovation"
            />
          </div>

          {/* Inspiration Section */}
          <StaticSection>
            <SectionHeader title="INSPIRATION" />
            <TextParagraph content={project.inspiration} />
          </StaticSection>

          {/* Description Section */}
          <StaticSection>
            <SectionHeader title="DESCRIPTION" />
            <TextParagraph content={project.description} />
          </StaticSection>

          {/* First Image */}
          <AnimatedSection>
            <ImageShowcase src="/room3.jpg" alt="Project showcase 1" />
          </AnimatedSection>

          {/* Dynamic Content Sections */}
          {CONTENT_SECTIONS.map((section, index) => (
            <AnimatedSection key={index}>
              {section.type === "text" && <TextParagraph content={section.content} />}
              {section.type === "image" && <ImageShowcase src={section.src} alt={section.alt} />}
              {section.type === "video" && <VideoEmbed src={section.src} title={section.title} />}
            </AnimatedSection>
          ))}

          {/* 360° Virtual Tour */}
          <AnimatedSection>
            <SectionHeader title="360° VIRTUAL TOUR" />
            <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10 2xl:mb-12">
              <PanoramaViewer
                iframeUrl="https://nedf-studios.github.io/Lula_Beauty_Salon_360/"
                title="360° Virtual Tour"
              />
            </div>
            <p className="text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-base text-gray-500 dark:text-white/70 mt-2 sm:mt-2 md:mt-3 lg:mt-3 xl:mt-4 2xl:mt-4 text-center">
              Drag with mouse or finger to explore in all directions • Scroll to zoom • Click fullscreen for
              immersive view
            </p>
          </AnimatedSection>

          {/* Features Section */}
          <StaticSection>
            <SectionHeader title="FEATURES" />
            <ul className="list-disc list-inside text-[#333333] dark:text-white/70 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg font-normal leading-6 sm:leading-6 md:leading-7 lg:leading-7 xl:leading-8 2xl:leading-8 space-y-1 sm:space-y-1 md:space-y-1.5 lg:space-y-1.5 xl:space-y-2 2xl:space-y-2">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </StaticSection>

          {/* Materials Section */}
          <StaticSection>
            <SectionHeader title="MATERIALS" />
            <ul className="list-disc list-inside text-[#333333] dark:text-white/70 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg font-normal leading-6 sm:leading-6 md:leading-7 lg:leading-7 xl:leading-8 2xl:leading-8 space-y-1 sm:space-y-1 md:space-y-1.5 lg:space-y-1.5 xl:space-y-2 2xl:space-y-2">
              {project.materials.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </StaticSection>

          {/* Color Palette Section */}
          <StaticSection>
            <SectionHeader title="COLOR PALETTE" />
            <ColorPalette colors={project.colorPalette} />
            <ImageSlider images={project.galleryImages} alts={project.galleryAlts} gap={10} />
          </StaticSection>

          {/* Location Map */}
          <AnimatedSection>
            <SectionHeader title="LOCATION" />
            <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7577!3d9.0320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1647000000000!5m2!1sen!2set"
                title="Project Location"
                className="w-full h-full border-0 dark:invert dark:brightness-90 dark:contrast-125 dark:sepia-[0.1] dark:hue-rotate-[320deg] dark:saturate-150"
                allowFullScreen
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ pointerEvents: "auto" }}
              />
            </div>
          </AnimatedSection>
        </main>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Portfolio project detail page with loading state
 */
export default function ProjectDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 dark:text-white/70 text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
            Loading...
          </p>
        </div>
      }
    >
      <ProjectDetailContent />
    </Suspense>
  )
}
