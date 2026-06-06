"use client"

import { useSyncExternalStore } from "react"

function getPathname() {
  return window.location.pathname
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange)

  const pushState = history.pushState.bind(history)
  const replaceState = history.replaceState.bind(history)

  history.pushState = (...args) => {
    pushState(...args)
    onStoreChange()
  }
  history.replaceState = (...args) => {
    replaceState(...args)
    onStoreChange()
  }

  return () => {
    window.removeEventListener("popstate", onStoreChange)
    history.pushState = pushState
    history.replaceState = replaceState
  }
}

/** Client pathname without `usePathname` (safe when App Router context is unstable). */
export function useClientPathname() {
  return useSyncExternalStore(subscribe, getPathname, () => "/")
}
