"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

const STORAGE_KEY = "nedf-splash-shown";

function getShouldShowSplash(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return !sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

function setSplashShown(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // ignore
  }
}

export default function SplashScreenWrapper() {
  // Default to true so splash is the first thing rendered (server + first paint)
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // After hydration: hide splash only if user already saw it this session
    setShowSplash(getShouldShowSplash());
  }, [mounted]);

  const handleSplashComplete = () => {
    setSplashShown();
    setShowSplash(false);
  };

  if (!showSplash) return null;

  return <SplashScreen onComplete={handleSplashComplete} />;
}
