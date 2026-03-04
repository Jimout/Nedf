import { LANDING_STEPS_KEY } from "@/lib/constants"

export interface StepItem {
  id: number
  quote: string
  name: string
  role: string
  avatar: string
}

export const DEFAULT_STEPS: StepItem[] = [
  {
    id: 1,
    quote:
      "We start with imagination. Every idea begins with sketches, visuals, and creative concepts that bring your vision to life. Here, we shape the look and feel the story your brand or project will tell.",
    name: "Design",
    role: "Step 1",
    avatar: "Design",
  },
  {
    id: 2,
    quote:
      "We analyze every angle. Strategy meets creativity as we define purpose, functionality, and impact. It's where design decisions are guided by logic, research, and user needs not just aesthetics.",
    name: "Think",
    role: "Step 2",
    avatar: "Think",
  },
  {
    id: 3,
    quote:
      "Ideas become real. Our team transforms concepts into tangible experiences from detailed visuals and prototypes to complete digital and physical solutions.",
    name: "Make",
    role: "Step 3",
    avatar: "Make",
  },
  {
    id: 4,
    quote:
      "We test everything. We look for weaknesses, challenge assumptions, and refine what doesn't work. Because improvement only happens when you're brave enough to break your own work.",
    name: "Break",
    role: "Step 4",
    avatar: "Break",
  },
  {
    id: 5,
    quote:
      "Excellence is a cycle. We evolve, refine, and repeat until every detail aligns with our vision for quality and innovation. Every project makes the next one better.",
    name: "Repeat",
    role: "Step 5",
    avatar: "Repeat",
  },
]

export function loadSteps(): StepItem[] {
  if (typeof window === "undefined") return DEFAULT_STEPS
  try {
    const raw = localStorage.getItem(LANDING_STEPS_KEY)
    if (!raw) return DEFAULT_STEPS
    const parsed = JSON.parse(raw) as StepItem[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_STEPS
  } catch {
    return DEFAULT_STEPS
  }
}

export function saveSteps(steps: StepItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(LANDING_STEPS_KEY, JSON.stringify(steps))
}
