"use client";

import Image from "next/image";
import { FaLinkedin, FaInstagram, FaTwitter, FaDribbble } from "react-icons/fa";

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  bio: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    dribbble?: string;
  };
}

function TeamMemberCard({ image, name, role, bio, socials }: TeamMemberProps) {
  const socialData = [
    { Icon: FaLinkedin, url: socials?.linkedin },
    { Icon: FaInstagram, url: socials?.instagram },
    { Icon: FaTwitter, url: socials?.twitter },
    { Icon: FaDribbble, url: socials?.dribbble },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full max-w-[500px]">
      <Image
        src={image}
        alt={name}
        width={160}
        height={160}
        className="rounded-full object-cover shadow-lg flex-shrink-0 mx-auto md:mx-0"
      />

      <div className="flex-1 flex flex-col justify-between space-y-3 text-center md:text-left">
        <div className="mx-auto md:mx-0">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-xs text-[#333333]/40">{role}</p>

          <div className="my-2 border-t border-gray-300 w-16 md:w-full mx-auto md:mx-0" />

          <p className="text-sm text-[#333333]/80 leading-relaxed md:text-justify">
            {bio}
          </p>
        </div>

        <div className="flex gap-3 justify-center md:justify-start mt-2">
          {socialData.map(
            ({ Icon, url }, idx) =>
              url && (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#001F4B] flex items-center justify-center 
                             hover:bg-[#001F4B] hover:text-white transition-colors duration-300"
                >
                  <Icon size={12} />
                </a>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export function TheCrew() {
  const team = [
    {
      name: "Sam Rams",
      role: "Founder",
      bio: "Established NEDF in 2023 and it was one of the best ideas I’ve had in my life",
      image: "/test3.png",
      socials: { linkedin: "#", instagram: "#", twitter: "#", dribbble: "#" },
    },
    {
      name: "Biniyam Tekle",
      role: "Project Architect",
      bio: "I oversee NEDF's finances, ensuring every project runs smoothly and sustainably.",
      image: "/tes4.png",
      socials: { linkedin: "#", instagram: "#", twitter: "#" },
    },
  ];

  return (
    <section id="TheCrew" className="pt-20 w-full flex justify-center scroll-mt-20">
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-12 lg:px-20 xl:px-32">
        <h2 className="text-center text-[30px] font-medium text-[#333333] font-montserrat mb-12">
          THE CREW
        </h2>

        {/* Responsive Gap Scaling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-[clamp(5rem,25%,55rem)] justify-center">
          {team.map((member, idx) => (
            <TeamMemberCard key={idx} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
