"use client"

import { useState, useEffect } from "react"
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
  loadSteps,
  saveSteps,
  DEFAULT_STEPS,
  type StepItem,
} from "../steps-data"
import { Plus, Trash2, ArrowLeft, Save, ChevronDown, ChevronUp, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ManageStepsEditPage() {
  const router = useRouter()
  const [steps, setSteps] = useState<StepItem[]>(DEFAULT_STEPS)
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set([0]))
  const [confirmState, setConfirmState] = useState<
    | null
    | { type: "save" }
    | { type: "cancel" }
    | { type: "delete"; index: number }
  >(null)

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  useEffect(() => {
    setSteps(loadSteps())
  }, [])

  const updateStep = (index: number, updates: Partial<StepItem>) => {
    setSteps((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...updates } : s))
    )
    setSaved(false)
  }

  const addStep = () => {
    const nextId = steps.length > 0 ? Math.max(...steps.map((s) => s.id)) + 1 : 1
    setSteps((prev) => [
      ...prev,
      {
        id: nextId,
        name: "",
        role: `Step ${prev.length + 1}`,
        quote: "",
        avatar: "",
      },
    ])
    setSaved(false)
  }

  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index))
    setSaved(false)
  }

  const handleSave = () => {
    saveSteps(steps)
    setSaved(true)
    setConfirmState(null)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCancel = () => {
    setSteps(loadSteps())
    setSaved(false)
    setConfirmState(null)
  }

  const handleDeleteConfirm = () => {
    if (confirmState?.type === "delete") {
      removeStep(confirmState.index)
      setConfirmState(null)
    }
  }

  const handleBack = () => router.push("/dashboard/manage-steps")

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="w-full p-4 sm:p-6 mx-auto space-y-6">
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
                Manage Steps
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Edit the &quot;How NEDF Works&quot; steps. Changes apply to the landing page.
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
                {confirmState?.type === "delete" && "Remove this step?"}
              </DialogTitle>
              <DialogDescription>
                {confirmState?.type === "save" &&
                  "This will update the steps on the landing page. Continue?"}
                {confirmState?.type === "cancel" &&
                  "All unsaved changes will be lost. Continue?"}
                {confirmState?.type === "delete" &&
                  "This step will be removed. You can add it again later."}
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
              {confirmState?.type === "delete" && (
                <Button
                  variant="destructive"
                  onClick={handleDeleteConfirm}
                  className="bg-destructive text-destructive-foreground"
                >
                  Yes, remove
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Steps</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addStep}
            className="rounded-none border-border text-foreground hover:bg-muted"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add step
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Use &quot;Add step&quot; to create a new step. Use the remove (trash) icon on a step to delete it. Confirm when prompted.
        </p>

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
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setConfirmState({ type: "delete", index })
                        }}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 [&_svg]:shrink-0 rounded-none"
                        aria-label="Remove step"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Remove</span>
                      </Button>
                      <span className="text-muted-foreground" aria-hidden>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                {isExpanded && (
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Name</label>
                        <Input
                          value={step.name}
                          onChange={(e) =>
                            updateStep(index, { name: e.target.value, avatar: e.target.value })
                          }
                          placeholder="e.g. Design"
                          className="rounded-none bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Role label</label>
                        <Input
                          value={step.role}
                          onChange={(e) => updateStep(index, { role: e.target.value })}
                          placeholder="e.g. Step 1"
                          className="rounded-none bg-background border-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Quote</label>
                      <Textarea
                        value={step.quote}
                        onChange={(e) => updateStep(index, { quote: e.target.value })}
                        placeholder="Step description quote"
                        className="rounded-none bg-background border-border min-h-[80px]"
                      />
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
