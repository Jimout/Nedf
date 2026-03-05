"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loadServices, type LandingService } from "./services-data"
import { Pencil, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

export default function ServicesViewPage() {
  const [services, setServices] = useState<LandingService[]>([])
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set([0]))

  useEffect(() => {
    setServices(loadServices())
  }, [])

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="w-full p-4 sm:p-6 mx-auto space-y-6">
        {/* Header: title + Edit button at top */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
              Services
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              View the services shown on the landing page.
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
            asChild
          >
            <Link href="/dashboard/manage-services/edit">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>

        {/* Read-only service cards */}
        <div className="space-y-6">
          {services.map((service, index) => {
            const isExpanded = expanded.has(index)
            return (
              <Card key={service.id} className="rounded-none border border-border bg-card">
                <CardHeader
                  className="pb-4 cursor-pointer select-none hover:bg-muted/50 transition-colors"
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      Service {index + 1}: {service.name || "Untitled"}
                    </CardTitle>
                    <span className="text-muted-foreground shrink-0" aria-hidden>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                </CardHeader>
                {isExpanded && (
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-xs font-medium uppercase text-muted-foreground">Tab name</p>
                        <p className="text-foreground">{service.name || "—"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium uppercase text-muted-foreground">Category</p>
                        <p className="text-foreground">{service.category || "—"}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase text-muted-foreground">Headline</p>
                      <p className="text-foreground">{service.headline || "—"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase text-muted-foreground">Button (CTA)</p>
                      <p className="text-foreground">{service.cta || "—"}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium uppercase text-muted-foreground">Image</p>
                      <div className="rounded-none border border-border bg-muted/30 overflow-hidden w-32 h-32 shrink-0 flex items-center justify-center">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-muted-foreground px-2">No image</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium uppercase text-muted-foreground">Sub-services</p>
                      <ul className="list-disc list-inside text-foreground space-y-1">
                        {service.subServices.length
                          ? service.subServices.map((sub, i) => (
                              <li key={i}>{sub || "—"}</li>
                            ))
                          : <li className="text-muted-foreground">None</li>}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
