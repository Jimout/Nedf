import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function HeroTextFadeScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!firstRef.current || !secondRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const split1 = new SplitType(firstRef.current!, {
        types: "words",
        tagName: "span",
      });
      const split2 = new SplitType(secondRef.current!, {
        types: "words",
        tagName: "span",
      });

      const w1 = split1.words || [];
      const w2 = split2.words || [];
      if (!w1.length || !w2.length) return;

      const clipReveal = (p: number) =>
        `polygon(${100 - p}% 0%, 100% 0%, 100% 100%, ${100 - p}% 100%)`;
      const clipHide = (p: number) =>
        `polygon(${p}% 0%, 100% 0%, 100% 100%, ${p}% 100%)`;

      // Initial: all words hidden
      w1.forEach((w) =>
        gsap.set(w, { clipPath: clipReveal(0), willChange: "clip-path" })
      );
      w2.forEach((w) =>
        gsap.set(w, { clipPath: clipReveal(0), willChange: "clip-path" })
      );
      gsap.set([firstRef.current!, secondRef.current!], {
        visibility: "visible",
      });

      const dur = 0.15;
      const stag = 0.08;
      const revealEnd = (w1.length - 1) * stag + dur;
      const hideStart = revealEnd + 0.3;
      const hideEnd = hideStart + (w1.length - 1) * stag + dur;
      const secStart = hideEnd + 0.15;
      const secHideStart = secStart + (w2.length - 1) * stag + dur + 0.3;

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

      // Phase 1: Reveal first text word by word
      w1.forEach((w, i) =>
        tl.to(
          w,
          { clipPath: clipReveal(100), ease: "none", duration: dur },
          i * stag
        )
      );

      // Phase 2: Hide first text word by word
      w1.forEach((w, i) =>
        tl.to(
          w,
          { clipPath: clipHide(100), ease: "none", duration: dur },
          hideStart + i * stag
        )
      );

      // Phase 3: Reveal second text word by word
      w2.forEach((w, i) =>
        tl.to(
          w,
          { clipPath: clipReveal(100), ease: "none", duration: dur },
          secStart + i * stag
        )
      );

      // Phase 4: Hide second text word by word (same effect as first line)
      w2.forEach((w, i) =>
        tl.to(
          w,
          { clipPath: clipHide(100), ease: "none", duration: dur },
          secHideStart + i * stag
        )
      );

      return () => {
        split1.revert();
        split2.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen bg-background overflow-hidden"
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      <div
        ref={firstRef}
        className="absolute text-center font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.2] tracking-tight px-4 sm:px-8 lg:px-12 text-foreground"
        style={{ visibility: "hidden" }}
      >
        We are a fully integrated design firm
      </div>

      <div
        ref={secondRef}
        className="absolute text-center font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.2] tracking-tight px-4 sm:px-8 lg:px-12 text-foreground"
        style={{ visibility: "hidden" }}
      >
        based in Addis Ababa, Ethiopia
      </div>
    </section>
  );
}
