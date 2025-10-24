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
    <section ref={ref} className="w-full py-4 max-sm:-mt-12 relative z-10">
      <div
        className="
          w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16
          grid grid-cols-2 sm:flex sm:flex-row sm:justify-between sm:items-center
          gap-y-10 gap-x-6 sm:gap-y-0 sm:gap-x-0 text-center
        "
      >
        {stats.map((stat, index) => (
          <div key={index} className="max-sm:bg-white dark:max-sm:bg-[#15171a] dark:max-sm:border dark:max-sm:border-[#ec1e24]/20 max-sm:p-4 max-sm:rounded-md max-sm:shadow-md dark:max-sm:shadow-lg dark:max-sm:shadow-[#ec1e24]/10">
            <div className="text-2xl max-sm:text-lg font-bold text-[#001F4B] dark:text-[#ec1e24] font-mono">
              {animatedValues[index]}
            </div>
            <div className="text-xs max-sm:text-[10px] text-[#333333]/70 dark:text-white/80 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
