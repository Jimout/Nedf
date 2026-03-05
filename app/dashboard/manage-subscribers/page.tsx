"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { loadSubscription, type SubscriptionData } from "@/lib/landing-subscription"
import { Pencil } from "lucide-react"
import Link from "next/link"

export default function SubscriptionViewPage() {
  const [data, setData] = useState<SubscriptionData | null>(null)

  useEffect(() => {
    setData(loadSubscription())
  }, [])

  if (!data) return null

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="w-full p-4 sm:p-6 mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
              Subscription
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              View the footer subscription and contact block shown on the landing page.
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
            asChild
          >
            <Link href="/dashboard/manage-subscribers/edit">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>

        <Card className="rounded-none border border-border bg-card">
          <CardContent className="p-4 space-y-3">
            <p className="text-xs font-medium uppercase text-muted-foreground">Newsletter</p>
            <p className="text-sm text-foreground">
              Placeholder: <span className="font-semibold">{data.newsletter.placeholder}</span>
            </p>
            <p className="text-sm text-foreground">
              Button label: <span className="font-semibold">{data.newsletter.buttonLabel}</span>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.newsletter.description}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-none border border-border bg-card">
            <CardContent className="p-4 space-y-3">
              <p className="text-xs font-medium uppercase text-muted-foreground">Quick links</p>
              <ul className="space-y-1 text-sm text-foreground">
                {data.quickLinks.map((link) => (
                  <li key={link.href}>
                    <span className="font-semibold">{link.label}</span>{" "}
                    <span className="text-muted-foreground">({link.href})</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-none border border-border bg-card">
            <CardContent className="p-4 space-y-3">
              <p className="text-xs font-medium uppercase text-muted-foreground">Contact</p>
              <p className="text-sm text-foreground">{data.contact.email}</p>
              <p className="text-sm text-foreground">{data.contact.phonePrimary}</p>
              <p className="text-sm text-foreground">{data.contact.phoneSecondary}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-none border border-border bg-card">
          <CardContent className="p-4 space-y-3">
            <p className="text-xs font-medium uppercase text-muted-foreground">Social links</p>
            <ul className="space-y-1 text-sm text-foreground">
              {Object.entries(data.social).map(
                ([platform, href]) =>
                  href && (
                    <li key={platform}>
                      <span className="capitalize font-semibold">{platform}</span>{" "}
                      <span className="text-muted-foreground">({href})</span>
                    </li>
                  )
              )}
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-none border border-border bg-card">
          <CardContent className="p-4 space-y-3">
            <p className="text-xs font-medium uppercase text-muted-foreground">Policies & copyright</p>
            <ul className="space-y-1 text-sm text-foreground">
              {data.policyLinks.map((link) => (
                <li key={link.label}>
                  <span className="font-semibold">{link.label}</span>{" "}
                  <span className="text-muted-foreground">({link.href})</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">{data.copyright}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

