import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const SERVICES = [
  {
    id: "design",
    name: "Design Service",
    category: "DESIGN SERVICES",
    headline: "Architectural. Interior. Landscape. Urban.",
    subServices: [
      "Architectural Design",
      "Interior Design",
      "Landscape Design",
      "Urban Design and Planning",
    ],
    cta: "EXPLORE DESIGN",
    image: "/interior1.jpg",
  },
  {
    id: "management",
    name: "Project Management",
    category: "PROJECT DELIVERY",
    headline: "Supervision. Administration. Consultancy.",
    subServices: [
      "Construction Supervision",
      "Contract Administration",
      "Consultancy",
    ],
    cta: "EXPLORE SERVICES",
    image: "/room1.jpg",
  },
  {
    id: "visualization",
    name: "Visualization",
    category: "VISUALIZATION",
    headline: "Exterior. Interior. Site & Context.",
    subServices: [
      "Exterior Visualization",
      "Interior Visualization",
      "Site & Context Visualization",
    ],
    cta: "EXPLORE VISUALIZATION",
    image: "/visual1.jpg",
  },
] as const;

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSubServices, setShowSubServices] = useState(false);

  const active = SERVICES[activeIndex];

  return (
    <section
      id="services"
      className="relative w-full overflow-visible bg-background pt-12 sm:pt-14 md:pt-16 lg:pt-20 xl:pt-20 2xl:pt-24 3xl:pt-28 4xl:pt-32 pb-16 sm:pb-20 md:pb-20 lg:pb-24 xl:pb-24 2xl:pb-28 3xl:pb-32 4xl:pb-36 font-montserrat"
    >
      <div className="relative w-full">
        <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 flex flex-col gap-3 sm:gap-4 md:gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActiveIndex(i);
                  setShowSubServices(false);
                }}
                className={cn(
                  "rounded-full px-4 py-2 sm:px-5 sm:py-2.5 md:px-5 md:py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm md:text-base lg:text-base font-medium transition-colors",
                  i === activeIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-muted"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-visible py-2 px-2 sm:py-2 sm:px-2 md:py-3 md:px-3">
          <span
            className="absolute -left-2 -top-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 border-l-2 border-t-2 border-muted-foreground/40"
            aria-hidden
          />
          <span
            className="absolute -right-2 -top-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 border-r-2 border-t-2 border-muted-foreground/40"
            aria-hidden
          />
          <span
            className="absolute -left-2 -bottom-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 border-l-2 border-b-2 border-muted-foreground/40"
            aria-hidden
          />
          <span
            className="absolute -right-2 -bottom-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 border-r-2 border-b-2 border-muted-foreground/40"
            aria-hidden
          />
          <div
            className={cn(
              "relative z-10 border-2 border-border p-4 shadow-lg ring-1 ring-white/10",
              "bg-zinc-800/95 text-zinc-100",
              "sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12 3xl:p-14 4xl:p-16"
            )}
          >
            <div className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-14 4xl:gap-16 md:grid-cols-[1fr,1fr]">
              <div className="flex flex-col justify-center order-2 md:order-1">
                <div className="mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4">
                  <span className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11 items-center justify-center rounded-full bg-muted text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-foreground">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-medium uppercase tracking-wider text-muted-foreground">
                    {active.category}
                  </span>
                </div>
                <h2 className="mb-3 sm:mb-4 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-6 3xl:mb-8 4xl:mb-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl 4xl:text-6xl font-bold leading-tight">
                  {active.headline}
                </h2>
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <a
                    href="/#portfolio"
                    className={cn(
                      "inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 lg:px-7 lg:py-3.5 xl:px-8 xl:py-4 text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-semibold transition-opacity hover:opacity-90",
                      "bg-primary text-primary-foreground"
                    )}
                  >
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary-foreground" />
                    {active.cta}
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowSubServices((v) => !v)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg border-2 border-muted-foreground/30 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 lg:px-7 lg:py-3.5 xl:px-8 xl:py-4 text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-semibold transition-all hover:border-primary/60",
                      "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    SUB SERVICES
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300",
                        showSubServices && "rotate-180"
                      )}
                    />
                  </button>
                </div>

                {/* Expandable Sub Services */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    showSubServices ? "max-h-[400px] opacity-100 mt-4 sm:mt-5 lg:mt-6" : "max-h-0 opacity-0 mt-0"
                  )}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {active.subServices.map((sub, i) => (
                      <div
                        key={sub}
                        className="flex items-center gap-3 rounded-lg border border-muted-foreground/20 bg-muted/10 px-4 py-3 sm:px-5 sm:py-3.5 transition-all hover:border-primary/50 hover:bg-muted/20"
                        style={{
                          transitionDelay: showSubServices ? `${i * 75}ms` : "0ms",
                          transform: showSubServices ? "translateY(0)" : "translateY(8px)",
                          opacity: showSubServices ? 1 : 0,
                          transition: "all 0.4s ease-out",
                        }}
                      >
                        <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm sm:text-base font-medium text-foreground">
                          {sub}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative w-full aspect-[4/2.25] min-h-[140px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[280px] xl:min-h-[320px] 2xl:min-h-[360px] 3xl:min-h-[400px] 4xl:min-h-[440px] overflow-hidden bg-muted order-1 md:order-2">
                <img
                  src={active.image}
                  alt={active.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
