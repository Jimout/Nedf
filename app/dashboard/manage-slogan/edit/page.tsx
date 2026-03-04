"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  loadSlogan,
  saveSlogan,
  DEFAULT_SLOGAN,
  type SloganData,
} from "@/lib/landing-slogan"
import { ArrowLeft, Save, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ManageSloganEditPage() {
  const router = useRouter()
  const [slogan, setSlogan] = useState<SloganData>(DEFAULT_SLOGAN)
  const [saved, setSaved] = useState(false)
  const [confirmState, setConfirmState] = useState<null | { type: "save" } | { type: "cancel" }>(null)

  useEffect(() => {
    setSlogan(loadSlogan())
  }, [])

  const updateSlogan = (updates: Partial<SloganData>) => {
    setSlogan((prev) => ({ ...prev, ...updates }))
    setSaved(false)
  }

  const handleSave = () => {
    saveSlogan(slogan)
    setSaved(true)
    setConfirmState(null)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCancel = () => {
    setSlogan(loadSlogan())
    setSaved(false)
    setConfirmState(null)
  }

  const handleBack = () => router.push("/dashboard/manage-slogan")

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
                Manage Slogan
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Edit the hero slogan. Changes apply to the landing page.
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
                  "This will update the hero slogan on the landing page. Continue?"}
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
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Line 1</label>
              <Input
                value={slogan.line1}
                onChange={(e) => updateSlogan({ line1: e.target.value })}
                placeholder="e.g. We are a fully"
                className="rounded-none bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Line 2</label>
              <Input
                value={slogan.line2}
                onChange={(e) => updateSlogan({ line2: e.target.value })}
                placeholder="e.g. integrated design firm"
                className="rounded-none bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Line 3</label>
              <Input
                value={slogan.line3}
                onChange={(e) => updateSlogan({ line3: e.target.value })}
                placeholder="e.g. based in Addis Ababa, Ethiopia"
                className="rounded-none bg-background border-border"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
