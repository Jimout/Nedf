"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronRight, Maximize2 } from "lucide-react";

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

  const active = SERVICES[activeIndex];

  return (
    <section
      id="services"
      className="relative w-full overflow-visible bg-background pt-20 pb-24 font-montserrat"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-colors",
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

        <div className="relative overflow-visible py-2 px-2">
          <span
            className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-muted-foreground/40"
            aria-hidden
          />
          <span
            className="absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-muted-foreground/40"
            aria-hidden
          />
          <span
            className="absolute -left-2 -bottom-2 h-6 w-6 border-l-2 border-b-2 border-muted-foreground/40"
            aria-hidden
          />
          <span
            className="absolute -right-2 -bottom-2 h-6 w-6 border-r-2 border-b-2 border-muted-foreground/40"
            aria-hidden
          />
          <div
            className={cn(
              "relative z-10 border-2 border-border p-4 shadow-lg ring-1 ring-white/10",
              "bg-zinc-800/95 text-zinc-100",
              "sm:p-5 md:p-6"
            )}
          >
            <div className="grid gap-4 md:grid-cols-[1fr,1fr] md:gap-6">
              <div className="flex flex-col justify-center">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {active.category}
                  </span>
                </div>
                <h2 className="mb-4 text-xl font-bold leading-tight sm:text-2xl md:text-3xl">
                  {active.headline}
                </h2>
                <a
                  href="/#portfolio"
                  className={cn(
                    "inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90",
                    "bg-primary text-primary-foreground"
                  )}
                >
                  <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                  {active.cta}
                </a>
              </div>

              <div className="relative aspect-[4/2.25] min-h-[160px] overflow-hidden bg-muted">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
