'use client';

import React, { useEffect, useRef, useState } from 'react';
import Stats from './Stats';

const words = ['Designers', 'Creators', 'Resolvers'];

export default function HeroWithStats() {
  const extendedWords = [...words, words[0]];
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(96); // default

  // Update line height dynamically based on first span
  useEffect(() => {
    function updateLineHeight() {
      if (containerRef.current) {
        const firstSpan = containerRef.current.querySelector('span');
        if (firstSpan) {
          setLineHeight(firstSpan.clientHeight);
        }
      }
    }

    updateLineHeight();
    window.addEventListener('resize', updateLineHeight);
    return () => window.removeEventListener('resize', updateLineHeight);
  }, []);

  // Rotate words every 2.6s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  // Reset animation when reaching the last word
  useEffect(() => {
    if (index === words.length) {
      const timeout = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'none';
          setIndex(0);
          containerRef.current.style.transform = `translateY(0px)`;
          containerRef.current.offsetHeight; // force reflow
          containerRef.current.style.transition =
            'transform 700ms cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center font-montserrat overflow-hidden px-4 sm:px-6 lg:px-12 2xl:px-20 max-w-7xl mx-auto min-h-[65vh] -mt-4 max-sm:-mt-16">
        <div className="flex items-center max-sm:items-start">
          {/* Rotated NEDF */}
          <div className="select-none text-[#001F4B] font-extralight tracking-wider text-[80px] rotate-[-90deg] mr-[-10px] max-sm:text-[48px] max-sm:mr-[-4px]">
            NEDF
          </div>

          {/* Text Block */}
          <div className="flex flex-col justify-center max-sm:-mt-4">
            <div className="flex items-center max-sm:flex-col max-sm:items-start" style={{ height: `${lineHeight}px` }}>
              <span className="text-[58px] font-thin text-[#333333]/80 tracking-wide mr-3 max-sm:text-[24px] max-sm:mb-[-6px] max-sm:ml-[36px]">
                We Are
              </span>

              <div className="overflow-hidden relative" style={{ height: `${lineHeight}px`, maxHeight: `${lineHeight}px` }}>
                <div
                  ref={containerRef}
                  className="will-change-transform"
                  style={{
                    transform: `translateY(-${index * lineHeight}px)`,
                    transition: 'transform 700ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  }}
                >
                  {extendedWords.map((word, i) => (
                    <span
                      key={i}
                      className="block font-medium text-[#001F4B] text-[85px] leading-none whitespace-nowrap max-sm:text-[40px]"
                      style={{
                        height: `${lineHeight}px`,
                        lineHeight: `${lineHeight}px`,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />
    </>
  );
}
