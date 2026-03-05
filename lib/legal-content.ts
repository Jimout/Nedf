/**
 * Legal page content — section titles and body copy.
 * Edit here to change content without touching page structure.
 */

export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
}

export const PRIVACY_POLICY_TITLE = "Privacy Policy"
export const PRIVACY_POLICY_SECTIONS: LegalSection[] = [
  {
    id: "intro",
    title: "Introduction",
    paragraphs: [
      "Nedf Studio (“we”, “our”, or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.",
      "By using our site, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use our services.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      "We may collect information you provide directly (such as name, email, phone, and project details when you contact us or subscribe to our newsletter), information collected automatically (such as IP address, browser type, and usage data), and information from cookies and similar technologies.",
      "We use this information to deliver our services, communicate with you, improve our website, and comply with legal obligations.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    paragraphs: [
      "We use the information we collect to provide, maintain, and improve our services; to respond to your inquiries; to send newsletters and updates where you have opted in; and to analyze usage and trends.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing and Disclosure",
    paragraphs: [
      "We may share your information with service providers who assist us in operating our website and business, provided they agree to keep it confidential. We may also disclose information where required by law or to protect our rights and safety.",
    ],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [
      "We take reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. No method of transmission over the Internet is fully secure; we cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    paragraphs: [
      "Depending on your location, you may have the right to access, correct, or delete your personal data, or to object to or restrict certain processing. You may also unsubscribe from marketing at any time. Contact us using the details on our website to exercise these rights.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the “Last updated” date. Your continued use of our services after changes constitutes acceptance of the updated policy.",
    ],
  },
]

export const TERMS_TITLE = "Terms and Conditions"
export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using the Nedf Studio website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website or services.",
      "We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of the revised terms.",
    ],
  },
  {
    id: "services",
    title: "Services and Use",
    paragraphs: [
      "Our website and services are provided for general information and for contacting us regarding design and consultancy. You agree to use the site only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site.",
      "You may not attempt to gain unauthorized access to our systems, transmit harmful code, or use automated means to scrape or collect data without our consent.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    paragraphs: [
      "All content on this website, including text, images, logos, and design, is the property of Nedf Studio or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written permission.",
      "Project deliverables and designs created for clients are subject to separate agreements governing ownership and usage.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    paragraphs: [
      "Our website and services are provided “as is”. We do not warrant that the site will be uninterrupted, error-free, or free of viruses. We are not liable for any indirect, incidental, or consequential damages arising from your use of the site or our services.",
      "Information on the site is for general purposes only and does not constitute professional advice. For project-specific advice, please contact us directly.",
    ],
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law, Nedf Studio shall not be liable for any loss or damage arising from your use of our website or services. Our total liability shall not exceed the amount you have paid us for the specific service giving rise to the claim, if any.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    paragraphs: [
      "These Terms and Conditions are governed by the laws of Ethiopia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Ethiopia.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      "For questions about these Terms and Conditions, please contact us using the contact information provided on our website.",
    ],
  },
]
