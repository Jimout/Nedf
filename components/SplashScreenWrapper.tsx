"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

const STORAGE_KEY = "nedf-splash-shown";

function getShouldShowSplash(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return !sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
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
  const [showSplash, setShowSplash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setShowSplash(getShouldShowSplash());
  }, [mounted]);

  const handleSplashComplete = () => {
    setSplashShown();
    setShowSplash(false);
  };

  if (!mounted || !showSplash) return null;

  return <SplashScreen onComplete={handleSplashComplete} />;
}
