"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function ManageSloganPage() {
  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="w-full p-4 sm:p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
              Manage Slogan
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage the hero slogan and scroll text
            </p>
          </div>
          <Card className="border border-border bg-card">
            <CardContent className="p-8 text-center text-muted-foreground">
              <Quote className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Slogan management coming soon.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
