"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showSplash, setShowSplash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isHome) {
      setShowSplash(false);
      return;
    }

    setShowSplash(getShouldShowSplash());
  }, [mounted, isHome]);

  const handleSplashComplete = () => {
    setSplashShown();
    setShowSplash(false);
  };

  if (!isHome || !showSplash) return null;

  return <SplashScreen onComplete={handleSplashComplete} />;
}
