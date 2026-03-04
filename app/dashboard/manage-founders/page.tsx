"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { loadCrewSection, type CrewMember } from "@/lib/landing-crew"
import { Pencil } from "lucide-react"
import Link from "next/link"

export default function CrewViewPage() {
  const [aboutDescription, setAboutDescription] = useState("")
  const [crew, setCrew] = useState<CrewMember[]>([])

  useEffect(() => {
    const section = loadCrewSection()
    setAboutDescription(section.aboutDescription)
    setCrew(section.crew)
  }, [])

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="w-full p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
              The Crew
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              View the crew (founders) and About Us section shown on the landing page.
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
            asChild
          >
            <Link href="/dashboard/manage-founders/edit">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>

        <Card className="rounded-none border border-border bg-card">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase text-muted-foreground mb-2">About Us description</p>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {aboutDescription || "—"}
            </p>
          </CardContent>
        </Card>

        <p className="text-sm font-medium text-foreground">Crew members</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {crew.map((member) => (
            <Card key={member.id} className="rounded-none border border-border bg-card overflow-hidden">
              <div className="border-b border-border flex gap-2 p-2 bg-muted/20">
                <div className="rounded-none border border-border bg-muted/30 overflow-hidden w-14 h-14 shrink-0 flex items-center justify-center">
                  {member.image ? (
                    <img src={member.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-muted-foreground">Light</span>
                  )}
                </div>
                <div className="rounded-none border border-border bg-muted/30 overflow-hidden w-14 h-14 shrink-0 flex items-center justify-center">
                  {member.imageDark ? (
                    <img src={member.imageDark} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-muted-foreground">Dark</span>
                  )}
                </div>
                <div className="rounded-none border border-border bg-muted/30 overflow-hidden w-14 h-14 shrink-0 flex items-center justify-center">
                  {member.hoverImage ? (
                    <img src={member.hoverImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-muted-foreground">Hover</span>
                  )}
                </div>
              </div>
              <CardContent className="p-4 space-y-2">
                <p className="font-semibold text-foreground">{member.name || "—"}</p>
                <p className="text-sm text-muted-foreground">{member.title || "—"}</p>
                <p className="text-sm text-foreground leading-relaxed line-clamp-3">
                  {member.description || "—"}
                </p>
                {Object.keys(member.social || {}).length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs font-medium uppercase text-muted-foreground mb-1">Social media</p>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(member.social).map(
                        ([platform, url]) =>
                          url && (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline capitalize"
                            >
                              {platform}
                            </a>
                          )
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {crew.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No crew members yet.</p>
        )}
      </div>
    </div>
  )
}
