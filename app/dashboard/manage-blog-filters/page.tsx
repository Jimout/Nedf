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
import type { CmsBlogFilter } from "@/lib/cms/types"
import { Pencil, Trash2 } from "lucide-react"

export default function ManageBlogFiltersPage() {
  const [filters, setFilters] = useState<CmsBlogFilter[]>([])
  const [newLabel, setNewLabel] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState("")
  const [deleteTarget, setDeleteTarget] = useState<CmsBlogFilter | null>(null)
  const [reassignToId, setReassignToId] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadFilters = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await cmsApi.getBlogFilters(true)
      setFilters(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load filters")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFilters()
  }, [loadFilters])

  const handleCreate = async () => {
    if (!newLabel.trim()) return
    try {
      await cmsApi.createBlogFilter(newLabel.trim())
      setNewLabel("")
      await loadFilters()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create filter")
    }
  }

  const handleSaveEdit = async (id: string) => {
    if (!editLabel.trim()) return
    try {
      await cmsApi.updateBlogFilter(id, { label: editLabel.trim() })
      setEditingId(null)
      setEditLabel("")
      await loadFilters()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update filter")
    }
  }

  const handleToggleActive = async (filter: CmsBlogFilter) => {
    try {
      await cmsApi.updateBlogFilter(filter.id, { isActive: !filter.isActive })
      await loadFilters()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update filter")
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await cmsApi.deleteBlogFilter(deleteTarget.id, reassignToId || undefined)
      setDeleteTarget(null)
      setReassignToId("")
      await loadFilters()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete filter")
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 font-montserrat">
      <div className="w-full space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Blog Filters</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage filter pills on the public blog page. Each post uses one primary filter.
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
            placeholder="New filter label"
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <Button onClick={handleCreate} className="shrink-0">
            Add filter
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading filters...</p>
        ) : (
          <ul className="space-y-3">
            {filters.map((filter) => (
              <li
                key={filter.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 border border-border bg-card p-4"
              >
                {editingId === filter.id ? (
                  <div className="flex flex-1 gap-2">
                    <Input value={editLabel} onChange={(e) => setEditLabel(e.target.value)} />
                    <Button size="sm" onClick={() => handleSaveEdit(filter.id)}>
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{filter.label}</p>
                      <p className="text-xs text-muted-foreground">ID: {filter.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Active</span>
                      <Switch checked={filter.isActive} onCheckedChange={() => handleToggleActive(filter)} />
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(filter.id)
                          setEditLabel(filter.label)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(filter)}>
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

      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => {
          setDeleteTarget(null)
          setReassignToId("")
        }}
        onConfirm={confirmDelete}
        title="Delete filter"
        message="If posts use this filter, choose another filter to reassign them."
        type="delete"
      />

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border border-border p-6 max-w-md w-full space-y-4">
            <p className="text-sm text-muted-foreground">
              Reassign posts from &quot;{deleteTarget.label}&quot; to:
            </p>
            <Select value={reassignToId} onValueChange={setReassignToId}>
              <SelectTrigger>
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                {filters
                  .filter((f) => f.id !== deleteTarget.id)
                  .map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.label}
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
