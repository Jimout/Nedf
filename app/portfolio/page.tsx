"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Search } from "lucide-react";

const projects = [
  { id: "p1", title: "Project 1", category: "Architecture", img: "/room1.jpg", by: "John Doe" },
  { id: "p2", title: "Project 2", category: "Interior", img: "/room2.jpg", by: "John Doe" },
  { id: "p3", title: "Project 3", category: "Visualization", img: "/room3.jpg", by: "John Doe" },
  { id: "p4", title: "Project 4", category: "Architecture", img: "/interior1.jpg", by: "John Doe" },
  { id: "p5", title: "Project 5", category: "Interior", img: "/interior2.jpg", by: "John Doe" },
  { id: "p6", title: "Project 6", category: "Visualization", img: "/interior3.jpg", by: "John Doe" },
  { id: "p7", title: "Project 7", category: "Architecture", img: "/visual1.jpg", by: "John Doe" },
  { id: "p8", title: "Project 8", category: "Visualization", img: "/visual2.jpg", by: "John Doe" },
];

export default function PortfolioPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesTag = activeTag === "All" || p.category === activeTag;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <div
        className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[122px] pt-0 pb-12"
        style={{
          background: "white",
          maskImage:
            "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%), linear-gradient(to top, transparent 0%, white 10%, white 85%)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%), linear-gradient(to top, transparent 0%, white 10%, white 85%)",
          WebkitMaskComposite: "intersect",
        }}
      >
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#001F4B] opacity-40" />
          <input
            type="text"
            placeholder="Search By..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-3xl text-[#001F4B] placeholder-[#001F4B]/40 bg-[#001F4B]/[0.03] transition-all duration-300
              focus:bg-white focus:border focus:border-[#CBD5E1] focus:text-[#001F4B] focus:placeholder-[#94A3B8] focus:outline-none"
          />
        </div>

        {/* Tags */}
        <div className="flex gap-10 sm:gap-12 border-b border-gray-300 mb-8 overflow-x-auto no-scrollbar">
          {["All", "Architecture", "Interior", "Visualization"].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`pb-1 text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeTag === tag ? "text-[#001F4B] border-b-2 border-[#001F4B]" : "text-gray-500"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[10px]">
          {filteredProjects.map((project, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const isEvenRow = row % 2 === 1;

            // Pattern: row1 → 353,283,353,283 | row2 → 283,353,283,353
            let aspectRatio = "290/353";
            let height = 353;

            if (!isEvenRow) {
              if (col % 2 === 1) {
                aspectRatio = "290/283";
                height = 283;
              }
            } else {
              if (col % 2 === 0) {
                aspectRatio = "290/283";
                height = 283;
              }
            }

            return (
              <div
                key={project.id}
                className="relative cursor-pointer w-full max-w-[290px] overflow-hidden mb-[10px]" // 10px margin for each card
                style={{ aspectRatio }}
              >
                <Image
                  src={project.img}
                  alt={project.title}
                  width={290}
                  height={height}
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 translate-y-4 hover:opacity-100 hover:translate-y-0 transition-all duration-500 flex flex-col justify-center items-center text-white text-center px-2">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-sm mt-1">By: {project.by}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
