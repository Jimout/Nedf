"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SPLASH_CONFIG = {
  logo: {
    src: "/LOADING PAGE LOGO OPTION.png",
    alt: "NEDF Studio",
  },
  durationMs: 3000,
  tagline: "Less, but Better.",
  loadingDotsCount: 3,
  dotDelayMs: 150,
} as const;

const ANIMATION = {
  container: {
    exit: { opacity: 0, scale: 1.02 },
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
  logo: {
    initial: { scale: 0.96, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.96, opacity: 0 },
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

function SplashLogo() {
  return (
    <div className="relative w-[85vw] max-w-64 min-w-40 aspect-[5/2] sm:max-w-96 sm:w-[75vw] md:max-w-32 md:w-[70vw] lg:max-w-32 lg:w-[65vw] xl:max-w-36 xl:w-[60vw] 2xl:max-w-40 2xl:w-[55vw] 3xl:max-w-44 4xl:max-w-48">
      <Image
        src={SPLASH_CONFIG.logo.src}
        alt={SPLASH_CONFIG.logo.alt}
        fill
        priority
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, (max-width: 1920px) 60vw, 50vw"
        className="object-contain object-center"
      />
    </div>
  );
}

function SplashFooter() {
  return (
    <motion.div
      className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 xl:bottom-14 2xl:bottom-16 3xl:bottom-20 4xl:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4"
      initial={ANIMATION.footer.initial}
      animate={ANIMATION.footer.animate}
      transition={ANIMATION.footer.transition}
    >
      <p className="text-center text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl 4xl:text-xl text-muted-foreground tracking-wider font-light">
        {SPLASH_CONFIG.tagline}
      </p>
      <div className="flex gap-1.5 sm:gap-2 justify-center">
        {Array.from({ length: SPLASH_CONFIG.loadingDotsCount }).map((_, i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary"
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
