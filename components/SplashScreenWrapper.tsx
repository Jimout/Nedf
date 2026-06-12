"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { useClientPathname } from "@/lib/use-client-pathname";
import SplashScreen from "./SplashScreen";
import { SPLASH_PENDING_CLASS, SPLASH_STORAGE_KEY } from "@/lib/constants";

function getShouldShowSplash(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return !sessionStorage.getItem(SPLASH_STORAGE_KEY);
  } catch {
    return false;
  }
}

function clearSplashPending(): void {
  document.documentElement.classList.remove(SPLASH_PENDING_CLASS);
}

function markSplashShown(): void {
  try {
    sessionStorage.setItem(SPLASH_STORAGE_KEY, "true");
  } catch {
    // ignore
  }
  clearSplashPending();
}

export default function SplashScreenWrapper() {
  const pathname = useClientPathname();
  const isHome = pathname === "/";
  const [showSplash, setShowSplash] = useState(false);

  useLayoutEffect(() => {
    if (!isHome) {
      clearSplashPending();
      setShowSplash(false);
      return;
    }

    if (getShouldShowSplash()) {
      setShowSplash(true);
    } else {
      clearSplashPending();
      setShowSplash(false);
    }
  }, [isHome]);

  const handleSplashComplete = useCallback(() => {
    markSplashShown();
    setShowSplash(false);
  }, []);

  if (!isHome || !showSplash) return null;

  return <SplashScreen onComplete={handleSplashComplete} />;
}
