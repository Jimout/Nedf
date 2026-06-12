"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SPLASH_CONFIG = {
  logo: {
    light: "/LOADING PAGE LOGO OPTION.png",
    dark: "/LOGO FOR THE WEBISTE-05.png",
    alt: "NEDF Studio",
  },
  durationMs: 1800,
  tagline: "Less, but Better.",
  loadingDotsCount: 3,
  dotDelayMs: 150,
} as const;

const ANIMATION = {
  container: {
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
  logo: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
  footer: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2, duration: 0.35 },
  },
  dot: {
    animate: { scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] },
    transition: { duration: 1, repeat: Infinity },
  },
} as const;

const LOGO_SIZES =
  "w-[70vw] max-w-[min(70vw,18rem)] min-w-36 sm:w-[60vw] sm:max-w-[min(60vw,22rem)] md:max-w-[26rem] lg:max-w-[30rem] xl:max-w-[34rem] 2xl:max-w-[38rem]";

function SplashLogo() {
  return (
    <div
      className={`relative aspect-[5/2] overflow-hidden ${LOGO_SIZES}`}
      aria-hidden
    >
      <Image
        src={SPLASH_CONFIG.logo.light}
        alt={SPLASH_CONFIG.logo.alt}
        fill
        priority
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 60vw, 34rem"
        className="object-contain object-center dark:opacity-0"
      />
      <Image
        src={SPLASH_CONFIG.logo.dark}
        alt={SPLASH_CONFIG.logo.alt}
        fill
        priority
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 60vw, 34rem"
        className="object-contain object-center opacity-0 dark:opacity-100"
      />
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
      {Array.from({ length: SPLASH_CONFIG.loadingDotsCount }).map((_, i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-foreground dark:bg-primary"
          animate={ANIMATION.dot.animate}
          transition={{
            ...ANIMATION.dot.transition,
            delay: i * (SPLASH_CONFIG.dotDelayMs / 1000),
          }}
        />
      ))}
    </div>
  );
}

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, SPLASH_CONFIG.durationMs);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col bg-background"
          exit={ANIMATION.container.exit}
          transition={ANIMATION.container.transition}
          style={{ pointerEvents: "auto" }}
          aria-hidden={!visible}
        >
          <div className="flex flex-1 items-center justify-center px-4 sm:px-6">
            <motion.div
              initial={ANIMATION.logo.initial}
              animate={ANIMATION.logo.animate}
              exit={ANIMATION.logo.exit}
              transition={ANIMATION.logo.transition}
            >
              <SplashLogo />
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col items-center justify-center gap-2 sm:gap-2.5 pb-8 sm:pb-10 md:pb-12"
            initial={ANIMATION.footer.initial}
            animate={ANIMATION.footer.animate}
            transition={ANIMATION.footer.transition}
          >
            <p className="text-center text-xs sm:text-sm md:text-base text-foreground dark:text-primary tracking-wider font-light">
              {SPLASH_CONFIG.tagline}
            </p>
            <LoadingDots />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
