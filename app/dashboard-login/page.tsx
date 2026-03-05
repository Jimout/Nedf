"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loadDashboardLoginConfig, type DashboardLoginConfig } from "@/lib/dashboard-login-config"

export default function DashboardLogin() {
  const router = useRouter()
  const [config, setConfig] = useState<DashboardLoginConfig | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return
    if (localStorage.getItem("dashboardAuth")) {
      router.push("/dashboard")
    }
    const loaded = loadDashboardLoginConfig()
    setConfig(loaded)
    setUsername(loaded.username)
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!config) return

    if (username === config.username && password === config.password) {
      if (typeof window !== "undefined") {
        localStorage.setItem("dashboardAuth", "true")
      }
      router.push("/dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  const handleForgotPassword = () => {
    alert("For security, password resets must be handled by the site administrator.")
  }

  return (
    <Card className="rounded-none border border-border bg-card font-montserrat">
      <CardHeader className="space-y-4">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="NEDF Logo" width={120} height={40} className="h-10 w-auto" />
        </div>
        <div className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold text-foreground">Dashboard login</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign in to manage your NEDF content.
          </CardDescription>
        </div>
        {error && <p className="text-sm text-destructive text-center">{error}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="rounded-none bg-background border-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="rounded-none bg-background border-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-primary hover:underline"
        >
          Forgot password?
        </button>
        <span>Default: nedfteam / nedf123</span>
      </CardFooter>
    </Card>
  )
}

