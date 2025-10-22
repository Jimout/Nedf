"use client";

import Image from "next/image";
import { useState } from "react";

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
}

function FounderCard({ image, name, role }: TeamMemberProps) {
  return (
    <div className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden bg-white dark:bg-[#0a0a0a]">
      {/* Split Screen Layout with Borders */}
      <div className="flex h-full border border-[#001F4B]/20 dark:border-[#ec1e24]/20">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 relative border-r border-[#001F4B]/20 dark:border-[#ec1e24]/20">
          {/* Background Text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[200px] lg:text-[300px] font-bold text-[#001F4B]/5 dark:text-[#ec1e24]/10 select-none pointer-events-none">
            {name.split(' ')[0].charAt(0)}
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-bold text-[#001F4B] dark:text-[#ec1e24] mb-4 font-montserrat">
              {name.split(' ')[0]}
            </h2>
            <h2 className="text-4xl lg:text-6xl font-bold text-[#333333] dark:text-white font-montserrat">
              {name.split(' ')[1]}
            </h2>
          </div>
        </div>

        {/* Central Portrait */}
        <div className="relative flex-shrink-0 w-1/2 h-full flex items-center justify-center border-r border-[#001F4B]/20 dark:border-[#ec1e24]/20">
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001F4B]/20 to-transparent dark:from-[#ec1e24]/20 rounded-lg" />
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 relative">
          {/* Background Text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[200px] lg:text-[300px] font-bold text-[#ec1e24]/5 dark:text-[#001F4B]/10 select-none pointer-events-none">
            {name.split(' ')[1].charAt(0)}
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-right">
            <h2 className="text-4xl lg:text-6xl font-bold text-[#333333] dark:text-white mb-4 font-montserrat">
              {name.split(' ')[0]}
            </h2>
            <h2 className="text-4xl lg:text-6xl font-bold text-[#001F4B] dark:text-[#ec1e24] font-montserrat">
              {name.split(' ')[1]}
            </h2>
            
            {/* Role */}
            <div className="mt-8">
              <div className="w-16 h-1 bg-[#001F4B] dark:bg-[#ec1e24] ml-auto mb-4" />
              <p className="text-xl lg:text-2xl text-[#001F4B] dark:text-[#ec1e24] font-medium">
                {role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TheCrew() {
  const [currentFounder, setCurrentFounder] = useState(0);
  
  const founders = [
    {
      name: "Sam Rams",
      role: "Founder / CEO",
      image: "/test3.png",
    },
    {
      name: "Biniyam Tekle",
      role: "Co-Founder / CFO",
      image: "/tes4.png",
    },
  ];

  const nextFounder = () => {
    setCurrentFounder((prev) => (prev + 1) % founders.length);
  };

  const prevFounder = () => {
    setCurrentFounder((prev) => (prev - 1 + founders.length) % founders.length);
  };

  return (
    <section id="TheCrew" className="pt-20 pb-20 w-full relative z-10 bg-white dark:bg-[#0a0a0a]">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#001F4B] dark:text-[#ec1e24] font-montserrat mb-4">
            THE FOUNDERS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#001F4B] to-[#ec1e24] mx-auto rounded-full" />
        </div>

        {/* Founder Display */}
        <div className="max-w-7xl mx-auto">
          <FounderCard {...founders[currentFounder]} />
        </div>

        {/* Navigation Controls */}
        {founders.length > 1 && (
          <div className="flex justify-center items-center gap-8 mt-12">
            {/* Previous Button */}
            <button
              onClick={prevFounder}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#001F4B]/80 dark:hover:bg-[#ec1e24]/80 transition-all duration-300 shadow-lg hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">PREV</span>
            </button>

            {/* Founder Indicators */}
            <div className="flex gap-3">
              {founders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFounder(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentFounder
                      ? "bg-[#001F4B] dark:bg-[#ec1e24] scale-125"
                      : "bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextFounder}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#001F4B]/80 dark:hover:bg-[#ec1e24]/80 transition-all duration-300 shadow-lg hover:scale-105"
            >
              <span className="text-sm font-medium">NEXT</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}