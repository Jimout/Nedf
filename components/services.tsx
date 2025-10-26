"use client"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"

const servicesContent = [
  {
    title: "Architectural Design",
    description:
      "We create innovative and functional architectural designs that blend aesthetics with practicality. Our team develops comprehensive design solutions from concept to detailed drawings, ensuring every project reflects your vision while meeting all regulatory requirements and sustainability standards.",
  },
  {
    title: "Interior Design",
    description:
      "Transform your spaces with our expert interior design services. We specialize in creating beautiful, functional interiors that enhance user experience and reflect your brand identity. From space planning to material selection, we handle every detail to bring your vision to life.",
  },
  {
    title: "Landscape Design",
    description:
      "Create stunning outdoor environments with our landscape design expertise. We design sustainable, aesthetically pleasing landscapes that enhance property value and provide functional outdoor spaces. Our designs integrate natural elements with modern design principles.",
  },
  {
    title: "Urban Design and Planning",
    description:
      "Shape the future of cities with our comprehensive urban design and planning services. We develop master plans and strategic frameworks that create vibrant, livable communities. Our approach balances development with sustainability, accessibility, and quality of life.",
  },
  {
    title: "Construction Supervision",
    description:
      "Ensure project excellence with our professional construction supervision services. Our experienced team monitors all construction activities, maintains quality standards, and ensures compliance with specifications and timelines. We provide regular reporting and coordinate between all stakeholders.",
  },
  {
    title: "Contract Administration",
    description:
      "Navigate complex project contracts with our expert contract administration services. We manage all contractual aspects, handle documentation, process claims, and ensure all parties meet their obligations. Our expertise protects your interests throughout the project lifecycle.",
  },
  {
    title: "Consultancy",
    description:
      "Benefit from our strategic consultancy services across all aspects of design and construction. We provide expert advice on feasibility studies, cost optimization, risk management, and project strategy. Our consultants bring decades of industry experience to guide your decisions.",
  },
  {
    title: "Visualization",
    description:
      "Bring your projects to life with our advanced visualization services. We create stunning 3D renderings, animations, and virtual walkthroughs that help stakeholders understand and approve designs before construction. Our visualizations enhance communication and decision-making.",
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Title Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-center" style={{ color: '#ec1e24' }}>Our Services</h1>
        </div>
      </section>

      {/* Sticky Scroll Section - Full Width */}
      <section className="w-full">
        <StickyScroll content={servicesContent} />
      </section>
    </>
  )
}