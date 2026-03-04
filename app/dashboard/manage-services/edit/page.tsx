"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  loadServices,
  saveServices,
  DEFAULT_SERVICES,
  type LandingService,
} from "../services-data"
import { Plus, Trash2, ArrowLeft, Save, ChevronDown, ChevronUp, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ManageServicesEditPage() {
  const router = useRouter()
  const [services, setServices] = useState<LandingService[]>(DEFAULT_SERVICES)
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set([0]))
  const [confirmState, setConfirmState] = useState<
    | null
    | { type: "save" }
    | { type: "cancel" }
    | { type: "delete"; serviceIndex: number; subIndex: number }
    | { type: "deleteService"; serviceIndex: number }
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
    setServices(loadServices())
  }, [])

  const updateService = (index: number, updates: Partial<LandingService>) => {
    setServices((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...updates } : s))
    )
    setSaved(false)
  }

  const updateSubService = (serviceIndex: number, subIndex: number, value: string) => {
    setServices((prev) =>
      prev.map((s, i) => {
        if (i !== serviceIndex) return s
        const next = [...s.subServices]
        next[subIndex] = value
        return { ...s, subServices: next }
      })
    )
    setSaved(false)
  }

  const addSubService = (serviceIndex: number) => {
    setServices((prev) =>
      prev.map((s, i) =>
        i === serviceIndex
          ? { ...s, subServices: [...s.subServices, ""] }
          : s
      )
    )
    setSaved(false)
  }

  const addService = () => {
    const nextId = `service-${Date.now()}`
    setServices((prev) => [
      ...prev,
      {
        id: nextId,
        name: "",
        category: "",
        headline: "",
        subServices: [],
        cta: "",
        image: "",
      },
    ])
    setSaved(false)
  }

  const removeService = (serviceIndex: number) => {
    setServices((prev) => prev.filter((_, i) => i !== serviceIndex))
    setSaved(false)
  }

  const removeSubService = (serviceIndex: number, subIndex: number) => {
    setServices((prev) =>
      prev.map((s, i) =>
        i === serviceIndex
          ? {
              ...s,
              subServices: s.subServices.filter((_, j) => j !== subIndex),
            }
          : s
      )
    )
    setSaved(false)
  }

  const handleSave = () => {
    saveServices(services)
    setSaved(true)
    setConfirmState(null)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCancel = () => {
    setServices(loadServices())
    setSaved(false)
    setConfirmState(null)
  }

  const handleDeleteConfirm = () => {
    if (confirmState?.type === "delete") {
      removeSubService(confirmState.serviceIndex, confirmState.subIndex)
      setConfirmState(null)
    }
    if (confirmState?.type === "deleteService") {
      removeService(confirmState.serviceIndex)
      setConfirmState(null)
    }
  }

  const handleBack = () => router.push("/dashboard/manage-services")

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="w-full p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
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
                Manage Services
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Edit the services shown on the landing page. Changes apply to the main site.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              onClick={() => setConfirmState({ type: "cancel" })}
              className="border-border text-foreground hover:bg-muted"
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

        {/* Confirmations */}
        <Dialog open={confirmState !== null} onOpenChange={(open) => !open && setConfirmState(null)}>
          <DialogContent className="rounded-none border-border bg-card text-foreground sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {confirmState?.type === "save" && "Save changes?"}
                {confirmState?.type === "cancel" && "Discard changes?"}
                {confirmState?.type === "delete" && "Remove sub-service?"}
                {confirmState?.type === "deleteService" && "Remove this service?"}
              </DialogTitle>
              <DialogDescription>
                {confirmState?.type === "save" &&
                  "This will update the services on the landing page. Continue?"}
                {confirmState?.type === "cancel" &&
                  "All unsaved changes will be lost. Continue?"}
                {confirmState?.type === "delete" &&
                  "This sub-service will be removed. You can add it again later."}
                {confirmState?.type === "deleteService" &&
                  "This entire service will be removed. You can add a new service later."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setConfirmState(null)}
                className="border-border"
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
              {confirmState?.type === "deleteService" && (
                <Button
                  variant="destructive"
                  onClick={handleDeleteConfirm}
                  className="bg-destructive text-destructive-foreground"
                >
                  Yes, remove service
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Services</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addService}
            className="rounded-none border-border text-foreground hover:bg-muted"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add service
          </Button>
        </div>

        {/* Service cards */}
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
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          setConfirmState({ type: "deleteService", serviceIndex: index })
                        }}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 [&_svg]:shrink-0"
                        aria-label="Remove service"
                      >
                        <Trash2 className="h-4 w-4" />
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
                        <label className="text-sm font-medium text-foreground">Tab name</label>
                        <Input
                          value={service.name}
                          onChange={(e) => updateService(index, { name: e.target.value })}
                          placeholder="e.g. Design Service"
                          className="rounded-none bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Category label</label>
                        <Input
                          value={service.category}
                          onChange={(e) => updateService(index, { category: e.target.value })}
                          placeholder="e.g. DESIGN SERVICES"
                          className="rounded-none bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Headline</label>
                      <Input
                        value={service.headline}
                        onChange={(e) => updateService(index, { headline: e.target.value })}
                        placeholder="Main headline text"
                        className="rounded-none bg-background border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Button text (CTA)</label>
                      <Input
                        value={service.cta}
                        onChange={(e) => updateService(index, { cta: e.target.value })}
                        placeholder="e.g. EXPLORE DESIGN"
                        className="rounded-none bg-background border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Image (from file)</label>
                      <div className="flex flex-wrap items-start gap-4">
                        <div className="rounded-none border border-border bg-muted/30 overflow-hidden w-32 h-32 shrink-0 flex items-center justify-center">
                          {service.image ? (
                            <img
                              src={service.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-muted-foreground text-center px-2">No image</span>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (!file) return
                              const reader = new FileReader()
                              reader.onload = () => {
                                const dataUrl = reader.result as string
                                updateService(index, { image: dataUrl })
                              }
                              reader.readAsDataURL(file)
                              e.target.value = ""
                            }}
                            className="rounded-none border border-border bg-background px-3 py-2 text-sm file:mr-2 file:rounded-none file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:text-primary-foreground file:font-medium"
                          />
                          {service.image && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateService(index, { image: "" })}
                              className="rounded-none border-border text-muted-foreground hover:text-foreground"
                            >
                              Clear image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">Sub-services</label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addSubService(index)}
                          className="rounded-none border-border text-foreground hover:bg-muted"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                      <ul className="space-y-2">
                        {service.subServices.map((sub, subIndex) => (
                          <li key={subIndex} className="flex gap-2">
                            <Input
                              value={sub}
                              onChange={(e) =>
                                updateSubService(index, subIndex, e.target.value)
                              }
                              placeholder="Sub-service name"
                              className="rounded-none bg-background border-border flex-1"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                setConfirmState({ type: "delete", serviceIndex: index, subIndex })
                              }
                              className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 [&_svg]:shrink-0"
                              aria-label="Remove sub-service"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
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
