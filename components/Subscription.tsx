import { ArrowUpRight } from "lucide-react";

const marqueeItems = Array(10).fill("LET'S CHAT");

const GetInTouch = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Giant "Get in Touch" heading */}
      <div className="relative z-10 pt-12 md:pt-20 px-6 md:px-16">
        <h2
          className="text-[18vw] md:text-[16vw] leading-[0.85] font-extrabold tracking-tighter text-primary-foreground select-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Get in Touch
        </h2>
      </div>

      {/* Single row marquee */}
      <div className="relative z-10 mt-4 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-flex items-center gap-16">
          {[...marqueeItems, ...marqueeItems].map((text, i) => (
            <span
              key={i}
              className="text-sm md:text-base font-semibold uppercase tracking-[0.35em] text-primary-foreground/90 select-none"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Spacer + CTA */}
      <div className="relative z-10 flex-1 flex items-end justify-center pb-16 md:pb-24 pt-16">
        <a
          href="mailto:hello@example.com"
          className="group relative inline-flex items-center justify-center"
        >
          {/* Glossy button */}
          <div
            className="relative px-16 md:px-24 py-8 md:py-10 rounded-3xl transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
            style={{
              background:
                "linear-gradient(180deg, hsla(30, 60%, 95%, 0.95) 0%, hsla(25, 50%, 88%, 0.9) 100%)",
              boxShadow:
                "0 4px 40px hsla(18, 80%, 40%, 0.3), inset 0 1px 0 hsla(0, 0%, 100%, 0.6), 0 20px 60px -10px hsla(18, 90%, 30%, 0.25)",
              border: "1px solid hsla(0, 0%, 100%, 0.4)",
            }}
          >
            <span
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "hsl(18, 90%, 45%)",
              }}
            >
              Book Discovery Call
            </span>
            <ArrowUpRight
              className="inline-block ml-4 w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ color: "hsl(18, 90%, 45%)" }}
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default GetInTouch;
