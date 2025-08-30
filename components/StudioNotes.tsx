"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const posts = [
  {
    image: "/room1.jpg",
    categories: ["Case File", "Architecture"],
    title: "From Concept To Concrete",
    description:
      "We Take You Through The Design Journey Of A Modern Home We Recently Completed In Addis Ababa From Rough Initial Sketches To Polished Renders To ....",
  },
  {
    image: "/interior2.jpg",
    categories: ["Materials", "Design Thinking", "Interior Design"],
    title: "Why Clay Still Wins",
    description: "Clay Isn’t Just A Material It’s A Philosophy. In This Note, We Reflect On Why ....",
  },
  {
    image: "/visual1.jpg",
    categories: ["Studio Life", "Behind The Scenes"],
    title: "Studio Mornings: What Fuels Our Process",
    description: "Every Monday At NEDF Starts With Music, Coffee, And Creative Chaos. We Give You A Glimpse ....",
  },
  {
    image: "/interior1.jpg",
    categories: ["Design"],
    title: "The Power Of Simplicity",
    description: "Design Isn’t Always About More. Sometimes It’s About Less Done Right....",
  },
  {
    image: "/room3.jpg",
    categories: ["Tech", "AI"],
    title: "Using AI in Architecture",
    description: "How Artificial Intelligence is shaping how we plan, visualize, and build in the 21st century....",
  },
];

const ArrowLeft = () => (
  <svg
    className="w-[40px] h-[40px] text-[#001F4B] transition-transform duration-200 ease-in-out hover:scale-110"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ArrowRight = () => (
  <svg
    className="w-[40px] h-[40px] text-[#001F4B] transition-transform duration-200 ease-in-out hover:scale-110"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default function StudioNotes() {
  const [index, setIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setItemsPerSlide(isMobileView ? 1 : 3);
      setIsMobile(isMobileView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = 280;
  const gap = 32;
  const totalSlides = Math.ceil(posts.length / itemsPerSlide);
  const isFirst = index === 0;
  const isLast = index === totalSlides - 1;
  const totalCardWidth = cardWidth + gap;
  const translateX = -index * totalCardWidth * itemsPerSlide;

  const nextSlide = () => {
    if (!isLast) setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isFirst) setIndex((prev) => prev - 1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 relative">
      <h2 className="text-center text-[26px] md:text-[30px] font-medium text-[#333333] font-montserrat mb-8">
        STUDIO NOTES
      </h2>

      <div className="flex flex-col items-center">
        {/* Slider area */}
        <div className="relative flex items-center justify-center w-full">
          {/* Arrows on Desktop */}
          {!isMobile && (
            <>
              <div
                onClick={prevSlide}
                aria-label="Previous"
                className={`absolute left-[-60px] top-1/2 -translate-y-1/2 cursor-pointer z-10 ${
                  isFirst ? "opacity-30 pointer-events-none" : "opacity-100"
                }`}
              >
                <ArrowLeft />
              </div>

              <div
                onClick={nextSlide}
                aria-label="Next"
                className={`absolute right-[-60px] top-1/2 -translate-y-1/2 cursor-pointer z-10 ${
                  isLast ? "opacity-30 pointer-events-none" : "opacity-100"
                }`}
              >
                <ArrowRight />
              </div>
            </>
          )}

          {/* Slider container */}
          <div
            className="overflow-hidden"
            style={{
              width: `${cardWidth * itemsPerSlide + gap * (itemsPerSlide - 1)}px`,
              maxWidth: "100%",
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translateX}px)`, gap: `${gap}px` }}
            >
              {posts.map(({ image, categories, title, description }, i) => (
                <article
                  key={i}
                  className="bg-white shadow-sm flex flex-col overflow-hidden"
                  style={{
                    width: `${cardWidth}px`,
                    height: "400px",
                    border: "1px solid rgba(0, 31, 75, 0.1)",
                    borderRadius: "0",
                    flexShrink: 0,
                  }}
                >
                  <div className="relative" style={{ height: "170px", width: "100%" }}>
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>

                  <div className="p-4 flex flex-col" style={{ height: "200px" }}>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {categories.map((cat, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "#001F4B",
                            border: "1px solid rgba(0,31,75,0.1)",
                            padding: "4px 10px",
                            borderRadius: "999px",
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-base text-[18px] text-[#333333] font-regular mb-1">
                      {title}
                    </h2>

                    <p
                      className="text-[#333333]/60 text-[12px] leading-snug"
                      title={description}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {description}
                    </p>

                    <div className="mt-auto flex justify-end">
                      <button
                        className="text-white text-xs px-3 py-[8px] transition"
                        style={{
                          backgroundColor: "#001F4B",
                          border: "1px solid rgba(0,31,75,0.1)",
                          borderRadius: "0px",
                        }}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Arrows on Mobile */}
        {isMobile && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className={`${
                isFirst ? "opacity-30 pointer-events-none" : "opacity-100"
              }`}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next"
              className={`${
                isLast ? "opacity-30 pointer-events-none" : "opacity-100"
              }`}
            >
              <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
