"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Navbar } from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";

interface Post {
  id: number;
  image: string;
  categories: string[];
  title: string;
  description: string;
}

const posts: Post[] = [
  {
    id: 1,
    image: "/room1.jpg",
    categories: ["Case File", "Architecture"],
    title: "From Concept To Concrete",
    description:
      "We Take You Through The Design Journey Of A Modern Home We Recently Completed In Addis Ababa From Rough Initial Sketches To Polished Renders To Final Construction. This comprehensive case study explores every detail of our creative process and the challenges we overcame.",
  },
  {
    id: 2,
    image: "/room2.jpg",
    categories: ["Materials", "Design Thinking", "Interior Design"],
    title: "Why Clay Still Wins",
    description:
      "Clay Isn't Just A Material It's A Philosophy. In This Note, We Reflect On Why Traditional Materials Continue To Outperform Modern Alternatives In Both Sustainability And Aesthetic Appeal.",
  },
  {
    id: 3,
    image: "/interior1.jpg",
    categories: ["Studio Life", "Behind The Scenes"],
    title: "Studio Mornings: What Fuels Our Process",
    description:
      "Every Monday At NEDF Starts With Music, Coffee, And Creative Chaos. We Give You A Glimpse Into Our Daily Rituals And The Small Moments That Spark Big Ideas.",
  },
  {
    id: 4,
    image: "/interior2.jpg",
    categories: ["Design"],
    title: "The Power Of Simplicity",
    description:
      "Design Isn't Always About More. Sometimes It's About Less Done Right. We explore the principles of minimalist design and how restraint can create more impactful spaces.",
  },
  {
    id: 5,
    image: "/interior3.jpg",
    categories: ["Tech", "AI"],
    title: "Using AI in Architecture",
    description:
      "How Artificial Intelligence is shaping how we plan, visualize, and build in the 21st century. From generative design to predictive modeling, we examine the tools that are revolutionizing our industry.",
  },
  {
    id: 6,
    image: "/visual1.jpg",
    categories: ["Interior", "Design"],
    title: "Modern Minimalism",
    description:
      "Minimalist spaces are more than aesthetics; they are philosophy. We explore how to create spaces that breathe and inspire through thoughtful reduction and careful curation.",
  },
  {
    id: 7,
    image: "/visual1.jpg",
    categories: ["Studio Life", "Workflow"],
    title: "Workflow Optimization",
    description:
      "Tips on how to streamline your creative process and maintain productivity while preserving the spark of innovation.",
  },
  {
    id: 8,
    image: "/visual3.jpg",
    categories: ["Design", "Materials"],
    title: "Material Innovation",
    description:
      "Exploring new materials for sustainable interiors that don't compromise on beauty or functionality.",
  },
];

const calculateTextLines = (title: string, categories: string[]) => {
  let lines = 3;
  if (title.length > 40) lines -= 1;
  if (title.length > 60) lines -= 1;
  if (categories.length > 2) lines -= 1;
  if (categories.length > 3) lines -= 1;
  return Math.max(1, lines);
};

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const postsPerPage = 6;

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase()) ||
      post.categories.some((cat) =>
        cat.toLowerCase().includes(search.toLowerCase())
      )
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  const handleReadMore = (id: number) => {
    router.push(`/blog/${id}`);
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />


      <div 
        className="px-4 md:px-12 2xl:px-32 bg-white dark:bg-[#15171a] min-h-screen"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, white 8%, white 92%, transparent 100%), linear-gradient(to top, transparent 0%, white 8%, white 88%)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, white 8%, white 92%, transparent 100%), linear-gradient(to top, transparent 0%, white 8%, white 88%)",
          WebkitMaskComposite: "intersect",
        }}
      >
        {/* Header + Search */}
        <section className="max-w-full mx-auto pt-12 pb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#001F4B] dark:text-white mb-6">
            Our Blog: Stories & Insights
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-8">
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
              className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-[#15171a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24]"
            />
            <button className="px-4 py-2 bg-[#001F4B] dark:bg-[#ec1e24] text-white">
              Search
            </button>
          </div>
        </section>

        {/* Blog Grid - 3 Rows */}
        <section className="max-w-full mx-auto pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginatedPosts.map(({ id, image, categories, title, description }) => {
                const textLines = calculateTextLines(title, categories);

                return (
                  <article
                    key={id}
                    className="group bg-white dark:bg-[#15171a] shadow-lg shadow-[#001F4B]/10 dark:shadow-[#ec1e24]/20 flex flex-col overflow-hidden transition-shadow hover:shadow-xl hover:shadow-[#001F4B]/20 dark:hover:shadow-[#ec1e24]/30 h-[400px] border border-[rgba(0,31,75,0.1)] dark:border-transparent"
                  >
                    <div className="relative w-full h-[170px]">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="400px"
                      />
                      <div className="absolute inset-0 bg-[#15171a] opacity-0 dark:opacity-30 transition-all duration-300 group-hover:scale-105" />
                    </div>

                    <div className="relative p-4 flex flex-col h-[230px]">
                      <div className="flex flex-wrap gap-2 mb-2" style={{ minHeight: "24px" }}>
                        {categories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium px-3 py-1 bg-secondary text-secondary-foreground/70 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-[18px] text-[#333333] dark:text-white font-regular leading-6 mb-2">{title}</h2>

                      <div className="flex-1 mb-3">
                        <p
                          className="text-[#333333]/60 dark:text-white/60 text-[12px] leading-[18px]"
                          title={description}
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: textLines,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {description}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleReadMore(id)}
                          className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#003366] dark:hover:bg-[#ec1e24]/80 text-white text-xs px-3 py-2"
                        >
                          Read More
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-end">
              <Pagination page={page} setPage={setPage} total={totalPages} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
