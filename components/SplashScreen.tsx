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
  durationMs: 3000,
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
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: "easeOut" as const },
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
  "w-[85vw] max-w-[min(85vw,20rem)] min-w-40 sm:w-[75vw] sm:max-w-[min(75vw,24rem)] md:w-[70vw] md:max-w-[28rem] lg:w-[65vw] lg:max-w-[32rem] xl:w-[60vw] xl:max-w-[36rem] 2xl:w-[55vw] 2xl:max-w-[42rem] 3xl:max-w-[48rem] 4xl:max-w-[56rem]";

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
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 75vw, (max-width: 1920px) 65vw, 55vw"
        className="object-contain object-center dark:hidden"
      />
      <Image
        src={SPLASH_CONFIG.logo.dark}
        alt={SPLASH_CONFIG.logo.alt}
        fill
        priority
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 75vw, (max-width: 1920px) 65vw, 55vw"
        className="object-contain object-center hidden dark:block"
      />
    </div>
  );
}

function SplashFooter() {
  return (
    <motion.div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8 md:bottom-10 lg:bottom-12 flex flex-col items-center gap-1.5 sm:gap-2"
      initial={ANIMATION.footer.initial}
      animate={ANIMATION.footer.animate}
      transition={ANIMATION.footer.transition}
    >
      <p className="text-center text-[10px] sm:text-xs md:text-sm text-foreground dark:text-primary tracking-wider font-light">
        {SPLASH_CONFIG.tagline}
      </p>
      <div className="flex gap-1 justify-center">
        {Array.from({ length: SPLASH_CONFIG.loadingDotsCount }).map((_, i) => (
          <motion.span
            key={i}
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-foreground dark:bg-primary"
            animate={ANIMATION.dot.animate}
            transition={{
              ...ANIMATION.dot.transition,
              delay: i * (SPLASH_CONFIG.dotDelayMs / 1000),
            }}
          />
        ))}
      </div>
    </motion.div>
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
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background"
          exit={ANIMATION.container.exit}
          transition={ANIMATION.container.transition}
          style={{ pointerEvents: "auto" }}
          aria-hidden={!visible}
        >
          <motion.div
            initial={ANIMATION.logo.initial}
            animate={ANIMATION.logo.animate}
            exit={ANIMATION.logo.exit}
            transition={ANIMATION.logo.transition}
            className="flex items-center justify-center px-4 sm:px-6 md:px-8"
          >
            <SplashLogo />
          </motion.div>
          <SplashFooter />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
