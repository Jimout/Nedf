"use client"

import type React from "react"
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
  loadCrew,
  saveCrew,
  loadCrewSection,
  DEFAULT_CREW,
  DEFAULT_ABOUT_DESCRIPTION,
  type CrewMember,
  type CrewSocial,
} from "@/lib/landing-crew"
import { Plus, Trash2, ArrowLeft, Save, ChevronDown, ChevronUp, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { FaBehance, FaInstagram, FaLinkedin, FaPinterest, FaYoutube } from "react-icons/fa"
import { FaTiktok, FaXTwitter } from "react-icons/fa6"

const SOCIAL_KEYS: (keyof CrewSocial)[] = [
  "instagram",
  "tiktok",
  "linkedin",
  "pinterest",
  "behance",
  "x",
  "youtube",
]

const SOCIAL_ICONS: Record<keyof CrewSocial, React.ReactNode> = {
  instagram: <FaInstagram className="h-4 w-4" />,
  tiktok: <FaTiktok className="h-4 w-4" />,
  linkedin: <FaLinkedin className="h-4 w-4" />,
  pinterest: <FaPinterest className="h-4 w-4" />,
  behance: <FaBehance className="h-4 w-4" />,
  x: <FaXTwitter className="h-4 w-4" />,
  youtube: <FaYoutube className="h-4 w-4" />,
}

function getActiveSocialKeys(social: CrewSocial): (keyof CrewSocial)[] {
  return SOCIAL_KEYS.filter((key) => key in social)
}

function getAvailableSocialKeys(social: CrewSocial): (keyof CrewSocial)[] {
  return SOCIAL_KEYS.filter((key) => !(key in social))
}

export default function ManageCrewEditPage() {
  const router = useRouter()
  const [aboutDescription, setAboutDescription] = useState(DEFAULT_ABOUT_DESCRIPTION)
  const [crew, setCrew] = useState<CrewMember[]>(DEFAULT_CREW)
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set([0]))
  const [confirmState, setConfirmState] = useState<
    | null
    | { type: "save" }
    | { type: "cancel" }
    | { type: "deleteMember"; index: number }
  >(null)
  const [pendingSocialPlatform, setPendingSocialPlatform] = useState<
    Record<string, keyof CrewSocial | "">
  >({})

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  useEffect(() => {
    const section = loadCrewSection()
    setAboutDescription(section.aboutDescription)
    setCrew(section.crew)
  }, [])

  const updateMember = (index: number, updates: Partial<CrewMember>) => {
    setCrew((prev) =>
      prev.map((m, i) => (i === index ? { ...m, ...updates } : m))
    )
    setSaved(false)
  }

  const updateSocial = (memberIndex: number, key: keyof CrewSocial, value: string) => {
    setCrew((prev) =>
      prev.map((m, i) => {
        if (i !== memberIndex) return m
        const next = { ...m.social }
        if (!value.trim()) {
          delete next[key]
        } else {
          next[key] = value
        }
        return { ...m, social: next }
      })
    )
    setSaved(false)
  }

  const addSocial = (memberIndex: number, key: keyof CrewSocial) => {
    setCrew((prev) =>
      prev.map((m, i) =>
        i === memberIndex ? { ...m, social: { ...m.social, [key]: "" } } : m
      )
    )
    setSaved(false)
  }

  const removeSocial = (memberIndex: number, key: keyof CrewSocial) => {
    setCrew((prev) =>
      prev.map((m, i) => {
        if (i !== memberIndex) return m
        const { [key]: _, ...rest } = m.social
        return { ...m, social: rest }
      })
    )
    setSaved(false)
  }

  const addMember = () => {
    const nextId = `crew-${Date.now()}`
    setCrew((prev) => [
      ...prev,
      {
        id: nextId,
        name: "",
        title: "",
        description: "",
        image: "",
        imageDark: "",
        hoverImage: "",
        social: {},
      },
    ])
    setSaved(false)
  }

  const removeMember = (index: number) => {
    setCrew((prev) => prev.filter((_, i) => i !== index))
    setSaved(false)
  }

  const handleSave = () => {
    saveCrew(crew, aboutDescription)
    setSaved(true)
    setConfirmState(null)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCancel = () => {
    const section = loadCrewSection()
    setAboutDescription(section.aboutDescription)
    setCrew(section.crew)
    setSaved(false)
    setConfirmState(null)
  }

  const handleDeleteConfirm = () => {
    if (confirmState?.type === "deleteMember") {
      removeMember(confirmState.index)
      setConfirmState(null)
    }
  }

  const handleBack = () => router.push("/dashboard/manage-founders")

  const handleFileRead = (
    index: number,
    field: "image" | "imageDark" | "hoverImage",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      updateMember(index, { [field]: reader.result as string })
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

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
                Manage The Crew
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Edit the crew (founders) shown on the landing page.
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
                {confirmState?.type === "deleteMember" && "Remove this crew member?"}
              </DialogTitle>
              <DialogDescription>
                {confirmState?.type === "save" &&
                  "This will update The Crew on the landing page. Continue?"}
                {confirmState?.type === "cancel" &&
                  "All unsaved changes will be lost. Continue?"}
                {confirmState?.type === "deleteMember" &&
                  "This crew member will be removed. You can add them again later."}
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
              {confirmState?.type === "deleteMember" && (
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

        <Card className="rounded-none border border-border bg-card">
          <CardContent className="p-4">
            <label className="text-sm font-medium text-foreground block mb-2">About Us description</label>
            <Textarea
              value={aboutDescription}
              onChange={(e) => {
                setAboutDescription(e.target.value)
                setSaved(false)
              }}
              placeholder="NEDF is a creative studio..."
              className="rounded-none bg-background border-border min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This text appears above &quot;MEET THE FOUNDERS&quot; on the landing page.
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Crew members</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addMember}
            className="rounded-none border-border text-foreground hover:bg-muted"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add member
          </Button>
        </div>

        <div className="space-y-6">
          {crew.map((member, index) => {
            const isExpanded = expanded.has(index)
            return (
              <Card key={member.id} className="rounded-none border border-border bg-card">
                <CardHeader
                  className="cursor-pointer select-none hover:bg-muted/50 transition-colors pb-4"
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {index + 1}. {member.name || "Untitled"}
                    </CardTitle>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          setConfirmState({ type: "deleteMember", index })
                        }}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 [&_svg]:shrink-0 rounded-none"
                        aria-label="Remove crew member"
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
                        <label className="text-sm font-medium text-foreground">Name</label>
                        <Input
                          value={member.name}
                          onChange={(e) => updateMember(index, { name: e.target.value })}
                          placeholder="Full name"
                          className="rounded-none bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Title</label>
                        <Input
                          value={member.title}
                          onChange={(e) => updateMember(index, { title: e.target.value })}
                          placeholder="e.g. Co-founder"
                          className="rounded-none bg-background border-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Description</label>
                      <Textarea
                        value={member.description}
                        onChange={(e) => updateMember(index, { description: e.target.value })}
                        placeholder="Short bio"
                        className="rounded-none bg-background border-border min-h-[80px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Images (light, dark, hover)</label>
                      <p className="text-xs text-muted-foreground">
                        Light mode, dark mode, and image shown on hover. Previews are smaller on the landing.
                      </p>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">Light mode</span>
                          <div className="flex flex-col gap-2">
                            <div className="rounded-none border border-border bg-muted/30 overflow-hidden w-16 h-16 shrink-0 flex items-center justify-center">
                              {member.image ? (
                                <img src={member.image} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileRead(index, "image", e)}
                              className="rounded-none border border-border bg-background px-2 py-1.5 text-xs file:mr-1 file:rounded-none file:border-0 file:bg-primary file:px-2 file:py-0.5 file:text-xs file:text-primary-foreground file:font-medium"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">Dark mode</span>
                          <div className="flex flex-col gap-2">
                            <div className="rounded-none border border-border bg-muted/30 overflow-hidden w-16 h-16 shrink-0 flex items-center justify-center">
                              {member.imageDark ? (
                                <img src={member.imageDark} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileRead(index, "imageDark", e)}
                              className="rounded-none border border-border bg-background px-2 py-1.5 text-xs file:mr-1 file:rounded-none file:border-0 file:bg-primary file:px-2 file:py-0.5 file:text-xs file:text-primary-foreground file:font-medium"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">Hover</span>
                          <div className="flex flex-col gap-2">
                            <div className="rounded-none border border-border bg-muted/30 overflow-hidden w-16 h-16 shrink-0 flex items-center justify-center">
                              {member.hoverImage ? (
                                <img src={member.hoverImage} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileRead(index, "hoverImage", e)}
                              className="rounded-none border border-border bg-background px-2 py-1.5 text-xs file:mr-1 file:rounded-none file:border-0 file:bg-primary file:px-2 file:py-0.5 file:text-xs file:text-primary-foreground file:font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <label className="text-sm font-medium text-foreground">Social links</label>
                        {getAvailableSocialKeys(member.social).length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {getAvailableSocialKeys(member.social).length} platform
                            {getAvailableSocialKeys(member.social).length === 1 ? "" : "s"} available to add
                          </p>
                        )}
                      </div>
                      {getActiveSocialKeys(member.social).length === 0 ? (
                        <p className="text-xs text-muted-foreground italic">No social links yet. Add one below.</p>
                      ) : (
                        <div className="space-y-2">
                          {getActiveSocialKeys(member.social).map((key) => (
                            <div key={key} className="flex items-center gap-2">
                              <span
                                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground"
                                title={key}
                                aria-hidden
                              >
                                {SOCIAL_ICONS[key]}
                              </span>
                              <Input
                                value={member.social[key] ?? ""}
                                onChange={(e) => updateSocial(index, key, e.target.value)}
                                placeholder={`${key} URL`}
                                className="flex-1 rounded-none bg-background border-border"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSocial(index, key)}
                                className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                aria-label={`Remove ${key}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      {getAvailableSocialKeys(member.social).length > 0 && (
                        <div className="space-y-2 rounded-none border border-dashed border-border p-3">
                          <p className="text-xs font-medium text-foreground">Add social link</p>
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <select
                              value={pendingSocialPlatform[member.id] ?? ""}
                              onChange={(e) =>
                                setPendingSocialPlatform((prev) => ({
                                  ...prev,
                                  [member.id]: e.target.value as keyof CrewSocial | "",
                                }))
                              }
                              className="flex h-10 w-full rounded-none border border-border bg-background px-3 text-sm text-foreground sm:max-w-xs"
                            >
                              <option value="">Select platform</option>
                              {getAvailableSocialKeys(member.social).map((key) => (
                                <option key={key} value={key}>
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </option>
                              ))}
                            </select>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={!pendingSocialPlatform[member.id]}
                              onClick={() => {
                                const pending = pendingSocialPlatform[member.id]
                                if (!pending) return
                                addSocial(index, pending)
                                setPendingSocialPlatform((prev) => ({
                                  ...prev,
                                  [member.id]: "",
                                }))
                              }}
                              className="rounded-none border-border shrink-0"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {getAvailableSocialKeys(member.social).map((key) => (
                              <Button
                                key={key}
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => addSocial(index, key)}
                                className="h-9 w-9 rounded-full border border-border p-0"
                                title={`Add ${key}`}
                                aria-label={`Add ${key}`}
                              >
                                {SOCIAL_ICONS[key]}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
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
