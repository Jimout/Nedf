"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { loadDashboardLoginConfig, saveDashboardLoginConfig, type DashboardLoginConfig } from "@/lib/dashboard-login-config"
import { ArrowLeft, Save, XCircle } from "lucide-react"

export default function ManageLoginEditPage() {
  const router = useRouter()
  const [config, setConfig] = useState<DashboardLoginConfig | null>(null)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)
  const [confirmState, setConfirmState] = useState<null | { type: "save" } | { type: "cancel" }>(
    null,
  )

  useEffect(() => {
    setConfig(loadDashboardLoginConfig())
  }, [])

  if (!config) return null

  const handleBack = () => router.push("/dashboard/manage-login")

  const handleUsernameChange = (value: string) => {
    setConfig((prev) => (prev ? { ...prev, username: value } : prev))
    setSaved(false)
  }

  const resetPasswords = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleCancel = () => {
    setConfig(loadDashboardLoginConfig())
    resetPasswords()
    setError("")
    setSaved(false)
    setConfirmState(null)
  }

  const isStrongPassword = (password: string) => {
    if (password.length < 8) return false
    const hasLetter = /[A-Za-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSymbol = /[^A-Za-z0-9]/.test(password)
    return hasLetter && hasNumber && hasSymbol
  }

  const handleValidatedSave = () => {
    if (!config) return

    // If any password fields are filled, enforce password change validation
    const wantsPasswordChange = currentPassword || newPassword || confirmPassword

    if (wantsPasswordChange) {
      if (currentPassword !== config.password) {
        setError("Current password is incorrect.")
        return
      }
      if (!newPassword || !confirmPassword) {
        setError("New password and confirm password are required.")
        return
      }
      if (newPassword !== confirmPassword) {
        setError("New password and confirm password do not match.")
        return
      }
      if (!isStrongPassword(newPassword)) {
        setError("Password must be at least 8 characters and include a letter, a number, and a symbol.")
        return
      }
    }

    const updated: DashboardLoginConfig = {
      username: config.username,
      password: wantsPasswordChange ? newPassword : config.password,
    }

    saveDashboardLoginConfig(updated)
    setConfig(updated)
    resetPasswords()
    setError("")
    setSaved(true)
    setConfirmState(null)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background font-montserrat">
      <div className="w-full p-4 sm:p-6 mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handleBack}
              className="rounded-none border-border text-foreground hover:bg-muted"
              aria-label="Back to login view"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
                Edit login
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Change the username or update the password with confirmation.
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
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {saved ? "Saved" : "Save changes"}
            </Button>
          </div>
        </div>

        <Dialog open={confirmState !== null} onOpenChange={(open) => !open && setConfirmState(null)}>
          <DialogContent className="rounded-none border border-border bg-card text-foreground sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {confirmState?.type === "save" && "Save changes?"}
                {confirmState?.type === "cancel" && "Discard changes?"}
              </DialogTitle>
              <DialogDescription>
                {confirmState?.type === "save" &&
                  "This will update the credentials required to access the dashboard."}
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
                No, keep editing
              </Button>
              {confirmState?.type === "save" && (
                <Button
                  onClick={handleValidatedSave}
                  className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Yes, save
                </Button>
              )}
              {confirmState?.type === "cancel" && (
                <Button
                  variant="destructive"
                  onClick={handleCancel}
                  className="rounded-none"
                >
                  Yes, discard
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid gap-6 max-w-3xl">
          <Card className="rounded-none border border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">Username</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                This is the name used on the `/dashboard-login` page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Username</label>
                <Input
                  value={config.username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className="rounded-none bg-background border-border text-foreground"
                  autoComplete="off"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">Change password</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                To change the password, confirm the current one and enter a new password twice.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <p className="text-sm text-destructive">{error}</p>}
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Current password</label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="rounded-none bg-background border-border text-foreground"
                  autoComplete="current-password"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">New password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-none bg-background border-border text-foreground"
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Confirm new password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-none bg-background border-border text-foreground"
                  autoComplete="new-password"
                />
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Leave the password fields empty if you only want to change the username.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

