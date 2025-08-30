import Image from "next/image"
import { FaLinkedin, FaInstagram, FaTwitter, FaDribbble } from "react-icons/fa"

interface TeamMemberProps {
  image: string
  name: string
  role: string
  bio: string
  socials?: {
    linkedin?: string
    instagram?: string
    twitter?: string
    dribbble?: string
  }
}

export function TeamMemberCard({ image, name, role, bio, socials }: TeamMemberProps) {
  const socialData = [
    { Icon: FaLinkedin, url: socials?.linkedin },
    { Icon: FaInstagram, url: socials?.instagram },
    { Icon: FaTwitter, url: socials?.twitter },
    { Icon: FaDribbble, url: socials?.dribbble },
  ]

  return (
    <div className="ml-0 md:ml-4 flex flex-col md:flex-row items-center md:items-start gap-6">
      {/* Profile Image */}
      <Image
        src={image}
        alt={name}
        width={160}
        height={160}
        className="rounded-full object-cover shadow-lg mx-auto md:mx-0"
      />

      {/* Info and Socials */}
      <div className="w-full md:w-[240px] flex flex-col justify-between space-y-3 text-center md:text-left">
        <div className="mx-auto md:mx-0 max-w-[260px] md:max-w-full">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-xs text-[#333333]/40">{role}</p>

          {/* Divider Line */}
          <div className="my-2 border-t border-gray-300 w-16 md:w-full mx-auto md:mx-0" />

          {/* Centered description */}
          <p className="text-sm text-[#333333]/80 leading-relaxed md:text-justify">
            {bio}
          </p>
        </div>

        {/* Social Icons */}
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
  )
}
