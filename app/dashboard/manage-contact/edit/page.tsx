"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { loadContact, saveContact, type ContactData } from "@/lib/landing-contact"
import { ArrowLeft, Save, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ManageContactEditPage() {
  const router = useRouter()
  const [data, setData] = useState<ContactData | null>(null)
  const [saved, setSaved] = useState(false)
  const [confirmState, setConfirmState] = useState<null | { type: "save" } | { type: "cancel" }>(
    null,
  )

  useEffect(() => {
    setData(loadContact())
  }, [])

  if (!data) return null

  const update = (updates: Partial<ContactData>) => {
    setData((prev) => (prev ? { ...prev, ...updates } : prev))
    setSaved(false)
  }

  const handleSave = () => {
    if (!data) return
    saveContact(data)
    setSaved(true)
    setConfirmState(null)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCancel = () => {
    setData(loadContact())
    setSaved(false)
    setConfirmState(null)
  }

  const handleBack = () => router.push("/dashboard/manage-contact")

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="w-full p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
                Manage contact page
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Edit the contact page text, form labels, contact info, and social links.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              onClick={() => setConfirmState({ type: "cancel" })}
              className="rounded-none border-border text-foreground hover:bg-muted"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={() => setConfirmState({ type: "save" })}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {saved ? "Saved" : "Save changes"}
            </Button>
          </div>
        </div>

        <Dialog open={confirmState !== null} onOpenChange={(open) => !open && setConfirmState(null)}>
          <DialogContent className="rounded-none border-border bg-card text-foreground sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {confirmState?.type === "save" && "Save changes?"}
                {confirmState?.type === "cancel" && "Discard changes?"}
              </DialogTitle>
              <DialogDescription>
                {confirmState?.type === "save" &&
                  "This will update the contact page content on the site. Continue?"}
                {confirmState?.type === "cancel" &&
                  "All unsaved changes will be lost. Continue?"}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setConfirmState(null)}
                className="rounded-none border-border"
              >
                No, keep
              </Button>
              {confirmState?.type === "save" && (
                <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                  Yes, save
                </Button>
              )}
              {confirmState?.type === "cancel" && (
                <Button
                  variant="destructive"
                  onClick={handleCancel}
                  className="bg-destructive text-destructive-foreground"
                >
                  Yes, discard
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="rounded-none border border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Page text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                value={data.page.title}
                onChange={(e) => update({ page: { ...data.page, title: e.target.value } })}
                className="rounded-none bg-background border-border"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Subtitle</label>
              <Textarea
                value={data.page.subtitle}
                onChange={(e) => update({ page: { ...data.page, subtitle: e.target.value } })}
                className="rounded-none bg-background border-border min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Form labels</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Full name</label>
              <Input
                value={data.formLabels.fullName}
                onChange={(e) =>
                  update({ formLabels: { ...data.formLabels, fullName: e.target.value } })
                }
                className="rounded-none bg-background border-border"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                value={data.formLabels.email}
                onChange={(e) =>
                  update({ formLabels: { ...data.formLabels, email: e.target.value } })
                }
                className="rounded-none bg-background border-border"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Input
                value={data.formLabels.subject}
                onChange={(e) =>
                  update({ formLabels: { ...data.formLabels, subject: e.target.value } })
                }
                className="rounded-none bg-background border-border"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Message</label>
              <Input
                value={data.formLabels.message}
                onChange={(e) =>
                  update({ formLabels: { ...data.formLabels, message: e.target.value } })
                }
                className="rounded-none bg-background border-border"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-none border border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">Contact info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Address</label>
                <Input
                  value={data.info.address}
                  onChange={(e) =>
                    update({ info: { ...data.info, address: e.target.value } })
                  }
                  className="rounded-none bg-background border-border"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  value={data.info.email}
                  onChange={(e) => update({ info: { ...data.info, email: e.target.value } })}
                  className="rounded-none bg-background border-border"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Phone 1</label>
                <Input
                  value={data.info.phone}
                  onChange={(e) => update({ info: { ...data.info, phone: e.target.value } })}
                  className="rounded-none bg-background border-border"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Phone 2</label>
                <Input
                  value={data.info.phoneSecondary}
                  onChange={(e) =>
                    update({ info: { ...data.info, phoneSecondary: e.target.value } })
                  }
                  className="rounded-none bg-background border-border"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Availability</label>
                <Input
                  value={data.info.availability}
                  onChange={(e) =>
                    update({ info: { ...data.info, availability: e.target.value } })
                  }
                  className="rounded-none bg-background border-border"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">Social links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.socialLinks.map((s, index) => (
                <div key={s.name} className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">{s.name}</label>
                  <Input
                    value={s.href}
                    onChange={(e) => {
                      const next = [...data.socialLinks]
                      next[index] = { ...next[index], href: e.target.value }
                      update({ socialLinks: next })
                    }}
                    className="rounded-none bg-background border-border"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

