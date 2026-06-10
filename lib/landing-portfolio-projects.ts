import { PORTFOLIO_LIST } from "@/lib/landing-portfolio-seo"

export interface PortfolioProject {
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

const DETAILED_PROJECTS: PortfolioProject[] = [
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
    description:
      "A contemporary commercial building designed for optimal functionality and aesthetic appeal.",
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

function createFallbackProject(listItem: (typeof PORTFOLIO_LIST)[number]): PortfolioProject {
  return {
    id: listItem.id,
    title: listItem.title,
    year: "2024",
    client: "Private Client",
    location: "Addis Ababa, Ethiopia",
    area: "—",
    topology: listItem.category,
    role: "Architecture & Design",
    status: "Completed",
    inspiration: `${listItem.title} reflects NEDF Studio's approach to ${listItem.category.toLowerCase()} in Ethiopia.`,
    description: `${listItem.title} — a ${listItem.category.toLowerCase()} project by NEDF Studio in Addis Ababa, Ethiopia.`,
    features: [
      "Context-driven design",
      "Material and light studies",
      "Integrated project delivery",
    ],
    materials: ["Wood", "Stone", "Glass"],
    colorPalette: ["#E3E3D8", "#FDFDFD", "#54514A", "#7A4D12"],
    beforeAfterImages: [listItem.img, listItem.img],
    galleryImages: [listItem.img],
    galleryAlts: [listItem.title],
  }
}

export function getPortfolioProjectById(id: string): PortfolioProject | undefined {
  const detailed = DETAILED_PROJECTS.find((p) => p.id === id)
  if (detailed) return detailed

  const listItem = PORTFOLIO_LIST.find((p) => p.id === id)
  if (!listItem) return undefined

  return createFallbackProject(listItem)
}

export function getAllPortfolioProjectIds(): string[] {
  return PORTFOLIO_LIST.map((p) => p.id)
}
