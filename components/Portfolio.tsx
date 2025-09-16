"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  {
    title1: "Architectural",
    title2: "Design",
    images: [
      { src: "/room1.jpg", alt: "Room 1" },
      { src: "/room2.jpg", alt: "Room 2" },
      { src: "/room3.jpg", alt: "Room 3" },
    ],
  },
  {
    title1: "Interior",
    title2: "Design",
    images: [
      { src: "/interior1.jpg", alt: "Interior 1" },
      { src: "/interior2.jpg", alt: "Interior 2" },
      { src: "/interior3.jpg", alt: "Interior 3" },
    ],
  },
  {
    title1: "Visualization",
    title2: "",
    images: [
      { src: "/visual1.jpg", alt: "Visualization 1" },
      { src: "/visual2.jpg", alt: "Visualization 2" },
      { src: "/visual3.jpg", alt: "Visualization 3" },
    ],
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setTransitioning(false);
      }, 600);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentIndex];

  return (
    <>
      {/* Wave SVG Filter */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <filter id="wavy">
          <feTurbulence
            id="turbulence"
            baseFrequency="0.02 0.05"
            numOctaves="3"
            result="turbulence"
            seed="2"
          />
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            scale="15"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <animate
            xlinkHref="#turbulence"
            attributeName="baseFrequency"
            dur="6s"
            values="0.02 0.05;0.04 0.03;0.02 0.05"
            repeatCount="indefinite"
          />
        </filter>
      </svg>

      <section className=" sm:px-6 md:px-16 py-6 md:py-20 font-montserrat relative">
        {/* Header */}
        <div className="flex justify-center items-center gap-14 text-[12px] text-gray-500 mb-8 mt-20 flex-wrap md:flex-nowrap">
          <span>2023</span>
          <h1 className="text-[40px] font-medium text-[#333333] font-montserrat whitespace-nowrap">
            PORTFOLIO
          </h1>
          <span>Present</span>
        </div>

        {/* Slide Section */}
        <div
          key={currentIndex}
          className={`relative mb-16 md:mb-24 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 transition-all duration-700 ease-in-out ${
            transitioning ? "[filter:url(#wavy)]" : ""
          }`}
        >
          {/* Desktop view */}
          <div className="hidden md:flex gap-12 items-start">
            {/* Left Image + Titles */}
            <div className="flex flex-col w-[220px] items-start">
              <div className="relative w-full h-[300px]">
                <Image src={slide.images[0].src} alt={slide.images[0].alt} fill className="object-cover" />
              </div>
              <div className="mt-3 max-w-[220px]">
                <h2 className="text-3xl md:text-4xl font-semibold text-[#001F4B] leading-tight mb-1">
                  {slide.title1} <br /> {slide.title2}
                </h2>
                <Button variant="outline" className="rounded-full px-4 py-1 text-xs md:text-sm">
                  Explore More
                </Button>
              </div>
            </div>

            {/* Center Image */}
            <div className="relative w-[380px] h-[360px]">
              <Image src={slide.images[1].src} alt={slide.images[1].alt} fill className="object-cover" />
            </div>

            {/* Right Image */}
            <div className="relative w-[260px] h-[380px] mt-8">
              <Image src={slide.images[2].src} alt={slide.images[2].alt} fill className="object-cover" />
            </div>
          </div>

          {/* Mobile view */}
          <div className="md:hidden w-full flex flex-col items-center">
            <div className="relative w-11/12 h-72 sm:h-96">
              <Image src={slide.images[0].src} alt={slide.images[0].alt} fill className="object-cover" />
            </div>
            <h2 className="text-2xl font-semibold text-[#001F4B] leading-tight mt-3 whitespace-nowrap text-center">
              {slide.title1} {slide.title2}
            </h2>
            <Button variant="outline" className="rounded-full px-4 py-1 text-xs mt-2">
              Explore More
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
