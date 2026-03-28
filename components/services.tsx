"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, Minimize2 } from "lucide-react";
import { LANDING_SERVICES_KEY } from "@/lib/constants";

type PortfolioFilter = "Architecture" | "Interior" | "Visualization" | "All";

interface LandingService {
  id: string;
  name: string;
  category: string;
  headline: string;
  subServices: string[];
  cta: string;
  image: string;
}

const DEFAULT_SERVICES: LandingService[] = [
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
];

function loadServices(): LandingService[] {
  if (typeof window === "undefined") return DEFAULT_SERVICES;
  try {
    const raw = localStorage.getItem(LANDING_SERVICES_KEY);
    if (!raw) return DEFAULT_SERVICES;
    const parsed = JSON.parse(raw) as LandingService[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SERVICES;
  } catch {
    return DEFAULT_SERVICES;
  }
}

function getPortfolioFilter(subServiceName: string, serviceId: string): PortfolioFilter {
  if (serviceId === "visualization") return "Visualization";
  if (serviceId === "management") return "All";
  if (serviceId === "design") {
    if (subServiceName === "Interior Design") return "Interior";
    return "Architecture";
  }
  return "All";
}

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSubServices, setShowSubServices] = useState(false);
  const [services, setServices] = useState<LandingService[]>(DEFAULT_SERVICES);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setServices(loadServices());
  }, []);

  useEffect(() => {
    if (activeIndex >= services.length && services.length > 0) {
      setActiveIndex(services.length - 1);
    }
  }, [services.length, activeIndex]);

  const active = services[activeIndex];

  if (!active) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative z-10 w-full overflow-visible bg-background pt-12 sm:pt-14 md:pt-16 lg:pt-20 xl:pt-20 2xl:pt-32 3xl:pt-36 4xl:pt-40 pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 3xl:pb-24 4xl:pb-28 font-montserrat 2xl:w-screen 2xl:left-1/2 2xl:-ml-[50vw] 2xl:px-16 3xl:px-20 4xl:px-24"
    >
      <div className="relative w-full">
        <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 2xl:mb-12 3xl:mb-14 4xl:mb-16 flex flex-col gap-3 sm:gap-4 md:gap-4 2xl:gap-6 3xl:gap-7 4xl:gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 2xl:gap-6 3xl:gap-7 4xl:gap-8">
            {services.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActiveIndex(i);
                  setShowSubServices(false);
                }}
                className={cn(
                  "rounded-full px-4 py-2 sm:px-5 sm:py-2.5 md:px-5 md:py-2.5 lg:px-6 lg:py-3 2xl:px-10 2xl:py-5 3xl:px-11 3xl:py-5 4xl:px-12 4xl:py-6 text-xs sm:text-sm md:text-base lg:text-base 2xl:text-lg 3xl:text-xl 4xl:text-xl font-medium transition-colors",
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
            className="absolute -left-2 -top-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8 3xl:h-9 3xl:w-9 4xl:h-10 4xl:w-10 border-l-2 border-t-2 border-muted-foreground/40"
            aria-hidden
          />
          <span
            className="absolute -right-2 -top-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8 3xl:h-9 3xl:w-9 4xl:h-10 4xl:w-10 border-r-2 border-t-2 border-muted-foreground/40"
            aria-hidden
          />
          <span
            className="absolute -left-2 -bottom-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8 3xl:h-9 3xl:w-9 4xl:h-10 4xl:w-10 border-l-2 border-b-2 border-muted-foreground/40"
            aria-hidden
          />
          <span
            className="absolute -right-2 -bottom-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8 3xl:h-9 3xl:w-9 4xl:h-10 4xl:w-10 border-r-2 border-b-2 border-muted-foreground/40"
            aria-hidden
          />
          <div
            className={cn(
              "relative z-10 border-2 border-border shadow-xl ring-1 ring-border/40 p-4",
              "bg-card text-card-foreground",
              "sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-20 3xl:p-24 4xl:p-28"
            )}
          >
            {/* Pill: Sub Services in bottom-right corner */}
            <button
              type="button"
              onClick={() => setShowSubServices((v) => !v)}
              className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 xl:bottom-10 xl:right-10 2xl:bottom-20 2xl:right-20 3xl:bottom-24 3xl:right-24 4xl:bottom-28 4xl:right-28 z-20 inline-flex items-center overflow-hidden rounded-full bg-muted text-foreground shadow-md transition-opacity hover:opacity-90"
            >
              <span className="px-4 py-2.5 sm:px-5 sm:py-3 2xl:px-9 2xl:py-5 3xl:px-10 3xl:py-5 4xl:px-11 4xl:py-6 text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-lg font-semibold uppercase tracking-wider">
                SUB SERVICES
              </span>
              <span className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 2xl:h-14 2xl:w-14 3xl:h-16 3xl:w-16 4xl:h-[4.5rem] 4xl:w-[4.5rem] items-center justify-center rounded-full bg-card text-card-foreground">
                <Minimize2 className={cn("h-4 w-4 sm:h-5 sm:w-5 2xl:h-7 2xl:w-7 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8 transition-transform duration-300", showSubServices && "rotate-180")} />
              </span>
            </button>

            {/* Expanded sub-services panel (bottom-right, like reference) */}
            <div
              className={cn(
                "absolute right-4 bottom-14 sm:right-5 sm:bottom-16 md:right-6 md:bottom-20 lg:right-8 lg:bottom-24 xl:right-10 xl:bottom-28 2xl:right-20 2xl:bottom-44 3xl:right-24 3xl:bottom-52 4xl:right-28 4xl:bottom-60 z-30 w-[280px] sm:w-[320px] md:w-[360px] 2xl:w-[600px] 3xl:w-[700px] 4xl:w-[800px] overflow-hidden rounded-2xl 2xl:rounded-3xl 3xl:rounded-3xl 4xl:rounded-[1.5rem] border-2 border-border bg-card shadow-2xl ring-1 ring-border/50 backdrop-blur-xl transition-all duration-300 ease-out dark:bg-card dark:border-border",
                showSubServices ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
              )}
            >
              <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 2xl:px-8 2xl:py-6 3xl:px-10 3xl:py-7 4xl:px-12 4xl:py-8">
                <span className="text-sm 2xl:text-xl 3xl:text-2xl 4xl:text-3xl font-semibold uppercase tracking-wider text-primary-foreground">
                  SELECT TO EXPLORE
                </span>
                <button
                  type="button"
                  onClick={() => setShowSubServices(false)}
                  className="rounded-md p-1.5 2xl:p-3 3xl:p-3.5 4xl:p-4 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
                  aria-label="Close sub services"
                >
                  <Minimize2 className="h-4 w-4 sm:h-5 sm:w-5 2xl:h-8 2xl:w-8 3xl:h-9 3xl:w-9 4xl:h-10 4xl:w-10" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3 sm:p-4 2xl:gap-6 2xl:p-8 3xl:gap-8 3xl:p-10 4xl:gap-10 4xl:p-12">
                {active.subServices.map((sub, i) => (
                  <button
                    key={sub}
                    type="button"
                    className="group relative flex min-h-[72px] sm:min-h-[80px] 2xl:min-h-[160px] 3xl:min-h-[200px] 4xl:min-h-[240px] flex-col items-start justify-end rounded-xl 2xl:rounded-2xl 3xl:rounded-2xl 4xl:rounded-[1rem] bg-muted p-3 2xl:p-6 3xl:p-8 4xl:p-10 text-left transition-colors hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80"
                  >
<span className="text-xs font-medium leading-tight text-card-foreground sm:text-sm 2xl:text-lg 3xl:text-xl 4xl:text-2xl">
                                      {sub}
                                    </span>
                    <Link
                      href={`/portfolio?filter=${getPortfolioFilter(sub, active.id)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-2 right-2 2xl:top-5 2xl:right-5 3xl:top-6 3xl:right-6 4xl:top-6 4xl:right-6 flex h-6 w-6 2xl:h-12 2xl:w-12 3xl:h-14 3xl:w-14 4xl:h-16 4xl:w-16 items-center justify-center rounded-full bg-primary/20 text-primary-foreground transition-colors hover:bg-primary/30"
                      aria-label={`View ${sub} in portfolio`}
                    >
                      <ChevronRight className="h-3.5 w-3.5 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8 4xl:h-9 4xl:w-9" />
                    </Link>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-20 3xl:gap-24 4xl:gap-28 md:grid-cols-[1fr,1fr]"
                >
                  <div className="flex flex-col justify-center order-2 md:order-1">
                    <div className="mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 2xl:mb-6 3xl:mb-8 4xl:mb-8 flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4 2xl:gap-6 3xl:gap-7 4xl:gap-8">
                      <span className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11 2xl:h-16 2xl:w-16 3xl:h-[4.5rem] 3xl:w-[4.5rem] 4xl:h-20 4xl:w-20 items-center justify-center rounded-full bg-card-foreground/15 text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-3xl font-semibold text-card-foreground">
                        {String(activeIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-2xl font-medium uppercase tracking-wider text-card-foreground/80">
                        {active.category}
                      </span>
                    </div>
                    <h2 className="mb-3 sm:mb-4 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-10 3xl:mb-12 4xl:mb-14 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold leading-tight text-card-foreground">
                      {active.headline}
                    </h2>
                    <div className="flex items-center gap-3 sm:gap-4 2xl:gap-6 3xl:gap-7 4xl:gap-8 flex-wrap mb-12 sm:mb-0">
                      <a
                        href="/#portfolio"
                        className={cn(
                          "inline-flex w-fit items-center rounded-full px-3 py-2 sm:px-4 sm:py-2.5 2xl:px-10 2xl:py-5 3xl:px-12 3xl:py-5 4xl:px-14 4xl:py-6 text-xs sm:text-sm 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold transition-opacity hover:opacity-90",
                          "bg-primary text-primary-foreground"
                        )}
                      >
                        {active.cta}
                      </a>
                    </div>
                  </div>

                  <div className="relative w-full aspect-[4/2.25] min-h-[140px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[280px] xl:min-h-[320px] 2xl:min-h-[500px] 3xl:min-h-[580px] 4xl:min-h-[640px] overflow-hidden bg-muted order-1 md:order-2">
                    <img
                      src={active.image}
                      alt={active.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
