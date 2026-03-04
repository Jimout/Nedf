"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Eye,
  Plus,
  ArrowUpRight,
  Layers,
  PenTool,
  UsersRound,
  Star,
  Mail,
  MessageSquare,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useData } from "@/lib/data-context"
import type { LucideIcon } from "lucide-react"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PORTFOLIO_PROJECTS_KEY = "portfolioProjects"
const BLOGS_KEY = "blogs"
const SUBSCRIBERS_KEY = "subscribers"
const PROFILE_KEY = "portfolioProfile"

const RECENT_ACTIVITY_LIMIT = 5

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RecentActivityItem {
  type: string
  title: string
  date: string
  link: string
}

interface StatItem {
  title: string
  value: string
  icon: LucideIcon
}

interface QuickActionItem {
  label: string
  icon: LucideIcon
  link: string
}

// Minimal shapes for localStorage parsing (only fields we need)
interface PortfolioProjectStub {
  id: number
  name: string
  year?: string
}

interface BlogStub {
  id: string
  title: string
  createdAt?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/** Sort key for activity: valid dates first (desc), then "—" last */
function activitySortKey(date: string): string {
  if (date === "—" || !date) return "\uFFFF"
  return date
}

// ---------------------------------------------------------------------------
// Quick actions (static)
// ---------------------------------------------------------------------------

const QUICK_ACTIONS: QuickActionItem[] = [
  { label: "Add Portfolio", icon: Layers, link: "/dashboard/manage-portfolio/add" },
  { label: "Add Blog", icon: PenTool, link: "/dashboard/manage-blog/add" },
  { label: "Add Team Member", icon: UsersRound, link: "/dashboard/manage-team/add" },
  { label: "Add Review", icon: Star, link: "/dashboard/manage-review/add" },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardOverview() {
  const { teamMembers, reviews } = useData()

  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProjectStub[]>([])
  const [blogs, setBlogs] = useState<BlogStub[]>([])
  const [subscribers, setSubscribers] = useState<unknown[]>([])
  const [profileSet, setProfileSet] = useState(false)

  useEffect(() => {
    const projects = parseJson<PortfolioProjectStub[]>(PORTFOLIO_PROJECTS_KEY, [])
    const blogList = parseJson<BlogStub[]>(BLOGS_KEY, [])
    const subList = parseJson<unknown[]>(SUBSCRIBERS_KEY, [])
    const profile = parseJson<unknown>(PROFILE_KEY, null)
    setPortfolioProjects(Array.isArray(projects) ? projects : [])
    setBlogs(Array.isArray(blogList) ? blogList : [])
    setSubscribers(Array.isArray(subList) ? subList : [])
    setProfileSet(profile != null && typeof profile === "object" && Object.keys(profile).length > 0)
  }, [])

  const stats: StatItem[] = useMemo(
    () => [
      { title: "Total Projects", value: String(portfolioProjects.length), icon: Layers },
      { title: "Blog Posts", value: String(blogs.length), icon: PenTool },
      { title: "Team Members", value: String(teamMembers.length), icon: Users },
      { title: "Testimonials", value: String(reviews.length), icon: MessageSquare },
      { title: "Subscribers", value: String(subscribers.length), icon: Mail },
      {
        title: "Profile",
        value: profileSet ? "Configured" : "Not set",
        icon: Building2,
      },
    ],
    [portfolioProjects.length, blogs.length, teamMembers.length, reviews.length, subscribers.length, profileSet]
  )

  const recentActivity: RecentActivityItem[] = useMemo(() => {
    const items: RecentActivityItem[] = [
      ...portfolioProjects.map((p) => ({
        type: "Portfolio",
        title: p.name,
        date: p.year ?? "—",
        link: `/dashboard/manage-portfolio/view/${p.id}`,
      })),
      ...blogs.map((b) => ({
        type: "Blog",
        title: b.title,
        date: b.createdAt ?? "—",
        link: `/dashboard/manage-blog/view/${b.id}`,
      })),
      ...teamMembers.map((m) => ({
        type: "Team",
        title: m.name,
        date: "—",
        link: `/dashboard/manage-team/view/${m.id}`,
      })),
      ...reviews.map((r) => ({
        type: "Review",
        title: r.name,
        date: "—",
        link: `/dashboard/manage-review/view/${r.id}`,
      })),
    ]
    items.sort((a, b) => activitySortKey(b.date).localeCompare(activitySortKey(a.date)))
    return items.slice(0, RECENT_ACTIVITY_LIMIT)
  }, [portfolioProjects, blogs, teamMembers, reviews])

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 font-montserrat">
      <div className="space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Dashboard Overview
          </h1>
          <span className="text-xs sm:text-sm text-muted-foreground">Latest from your content</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="border border-border bg-card rounded-lg hover:bg-muted/30 transition-colors"
              >
                <CardContent className="pt-5 pb-5 px-5">
                  <div className="flex items-start justify-between gap-2">
                    <Icon className="h-5 w-5 text-primary shrink-0" strokeWidth={2} />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">
                      {stat.title}
                    </p>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-primary leading-tight">{stat.value}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-border bg-card rounded-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-foreground">Recent Activity</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Latest updates across your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                {recentActivity.length === 0 ? (
                  <div className="px-6 py-8 text-center text-muted-foreground text-sm">
                    No activity yet. Add portfolio items, blog posts, team members, or reviews.
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {recentActivity.map((action, index) => (
                      <div
                        key={`${action.type}-${action.link}-${index}`}
                        className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary border border-primary/20 font-medium shrink-0"
                          >
                            {action.type}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{action.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{action.date}</p>
                          </div>
                        </div>
                        <Link href={action.link} className="shrink-0">
                          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="border border-border bg-card rounded-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-foreground">Quick Actions</CardTitle>
                <CardDescription className="text-muted-foreground">Create new content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {QUICK_ACTIONS.map((action, index) => {
                  const ActionIcon = action.icon
                  return (
                    <Link key={index} href={action.link} className="block">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-4 h-12 border-border bg-card hover:bg-muted/50 text-foreground font-medium"
                      >
                        <ActionIcon className="h-5 w-5 text-primary shrink-0" strokeWidth={2} />
                        <span className="flex-1 text-left">{action.label}</span>
                        <Plus className="h-5 w-5 text-muted-foreground shrink-0" />
                      </Button>
                    </Link>
                  )
                })}
                <Link href="/dashboard/manage-profile" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-4 h-12 border-border bg-card hover:bg-muted/50 text-foreground font-medium"
                  >
                    <Building2 className="h-5 w-5 text-primary shrink-0" strokeWidth={2} />
                    <span className="flex-1 text-left">Manage Profile</span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
