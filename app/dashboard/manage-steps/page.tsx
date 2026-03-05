"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loadSteps, type StepItem } from "./steps-data"
import { Pencil, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

export default function StepsViewPage() {
  const [steps, setSteps] = useState<StepItem[]>([])
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set([0]))

  useEffect(() => {
    setSteps(loadSteps())
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
              Steps
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              View the &quot;How NEDF Works&quot; steps shown on the landing page.
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
            asChild
          >
            <Link href="/dashboard/manage-steps/edit">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => {
            const isExpanded = expanded.has(index)
            return (
              <Card key={step.id} className="rounded-none border border-border bg-card">
                <CardHeader
                  className="cursor-pointer select-none hover:bg-muted/50 transition-colors pb-4"
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      Step {index + 1}: {step.name || "Untitled"}
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
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase text-muted-foreground">Role label</p>
                      <p className="text-foreground">{step.role || "—"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase text-muted-foreground">Name / Avatar</p>
                      <p className="text-foreground">{step.name || "—"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase text-muted-foreground">Quote</p>
                      <p className="text-foreground leading-relaxed">{step.quote || "—"}</p>
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
