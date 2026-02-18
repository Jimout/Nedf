import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const TEXT_CLASS =
  "absolute text-center font-montserrat font-bold text-foreground leading-[1.35] tracking-tight px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 py-4 sm:py-5 md:py-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-7xl 4xl:text-8xl";

export default function HeroTextFadeScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const firstLine1Ref = useRef<HTMLDivElement>(null);
  const firstLine2Ref = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

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
        types: "words",
        tagName: "span",
      });
      const split1b = new SplitType(firstLine2Ref.current!, {
        types: "words",
        tagName: "span",
      });
      const split2 = new SplitType(secondRef.current!, {
        types: "words",
        tagName: "span",
      });

      const w1a = split1a.words || [];
      const w1b = split1b.words || [];
      const w2 = split2.words || [];
      if (!w1a.length || !w1b.length || !w2.length) return;

      const clipReveal = (p: number) =>
        `polygon(${100 - p}% 0%, 100% 0%, 100% 100%, ${100 - p}% 100%)`;
      const clipHide = (p: number) =>
        `polygon(${p}% 0%, 100% 0%, 100% 100%, ${p}% 100%)`;

      [w1a, w1b, w2].forEach((words) =>
        words.forEach((w) =>
          gsap.set(w, { clipPath: clipReveal(0), willChange: "clip-path" })
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

      const dur = 0.15;
      const stag = 0.08;

      // Same page: line 1 then line 2 reveal (both visible), then hide both, then line 3
      const t1aRevealEnd = (w1a.length - 1) * stag + dur;
      const t1bStart = t1aRevealEnd + 0.15; // reveal line 2 while line 1 stays visible
      const t1bRevealEnd = t1bStart + (w1b.length - 1) * stag + dur;
      const t1HideStart = t1bRevealEnd + 0.3; // then hide both lines
      const t1aHideEnd = t1HideStart + (w1a.length - 1) * stag + dur;
      const t1bHideStart = t1HideStart; // hide line 1 and line 2 in parallel
      const t2Start = t1aHideEnd + 0.15; // after first block hidden, reveal "based in..."
      const t2HideStart = t2Start + (w2.length - 1) * stag + dur + 0.3;

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

      // Phase 1: Reveal "We are a fully" word by word
      w1a.forEach((w, i) =>
        tl.to(
          w,
          { clipPath: clipReveal(100), ease: "none", duration: dur },
          i * stag
        )
      );
      // Phase 2: Reveal "integrated design firm" (both lines now on same page)
      w1b.forEach((w, i) =>
        tl.to(
          w,
          { clipPath: clipReveal(100), ease: "none", duration: dur },
          t1bStart + i * stag
        )
      );
      // Phase 3: Hide first line
      w1a.forEach((w, i) =>
        tl.to(
          w,
          { clipPath: clipHide(100), ease: "none", duration: dur },
          t1HideStart + i * stag
        )
      );
      // Phase 4: Hide second line
      w1b.forEach((w, i) =>
        tl.to(
          w,
          { clipPath: clipHide(100), ease: "none", duration: dur },
          t1bHideStart + i * stag
        )
      );
      // Phase 5: Reveal "based in Addis Ababa, Ethiopia" word by word
      w2.forEach((w, i) =>
        tl.to(
          w,
          { clipPath: clipReveal(100), ease: "none", duration: dur },
          t2Start + i * stag
        )
      );
      // Phase 6: Hide third line
      w2.forEach((w, i) =>
        tl.to(
          w,
          { clipPath: clipHide(100), ease: "none", duration: dur },
          t2HideStart + i * stag
        )
      );

      return () => {
        split1a.revert();
        split1b.revert();
        split2.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
          We are a fully
        </div>
        <div
          ref={firstLine2Ref}
          className={`${TEXT_CLASS} !pt-0 -mt-1 sm:-mt-2`}
          style={{ visibility: "hidden", position: "relative" }}
        >
          integrated design firm
        </div>
      </div>

      <div
        ref={secondRef}
        className={TEXT_CLASS}
        style={{ visibility: "hidden" }}
      >
        based in Addis Ababa, Ethiopia
      </div>
    </section>
  );
}
