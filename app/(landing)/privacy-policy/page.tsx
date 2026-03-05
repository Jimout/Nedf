import { LegalPage } from "@/components/LegalPage"
import { ROUTES } from "@/lib/constants"
import {
  PRIVACY_POLICY_SECTIONS,
  PRIVACY_POLICY_TITLE,
} from "@/lib/legal-content"

const LAST_UPDATED = "March 4, 2026"

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title={PRIVACY_POLICY_TITLE}
      lastUpdated={LAST_UPDATED}
      sections={PRIVACY_POLICY_SECTIONS}
      backHref={ROUTES.HOME}
    />
  )
}
