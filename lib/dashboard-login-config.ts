export interface DashboardLoginConfig {
  username: string
  password: string
}

const DASHBOARD_LOGIN_CONFIG_KEY = "dashboardLoginConfig"

const DEFAULT_LOGIN_CONFIG: DashboardLoginConfig = {
  username: "nedfteam",
  password: "nedf123",
}

export function loadDashboardLoginConfig(): DashboardLoginConfig {
  if (typeof window === "undefined") return DEFAULT_LOGIN_CONFIG
  try {
    const raw = localStorage.getItem(DASHBOARD_LOGIN_CONFIG_KEY)
    if (!raw) return DEFAULT_LOGIN_CONFIG
    const parsed = JSON.parse(raw) as Partial<DashboardLoginConfig>
    return {
      username: parsed.username || DEFAULT_LOGIN_CONFIG.username,
      password: parsed.password || DEFAULT_LOGIN_CONFIG.password,
    }
  } catch {
    return DEFAULT_LOGIN_CONFIG
  }
}

export function saveDashboardLoginConfig(config: DashboardLoginConfig) {
  if (typeof window === "undefined") return
  localStorage.setItem(DASHBOARD_LOGIN_CONFIG_KEY, JSON.stringify(config))
}

