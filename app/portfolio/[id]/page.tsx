"use client"

import { Suspense } from "react"
import { useParams } from "next/navigation"
import BeforeAfterSlider from "@/components/BeforeAfterSlider"
import ImageSlider from "@/components/ImageSlider"
import Footer from "@/components/Footer"
import PanoramaViewer from "@/components/PanoramaViewer"
import Link from "next/link"
import { motion } from "framer-motion"

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

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function ProjectDetailContent() {
  const params = useParams()
  const id = params?.id
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-white/40 text-lg">Project not found</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden scroll-smooth">
      <div
        className="relative mx-auto w-full px-10 md:px-[122px] py-10 bg-white dark:bg-[#15171a]"
        style={{
          maskImage: `
            linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%),
            linear-gradient(to top, transparent 0%, white 1%, white 99%, transparent 100%)
          `,
          WebkitMaskImage: `
            linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%),
            linear-gradient(to top, transparent 0%, white 1%, white 99%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "intersect",
        }}
      >
        <main className="text-gray-800 dark:text-white relative font-montserrat">
          {/* Back Button */}
          <Link href="/portfolio">
            <button
              className="flex items-center text-[#001f4b] dark:text-[#ec1e24] hover:text-black dark:hover:text-white mb-6 transition-colors"
              aria-label="Back to Portfolio"
            >
              <span className="text-4xl">←</span>
            </button>
          </Link>

          {/* Title */}
          <h1 className="text-4xl font-normal tracking-wide text-[#001F4B] dark:text-[#ec1e24] mb-2">{project.title}</h1>
          <p className="text-[#001f4b]/70 dark:text-white/40 mb-4">{project.year}</p>
          <hr className="mb-12 border-b-1 border-[#001F4B]/20 dark:border-white/20" />

          {/* Project Info */}
          <div className="space-y-2 text-sm mb-8 leading-relaxed">
            <p className="font-normal text-[#333333] dark:text-[#ec1e24]">
              CLIENT: <span className="font-normal text-[#333333]/60 dark:text-white/40">{project.client}</span>
            </p>
            <p className="font-medium text-[#333333] dark:text-[#ec1e24]">
              LOCATION: <span className="font-normal text-[#333333]/60 dark:text-white/40">{project.location}</span>
            </p>
            <p className="font-medium text-[#333333] dark:text-[#ec1e24]">
              AREA: <span className="font-normal text-[#333333]/60 dark:text-white/40">{project.area}</span>
            </p>
            <p className="font-medium text-[#333333] dark:text-[#ec1e24]">
              TOPOLOGY: <span className="font-normal text-[#333333]/60 dark:text-white/40">{project.topology}</span>
            </p>
            <p className="font-medium text-[#333333] dark:text-[#ec1e24]">
              ROLE: <span className="font-normal text-[#333333]/60 dark:text-white/40">{project.role}</span>
            </p>
            <p className="font-medium text-[#333333] dark:text-[#ec1e24]">
              STATUS: <span className="font-normal text-[#333333]/60 dark:text-white/40">{project.status}</span>
            </p>
          </div>

          {/* Before/After Slider */}
          <div className="mb-12 flex justify-center">
            <BeforeAfterSlider
              beforeImage={project.beforeAfterImages[0]}
              afterImage={project.beforeAfterImages[1]}
              beforeAlt="Project before renovation"
              afterAlt="Project after renovation"
            />
          </div>

          {/* Sections */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium text-[#333333] dark:text-[#ec1e24] mb-6">INSPIRATION</h2>
            <p className="text-[#333333] dark:text-white/40 text-sm font-normal leading-7 text-justify">{project.inspiration}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium text-[#333333] dark:text-[#ec1e24] mb-6">DESCRIPTION</h2>
            <p className="text-[#333333] dark:text-white/40 text-sm font-normal leading-7 text-justify">{project.description}</p>
          </section>

          {/* Section 1: Image */}
          <motion.section
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <div className="w-full max-h-[500px] min-h-[400px] overflow-hidden flex items-center justify-center bg-gray-50">
              <img src="/room3.jpg" alt="Project showcase 1" className="w-full h-full object-contain" />
            </div>
          </motion.section>

          {/* Section 2: Description */}
          <motion.section
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <div>
              <p className="text-[#333333] dark:text-white/40 text-sm font-normal leading-7 text-justify">
                The architectural design seamlessly blends modern aesthetics with functional spaces, creating an
                environment that promotes both productivity and comfort. Every detail has been carefully considered to
                enhance the user experience, from the strategic placement of windows to maximize natural light, to the
                selection of materials that provide both durability and visual appeal. The building's facade reflects a
                contemporary approach while respecting the surrounding urban context, creating a harmonious relationship
                between the structure and its environment. Interior spaces are designed with flexibility in mind,
                allowing for various configurations that can adapt to changing needs over time.
              </p>
            </div>
          </motion.section>

          {/* Section 3: Another Image */}
          <motion.section
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <div className="w-full max-h-[500px] min-h-[400px] overflow-hidden flex items-center justify-center bg-gray-50">
              <img src="/interior3.jpg" alt="Project showcase 2" className="w-full h-full object-contain" />
            </div>
          </motion.section>

          {/* Section 4: Another Description */}
          <motion.section
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <div>
              <p className="text-[#333333] dark:text-white/40 text-sm font-normal leading-7 text-justify">
                Innovative spatial planning ensures optimal flow throughout the building, while sustainable materials
                and energy-efficient systems demonstrate our commitment to environmental responsibility. The design
                incorporates advanced building technologies that reduce energy consumption and minimize environmental
                impact, including high-performance glazing systems, efficient HVAC solutions, and renewable energy
                integration. Circulation paths are carefully planned to create intuitive navigation throughout the
                space, while strategic zoning separates public and private areas to enhance functionality. The material
                palette combines natural elements with contemporary finishes, creating a sophisticated aesthetic that
                will remain timeless for years to come.
              </p>
            </div>
          </motion.section>

          {/* Section 5: Video (YouTube Embed) */}
          <motion.section
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <div>
              <div className="w-full aspect-video overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Project video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.section>

          {/* Section 6: Third Description */}
          <motion.section
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <div>
              <p className="text-[#333333] dark:text-white/40 text-sm font-normal leading-7 text-justify">
                The integration of natural light throughout the space creates a warm and inviting atmosphere, while
                carefully selected materials add texture and depth to the overall design aesthetic. Large windows and
                strategically placed skylights ensure that daylight penetrates deep into the interior spaces, reducing
                the need for artificial lighting and creating a connection with the outdoor environment. The interplay
                of light and shadow throughout the day adds a dynamic quality to the spaces, highlighting architectural
                features and creating visual interest. Material selections emphasize tactile qualities and natural
                textures, from smooth polished surfaces to rough-hewn stone, creating a rich sensory experience that
                engages occupants on multiple levels.
              </p>
            </div>
          </motion.section>

          {/* Section 7: GIF */}
          <motion.section
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <div className="w-full max-h-[500px] min-h-[400px] overflow-hidden flex items-center justify-center bg-gray-50">
              <img
                src="/Bermel_Animation_For-GIF.gif.mp4"
                alt="Project animation"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.section>

          {/* Section 8: Another Description */}
          <motion.section
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <div>
              <p className="text-[#333333] dark:text-white/40 text-sm font-normal leading-7 text-justify">
                Advanced construction techniques and attention to detail ensure that every aspect of the building meets
                the highest standards of quality and durability, creating a lasting legacy for generations to come. The
                construction process employed cutting-edge methodologies and rigorous quality control measures at every
                stage, from foundation to finishing touches. Skilled craftspeople worked alongside advanced technology
                to achieve precision in execution, ensuring that the architect's vision was realized with exacting
                accuracy. The building systems are designed for longevity and ease of maintenance, with careful
                consideration given to future adaptability and potential expansion. This commitment to excellence in
                construction ensures that the building will continue to serve its purpose effectively for decades to
                come.
              </p>
            </div>
          </motion.section>

          {/* Section 9: Another Image */}
          <motion.section
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <div className="w-full max-h-[500px] min-h-[400px] overflow-hidden flex items-center justify-center bg-gray-50">
              <img src="/visual1.jpg" alt="Project showcase 3" className="w-full h-full object-contain" />
            </div>
          </motion.section>

          {/* Section 10: 360° Experience Embed */}
          <motion.section
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <h2 className="text-2xl font-medium text-[#333333] dark:text-[#ec1e24] mb-6">360° VIRTUAL TOUR</h2>
            <div className="w-full h-[600px]">
              <PanoramaViewer
                iframeUrl="https://nedf-studios.github.io/Lula_Beauty_Salon_360/"
                title="360° Virtual Tour"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-white/40 mt-2 text-center">
              Drag with mouse or finger to explore in all directions • Scroll to zoom • Click fullscreen for immersive
              view
            </p>
          </motion.section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium text-[#333333] dark:text-[#ec1e24] mb-6">FEATURES</h2>
            <ul className="list-disc list-inside text-[#333333] dark:text-white/40 text-sm font-normal leading-7 space-y-1">
              {project.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium text-[#333333] dark:text-[#ec1e24] mb-6">MATERIALS</h2>
            <ul className="list-disc list-inside text-[#333333] dark:text-white/40 text-sm font-normal leading-7 space-y-1">
              {project.materials.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium text-[#333333] dark:text-[#ec1e24] mb-6">COLOR PALETTE</h2>
            <div className="flex gap-6 mb-8">
              {project.colorPalette.map((hex, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 border" style={{ backgroundColor: hex }} />
                  <p className="text-sm mt-2 text-[#333333] dark:text-white/40">{hex}</p>
                </div>
              ))}
            </div>

            <ImageSlider images={project.galleryImages} alts={project.galleryAlts} gap={10} />
          </section>

          {/* Section 11: Google Map Embed */}
          <motion.section
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <h2 className="text-2xl font-medium text-[#333333] dark:text-[#ec1e24] mb-6">LOCATION</h2>
            <div className="w-full h-[500px]">
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
          </motion.section>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProjectDetailContent />
    </Suspense>
  )
}
