import type { ReactNode } from "react"

/** Server template — avoids extra client boundaries around the layout router tree. */
export default function LandingTemplate({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return children
}
