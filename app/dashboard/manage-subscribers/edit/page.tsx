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
import {
  loadSubscription,
  saveSubscription,
  DEFAULT_SUBSCRIPTION,
  type SubscriptionData,
} from "@/lib/landing-subscription"
import { ArrowLeft, Save, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ManageSubscriptionEditPage() {
  const router = useRouter()
  const [data, setData] = useState<SubscriptionData>(DEFAULT_SUBSCRIPTION)
  const [saved, setSaved] = useState(false)
  const [confirmState, setConfirmState] = useState<null | { type: "save" } | { type: "cancel" }>(
    null,
  )

  useEffect(() => {
    setData(loadSubscription())
  }, [])

  const update = (updates: Partial<SubscriptionData>) => {
    setData((prev) => ({ ...prev, ...updates }))
    setSaved(false)
  }

  const handleSave = () => {
    saveSubscription(data)
    setSaved(true)
    setConfirmState(null)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCancel = () => {
    setData(loadSubscription())
    setSaved(false)
    setConfirmState(null)
  }

  const handleBack = () => router.push("/dashboard/manage-subscribers")

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
                Manage Subscription
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Edit the footer subscription and contact block. Changes apply to the landing page.
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
                  "This will update the subscription section on the landing page. Continue?"}
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
            <CardTitle className="text-base text-foreground">Newsletter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Placeholder</label>
              <Input
                value={data.newsletter.placeholder}
                onChange={(e) =>
                  update({ newsletter: { ...data.newsletter, placeholder: e.target.value } })
                }
                className="rounded-none bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Button label</label>
              <Input
                value={data.newsletter.buttonLabel}
                onChange={(e) =>
                  update({ newsletter: { ...data.newsletter, buttonLabel: e.target.value } })
                }
                className="rounded-none bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                value={data.newsletter.description}
                onChange={(e) =>
                  update({ newsletter: { ...data.newsletter, description: e.target.value } })
                }
                className="rounded-none bg-background border-border min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-none border border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">Quick links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.quickLinks.map((link, index) => (
                <div key={index} className="space-y-1">
                  <Input
                    value={link.label}
                    onChange={(e) => {
                      const next = [...data.quickLinks]
                      next[index] = { ...next[index], label: e.target.value }
                      update({ quickLinks: next })
                    }}
                    placeholder="Label"
                    className="rounded-none bg-background border-border mb-1"
                  />
                  <Input
                    value={link.href}
                    onChange={(e) => {
                      const next = [...data.quickLinks]
                      next[index] = { ...next[index], href: e.target.value }
                      update({ quickLinks: next })
                    }}
                    placeholder="Href"
                    className="rounded-none bg-background border-border"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-none border border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  value={data.contact.email}
                  onChange={(e) =>
                    update({ contact: { ...data.contact, email: e.target.value } })
                  }
                  className="rounded-none bg-background border-border"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Phone 1</label>
                <Input
                  value={data.contact.phonePrimary}
                  onChange={(e) =>
                    update({ contact: { ...data.contact, phonePrimary: e.target.value } })
                  }
                  className="rounded-none bg-background border-border"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Phone 2</label>
                <Input
                  value={data.contact.phoneSecondary}
                  onChange={(e) =>
                    update({ contact: { ...data.contact, phoneSecondary: e.target.value } })
                  }
                  className="rounded-none bg-background border-border"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-none border border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Social links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(["linkedin", "instagram", "tiktok", "x", "youtube"] as const).map((platform) => (
              <div key={platform} className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground capitalize">
                  {platform}
                </label>
                <Input
                  value={data.social[platform] ?? ""}
                  onChange={(e) =>
                    update({ social: { ...data.social, [platform]: e.target.value } })
                  }
                  className="rounded-none bg-background border-border"
                  placeholder={`${platform} URL`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-none border border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Policies & copyright</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.policyLinks.map((link, index) => (
              <div key={index} className="space-y-1">
                <Input
                  value={link.label}
                  onChange={(e) => {
                    const next = [...data.policyLinks]
                    next[index] = { ...next[index], label: e.target.value }
                    update({ policyLinks: next })
                  }}
                  placeholder="Label"
                  className="rounded-none bg-background border-border mb-1"
                />
                <Input
                  value={link.href}
                  onChange={(e) => {
                    const next = [...data.policyLinks]
                    next[index] = { ...next[index], href: e.target.value }
                    update({ policyLinks: next })
                  }}
                  placeholder="Href"
                  className="rounded-none bg-background border-border"
                />
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Copyright</label>
              <Input
                value={data.copyright}
                onChange={(e) => update({ copyright: e.target.value })}
                className="rounded-none bg-background border-border"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

