"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Layers,
  PenTool,
  Building2,
  UsersRound,
  Star,
  Mail,
  LogOut,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ListOrdered,
  LayoutGrid,
  Quote,
  Lock,
  ListFilter,
  Tag,
  PanelBottom,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DataProvider } from "@/lib/data-context"
import { ThemeToggle } from "@/components/theme-toggle"

type NavItem = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

type NavGroup = {
  label: string
  items: NavItem[]
}

const overviewItem: NavItem = {
  id: "overview",
  label: "Overview",
  icon: LayoutDashboard,
  href: "/dashboard",
}

const menuGroups: NavGroup[] = [
  {
    label: "Blog",
    items: [
      { id: "blog", label: "Posts", icon: PenTool, href: "/dashboard/manage-blog" },
      { id: "blog-filters", label: "Filters", icon: Tag, href: "/dashboard/manage-blog-filters" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { id: "portfolio", label: "Projects", icon: Layers, href: "/dashboard/manage-portfolio" },
      {
        id: "portfolio-categories",
        label: "Categories",
        icon: ListFilter,
        href: "/dashboard/manage-portfolio-categories",
      },
    ],
  },
  {
    label: "Homepage",
    items: [
      { id: "services", label: "Services", icon: LayoutGrid, href: "/dashboard/manage-services" },
      { id: "steps", label: "Steps", icon: ListOrdered, href: "/dashboard/manage-steps" },
      { id: "slogan", label: "Slogan", icon: Quote, href: "/dashboard/manage-slogan" },
      { id: "contact", label: "Contact", icon: Mail, href: "/dashboard/manage-contact" },
    ],
  },
  {
    label: "Company",
    items: [
      { id: "thecrew", label: "Founders", icon: Building2, href: "/dashboard/manage-founders" },
      { id: "team", label: "Team", icon: UsersRound, href: "/dashboard/manage-team" },
      { id: "testimonial", label: "Reviews", icon: Star, href: "/dashboard/manage-review" },
    ],
  },
  {
    label: "Settings",
    items: [
      { id: "subscribers", label: "Footer", icon: PanelBottom, href: "/dashboard/manage-subscribers" },
      { id: "login", label: "Login Page", icon: Lock, href: "/dashboard/manage-login" },
    ],
  },
]

function isNavItemActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false
  if (pathname === href) return true
  if (href === "/dashboard") return false
  return pathname.startsWith(`${href}/`)
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Blog: false,
    Portfolio: false,
    Homepage: false,
    Company: false,
    Settings: false,
  })
  const router = useRouter()
  const pathname = usePathname()

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  useEffect(() => {
    if (!pathname) return
    const isAuth = localStorage.getItem("dashboardAuth")
    if (!isAuth && pathname !== "/dashboard-login") {
      router.push("/dashboard-login")
    }
  }, [router, pathname])

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!pathname) return
    for (const group of menuGroups) {
      const hasActive = group.items.some((item) => isNavItemActive(pathname, item.href))
      if (hasActive) {
        setOpenGroups((prev) => ({ ...prev, [group.label]: true }))
      }
    }
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("dashboardAuth")
    router.push("/dashboard-login")
  }

  return (
    <DataProvider>
      <div className="flex min-h-screen bg-background">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-primary text-primary-foreground rounded-lg shadow-md"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-screen bg-primary text-primary-foreground z-40 border-r border-primary-foreground/20 transition-all duration-500 ${
            sidebarCollapsed ? "w-20" : "w-64"
          } ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
          style={{
            transition: "width 500ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "width, transform",
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between py-4 px-4 border-b border-primary-foreground/20 h-20 flex-shrink-0">
              <div className="flex items-center gap-3 overflow-hidden">
                {!sidebarCollapsed && (
                  <Image
                    src="/logo.png"
                    alt="NEDF Logo"
                    width={80}
                    height={40}
                    className="brightness-0 invert"
                    style={{ transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="[&_button]:text-primary-foreground [&_svg]:text-primary-foreground [&_button]:hover:bg-primary-foreground/20 [&_button]:size-10 [&_button]:shrink-0">
                  <ThemeToggle />
                </div>
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-full flex-shrink-0 transition-colors text-primary-foreground bg-primary-foreground/20 hover:bg-primary-foreground/30"
                  title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="w-5 h-5" />
                  ) : (
                    <ChevronLeft className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <nav className="flex-1 flex flex-col py-4 overflow-y-auto">
              {!sidebarCollapsed ? (
                <div className="px-3 mb-2">
                  <Link
                    href={overviewItem.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`relative flex items-center w-full px-3 py-3 rounded-lg transition-colors ${
                      isNavItemActive(pathname, overviewItem.href)
                        ? "bg-primary-foreground/20"
                        : "hover:bg-primary-foreground/10"
                    }`}
                  >
                    <LayoutDashboard className="w-5 h-5 shrink-0" />
                    <span
                      className={`ml-3 font-medium text-sm ${
                        isNavItemActive(pathname, overviewItem.href) ? "font-semibold" : ""
                      }`}
                    >
                      {overviewItem.label}
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center mb-2">
                  <Link
                    href={overviewItem.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors ${
                      isNavItemActive(pathname, overviewItem.href)
                        ? "bg-primary-foreground/20"
                        : "hover:bg-primary-foreground/10"
                    }`}
                    title={overviewItem.label}
                  >
                    <LayoutDashboard className="w-5 h-5 shrink-0" />
                  </Link>
                </div>
              )}

              {menuGroups.map((group) => {
                const isOpen = openGroups[group.label] ?? false

                return (
                  <div key={group.label} className={sidebarCollapsed ? "" : "mb-3"}>
                    {!sidebarCollapsed ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.label)}
                          className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-primary-foreground/10 transition-colors text-left"
                          aria-expanded={isOpen}
                        >
                          <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
                            {group.label}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-primary-foreground/60 shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="mt-1">
                            {group.items.map((item) => {
                              const Icon = item.icon
                              const isActive = isNavItemActive(pathname, item.href)
                              return (
                                <div key={item.id} className="relative flex px-3 my-0.5">
                                  <Link
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`relative flex items-center w-full px-3 py-2.5 rounded-lg justify-start overflow-hidden transition-colors ${
                                      isActive
                                        ? "bg-primary-foreground/20"
                                        : "hover:bg-primary-foreground/10"
                                    }`}
                                  >
                                    <Icon className="w-5 h-5 shrink-0" />
                                    <span
                                      className={`ml-3 font-medium text-sm whitespace-nowrap ${
                                        isActive ? "font-semibold" : ""
                                      }`}
                                    >
                                      {item.label}
                                    </span>
                                  </Link>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="mx-2 my-2 border-t border-primary-foreground/20" aria-hidden />
                        {group.items.map((item) => {
                          const Icon = item.icon
                          const isActive = isNavItemActive(pathname, item.href)
                          return (
                            <div key={item.id} className="relative flex justify-center my-1">
                              <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`relative flex items-center justify-center group overflow-hidden transition-colors w-12 h-12 rounded-lg ${
                                  isActive ? "bg-primary-foreground/20" : "hover:bg-primary-foreground/10"
                                }`}
                                title={`${group.label} · ${item.label}`}
                              >
                                <Icon className="w-5 h-5 shrink-0" />
                                <div className="absolute left-full ml-6 px-3 py-2 bg-foreground text-background text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                                  {item.label}
                                </div>
                              </Link>
                            </div>
                          )
                        })}
                      </>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Logout */}
            <div className="border-t border-primary-foreground/20 py-4 flex-shrink-0">
              <div className={`relative flex ${sidebarCollapsed ? "justify-center" : "px-3"} my-1`}>
                <button
                  onClick={handleLogout}
                  className={`relative flex items-center justify-center group overflow-hidden transition-colors ${
                    sidebarCollapsed ? "w-12 h-12 rounded-lg" : "w-full px-3 py-3.5 rounded-lg justify-start"
                  } hover:bg-primary-foreground/10`}
                  title={sidebarCollapsed ? "Logout" : ""}
                >
                  <div className="flex items-center gap-1">
                    <LogOut className="w-5 h-5 shrink-0 opacity-90 group-hover:opacity-100" />
                  </div>

                  {!sidebarCollapsed && (
                    <div
                      className="flex items-center justify-between flex-1 ml-3 overflow-hidden"
                      style={{
                        opacity: sidebarCollapsed ? 0 : 1,
                        width: sidebarCollapsed ? 0 : "auto",
                        transition: sidebarCollapsed
                          ? "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1), width 150ms cubic-bezier(0.4, 0, 0.2, 1)"
                          : "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 200ms, width 300ms cubic-bezier(0.4, 0, 0.2, 1) 200ms",
                      }}
                    >
                      <span className="font-medium text-sm whitespace-nowrap opacity-90 group-hover:opacity-100">
                        Logout
                      </span>
                    </div>
                  )}

                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-6 px-3 py-2 bg-foreground text-background text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 font-medium transition-opacity">
                      Logout
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main
          className={`flex-1 min-h-screen transition-all duration-500 ${
            sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
          }`}
        >
          <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6 bg-background">{children}</div>
        </main>
      </div>
    </DataProvider>
  )
}
