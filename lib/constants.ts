export const APP_CONFIG = {
  name: "NextApp",
  description: "Professional Next.js application with modern tooling",
  version: "1.0.0",
  author: "Your Name",
  url: "https://your-domain.com",
} as const

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
} as const

export const API_ENDPOINTS = {
  USERS: "/api/users",
  POSTS: "/api/posts",
} as const

export const SITE = {
  studioNotesTagline:
    "Stories and lessons from our studio on creativity, strategy, and social impact.",
} as const

export const CONTACT_INFO = {
  address: "Addis Ababa, Ethiopia",
  email: "Nedf123@gmail.com",
  phone: "+251 945 289 012",
  phoneSecondary: "+251 900 672 518",
  availability: "Daily 09 am - 05 pm",
} as const

export const CONTACT_PAGE = {
  title: "Get In Touch With Us",
  subtitle:
    "We're here to answer your questions and help your firm get started with our NEDF system.",
  formTitle: "Contact Form",
  sendButtonLabel: "Send Message",
  companyInfoTitle: "Nedf's Contact Information",
  socialLabel: "Social Media:",
} as const

export const CONTACT_FORM_LABELS = {
  fullName: "Full Name",
  email: "Email",
  subject: "Subject",
  message: "Submit your message request",
} as const

export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "TikTok", href: "#" },
  { name: "X", href: "#" },
  { name: "YouTube", href: "#" },
] as const

/** localStorage key for landing page services (dashboard-managed) */
export const LANDING_SERVICES_KEY = "landingServices"

/** localStorage key for landing page steps (How NEDF Works) */
export const LANDING_STEPS_KEY = "landingSteps"

/** localStorage key for hero slogan (dashboard-managed) */
export const LANDING_SLOGAN_KEY = "landingSlogan"

/** localStorage key for The Crew / founders (dashboard-managed) */
export const LANDING_CREW_KEY = "landingCrew"
