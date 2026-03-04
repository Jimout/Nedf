import { LANDING_SLOGAN_KEY } from "@/lib/constants"

export interface SloganData {
  line1: string
  line2: string
  line3: string
}

export const DEFAULT_SLOGAN: SloganData = {
  line1: "We are a fully",
  line2: "integrated design firm",
  line3: "based in Addis Ababa, Ethiopia",
}

export function loadSlogan(): SloganData {
  if (typeof window === "undefined") return DEFAULT_SLOGAN
  try {
    const raw = localStorage.getItem(LANDING_SLOGAN_KEY)
    if (!raw) return DEFAULT_SLOGAN
    const parsed = JSON.parse(raw) as SloganData
    return parsed && typeof parsed.line1 === "string" ? parsed : DEFAULT_SLOGAN
  } catch {
    return DEFAULT_SLOGAN
  }
}

export function saveSlogan(data: SloganData) {
  if (typeof window === "undefined") return
  localStorage.setItem(LANDING_SLOGAN_KEY, JSON.stringify(data))
}
