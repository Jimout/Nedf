"use client"

import { Suspense } from "react"
import { useParams } from "next/navigation"
import BeforeAfterSlider from "@/components/BeforeAfterSlider"
import ImageSlider from "@/components/ImageSlider"
import Footer from "@/components/Footer"
import Link from "next/link"
import { PageTransition } from "@/components/Page-transition"

// Example project data
const projects = [
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
  // Add more projects as needed
]

function ProjectDetailContent() {
  const params = useParams()
  const id = params?.id
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Project not found</p>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden">
        <div
          className="relative mx-auto"
          style={{
            maxWidth: "1200px",
            backgroundColor: "white",
            padding: "40px 122px",
            maskImage: `
            linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)
          `,
            WebkitMaskImage: `
            linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)
          `,
            maskComposite: "intersect",
            WebkitMaskComposite: "intersect",
          }}
        >
          <main className="text-gray-800 relative font-montserrat">
            {/* Back Button */}
            <Link href="/portfolio">
              <button
                className="flex items-center text-[#001f4b] hover:text-black mb-6 transition-colors"
                aria-label="Back to Portfolio"
              >
                <span className="text-4xl">←</span>
              </button>
            </Link>

            {/* Title */}
            <h1 className="text-4xl font-normal tracking-wide text-[#001F4B] mb-2">{project.title}</h1>
            <p className="text-[#001f4b]/70 mb-4">{project.year}</p>
            <hr className="mb-12 border-b-1 border-[#001F4B]/20" />

            {/* Project Info */}
            <div className="space-y-2 text-sm mb-8 leading-relaxed">
              <p className="font-normal text-[#333333]">
                CLIENT: <span className="font-normal text-[#333333]/60">{project.client}</span>
              </p>
              <p className="font-medium text-[#333333]">
                LOCATION: <span className="font-normal text-[#333333]/60">{project.location}</span>
              </p>
              <p className="font-medium text-[#333333]">
                AREA: <span className="font-normal text-[#333333]/60">{project.area}</span>
              </p>
              <p className="font-medium text-[#333333]">
                TOPOLOGY: <span className="font-normal text-[#333333]/60">{project.topology}</span>
              </p>
              <p className="font-medium text-[#333333]">
                ROLE: <span className="font-normal text-[#333333]/60">{project.role}</span>
              </p>
              <p className="font-medium text-[#333333]">
                STATUS: <span className="font-normal text-[#333333]/60">{project.status}</span>
              </p>
            </div>

            {/* Before/After Slider */}
            <div className="mb-12 flex justify-center">
              <BeforeAfterSlider
                beforeImage={project.beforeAfterImages[0]}
                afterImage={project.beforeAfterImages[1]}
                beforeAlt="Project before renovation"
                afterAlt="Project after renovation"
                width={956}
                height={600}
                className="w-full h-auto"
              />
            </div>

            {/* Sections */}
            <section className="mb-12">
              <h2 className="text-2xl font-medium text-[#333333] mb-6">INSPIRATION</h2>
              <p className="text-[#333333] text-sm font-normal leading-loose">{project.inspiration}</p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-medium text-[#333333] mb-6">DESCRIPTION</h2>
              <p className="text-[#333333] text-sm font-normal leading-loose">{project.description}</p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-medium text-[#333333] mb-6">FEATURES</h2>
              <ul className="list-disc list-inside text-[#333333] text-sm font-normal leading-loose space-y-1">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-medium text-[#333333] mb-6">MATERIALS</h2>
              <ul className="list-disc list-inside text-[#333333] text-sm font-normal leading-loose space-y-1">
                {project.materials.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-medium text-[#333333] mb-6">COLOR PALETTE</h2>
              <div className="flex gap-6 mb-8">
                {project.colorPalette.map((hex, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 border" style={{ backgroundColor: hex }} />
                    <p className="text-sm mt-2 text-[#333333]">{hex}</p>
                  </div>
                ))}
              </div>

              <ImageSlider images={project.galleryImages} alts={project.galleryAlts} gap={10} />
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </PageTransition>
  )
}

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProjectDetailContent />
    </Suspense>
  )
}
