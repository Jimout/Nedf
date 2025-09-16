"use client";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ImageSlider from "@/components/ImageSlider";
import Footer from "@/components/Footer";

export default function ProjectDetailPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* White content box with fading edges */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: "1200px",
          backgroundColor: "white",
          padding: "40px 122px",
          maskImage: `
            linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)
          `,
          WebkitMaskImage: `
            linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "intersect",
        }}
      >
        <main className="text-gray-800 relative font-montserrat">
          {/* Back Button */}
          <button className="flex items-center text-[#001f4b] hover:text-black mb-6">
            <span className="text-4xl">←</span>
          </button>

          {/* Title */}
          <h1 className="text-4xl font-regular tracking-wide text-[#001F4B] mb-2">
            HIDASSE TELECOM
          </h1>
          <p className="text-[#001f4b]/70 mb-4">2024</p>
          <hr className="mb-12 border-b-1 border-[#001F4B]/20" />

          {/* Project Info with increased line spacing */}
          <div className="space-y-2 text-sm mb-8 leading-relaxed">
            <p className="font-normal text-[#333333]">
              CLIENT: <span className="font-normal text-[#333333]/60">Snap Trading and Industry PLC</span>
            </p>
            <p className="font-medium text-[#333333]">
              LOCATION: <span className="font-normal text-[#333333]/60">Golagol 22, Addis Ababa</span>
            </p>
            <p className="font-medium text-[#333333]">
              AREA: <span className="font-normal text-[#333333]/60">958 m²</span>
            </p>
            <p className="font-medium text-[#333333]">
              TOPOLOGY: <span className="font-normal text-[#333333]/60">(4B+G+15+T) Mixed Use Building</span>
            </p>
            <p className="font-medium text-[#333333]">
              ROLE: <span className="font-normal text-[#333333]/60">Design & Supervision</span>
            </p>
            <p className="font-medium text-[#333333]">
              STATUS: <span className="font-normal text-[#333333]/60">Underconstruction</span>
            </p>
          </div>

          {/* Main Before/After Image */}
          <div className="mb-12 flex justify-center">
            <BeforeAfterSlider
              beforeImage="/room1.jpg"
              afterImage="/room2.jpg"
              beforeAlt="Project before renovation"
              afterAlt="Project after renovation"
              width={956} // Equal to the underline width
              height={600}
              className="w-full h-auto"
            />
          </div>

          {/* Sections */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium text-[#333333] mb-6">INSPIRATION</h2>
            <p className="text-[#333333] text-sm font-normal leading-loose">
              Inspired By Natural Light, Open-Plan Living, And Seamless Indoor-Outdoor Integration.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium text-[#333333] mb-6">DESCRIPTION</h2>
            <p className="text-[#333333] text-sm font-normal leading-loose">
              This Residential Project Emphasizes Open-Plan Living And Seamless Integration With The Surrounding Environment. The Design Prioritizes Natural Light And Sustainable Materials, Creating A Home That Is Both Functional And Aesthetically Harmonious. Terraces And Green Spaces Are Carefully Incorporated To Blend Indoor And Outdoor Areas, Offering Panoramic Views And A Strong Connection To Nature.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium text-[#333333] mb-6">FEATURES</h2>
            <ul className="list-disc list-inside text-[#333333] text-sm font-normal leading-loose space-y-1">
              <li>Sustainable Building Materials</li>
              <li>Open-Plan Layout With Panoramic Views</li>
              <li>Terraces And Green Spaces Integrated</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-medium text-[#333333] mb-6">MATERIALS</h2>
            <ul className="list-disc list-inside text-[#333333] text-sm font-normal leading-loose space-y-1">
              <li>Upholstery</li>
              <li>Marble</li>
              <li>Wood</li>
            </ul>
          </section>

          {/* Color Palette */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium text-[#333333] mb-6">COLOR PALETTE</h2>
            <div className="flex gap-6 mb-8">
              {[{ hex: "#E3E3D8" }, { hex: "#FDFDFD" }, { hex: "#7A4D12" }, { hex: "#54514A" }].map(
                (color, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="w-16 h-16 border" // no border radius
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-sm mt-2 text-[#333333]">{color.hex}</p>
                  </div>
                )
              )}
            </div>

            <ImageSlider
              images={["/room2.jpg", "/room3.jpg", "/interior1.jpg", "/interior2.jpg"]}
              alts={["Room 2", "Room 3", "Interior 1", "Interior 2"]}
              gap={10}
            />
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
