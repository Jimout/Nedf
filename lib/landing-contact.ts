import {
  CONTACT_INFO,
  CONTACT_PAGE,
  CONTACT_FORM_LABELS,
  SOCIAL_LINKS,
  LANDING_CONTACT_KEY,
} from "@/lib/constants"

export interface ContactInfoData {
  address: string
  email: string
  phone: string
  phoneSecondary: string
  availability: string
}

export interface ContactPageData {
  title: string
  subtitle: string
  formTitle: string
  sendButtonLabel: string
  companyInfoTitle: string
  socialLabel: string
}

export interface ContactFormLabelsData {
  fullName: string
  email: string
  subject: string
  message: string
}

export interface ContactSocialLink {
  name: string
  href: string
}

export interface ContactData {
  info: ContactInfoData
  page: ContactPageData
  formLabels: ContactFormLabelsData
  socialLinks: ContactSocialLink[]
}

export const DEFAULT_CONTACT: ContactData = {
  info: {
    address: CONTACT_INFO.address,
    email: CONTACT_INFO.email,
    phone: CONTACT_INFO.phone,
    phoneSecondary: CONTACT_INFO.phoneSecondary,
    availability: CONTACT_INFO.availability,
  },
  page: {
    title: CONTACT_PAGE.title,
    subtitle: CONTACT_PAGE.subtitle,
    formTitle: CONTACT_PAGE.formTitle,
    sendButtonLabel: CONTACT_PAGE.sendButtonLabel,
    companyInfoTitle: CONTACT_PAGE.companyInfoTitle,
    socialLabel: CONTACT_PAGE.socialLabel,
  },
  formLabels: {
    fullName: CONTACT_FORM_LABELS.fullName,
    email: CONTACT_FORM_LABELS.email,
    subject: CONTACT_FORM_LABELS.subject,
    message: CONTACT_FORM_LABELS.message,
  },
  socialLinks: SOCIAL_LINKS.map((s) => ({ name: s.name, href: s.href })),
}

export function loadContact(): ContactData {
  if (typeof window === "undefined") return DEFAULT_CONTACT
  try {
    const raw = localStorage.getItem(LANDING_CONTACT_KEY)
    if (!raw) return DEFAULT_CONTACT
    const parsed = JSON.parse(raw) as Partial<ContactData>
    if (!parsed || typeof parsed !== "object") return DEFAULT_CONTACT

    return {
      info: { ...DEFAULT_CONTACT.info, ...(parsed.info ?? {}) },
      page: { ...DEFAULT_CONTACT.page, ...(parsed.page ?? {}) },
      formLabels: { ...DEFAULT_CONTACT.formLabels, ...(parsed.formLabels ?? {}) },
      socialLinks:
        Array.isArray(parsed.socialLinks) && parsed.socialLinks.length > 0
          ? parsed.socialLinks
          : DEFAULT_CONTACT.socialLinks,
    }
  } catch {
    return DEFAULT_CONTACT
  }
}

export function saveContact(data: ContactData) {
  if (typeof window === "undefined") return
  localStorage.setItem(LANDING_CONTACT_KEY, JSON.stringify(data))
}

