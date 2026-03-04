import { LANDING_CREW_KEY } from "@/lib/constants"

export interface CrewSocial {
  instagram?: string
  tiktok?: string
  linkedin?: string
  pinterest?: string
  behance?: string
  x?: string
  youtube?: string
}

export interface CrewMember {
  id: string
  name: string
  title: string
  description: string
  image: string
  imageDark?: string
  hoverImage?: string
  social: CrewSocial
}

export interface CrewSectionData {
  aboutDescription: string
  crew: CrewMember[]
}

export const DEFAULT_ABOUT_DESCRIPTION =
  "NEDF is a creative studio based in Addis Ababa, Ethiopia, specializing in architectural design, interior spaces, and high-end visualizations. We blend design with technology to create thoughtful, innovative, and visually compelling environments. From concept to execution, our work reflects a commitment to clarity, craft, and bold creative expression."

export const DEFAULT_CREW: CrewMember[] = [
  {
    id: "1",
    name: "Founder 2",
    title: "Co-founder",
    description:
      "Blender is his second home, and pixel fear his perfection. If it's not beautifully rendered, he's not done yet.",
    image: "/mus.jpg",
    imageDark: "/mus.jpg",
    hoverImage: "/mus2.jpg",
    social: {
      instagram: "https://instagram.com/mussiegs",
      tiktok: "https://tiktok.com/@mussiegs",
      linkedin: "https://linkedin.com/in/mussiegs",
      pinterest: "https://pinterest.com/mussiegs",
      behance: "https://behance.net/mussiegs",
      x: "https://x.com/mussiegs",
      youtube: "https://youtube.com/@mussiegs",
    },
  },
  {
    id: "2",
    name: "Founder 1",
    title: "Co-founder",
    description:
      "He can spot a misaligned pixel from space. Brands trust him, but perfectionism keeps him up at night.",
    image: "/nat.jpg",
    imageDark: "/nat.jpg",
    hoverImage: "/nat2.jpg",
    social: {
      instagram: "https://instagram.com/natnaeltibebe",
      tiktok: "https://tiktok.com/@natnaeltibebe",
      linkedin: "https://linkedin.com/in/natnaeltibebe",
      pinterest: "https://pinterest.com/natnaeltibebe",
      behance: "https://behance.net/natnaeltibebe",
      x: "https://x.com/natnaeltibebe",
      youtube: "https://youtube.com/@natnaeltibebe",
    },
  },
]

export function loadCrewSection(): CrewSectionData {
  if (typeof window === "undefined") {
    return { aboutDescription: DEFAULT_ABOUT_DESCRIPTION, crew: DEFAULT_CREW }
  }
  try {
    const raw = localStorage.getItem(LANDING_CREW_KEY)
    if (!raw) return { aboutDescription: DEFAULT_ABOUT_DESCRIPTION, crew: DEFAULT_CREW }
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed.aboutDescription === "string" && Array.isArray(parsed.crew)) {
      return {
        aboutDescription: parsed.aboutDescription,
        crew: parsed.crew.length > 0 ? parsed.crew : DEFAULT_CREW,
      }
    }
    const asArray = Array.isArray(parsed) ? parsed : []
    return {
      aboutDescription: DEFAULT_ABOUT_DESCRIPTION,
      crew: asArray.length > 0 ? asArray : DEFAULT_CREW,
    }
  } catch {
    return { aboutDescription: DEFAULT_ABOUT_DESCRIPTION, crew: DEFAULT_CREW }
  }
}

export function loadCrew(): CrewMember[] {
  return loadCrewSection().crew
}

export function saveCrew(crew: CrewMember[], aboutDescription?: string) {
  if (typeof window === "undefined") return
  const section = loadCrewSection()
  const data: CrewSectionData = {
    aboutDescription: aboutDescription ?? section.aboutDescription,
    crew,
  }
  localStorage.setItem(LANDING_CREW_KEY, JSON.stringify(data))
}
