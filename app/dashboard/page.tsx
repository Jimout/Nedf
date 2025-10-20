"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  FileText,
  Users,
  MessageSquare,
  Eye,
  Plus,
  ArrowUpRight,
  Layers,
  PenTool,
  UsersRound,
  Star,
  Mail,
} from "lucide-react"
import Link from "next/link"

export default function DashboardOverview() {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const stats = [
    {
      title: "Total Projects",
      value: "127",
      change: "+12%",
      trend: "from last month",
      icon: Layers,
      gradient: "from-[#001F4B]/10 via-[#001F4B]/5 to-white",
      iconBg: "bg-gradient-to-br from-[#001F4B] to-[#001F4B]/80",
      iconShadow: "shadow-[0_10px_25px_rgba(0,31,75,0.35)]",
      borderColor: "border-[#001F4B]/20",
    },
    {
      title: "Blog Posts",
      value: "48",
      change: "+5%",
      trend: "from last month",
      icon: PenTool,
      gradient: "from-[#001F4B]/10 via-[#001F4B]/5 to-white",
      iconBg: "bg-gradient-to-br from-[#001F4B] to-[#001F4B]/80",
      iconShadow: "shadow-[0_10px_25px_rgba(0,31,75,0.35)]",
      borderColor: "border-[#001F4B]/20",
    },
    {
      title: "Team Members",
      value: "18",
      change: "+2",
      trend: "new members",
      icon: Users,
      gradient: "from-[#001F4B]/10 via-[#001F4B]/5 to-white",
      iconBg: "bg-gradient-to-br from-[#001F4B] to-[#001F4B]/80",
      iconShadow: "shadow-[0_10px_25px_rgba(0,31,75,0.35)]",
      borderColor: "border-[#001F4B]/20",
    },
    {
      title: "Testimonials",
      value: "94",
      change: "+8%",
      trend: "from last month",
      icon: MessageSquare,
      gradient: "from-[#001F4B]/10 via-[#001F4B]/5 to-white",
      iconBg: "bg-gradient-to-br from-[#001F4B] to-[#001F4B]/80",
      iconShadow: "shadow-[0_10px_25px_rgba(0,31,75,0.35)]",
      borderColor: "border-[#001F4B]/20",
    },
    {
      title: "Subscribers",
      value: "1,248",
      change: "+20",
      trend: "new this week",
      icon: Mail,
      gradient: "from-[#001F4B]/10 via-[#001F4B]/5 to-white",
      iconBg: "bg-gradient-to-br from-[#001F4B] to-[#001F4B]/80",
      iconShadow: "shadow-[0_10px_25px_rgba(0,31,75,0.35)]",
      borderColor: "border-[#001F4B]/20",
    },
  ]

  const recentActions = [
    {
      type: "Portfolio",
      title: "Modern Villa Design - Residential Architecture",
      date: "2024-01-15",
      by: "John Smith",
      badge: "bg-[#001F4B]/10 text-[#001F4B] border-[#001F4B]/20 dark:bg-[#ec1e24]/10 dark:text-[#ec1e24] dark:border-[#ec1e24]/20",
      link: "/dashboard/manage-portfolio",
    },
    {
      type: "Blog",
      title: "Sustainable Architecture Trends in 2024",
      date: "2024-01-14",
      by: "Sarah Johnson",
      badge: "bg-[#001F4B]/10 text-[#001F4B] border-[#001F4B]/20 dark:bg-[#ec1e24]/10 dark:text-[#ec1e24] dark:border-[#ec1e24]/20",
      link: "/dashboard/manage-blog",
    },
    {
      type: "Team",
      title: "Michael Chen - Lead Architect",
      date: "2024-01-12",
      by: "Admin",
      badge: "bg-[#001F4B]/10 text-[#001F4B] border-[#001F4B]/20 dark:bg-[#ec1e24]/10 dark:text-[#ec1e24] dark:border-[#ec1e24]/20",
      link: "/dashboard/manage-team",
    },
    {
      type: "Review",
      title: "5-star review from Tech Corp Office Project",
      date: "2024-01-10",
      by: "Emily Davis",
      badge: "bg-[#001F4B]/10 text-[#001F4B] border-[#001F4B]/20 dark:bg-[#ec1e24]/10 dark:text-[#ec1e24] dark:border-[#ec1e24]/20",
      link: "/dashboard/manage-testimonials",
    },
    {
      type: "Portfolio",
      title: "Urban Office Complex - Commercial Design",
      date: "2024-01-08",
      by: "David Wilson",
      badge: "bg-[#001F4B]/10 text-[#001F4B] border-[#001F4B]/20 dark:bg-[#ec1e24]/10 dark:text-[#ec1e24] dark:border-[#ec1e24]/20",
      link: "/dashboard/manage-portfolio",
    },
  ]

  const quickActions = [
    {
      label: "Add Portfolio",
      icon: Layers,
      link: "/dashboard/manage-portfolio/add",
      iconBg: "bg-gradient-to-br from-[#001F4B] to-[#001F4B]/80",
      iconShadow: "shadow-[0_8px_16px_rgba(0,31,75,0.25)]",
      hoverBg: "hover:bg-[#001F4B]/5",
    },
    {
      label: "Add Blog",
      icon: PenTool,
      link: "/dashboard/manage-blog/add",
      iconBg: "bg-gradient-to-br from-[#001F4B] to-[#001F4B]/80",
      iconShadow: "shadow-[0_8px_16px_rgba(0,31,75,0.25)]",
      hoverBg: "hover:bg-[#001F4B]/5",
    },
    {
      label: "Add Team Member",
      icon: UsersRound,
      link: "/dashboard/manage-team/add",
      iconBg: "bg-gradient-to-br from-[#001F4B] to-[#001F4B]/80",
      iconShadow: "shadow-[0_8px_16px_rgba(0,31,75,0.25)]",
      hoverBg: "hover:bg-[#001F4B]/5",
    },
    {
      label: "Add Review",
      icon: Star,
      link: "/dashboard/manage-review/add",
      iconBg: "bg-gradient-to-br from-[#001F4B] to-[#001F4B]/80",
      iconShadow: "shadow-[0_8px_16px_rgba(0,31,75,0.25)]",
      hoverBg: "hover:bg-[#001F4B]/5",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] p-4 sm:p-6 font-['Montserrat']">
      <div className="space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F4B] dark:text-[#ec1e24] tracking-tight">Dashboard Overview</h1>
        <span className="text-xs sm:text-sm text-[#333333]/70 dark:text-white/60">What's cooking, visionary?</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className={`group relative overflow-hidden border ${stat.borderColor} dark:border-gray-700 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-[#1a1d23]`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} dark:bg-gradient-to-br dark:from-[#ec1e24]/10 dark:via-[#ec1e24]/5 dark:to-transparent pointer-events-none`}></div>

              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 dark:bg-[#ec1e24]/10 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none"></div>

              <CardContent className="relative pt-7 pb-7 px-6">
                <div className="flex items-start justify-between mb-8">
                  <Icon className="h-5 w-5 text-[#001F4B] dark:text-[#ec1e24]" strokeWidth={2} />
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className="bg-white/80 dark:bg-[#ec1e24]/20 backdrop-blur-sm text-gray-700 dark:text-[#ec1e24] border-0 font-semibold text-xs px-3 py-1.5 shadow-sm"
                    >
                      {stat.change}
                    </Badge>
                    <p className="text-[10px] text-[#333333]/40 dark:text-white/40 mt-1.5 font-medium">{stat.trend}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#333333]/50 dark:text-white/50 uppercase tracking-wide">{stat.title}</p>
                  <p className="text-5xl font-bold text-[#001F4B] dark:text-[#ec1e24] tracking-tight leading-none">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Actions */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] bg-white dark:bg-[#1a1d23] dark:border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-[#001F4B] dark:text-[#ec1e24]">Recent Activity</CardTitle>
                  <CardDescription className="text-[#333333]/60 dark:text-white/60 mt-1.5">
                    Latest updates across your portfolio
                  </CardDescription>
                </div>
                <Link href="/dashboard/activity-log">
                  <Button variant="ghost" size="sm" className="text-[#001F4B] dark:text-[#ec1e24] hover:bg-[#001F4B]/5 dark:hover:bg-[#ec1e24]/10">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-0">
                {recentActions.map((action, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 dark:hover:bg-[#2a2d35]/50 transition-all duration-200 border-b border-gray-100/60 dark:border-gray-700/50 last:border-0"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <Badge className={`${action.badge} border font-medium shrink-0 px-3 py-1`}>{action.type}</Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#001F4B] dark:text-white truncate group-hover:text-[#001F4B]/80 dark:group-hover:text-white/80 transition-colors">
                          {action.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <p className="text-xs text-[#333333]/50 dark:text-white/50">{action.date}</p>
                          <span className="text-xs text-[#333333]/30 dark:text-white/30">•</span>
                          <p className="text-xs text-[#333333]/50 dark:text-white/50">by {action.by}</p>
                        </div>
                      </div>
                    </div>
                    <Link href={action.link}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#001F4B] dark:text-[#ec1e24] hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white transition-all duration-200 shrink-0"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="border-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] bg-white dark:bg-[#1a1d23] dark:border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-[#001F4B] dark:text-[#ec1e24]">Quick Actions</CardTitle>
              <CardDescription className="text-[#333333]/60 dark:text-white/60 mt-1.5">Create new content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const ActionIcon = action.icon
                return (
                  <Link key={index} href={action.link} className="block">
                    <Button
                      variant="outline"
                      className={`w-full justify-start gap-4 h-16 border border-gray-200/60 dark:border-gray-700/50 ${action.hoverBg} dark:hover:bg-[#2a2d35]/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-sm font-medium text-[#001F4B] dark:text-white bg-white dark:bg-[#1a1d23] group`}
                    >
                      <ActionIcon className="h-5 w-5 text-[#001F4B] dark:text-[#ec1e24]" strokeWidth={2} />
                      <span className="flex-1 text-left text-[15px] dark:text-white">{action.label}</span>
                      <Plus className="h-5 w-5 opacity-40 group-hover:opacity-60 transition-opacity" />
                    </Button>
                  </Link>
                )
              })}

              <Link href="/dashboard/manage-profile" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-4 h-16 border-2 border-[#001F4B]/20 dark:border-[#ec1e24]/20 hover:border-[#001F4B]/40 dark:hover:border-[#ec1e24]/40 hover:bg-[#001F4B]/5 dark:hover:bg-[#ec1e24]/10 transition-all duration-200 font-medium text-[#001F4B] dark:text-white bg-white dark:bg-[#1a1d23] group"
                >
                  <UsersRound className="h-5 w-5 text-[#001F4B] dark:text-[#ec1e24]" strokeWidth={2} />
                  <span className="flex-1 text-left text-[15px] dark:text-white">Manage Profile</span>
                  <ArrowUpRight className="h-5 w-5 opacity-40 group-hover:opacity-60 transition-opacity" />
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
