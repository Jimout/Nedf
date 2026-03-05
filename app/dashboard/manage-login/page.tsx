"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { loadDashboardLoginConfig, type DashboardLoginConfig } from "@/lib/dashboard-login-config"
import { ArrowLeft, Pencil } from "lucide-react"

export default function ManageLoginPage() {
  const router = useRouter()
  const [config, setConfig] = useState<DashboardLoginConfig | null>(null)

  useEffect(() => {
    setConfig(loadDashboardLoginConfig())
  }, [])

  if (!config) return null

  const handleBack = () => router.push("/dashboard")
  const handleEdit = () => router.push("/dashboard/manage-login/edit")

  const maskedPassword = config.password ? "•".repeat(Math.max(config.password.length, 8)) : "••••••••"

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
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-wide">
                Login settings
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                View the credentials required to access the dashboard. Password is hidden for security.
              </p>
            </div>
          </div>
          <Button
            onClick={handleEdit}
            className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        <Card className="rounded-none border border-border bg-card max-w-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Login credentials</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              These are used on the `/dashboard-login` page to sign in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase">Username</p>
              <p className="text-sm text-foreground font-semibold">{config.username}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase">Password</p>
              <p className="text-sm text-foreground font-mono tracking-wider">{maskedPassword}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

