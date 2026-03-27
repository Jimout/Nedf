import { LANDING_SUBSCRIPTION_KEY, ROUTES } from "@/lib/constants"

export interface SubscriptionQuickLink {
  label: string
  href: string
}

export interface SubscriptionSocialLinks {
  linkedin?: string
  instagram?: string
  tiktok?: string
  x?: string
  youtube?: string
}

export interface SubscriptionContact {
  email: string
  phonePrimary: string
  phoneSecondary: string
}

export interface SubscriptionNewsletter {
  placeholder: string
  buttonLabel: string
  description: string
}

export interface SubscriptionPolicyLink {
  label: string
  href: string
}

export interface SubscriptionData {
  logoLight: string
  logoDark: string
  quickLinks: SubscriptionQuickLink[]
  contact: SubscriptionContact
  social: SubscriptionSocialLinks
  newsletter: SubscriptionNewsletter
  policyLinks: SubscriptionPolicyLink[]
  copyright: string
}

export const DEFAULT_SUBSCRIPTION: SubscriptionData = {
  logoLight: "/NEDF TEXT BASED LOGO-14.png",
  logoDark: "/NEDF TEXT BASED LOGO-13.png",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "About", href: ROUTES.ABOUT },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  contact: {
    email: "Nedf123@gmail.com",
    phonePrimary: "+251 945 289 012",
    phoneSecondary: "+251 900 672 518",
  },
  social: {
    linkedin: "#",
    instagram: "#",
    tiktok: "#",
    x: "#",
    youtube: "#",
  },
  newsletter: {
    placeholder: "Enter your email",
    buttonLabel: "Subscribe",
    description:
      "We’ll only send updates worth your inbox. Projects, insights, and studio news.",
  },
  policyLinks: [
    { label: "Privacy Policy", href: ROUTES.PRIVACY_POLICY },
    { label: "Terms and Conditions", href: ROUTES.TERMS_AND_CONDITIONS },
  ],
  copyright: "© 2026 Nedf Studio. All rights reserved.",
}

export function loadSubscription(): SubscriptionData {
  if (typeof window === "undefined") return DEFAULT_SUBSCRIPTION
  try {
    const raw = localStorage.getItem(LANDING_SUBSCRIPTION_KEY)
    if (!raw) return DEFAULT_SUBSCRIPTION
    const parsed = JSON.parse(raw) as SubscriptionData
    if (!parsed || typeof parsed !== "object") return DEFAULT_SUBSCRIPTION

    const defaultPolicyLinks = DEFAULT_SUBSCRIPTION.policyLinks
    const storedPolicyLinks = Array.isArray(parsed.policyLinks) && parsed.policyLinks.length > 0
      ? parsed.policyLinks
      : defaultPolicyLinks

    // Normalize policy links: replace "#" or empty href with default routes so links always work
    const policyLinks = storedPolicyLinks.map((link) => {
      if (link.href === "#" || link.href === "" || !link.href) {
        const defaultLink = defaultPolicyLinks.find((d) => d.label === link.label)
        return defaultLink ?? link
      }
      return link
    })

    const defaultQuickLinks = DEFAULT_SUBSCRIPTION.quickLinks
    const storedQuickLinks = Array.isArray(parsed.quickLinks) && parsed.quickLinks.length > 0
      ? parsed.quickLinks
      : defaultQuickLinks

    const quickLinks = storedQuickLinks.map((link) => {
      if (link.label === "About" && (link.href === "/#TheCrew" || link.href === "#")) {
        return { ...link, href: ROUTES.ABOUT }
      }
      return link
    })

    return {
      ...DEFAULT_SUBSCRIPTION,
      ...parsed,
      quickLinks,
      policyLinks,
    }
  } catch {
    return DEFAULT_SUBSCRIPTION
  }
}

export function saveSubscription(data: SubscriptionData) {
  if (typeof window === "undefined") return
  localStorage.setItem(LANDING_SUBSCRIPTION_KEY, JSON.stringify(data))
}

