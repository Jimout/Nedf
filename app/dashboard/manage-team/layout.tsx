// app/dashboard/manage-team/layout.tsx
import type React from "react";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Already inside DashboardLayout, just render children
  return <>{children}</>;
}
