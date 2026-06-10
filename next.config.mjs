import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

const projectDir = fs.realpathSync.native(
  path.dirname(fileURLToPath(import.meta.url))
)
const nextDir = path.join(projectDir, "node_modules", "next")

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Windows: one Next.js copy — mixed Nedf/nedf paths break the App Router
    config.resolve.alias = {
      ...config.resolve.alias,
      next: nextDir,
    }
    config.resolve.modules = [
      path.join(projectDir, "node_modules"),
      ...(config.resolve.modules ?? ["node_modules"]),
    ]
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/blog_detail",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/dashbord-login",
        destination: "/dashboard-login",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
