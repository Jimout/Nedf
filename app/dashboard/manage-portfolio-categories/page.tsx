"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ConfirmationModal from "@/components/Confirmation-modal"
import { cmsApi } from "@/lib/cms/client"
import type { CmsPortfolioCategory } from "@/lib/cms/types"
import { Pencil, Trash2 } from "lucide-react"

export default function ManagePortfolioCategoriesPage() {
  const [categories, setCategories] = useState<CmsPortfolioCategory[]>([])
  const [newLabel, setNewLabel] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState("")
  const [deleteTarget, setDeleteTarget] = useState<CmsPortfolioCategory | null>(null)
  const [reassignToId, setReassignToId] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await cmsApi.getPortfolioCategories(true)
      setCategories(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load categories")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const handleCreate = async () => {
    if (!newLabel.trim()) return
    try {
      await cmsApi.createPortfolioCategory(newLabel.trim())
      setNewLabel("")
      await loadCategories()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create category")
    }
  }

  const handleSaveEdit = async (id: string) => {
    if (!editLabel.trim()) return
    try {
      await cmsApi.updatePortfolioCategory(id, { label: editLabel.trim() })
      setEditingId(null)
      setEditLabel("")
      await loadCategories()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update category")
    }
  }

  const handleToggleActive = async (category: CmsPortfolioCategory) => {
    try {
      await cmsApi.updatePortfolioCategory(category.id, { isActive: !category.isActive })
      await loadCategories()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update category")
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await cmsApi.deletePortfolioCategory(deleteTarget.id, reassignToId || undefined)
      setDeleteTarget(null)
      setReassignToId("")
      await loadCategories()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete category")
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 font-montserrat">
      <div className="w-full space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Portfolio Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage filter pills on the public portfolio page. Each project uses one category.
          </p>
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex gap-2">
          <Input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="New category label"
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <Button onClick={handleCreate} className="shrink-0">
            Add category
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading categories...</p>
        ) : (
          <ul className="space-y-3">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 border border-border bg-card p-4"
              >
                {editingId === category.id ? (
                  <div className="flex flex-1 gap-2">
                    <Input value={editLabel} onChange={(e) => setEditLabel(e.target.value)} />
                    <Button size="sm" onClick={() => handleSaveEdit(category.id)}>
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{category.label}</p>
                      <p className="text-xs text-muted-foreground">ID: {category.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Active</span>
                      <Switch checked={category.isActive} onCheckedChange={() => handleToggleActive(category)} />
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(category.id)
                          setEditLabel(category.label)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(category)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border border-border p-6 max-w-md w-full space-y-4">
            <p className="text-sm text-muted-foreground">
              Reassign projects from &quot;{deleteTarget.label}&quot; to:
            </p>
            <Select value={reassignToId} onValueChange={setReassignToId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((c) => c.id !== deleteTarget.id)
                  .map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete} disabled={!reassignToId}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
