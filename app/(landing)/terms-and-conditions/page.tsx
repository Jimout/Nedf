import { LegalPage } from "@/components/LegalPage"
import { ROUTES } from "@/lib/constants"
import {
  TERMS_SECTIONS,
  TERMS_TITLE,
} from "@/lib/legal-content"

const LAST_UPDATED = "March 4, 2026"

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title={TERMS_TITLE}
      lastUpdated={LAST_UPDATED}
      sections={TERMS_SECTIONS}
      backHref={ROUTES.HOME}
    />
  )
}
