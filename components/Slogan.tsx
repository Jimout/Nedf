"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { loadSlogan } from "@/lib/landing-slogan";

gsap.registerPlugin(ScrollTrigger);

const TEXT_CLASS =
  "absolute text-center font-montserrat font-bold text-foreground leading-[1.35] tracking-tight px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 py-4 sm:py-5 md:py-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[90px] 3xl:text-[120px] 4xl:text-[150px] 2xl:max-w-[60rem] 3xl:max-w-[68rem] 4xl:max-w-[76rem] 2xl:left-1/2 2xl:-translate-x-1/2 3xl:left-1/2 3xl:-translate-x-1/2 4xl:left-1/2 4xl:-translate-x-1/2 [font-kerning:none]";

/** Fisher-Yates shuffle; returns new array with random order */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Get char elements per word (word's children are chars when using types: "words, chars") */
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

    const ctx = gsap.context(() => {
      const split1a = new SplitType(firstLine1Ref.current!, {
        types: "words, chars",
        tagName: "span",
      });
      const split1b = new SplitType(firstLine2Ref.current!, {
        types: "words, chars",
        tagName: "span",
      });
      const split2 = new SplitType(secondRef.current!, {
        types: "words, chars",
        tagName: "span",
      });

      const w1a = split1a.words || [];
      const w1b = split1b.words || [];
      const w2 = split2.words || [];
      if (!w1a.length || !w1b.length || !w2.length) return;

      const chars1a = getCharsPerWord(w1a);
      const chars1b = getCharsPerWord(w1b);
      const chars2 = getCharsPerWord(w2);

      // Shuffled order per word for reveal and hide (re-shuffle for hide for variety)
      const revealOrder1a = chars1a.map((chars) => shuffle(chars));
      const revealOrder1b = chars1b.map((chars) => shuffle(chars));
      const revealOrder2 = chars2.map((chars) => shuffle(chars));
      const hideOrder1a = chars1a.map((chars) => shuffle(chars));
      const hideOrder1b = chars1b.map((chars) => shuffle(chars));
      const hideOrder2 = chars2.map((chars) => shuffle(chars));

      // All chars start hidden for reveal
      [chars1a, chars1b, chars2].forEach((wordChars) =>
        wordChars.forEach((chars) =>
          chars.forEach((c) => gsap.set(c, { opacity: 0, willChange: "opacity" }))
        )
      );
      gsap.set(
        [
          firstLine1Ref.current!,
          firstLine2Ref.current!,
          secondRef.current!,
        ],
        { visibility: "visible" }
      );

      const durChar = 0.08;
      const stagChar = 0.05;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      let t = 0;

      /** Reveal: from every word at the same time, one random letter per word per round */
      const addRevealParallel = (
        order: HTMLSpanElement[][],
        startTime: number
      ) => {
        const maxRounds = Math.max(...order.map((chars) => chars.length), 0);
        for (let round = 0; round < maxRounds; round++) {
          const pos = startTime + round * stagChar;
          order.forEach((shuffledChars) => {
            if (shuffledChars[round]) {
              tl.to(shuffledChars[round], { opacity: 1, duration: durChar, ease: "none" }, pos);
            }
          });
        }
        return startTime + maxRounds * stagChar;
      };

      /** Hide: from every word at the same time, one random letter per word per round */
      const addHideParallel = (
        order: HTMLSpanElement[][],
        startTime: number
      ) => {
        const maxRounds = Math.max(...order.map((chars) => chars.length), 0);
        for (let round = 0; round < maxRounds; round++) {
          const pos = startTime + round * stagChar;
          order.forEach((shuffledChars) => {
            if (shuffledChars[round]) {
              tl.to(shuffledChars[round], { opacity: 0, duration: durChar, ease: "none" }, pos);
            }
          });
        }
        return startTime + maxRounds * stagChar;
      };

      // Phase 1: Reveal line 1 "We are a fully" (all words at once, random letter per word per round)
      t = addRevealParallel(revealOrder1a, t);
      t += 0.15;
      // Phase 2: Reveal line 2 "integrated design firm"
      t = addRevealParallel(revealOrder1b, t);
      t += 0.3;
      // Phase 3 & 4: Hide line 1 and line 2 in parallel
      const tHideStart = t;
      const end1a = addHideParallel(hideOrder1a, tHideStart);
      const end1b = addHideParallel(hideOrder1b, tHideStart);
      t = Math.max(end1a, end1b);
      t += 0.15;
      // Phase 5: Reveal line 3 "based in Addis Ababa, Ethiopia"
      t = addRevealParallel(revealOrder2, t);
      t += 0.3;
      // Phase 6: Hide line 3
      addHideParallel(hideOrder2, t);

      return () => {
        split1a.revert();
        split1b.revert();
        split2.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [slogan.line1, slogan.line2, slogan.line3]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex items-center justify-center min-h-screen bg-background overflow-x-hidden overflow-y-visible pb-12 sm:pb-16 transform-gpu will-change-transform [backface-visibility:hidden]"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-0">
        <div
          ref={firstLine1Ref}
          className={`${TEXT_CLASS} !pb-0`}
          style={{ visibility: "hidden", position: "relative" }}
        >
          {slogan.line1}
        </div>
        <div
          ref={firstLine2Ref}
          className={`${TEXT_CLASS} !pt-0 -mt-1 sm:-mt-2`}
          style={{ visibility: "hidden", position: "relative" }}
        >
          {slogan.line2}
        </div>
      </div>

      <div
        ref={secondRef}
        className={TEXT_CLASS}
        style={{ visibility: "hidden" }}
      >
        {slogan.line3}
      </div>
    </section>
  );
}
