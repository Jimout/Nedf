export const APP_CONFIG = {
  name: "NEDF Studio",
  description:
    "We are a fully integrated design firm based in Addis Ababa, Ethiopia. We craft perfection through every line and form.",
  version: "1.0.0",
  author: "NEDF Studio",
  url: "https://nedfstudio.com",
} as const

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
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

/** sessionStorage key — splash shown once per browser session on home */
export const SPLASH_STORAGE_KEY = "nedf-splash-shown"

/** html class applied before React hydrates to hide landing until splash */
export const SPLASH_PENDING_CLASS = "nedf-splash-pending"

/** Navbar horizontal padding — all breakpoints */
export const PAGE_GUTTERS =
  "px-6 md:px-10 lg:px-8 xl:px-10 2xl:px-16 3xl:px-20 4xl:px-24"

/** Landing main content horizontal padding — all breakpoints */
export const LANDING_MAIN_GUTTERS =
  "px-6 md:px-10 lg:px-12 xl:px-14 2xl:px-28 3xl:px-32 4xl:px-36"

/** Negative horizontal margins to bleed landing content to the viewport edge */
export const LANDING_MAIN_GUTTERS_BLEED =
  "-mx-6 md:-mx-10 lg:-mx-12 xl:-mx-14 2xl:-mx-28 3xl:-mx-32 4xl:-mx-36"

/** Top/bottom spacing below navbar — blog & portfolio list + detail pages */
export const LANDING_LIST_TOP_PADDING =
  "pt-6 sm:pt-7 md:pt-8 lg:pt-10 xl:pt-12 2xl:pt-14"

export const LANDING_LIST_BOTTOM_PADDING =
  "pb-12 sm:pb-14 md:pb-16 lg:pb-18 xl:pb-20 2xl:pb-24"

/** localStorage key for The Crew / founders (dashboard-managed) */
export const LANDING_CREW_KEY = "landingCrew"

/** localStorage key for footer subscription block (dashboard-managed) */
export const LANDING_SUBSCRIPTION_KEY = "landingSubscription"

/** localStorage key for contact page content (dashboard-managed) */
export const LANDING_CONTACT_KEY = "landingContact"
