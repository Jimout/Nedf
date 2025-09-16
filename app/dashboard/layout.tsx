"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft, User, FileText, Home, Briefcase, Users, MessageSquare, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // redirect if not logged in
  useEffect(() => {
    const isAuth = localStorage.getItem("dashboardAuth");
    if (!isAuth && pathname !== "/dashboard-login") {
      router.push("/dashboard-login");
    } else {
      setLoading(false);
    }
  }, [router, pathname]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  const menuItems = [
    { id: "overview", label: "Overview", icon: Home, href: "/dashboard/overview" },
    { id: "portfolio", label: "Manage Portfolio", icon: Briefcase, href: "/dashboard/manage-portfolio" },
    { id: "blog", label: "Manage Blog", icon: FileText, href: "/dashboard/manage-blog" },
    { id: "profile", label: "Manage Profile", icon: User, href: "/dashboard/manage-profile" },
    { id: "team", label: "Manage Team", icon: Users, href: "/dashboard/manage-team" },
    { id: "testimonial", label: "Manage Reviews", icon: MessageSquare, href: "/dashboard/manage-testimonials" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-[#001F4B] text-white p-6 transition-all duration-300 z-50 ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-8 bg-white rounded p-2 shadow-lg hover:shadow-xl transition-shadow z-10"
        >
          <ChevronLeft
            className={`w-4 h-4 text-[#001F4B] transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`}
          />
        </button>

        {/* Logo */}
        <div className="mb-8 flex items-center justify-center">
          {!sidebarCollapsed ? (
            <Image src="/logo.png" alt="NEDF Logo" width={80} height={60} className="brightness-0 invert" />
          ) : (
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[#001F4B] font-bold text-sm">N</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive ? "bg-blue-800/60 shadow-md" : "hover:bg-blue-800/40 hover:shadow-sm"
                } ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? item.label : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto">
          <button
            onClick={() => {
              localStorage.removeItem("dashboardAuth");
              router.push("/dashboard-login");
            }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition-colors w-full text-white mt-6"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 min-h-screen ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        } overflow-auto p-8 bg-gray-50`}
        style={{ maxHeight: "100vh" }}
      >
        {children}
      </main>
    </div>
  );
}
