"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Mail, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { loadSubscription, DEFAULT_SUBSCRIPTION } from "@/lib/landing-subscription"
import { cn } from "@/lib/utils"

function saveSubscriber(email: string): boolean {
  try {
    const raw = localStorage.getItem("subscribers")
    const list: { id: string; email: string; subscribedAt: string }[] = raw ? JSON.parse(raw) : []
    if (list.some((entry) => entry.email.toLowerCase() === email.toLowerCase())) {
      return false
    }
    list.push({
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString().split("T")[0],
    })
    localStorage.setItem("subscribers", JSON.stringify(list))
    return true
  } catch {
    return false
  }
}

export function BlogSubscribeSidebar({ className }: { className?: string }) {
  const [newsletter, setNewsletter] = useState(DEFAULT_SUBSCRIPTION.newsletter)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "duplicate" | "error">("idle")

  useEffect(() => {
    setNewsletter(loadSubscription().newsletter)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error")
      return
    }
    const saved = saveSubscriber(trimmed)
    setStatus(saved ? "success" : "duplicate")
    if (saved) setEmail("")
  }

  return (
    <aside className={cn("hidden 2xl:block w-full min-w-0", className)}>
      <div className="sticky top-2 pt-14 z-10">
        <div className="border border-border bg-card overflow-hidden shadow-sm">
          <div className="bg-primary px-5 py-5 3xl:px-6 3xl:py-6 4xl:px-7 4xl:py-7">
            <div className="flex items-center gap-2.5 text-primary-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/15 3xl:h-10 3xl:w-10">
                <Mail className="h-4 w-4 3xl:h-5 3xl:w-5" />
              </span>
              <h2
                className="text-sm font-bold uppercase tracking-wide 3xl:text-base 4xl:text-lg"
                style={{ fontFamily: "Montserrat" }}
              >
                Studio Notes
              </h2>
            </div>
            <p
              className="mt-3 text-xs leading-relaxed text-primary-foreground/85 3xl:text-sm 4xl:text-base"
              style={{ fontFamily: "Montserrat" }}
            >
              Subscribe for project stories, design insights, and updates from NEDF Studio.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-5 3xl:p-6 4xl:p-7">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-2 py-4 text-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <p className="text-sm font-medium text-foreground" style={{ fontFamily: "Montserrat" }}>
                  You&apos;re subscribed!
                </p>
                <p className="text-xs text-muted-foreground" style={{ fontFamily: "Montserrat" }}>
                  Thanks for joining our mailing list.
                </p>
                <Button type="button" variant="link" size="sm" onClick={() => setStatus("idle")} className="mt-1 h-auto p-0 text-xs">
                  Subscribe another email
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor="blog-subscribe-email"
                    className="text-xs font-medium uppercase tracking-wide text-muted-foreground 3xl:text-sm"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    Email address
                  </label>
                  <input
                    id="blog-subscribe-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status !== "idle") setStatus("idle")
                    }}
                    placeholder={newsletter.placeholder}
                    className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 3xl:px-4 3xl:py-3 3xl:text-base 4xl:text-base"
                    style={{ fontFamily: "Montserrat" }}
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-destructive" style={{ fontFamily: "Montserrat" }}>
                    Please enter a valid email address.
                  </p>
                )}
                {status === "duplicate" && (
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "Montserrat" }}>
                    This email is already subscribed.
                  </p>
                )}

                <Button type="submit" className="w-full gap-2 font-semibold 3xl:py-3 3xl:text-base 4xl:py-3.5 4xl:text-base" style={{ fontFamily: "Montserrat" }}>
                  <Send className="h-4 w-4 3xl:h-5 3xl:w-5" />
                  {newsletter.buttonLabel}
                </Button>

                <p
                  className="text-[11px] leading-relaxed text-muted-foreground 3xl:text-xs 4xl:text-sm"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {newsletter.description}
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </aside>
  )
}
