import { TeamMemberCard } from "@/components/TeamMemberCard"

export function TheCrew() {
  const team = [
    {
      name: "Sam Rams",
      role: "Founder",
      bio: "I’ve established NEDF in 2023 and it was one of the best ideas I’ve had in my life",
      image: "/test3.png",
      socials: {
        linkedin: "#",
        instagram: "#",
        twitter: "#",
        dribbble: "#"
      }
    },
    {
      name: "Biniyam Tekle",
      role: "Project Architect",
      bio: "I oversee NEDF's finances, ensuring every project runs smoothly and sustainably.",
      image: "/tes4.png",
      socials: {
        linkedin: "#",
        instagram: "#",
        twitter: "#"
      }
    },

  ]

  return (
    <section className="py-20">
      {/* Title */}
      <h2 className="text-center text-[30px] font-medium text-[#333333] font-montserrat mb-8">THE CREW</h2>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto">
        {team.map((member, idx) => (
          <TeamMemberCard key={idx} {...member} />
        ))}
      </div>
    </section>
  )
}
