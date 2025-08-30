"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Client {
  name: string;
  role: string;
  image: string;
  testimonial: string;
}

const clients: Client[] = [
  {
    name: "Mac Jessile",
    role: "CEO at NEDFB",
    image: "/test2.png",
    testimonial:
      "Working with NEDF was the best part of our renovation. They listened to what we wanted and delivered more than we imagined.",
  },
  {
    name: "Mac Jessile",
    role: "CEO at MERFB",
    image: "/tes4.png",
    testimonial: "They exceeded our expectations and made the process seamless.",
  },
  {
    name: "Samrawit M",
    role: "Homeowner",
    image: "/test3.png",
    testimonial: "From design to execution, everything was flawless and thoughtful.",
  },
];

export function ClientReflections() {
  const [step, setStep] = useState(0);

  const svgWidth = 700;
  const svgHeight = 600;
  const centerX = 84;
  const centerY = svgHeight / 2;
  const radius = 180;

  const startAngle = (3 * Math.PI) / 2;
  const totalArc = Math.PI;
  const angleStep = totalArc / (clients.length - 1);

  const getPosition = (angle: number) => ({
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % clients.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const rotatedClients = clients.map((_, i) => {
    const newIndex = (i + step) % clients.length;
    return clients[newIndex];
  });

  const visibleClients = rotatedClients.map((client, i) => {
    const angle = startAngle + i * angleStep;
    return { ...client, angle };
  });

  const activeClient = visibleClients[1];

  return (
    <section className="relative pt-20">
      <h2 className="text-center text-[26px] md:text-[30px] font-medium text-[#333333] font-montserrat mb-1 md:ml-28 ml-0">
        CLIENT REFLECTIONS
      </h2>

      {/* Desktop layout (arc) */}
      <div className="hidden md:flex relative max-w-5xl mx-auto flex-col md:flex-row items-center px-4 gap-4">
        <div className="relative w-full md:w-[55%] flex justify-start items-center">
          <div
            style={{
              width: svgWidth,
              height: svgHeight,
              position: "relative",
              overflow: "visible",
            }}
          >
            <svg
              width={svgWidth}
              height={svgHeight}
              className="absolute inset-0"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              fill="none"
            >
              <path
                d={`M ${getPosition(startAngle).x} ${getPosition(startAngle).y}
                    A ${radius} ${radius} 0 0 1 ${getPosition(startAngle + totalArc).x} ${getPosition(
                  startAngle + totalArc
                ).y}`}
                stroke="#cbd5e1"
                strokeWidth="2"
              />
            </svg>

            {visibleClients.map((client, index) => {
              const pos = getPosition(client.angle);
              const isActive = index === 1;
              const avatarSize = isActive ? 100 : 70;
              const zIndex = isActive ? 20 : 10;

              return (
                <div
                  key={client.name + index}
                  className={`absolute flex flex-col items-center transition-all duration-700 ${
                    isActive ? "scale-125 opacity-100" : "scale-90 opacity-60"
                  }`}
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    transform: "translate(-50%, -50%)",
                    zIndex,
                  }}
                >
                  <Image
                    src={client.image}
                    alt={client.name}
                    width={avatarSize}
                    height={avatarSize}
                    className="rounded-full border-4 border-white shadow-md object-cover"
                  />
                  <p className="mt-2 text-sm font-medium text-center text-[#333333]">
                    {client.name}
                  </p>
                  <span className="text-xs text-gray-500 text-center">
                    {client.role}
                  </span>

                  {isActive && (
                    <div className="absolute left-full top-1/2 transform -translate-y-3/4 ml-24 w-[575px]">
                      <p className="text-lg font-medium text-[#333333]/80 leading-relaxed pl-8 pr-8 relative">
                        <span className="absolute -left-4 -top-6 text-6xl font-serif text-gray-300">
                          "
                        </span>
                        {activeClient.testimonial}
                        <span className="absolute -right-4 -bottom-6 text-6xl font-serif text-gray-300">
                          "
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile layout (card with avatar + testimonial fade) */}
      <div className="block md:hidden px-6 mt-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <Image
                src={clients[step].image}
                alt={clients[step].name}
                width={100}
                height={100}
                className="mx-auto rounded-full border-4 border-gray-200 shadow-md object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold text-[#333333]">
                {clients[step].name}
              </h3>
              <p className="text-sm text-gray-500">{clients[step].role}</p>
              <p className="mt-4 text-base text-[#333333]/80 italic leading-relaxed text-center">
                “{clients[step].testimonial}”
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
