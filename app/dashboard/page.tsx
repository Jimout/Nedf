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
      icon: Building2,
      gradient: "from-blue-50/80 via-blue-50/40 to-white",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconShadow: "shadow-[0_10px_25px_rgba(59,130,246,0.35)]",
      borderColor: "border-blue-100/50",
    },
    {
      title: "Blog Posts",
      value: "48",
      change: "+5%",
      trend: "from last month",
      icon: FileText,
      gradient: "from-emerald-50/80 via-emerald-50/40 to-white",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      iconShadow: "shadow-[0_10px_25px_rgba(16,185,129,0.35)]",
      borderColor: "border-emerald-100/50",
    },
    {
      title: "Team Members",
      value: "18",
      change: "+2",
      trend: "new members",
      icon: Users,
      gradient: "from-violet-50/80 via-violet-50/40 to-white",
      iconBg: "bg-gradient-to-br from-violet-500 to-violet-600",
      iconShadow: "shadow-[0_10px_25px_rgba(139,92,246,0.35)]",
      borderColor: "border-violet-100/50",
    },
    {
      title: "Testimonials",
      value: "94",
      change: "+8%",
      trend: "from last month",
      icon: MessageSquare,
      gradient: "from-amber-50/80 via-amber-50/40 to-white",
      iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
      iconShadow: "shadow-[0_10px_25px_rgba(245,158,11,0.35)]",
      borderColor: "border-amber-100/50",
    },
  ]

  const recentActions = [
    {
      type: "Portfolio",
      title: "Modern Villa Design - Residential Architecture",
      date: "2024-01-15",
      by: "John Smith",
      badge: "bg-blue-50 text-blue-700 border-blue-100",
      link: "/dashboard/manage-portfolio",
    },
    {
      type: "Blog",
      title: "Sustainable Architecture Trends in 2024",
      date: "2024-01-14",
      by: "Sarah Johnson",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
      link: "/dashboard/manage-blog",
    },
    {
      type: "Team",
      title: "Michael Chen - Lead Architect",
      date: "2024-01-12",
      by: "Admin",
      badge: "bg-violet-50 text-violet-700 border-violet-100",
      link: "/dashboard/manage-team",
    },
    {
      type: "Review",
      title: "5-star review from Tech Corp Office Project",
      date: "2024-01-10",
      by: "Emily Davis",
      badge: "bg-amber-50 text-amber-700 border-amber-100",
      link: "/dashboard/manage-testimonials",
    },
    {
      type: "Portfolio",
      title: "Urban Office Complex - Commercial Design",
      date: "2024-01-08",
      by: "David Wilson",
      badge: "bg-blue-50 text-blue-700 border-blue-100",
      link: "/dashboard/manage-portfolio",
    },
  ]

  const quickActions = [
    {
      label: "Add Portfolio",
      icon: Layers,
      link: "/dashboard/manage-portfolio/add",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconShadow: "shadow-[0_8px_16px_rgba(59,130,246,0.25)]",
      hoverBg: "hover:bg-blue-50",
    },
    {
      label: "Add Blog",
      icon: PenTool,
      link: "/dashboard/manage-blog/add",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      iconShadow: "shadow-[0_8px_16px_rgba(16,185,129,0.25)]",
      hoverBg: "hover:bg-emerald-50",
    },
    {
      label: "Add Team Member",
      icon: UsersRound,
      link: "/dashboard/manage-team/add",
      iconBg: "bg-gradient-to-br from-violet-500 to-violet-600",
      iconShadow: "shadow-[0_8px_16px_rgba(139,92,246,0.25)]",
      hoverBg: "hover:bg-violet-50",
    },
    {
      label: "Add Review",
      icon: Star,
      link: "/dashboard/manage-review/add",
      iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
      iconShadow: "shadow-[0_8px_16px_rgba(245,158,11,0.25)]",
      hoverBg: "hover:bg-amber-50",
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-end gap-3">
        <span className="text-xs sm:text-sm text-[#333333]/70">Hello, John</span>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shadow-md">
          JD
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F4B] tracking-tight">Dashboard Overview</h1>
        <p className="text-[#333333]/60 text-sm sm:text-base">
          Manage your architectural portfolio, blog, team, and client testimonials
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className={`group relative overflow-hidden border ${stat.borderColor} shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 bg-white`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} pointer-events-none`}></div>

              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none"></div>

              <CardContent className="relative pt-7 pb-7 px-6">
                <div className="flex items-start justify-between mb-8">
                  <div
                    className={`${stat.iconBg} ${stat.iconShadow} p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className="bg-white/80 backdrop-blur-sm text-gray-700 border-0 font-semibold text-xs px-3 py-1.5 shadow-sm"
                    >
                      {stat.change}
                    </Badge>
                    <p className="text-[10px] text-[#333333]/40 mt-1.5 font-medium">{stat.trend}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#333333]/50 uppercase tracking-wide">{stat.title}</p>
                  <p className="text-5xl font-bold text-[#001F4B] tracking-tight leading-none">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Actions */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-[#001F4B]">Recent Activity</CardTitle>
                  <CardDescription className="text-[#333333]/60 mt-1.5">
                    Latest updates across your portfolio
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-[#001F4B] hover:bg-[#001F4B]/5">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-0">
                {recentActions.map((action, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-all duration-200 border-b border-gray-100/60 last:border-0"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <Badge className={`${action.badge} border font-medium shrink-0 px-3 py-1`}>{action.type}</Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#001F4B] truncate group-hover:text-[#001F4B]/80 transition-colors">
                          {action.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <p className="text-xs text-[#333333]/50">{action.date}</p>
                          <span className="text-xs text-[#333333]/30">•</span>
                          <p className="text-xs text-[#333333]/50">by {action.by}</p>
                        </div>
                      </div>
                    </div>
                    <Link href={action.link}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#001F4B] hover:bg-[#001F4B] hover:text-white transition-all duration-200 shrink-0"
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
          <Card className="border-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-[#001F4B]">Quick Actions</CardTitle>
              <CardDescription className="text-[#333333]/60 mt-1.5">Create new content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const ActionIcon = action.icon
                return (
                  <Link key={index} href={action.link} className="block">
                    <Button
                      variant="outline"
                      className={`w-full justify-start gap-4 h-16 border border-gray-200/60 ${action.hoverBg} hover:border-gray-300 transition-all duration-200 hover:shadow-sm font-medium text-[#001F4B] bg-white group`}
                    >
                      <div
                        className={`${action.iconBg} ${action.iconShadow} p-3 rounded-xl transition-all duration-300 group-hover:scale-110`}
                      >
                        <ActionIcon className="h-5 w-5 text-white" />
                      </div>
                      <span className="flex-1 text-left text-[15px]">{action.label}</span>
                      <Plus className="h-5 w-5 opacity-40 group-hover:opacity-60 transition-opacity" />
                    </Button>
                  </Link>
                )
              })}

              <Link href="/dashboard/manage-profile" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-4 h-16 border-2 border-[#001F4B]/20 hover:border-[#001F4B]/40 hover:bg-[#001F4B]/5 transition-all duration-200 font-medium text-[#001F4B] bg-white group"
                >
                  <div className="bg-[#001F4B]/10 p-3 rounded-xl group-hover:bg-[#001F4B]/20 transition-colors">
                    <UsersRound className="h-5 w-5 text-[#001F4B]" />
                  </div>
                  <span className="flex-1 text-left text-[15px]">Manage Profile</span>
                  <ArrowUpRight className="h-5 w-5 opacity-40 group-hover:opacity-60 transition-opacity" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
