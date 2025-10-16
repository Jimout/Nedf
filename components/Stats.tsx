"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: "100+", label: "Projects Completed" },
  { value: "95%", label: "Client Engagement Rate" },
  { value: "98%", label: "Client Satisfaction Rate" },
  { value: "99%", label: "On-Time Project Completion" },
];

export default function Stats() {
  const [animatedValues, setAnimatedValues] = useState(["0+", "0%", "0%", "0%"]);
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateNumbers();
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  const animateNumbers = () => {
    const duration = 2000;
    const startTimestamp = performance.now();

    const targetValues = stats.map((stat) => parseInt(stat.value.replace(/[^\d]/g, "")) || 0);
    const suffixes = stats.map((stat) => (stat.value.includes("%") ? "%" : stat.value.includes("+") ? "+" : ""));

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const updatedValues = targetValues.map((target, index) => `${Math.floor(progress * target)}${suffixes[index]}`);
      setAnimatedValues(updatedValues);

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <section ref={ref} className="w-full py-4 max-sm:-mt-12">
      <div
        className="
          w-full px-4 2xl:px-32
          grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4
          gap-y-10 gap-x-6 text-center
        "
      >
        {stats.map((stat, index) => (
          <div key={index} className="max-sm:bg-white dark:max-sm:bg-[#111010] max-sm:p-4 max-sm:rounded-md max-sm:shadow-md">
            <div className="text-2xl max-sm:text-lg font-bold text-[#001F4B]/70 dark:text-[#ec1e24]/70 font-mono">
              {animatedValues[index]}
            </div>
            <div className="text-xs max-sm:text-[10px] text-[#333]/70 dark:text-white/70 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
