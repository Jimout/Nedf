"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { loadContact, type ContactData } from "@/lib/landing-contact"
import { Pencil } from "lucide-react"
import Link from "next/link"

export default function ContactViewPage() {
  const [data, setData] = useState<ContactData | null>(null)

  useEffect(() => {
    setData(loadContact())
  }, [])

  if (!data) return null

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="w-full p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
              Contact page
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              View the contact page content shown on the site.
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
            asChild
          >
            <Link href="/dashboard/manage-contact/edit">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>

        <Card className="rounded-none border border-border bg-card">
          <CardContent className="p-4 space-y-3">
            <p className="text-xs font-medium uppercase text-muted-foreground">Page text</p>
            <p className="text-sm text-foreground font-semibold">{data.page.title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{data.page.subtitle}</p>
          </CardContent>
        </Card>

        <Card className="rounded-none border border-border bg-card">
          <CardContent className="p-4 space-y-3">
            <p className="text-xs font-medium uppercase text-muted-foreground">Form labels</p>
            <ul className="space-y-1 text-sm text-foreground">
              <li>Full name: {data.formLabels.fullName}</li>
              <li>Email: {data.formLabels.email}</li>
              <li>Subject: {data.formLabels.subject}</li>
              <li>Message: {data.formLabels.message}</li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-none border border-border bg-card">
            <CardContent className="p-4 space-y-3">
              <p className="text-xs font-medium uppercase text-muted-foreground">Contact info</p>
              <p className="text-sm text-foreground">{data.info.address}</p>
              <p className="text-sm text-foreground">{data.info.email}</p>
              <p className="text-sm text-foreground">{data.info.phone}</p>
              <p className="text-sm text-foreground">{data.info.phoneSecondary}</p>
              <p className="text-sm text-muted-foreground">{data.info.availability}</p>
            </CardContent>
          </Card>

          <Card className="rounded-none border border-border bg-card">
            <CardContent className="p-4 space-y-3">
              <p className="text-xs font-medium uppercase text-muted-foreground">Social links</p>
              <ul className="space-y-1 text-sm text-foreground">
                {data.socialLinks.map((s) => (
                  <li key={s.name}>
                    <span className="font-semibold">{s.name}</span>{" "}
                    <span className="text-muted-foreground">({s.href})</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

