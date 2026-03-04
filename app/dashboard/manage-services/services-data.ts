import { LANDING_SERVICES_KEY } from "@/lib/constants"

export interface LandingService {
  id: string
  name: string
  category: string
  headline: string
  subServices: string[]
  cta: string
  image: string
}

export const DEFAULT_SERVICES: LandingService[] = [
  {
    id: "design",
    name: "Design Service",
    category: "DESIGN SERVICES",
    headline: "Architectural. Interior. Landscape. Urban.",
    subServices: [
      "Architectural Design",
      "Interior Design",
      "Landscape Design",
      "Urban Design and Planning",
    ],
    cta: "EXPLORE DESIGN",
    image: "/interior1.jpg",
  },
  {
    id: "management",
    name: "Project Management",
    category: "PROJECT DELIVERY",
    headline: "Supervision. Administration. Consultancy.",
    subServices: [
      "Construction Supervision",
      "Contract Administration",
      "Consultancy",
    ],
    cta: "EXPLORE SERVICES",
    image: "/room1.jpg",
  },
  {
    id: "visualization",
    name: "Visualization",
    category: "VISUALIZATION",
    headline: "Exterior. Interior. Site & Context.",
    subServices: [
      "Exterior Visualization",
      "Interior Visualization",
      "Site & Context Visualization",
    ],
    cta: "EXPLORE VISUALIZATION",
    image: "/visual1.jpg",
  },
]

export function loadServices(): LandingService[] {
  if (typeof window === "undefined") return DEFAULT_SERVICES
  try {
    const raw = localStorage.getItem(LANDING_SERVICES_KEY)
    if (!raw) return DEFAULT_SERVICES
    const parsed = JSON.parse(raw) as LandingService[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SERVICES
  } catch {
    return DEFAULT_SERVICES
  }
}

export function saveServices(services: LandingService[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(LANDING_SERVICES_KEY, JSON.stringify(services))
}
