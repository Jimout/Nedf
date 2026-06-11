import type { CmsBlogSection } from "@/lib/cms/types"

const SECTION_COPY: Record<string, string> = {
  step1:
    "The client desired a contemporary home that embraces natural light and open spaces. They emphasized sustainability and a seamless connection between indoor and outdoor areas. Understanding these priorities set the foundation for our design approach.",
  "step1-1":
    "During the initial consultation, we spent time understanding the client's lifestyle, preferences, and long-term vision for their home. This phase involved detailed discussions about daily routines, entertaining needs, and future family plans.",
  "step1-2":
    "We documented all functional requirements, spatial needs, and aesthetic preferences. This comprehensive requirements gathering ensured that every design decision would be informed by the client's actual needs rather than assumptions.",
  step2:
    "Initial sketches explored spatial layouts, lighting, and functional flow. We presented several concepts emphasizing simplicity, openness, and harmony with the surrounding environment. Feedback from the client guided refinement toward the final conceptual plan.",
  "step2-1":
    "The sketching phase involved rapid iteration of ideas, exploring different spatial configurations and architectural forms. We created multiple concept sketches to visualize various approaches to the design challenge.",
  "step2-2":
    "Client feedback sessions were crucial in refining the design direction. Through collaborative discussions, we identified which concepts resonated most strongly and which elements needed further development.",
  step3:
    "Materials were chosen for durability, aesthetics, and environmental impact. Sustainable wood, local stone, and energy-efficient glazing were prioritized, ensuring longevity and low environmental footprint without compromising style.",
  "step3-1":
    "We carefully selected materials that met strict sustainability criteria while maintaining the aesthetic vision. Each material choice was evaluated for its lifecycle impact, sourcing practices, and contribution to the overall design language.",
  step4:
    "3D models allowed the client to visualize the final layout and finishes. Adjustments were made based on these visualizations to optimize space, lighting, and material placement. Construction followed precise plans to maintain design integrity.",
  step5:
    "The completed home embodies the client's vision, blending modern design with practical living spaces. Natural light floods each room, materials feel warm and sustainable, and every detail reflects careful planning and attention to aesthetics.",
  conclusion:
    "From concept to concrete, this project showcases the power of collaboration between client and designer. Thoughtful planning, sustainable materials, and precise execution transform visions into functional, elegant homes.",
}

/** Full nested TOC sections for case-study style blog posts. */
export function createCaseStudyBlogSections(introText: string): CmsBlogSection[] {
  return [
    { id: "intro", title: "Introduction", content: introText, level: 1, number: "1" },
    {
      id: "step1",
      title: "Understanding The Client's Vision",
      content: SECTION_COPY.step1,
      level: 2,
      number: "1.1",
    },
    {
      id: "step1-1",
      title: "Initial Consultation",
      content: SECTION_COPY["step1-1"],
      level: 3,
      number: "1.1.1",
    },
    {
      id: "step1-2",
      title: "Requirements Gathering",
      content: SECTION_COPY["step1-2"],
      level: 3,
      number: "1.1.2",
    },
    {
      id: "step2",
      title: "Conceptual Design",
      content: SECTION_COPY.step2,
      level: 1,
      number: "2",
    },
    {
      id: "step2-1",
      title: "Sketching Phase",
      content: SECTION_COPY["step2-1"],
      level: 2,
      number: "2.1",
    },
    {
      id: "step2-2",
      title: "Client Feedback",
      content: SECTION_COPY["step2-2"],
      level: 2,
      number: "2.2",
    },
    {
      id: "step3",
      title: "Material Selection & Sustainability",
      content: SECTION_COPY.step3,
      level: 1,
      number: "3",
    },
    {
      id: "step3-1",
      title: "Sustainable Materials",
      content: SECTION_COPY["step3-1"],
      level: 2,
      number: "3.1",
    },
    {
      id: "step4",
      title: "From 3D Models To Construction",
      content: SECTION_COPY.step4,
      level: 1,
      number: "4",
      images: ["/room1.jpg", "/interior2.jpg"],
    },
    {
      id: "step5",
      title: "The Finished Home",
      content: SECTION_COPY.step5,
      level: 1,
      number: "5",
      images: ["/visual1.jpg"],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      content: SECTION_COPY.conclusion,
      level: 1,
      number: "6",
    },
  ]
}
