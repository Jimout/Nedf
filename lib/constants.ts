export const APP_CONFIG = {
  name: "NextApp",
  description: "Professional Next.js application with modern tooling",
  version: "1.0.0",
  author: "Your Name",
  url: "https://your-domain.com",
} as const

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
} as const

export const API_ENDPOINTS = {
  USERS: "/api/users",
  POSTS: "/api/posts",
} as const
