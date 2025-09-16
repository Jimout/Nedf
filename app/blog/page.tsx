"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import { motion, AnimatePresence } from "framer-motion";

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
  {
    image: "/room2.jpg",
    categories: ["Interior", "Design"],
    title: "Modern Minimalism",
    description: "Minimalist spaces are more than aesthetics; they are philosophy....",
  },
  {
    image: "/visual2.jpg",
    categories: ["Studio Life", "Workflow"],
    title: "Workflow Optimization",
    description: "Tips on how to streamline your creative process....",
  },
  {
    image: "/interior3.jpg",
    categories: ["Design", "Materials"],
    title: "Material Innovation",
    description: "Exploring new materials for sustainable interiors....",
  },
];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const postsPerPage = 6;

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Entire page container with fade and 122px padding */}
      <div
        className="px-[122px]"
        style={{
          background: "white",
          maskImage:
            "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%), linear-gradient(to top, transparent 0%, white 0%, white 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%), linear-gradient(to top, transparent 0%, white 0%, white 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "intersect",
        }}
      >
        {/* Intro + Search */}
        <section className="max-w-full mx-auto pt-6 pb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-medium text-[#001F4B] mb-2">
            Our Blog: Stories & Insights
          </h1>
          <p className="text-gray-600 mb-4">
            Discover design thinking, project stories, and ideas shaping architecture & interior design.
          </p>

          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#001F4B]"
            />
            <button className="px-4 py-2 bg-[#001F4B] text-white rounded-r-md">
              Search
            </button>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {paginatedPosts.map(({ image, categories, title, description }, i) => (
                <article
                  key={i}
                  className="bg-white shadow-sm flex flex-col border border-[rgba(0,31,75,0.1)]"
                  style={{ height: "420px" }}
                >
                  <div className="relative h-[180px] w-full">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
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

                    <h2 className="text-[18px] text-[#333333] mb-1">{title}</h2>

                    <p
                      className="text-[#333333]/60 text-[12px] leading-snug mb-3"
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
            </motion.div>
          </AnimatePresence>

          {/* Pagination aligned to last card */}
          <div className="mt-6 flex justify-end">
            <Pagination page={page} setPage={setPage} total={totalPages} />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
