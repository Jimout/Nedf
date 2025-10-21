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
  Crown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DataProvider } from "@/lib/data-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
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

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { id: "portfolio", label: "Portfolio", icon: Layers, href: "/dashboard/manage-portfolio" },
    { id: "blog", label: "Blog Posts", icon: PenTool, href: "/dashboard/manage-blog" },
    { id: "profile", label: "Profile", icon: Building2, href: "/dashboard/manage-profile" },
    { id: "founders", label: "Founders", icon: Crown, href: "/dashboard/manage-founders" },
    { id: "team", label: "Team", icon: UsersRound, href: "/dashboard/manage-team" },
    { id: "testimonial", label: "Reviews", icon: Star, href: "/dashboard/manage-review" },
    { id: "subscribers", label: "Subscribers", icon: Mail, href: "/dashboard/manage-subscribers" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("dashboardAuth")
    router.push("/dashboard-login")
  }

  return (
    <DataProvider>
      <div className="flex min-h-screen bg-white dark:bg-[#15171a]">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-[#001F4B] dark:bg-[#15171a] text-white rounded-lg shadow-lg"
          aria-label="Toggle menu"
        >
          <div className="absolute inset-0 bg-white/10 rounded-lg"></div>
          <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className={`fixed top-0 left-0 h-screen bg-[#001F4B] dark:bg-[#15171a] text-white z-40 shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 ${
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
            <div className="flex items-center justify-between py-4 px-4 border-b-2 border-white/10 dark:border-white/20 h-20 flex-shrink-0">
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
                {!sidebarCollapsed && <ThemeToggle />}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 hover:bg-white/20 rounded-lg flex-shrink-0"
                  style={{ transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                  title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            <nav className="flex-1 flex flex-col py-6 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                return (
                  <div key={item.id} className={`relative flex ${sidebarCollapsed ? "justify-center" : "px-3"} my-1`}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`relative flex items-center justify-center group overflow-hidden ${
                        sidebarCollapsed ? "w-12 h-12 rounded-lg" : "w-full px-3 py-3.5 rounded-lg justify-start"
                      } ${
                        isActive
                          ? sidebarCollapsed
                            ? "bg-gradient-to-br from-white/20 to-white/5 shadow-lg dark:bg-[#ec1e24] dark:shadow-none"
                            : "bg-gradient-to-r from-white/20 to-white/5 border-l-4 border-white shadow-lg dark:bg-[#ec1e24] dark:border-l-0 dark:shadow-none"
                          : "hover:bg-white/10 dark:hover:bg-[#ec1e24]/20"
                      }`}
                      style={{
                        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      title={sidebarCollapsed ? item.label : ""}
                    >
                      <div className="flex items-center gap-1">
                        <Icon
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-white dark:text-white dark:drop-shadow-none"
                              : "text-white/70 group-hover:text-white dark:text-white dark:group-hover:text-white"
                          }`}
                          style={{
                            transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        />
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
                          <span
                            className={`font-medium text-sm whitespace-nowrap ${
                              isActive ? "text-white font-semibold dark:text-white dark:drop-shadow-none" : "text-white/70 group-hover:text-white dark:text-white dark:group-hover:text-white"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      )}

                      {sidebarCollapsed && (
                        <div
                          className="absolute left-full ml-6 px-3 py-2 bg-gray-900 dark:bg-[#ec1e24] text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50"
                          style={{
                            transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
                          }}
                        >
                          {item.label}
                        </div>
                      )}
                    </Link>
                  </div>
                )
              })}
            </nav>

            {/* Logout: exact same structure as menu items so icon + label align perfectly */}
            <div className="border-t-2 border-white/10 dark:border-white/20 py-4 flex-shrink-0">
              <div className={`relative flex ${sidebarCollapsed ? "justify-center" : "px-3"} my-1`}>
                <button
                  onClick={handleLogout}
                  className={`relative flex items-center justify-center group overflow-hidden ${
                    sidebarCollapsed ? "w-12 h-12 rounded-lg" : "w-full px-3 py-3.5 rounded-lg justify-start"
                  } hover:bg-[#ec1e24]/20 dark:hover:bg-[#ec1e24]/40 dark:hover:shadow-lg dark:hover:shadow-[#ec1e24]/30 dark:hover:scale-[1.02]`}
                  style={{
                    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  title={sidebarCollapsed ? "Logout" : ""}
                >
                  <div className="flex items-center gap-1">
                    <LogOut
                      className="w-5 h-5 text-white/80 group-hover:text-red-400 dark:group-hover:text-white dark:group-hover:drop-shadow-lg dark:group-hover:scale-110"
                      style={{
                        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
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
                      <span className="font-medium text-sm whitespace-nowrap text-white/80 group-hover:text-red-400 dark:group-hover:text-white dark:group-hover:font-bold dark:group-hover:drop-shadow-lg">
                        Logout
                      </span>
                    </div>
                  )}

                  {sidebarCollapsed && (
                    <div
                      className="absolute left-full ml-6 px-3 py-2 bg-[#ec1e24] text-white text-sm rounded-lg shadow-2xl ring-2 ring-white/30 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 font-bold"
                      style={{
                        transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
                      }}
                    >
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
          <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">{children}</div>
        </main>
      </div>
    </DataProvider>
  )
}
