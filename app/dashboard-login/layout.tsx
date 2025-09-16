import type React from "react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Even wider form container */}
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  );
}
