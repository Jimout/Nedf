"use client"

import { useEffect } from "react"
import { TheCrew } from "@/components/TheCrew"
import Steps from "@/components/Steps"
import { OurTeam } from "@/components/OurTeam"
import Subscription from "@/components/Subscription"

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-2 sm:pt-3 md:pt-4 lg:pt-4 xl:pt-5 2xl:pt-6 3xl:pt-6 4xl:pt-8">
        <TheCrew />
        <OurTeam />
        <Steps />
        <Subscription />
      </main>
    </div>
  )
}
