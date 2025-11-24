import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { DynamicBackground } from "@/components/dynamic-background"
import SplashScreenWrapper from "@/components/SplashScreenWrapper"
import CursorAnimation from "@/components/CursorAnimation"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "NEDF STUDIO",
  description: "We are a fully integrated Design firm based in Addis Ababa, Ethiopia. We craft perfection through every line and form.",
  generator: "v0.app",
  icons: {
    icon: "/FAV ICON 180x180.png",
    shortcut: "/FAV ICON 180x180.png",
    apple: "/FAV ICON 180x180.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} font-montserrat bg-white dark:bg-[#15171a]`}>
        <SplashScreenWrapper />
        <DynamicBackground />
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <CursorAnimation />
          <main className="w-full relative z-10">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
