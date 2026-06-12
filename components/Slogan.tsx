"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { loadSlogan } from "@/lib/landing-slogan";

gsap.registerPlugin(ScrollTrigger);

const TEXT_CLASS =
  "absolute text-center font-montserrat font-bold text-foreground leading-[1.25] lg:leading-[1.35] tracking-tight px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 py-4 sm:py-5 md:py-6 text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl left-0 right-0 mx-auto w-full max-w-[95vw] [font-kerning:none]";

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function getCharsPerWord(words: HTMLSpanElement[]): HTMLSpanElement[][] {
  return words.map((word) => Array.from(word.children) as HTMLSpanElement[]);
}

export default function HeroTextFadeScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const firstLine1Ref = useRef<HTMLDivElement>(null);
  const firstLine2Ref = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const [slogan, setSlogan] = useState(() => loadSlogan());

  useEffect(() => {
    setSlogan(loadSlogan());
  }, []);

  useEffect(() => {
    if (
      !firstLine1Ref.current ||
      !firstLine2Ref.current ||
      !secondRef.current ||
      !sectionRef.current
    )
      return;

    let ctx: gsap.Context | undefined;

    try {
    ctx = gsap.context(() => {
      const split1a = new SplitType(firstLine1Ref.current!, {
        types: "words,chars",
        tagName: "span",
      });
      const split1b = new SplitType(firstLine2Ref.current!, {
        types: "words,chars",
        tagName: "span",
      });
      const split2 = new SplitType(secondRef.current!, {
        types: "words,chars",
        tagName: "span",
      });

      const w1a = split1a.words || [];
      const w1b = split1b.words || [];
      const w2 = split2.words || [];
      if (!w1a.length || !w1b.length || !w2.length) {
        split1a.revert();
        split1b.revert();
        split2.revert();
        gsap.set(
          [firstLine1Ref.current!, firstLine2Ref.current!, secondRef.current!],
          { visibility: "visible", opacity: 1 }
        );
        return;
      }

      const chars1a = getCharsPerWord(w1a);
      const chars1b = getCharsPerWord(w1b);
      const chars2 = getCharsPerWord(w2);

      const revealOrder1a = chars1a.map((chars) => shuffle(chars));
      const revealOrder1b = chars1b.map((chars) => shuffle(chars));
      const revealOrder2 = chars2.map((chars) => shuffle(chars));
      const hideOrder1a = chars1a.map((chars) => shuffle(chars));
      const hideOrder1b = chars1b.map((chars) => shuffle(chars));
      const hideOrder2 = chars2.map((chars) => shuffle(chars));

      [chars1a, chars1b, chars2].forEach((wordChars) =>
        wordChars.forEach((chars) =>
          chars.forEach((c) => gsap.set(c, { opacity: 0, willChange: "opacity" }))
        )
      );
      gsap.set(
        [firstLine1Ref.current!, firstLine2Ref.current!, secondRef.current!],
        { visibility: "visible" }
      );

      const durCharReveal = 0.18;
      const durCharHide = 0.1;
      const stagChar = 0.12;

      const tl = gsap.timeline({ paused: true });

      let t = 0;

      const addRevealParallel = (
        order: HTMLSpanElement[][],
        startTime: number
      ) => {
        const maxRounds = Math.max(...order.map((chars) => chars.length), 0);
        for (let round = 0; round < maxRounds; round++) {
          const pos = startTime + round * stagChar;
          order.forEach((shuffledChars) => {
            if (shuffledChars[round]) {
              tl.to(shuffledChars[round], { opacity: 1, duration: durCharReveal, ease: "power1.out" }, pos);
            }
          });
        }
        return startTime + maxRounds * stagChar;
      };

      const addHideParallel = (
        order: HTMLSpanElement[][],
        startTime: number
      ) => {
        const maxRounds = Math.max(...order.map((chars) => chars.length), 0);
        for (let round = 0; round < maxRounds; round++) {
          const pos = startTime + round * stagChar;
          order.forEach((shuffledChars) => {
            if (shuffledChars[round]) {
              tl.to(shuffledChars[round], { opacity: 0, duration: durCharHide, ease: "power1.in" }, pos);
            }
          });
        }
        return startTime + maxRounds * stagChar;
      };

      t = addRevealParallel(revealOrder1a, t);
      t += 0.35;
      t = addRevealParallel(revealOrder1b, t);
      t += 0.4;
      const tHideStart = t;
      const end1a = addHideParallel(hideOrder1a, tHideStart);
      const end1b = addHideParallel(hideOrder1b, tHideStart);
      t = Math.max(end1a, end1b);
      t += 0.35;
      t = addRevealParallel(revealOrder2, t);
      t += 0.4;
      addHideParallel(hideOrder2, t);

      const scrollPxPerSecond = 200;

      const getMinScrollVh = () => {
        const w = window.innerWidth;
        if (w >= 2560) return 1.65;
        if (w >= 1920) return 1.5;
        if (w >= 1536) return 1.35;
        return 1.2;
      };

      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: () => {
          const fromTimeline = tl.duration() * scrollPxPerSecond;
          const minScroll = window.innerHeight * getMinScrollVh();
          return `+=${Math.max(fromTimeline, minScroll)}`;
        },
        scrub: 1.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
      });

      return () => {
        split1a.revert();
        split1b.revert();
        split2.revert();
      };
    }, sectionRef);
    } catch {
      gsap.set(
        [firstLine1Ref.current!, firstLine2Ref.current!, secondRef.current!],
        { visibility: "visible", opacity: 1 }
      );
      return;
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());
    const refreshLater = window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      window.clearTimeout(refreshLater);
      ctx?.revert();
    };
  }, [slogan.line1, slogan.line2, slogan.line3]);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 flex items-center justify-center min-h-screen bg-background overflow-x-hidden overflow-y-visible 2xl:overflow-x-visible 3xl:overflow-x-visible 4xl:overflow-x-visible"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-0">
        <div
          ref={firstLine1Ref}
          className={`${TEXT_CLASS} !pb-0 2xl:whitespace-nowrap`}
          style={{ visibility: "hidden", position: "relative" }}
        >
          {slogan.line1}
        </div>
        <div
          ref={firstLine2Ref}
          className={`${TEXT_CLASS} !pt-0 -mt-1 sm:-mt-2 2xl:whitespace-nowrap 3xl:whitespace-nowrap 4xl:whitespace-nowrap`}
          style={{ visibility: "hidden", position: "relative" }}
        >
          {slogan.line2}
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div
          ref={secondRef}
          className={`${TEXT_CLASS} 2xl:whitespace-nowrap 3xl:whitespace-nowrap 4xl:whitespace-nowrap`}
          style={{ visibility: "hidden", position: "relative" }}
        >
          {slogan.line3}
        </div>
      </div>
    </section>
  );
}
