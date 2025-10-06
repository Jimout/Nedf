// app/dashboard/manage-review/layout.tsx
import type React from "react";

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No need to wrap with DashboardLayout again — it's already applied
  return <>{children}</>;
}
