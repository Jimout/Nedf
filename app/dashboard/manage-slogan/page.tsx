"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { loadSlogan, type SloganData } from "@/lib/landing-slogan"
import { Pencil } from "lucide-react"
import Link from "next/link"

export default function SloganViewPage() {
  const [slogan, setSlogan] = useState<SloganData | null>(null)

  useEffect(() => {
    setSlogan(loadSlogan())
  }, [])

  if (!slogan) return null

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="w-full p-4 sm:p-6 mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
              Slogan
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              View the hero slogan shown on the landing page.
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
            asChild
          >
            <Link href="/dashboard/manage-slogan/edit">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>

        <Card className="rounded-none border border-border bg-card">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase text-muted-foreground">Line 1</p>
              <p className="text-foreground text-lg">{slogan.line1 || "—"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase text-muted-foreground">Line 2</p>
              <p className="text-foreground text-lg">{slogan.line2 || "—"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase text-muted-foreground">Line 3</p>
              <p className="text-foreground text-lg">{slogan.line3 || "—"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
