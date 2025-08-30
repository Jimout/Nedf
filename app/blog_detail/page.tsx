"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const toc = [
  { id: "intro", label: "Introduction" },
  { id: "step1", label: "Step 1: Understanding The Client’s Vision" },
  { id: "step2", label: "Step 2: Conceptual Design" },
  { id: "step3", label: "Step 3: Material Selection & Sustainability" },
  { id: "step4", label: "Step 4: From 3D Models To Construction" },
  { id: "step5", label: "Step 5: The Finished Home" },
  { id: "conclusion", label: "Conclusion" },
];

export default function BlogDetailPage() {
  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      const offset = 150;
      let current = toc[0].id;
      toc.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top - offset <= 0) {
            current = item.id;
          }
        }
      });
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br ">
      <Navbar />

      <main
        className="flex-1 flex flex-col lg:flex-row gap-10"
        style={{ marginLeft: 122, marginRight: 122 }}
      >
        {/* Table of Content */}
        <aside className="lg:w-1/4 w-full h-fit lg:sticky lg:top-0 self-start">
          <div className="bg-[#001F4B]/5 rounded">
            {/* TOC Header */}
            <div className="bg-[#001F4B] text-white text-center py-3 font-medium rounded-t">
              Table Of Content
            </div>

            {/* TOC Items */}
            <ul className="divide-y divide-[#001F4B33]">
              {toc.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li
                    key={item.id}
                    className={`p-3 text-sm cursor-pointer transition-all duration-300 ease-in-out ${
                      isActive
                        ? "bg-[#001F4B]/15 border-l-[3px] border-[#001F4B] font-medium"
                        : "hover:bg-[#001F4B]/10"
                    }`}
                  >
                    <a
                      href={`#${item.id}`}
                      className="block text-[#001F4B]"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(item.id)
                          ?.scrollIntoView({ behavior: "smooth" });
                        setActiveId(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Blog Content */}
        <article className="flex-1">
          <div className="w-full h-48 md:h-56 lg:h-64 relative mb-6">
            <Image
              src="/room1.jpg"
              alt="From Concept To Concrete"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1
  className="mb-6"
  style={{
    fontFamily: "Montserrat",
    fontWeight: 500,          // Medium font weight
    color: "#001F4B",          // Navy blue
    fontSize: "36px",          // 40px size
  }}
>
  From Concept To Concrete
</h1>

          <div className="flex gap-2 mb-8">
            <span
              className="px-3 py-1 text-sm border border-gray-400 rounded-full font-normal text-[#333333]"
              style={{ fontFamily: "Montserrat" }}
            >
              Case File
            </span>
            <span
              className="px-3 py-1 text-sm border border-gray-400 rounded-full font-normal text-[#333333]"
              style={{ fontFamily: "Montserrat" }}
            >
              Architecture
            </span>
          </div>

          {/* Sections */}
          {toc.map((item) => (
            <section
              key={item.id}
              id={item.id}
              className="scroll-mt-24 mb-10"
            >
              <h2
                className="text-2xl font-medium mb-4 text-[#333333]"
                style={{ fontFamily: "Montserrat" }}
              >
                {item.label}
              </h2>

              {/* Main paragraph */}
              <p
                className="text-[#333333] text-sm mb-4 leading-7 text-justify"
                style={{ fontFamily: "Montserrat", fontWeight: "400" }}
              >
                {getSectionContent(item.id)}
              </p>

              {/* Extra paragraphs for scroll */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <p
                  key={idx}
                  className="text-[#333333] text-sm mb-4 leading-7 text-justify"
                  style={{ fontFamily: "Montserrat", fontWeight: "400" }}
                >
                  {getSectionContent(item.id)}
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>

      <Footer />
    </div>
  );
}

// Realistic blog content
function getSectionContent(id: string) {
  switch (id) {
    case "intro":
      return "Designing a home is a journey from vision to reality. This case study highlights how NEDF Studio transforms client dreams into modern, functional living spaces while respecting context, sustainability, and material quality.";
    case "step1":
      return "The client desired a contemporary home that embraces natural light and open spaces. They emphasized sustainability and a seamless connection between indoor and outdoor areas. Understanding these priorities set the foundation for our design approach.";
    case "step2":
      return "Initial sketches explored spatial layouts, lighting, and functional flow. We presented several concepts emphasizing simplicity, openness, and harmony with the surrounding environment. Feedback from the client guided refinement toward the final conceptual plan.";
    case "step3":
      return "Materials were chosen for durability, aesthetics, and environmental impact. Sustainable wood, local stone, and energy-efficient glazing were prioritized, ensuring longevity and low environmental footprint without compromising style.";
    case "step4":
      return "3D models allowed the client to visualize the final layout and finishes. Adjustments were made based on these visualizations to optimize space, lighting, and material placement. Construction followed precise plans to maintain design integrity.";
    case "step5":
      return "The completed home embodies the client’s vision, blending modern design with practical living spaces. Natural light floods each room, materials feel warm and sustainable, and every detail reflects careful planning and attention to aesthetics.";
    case "conclusion":
      return "From concept to concrete, this project showcases the power of collaboration between client and designer. Thoughtful planning, sustainable materials, and precise execution transform visions into functional, elegant homes.";
    default:
      return "";
  }
}
