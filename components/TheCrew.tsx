import { FaLinkedin, FaInstagram, FaPinterest, FaBehance, FaYoutube } from "react-icons/fa"
import { FaTiktok } from "react-icons/fa6"
import { FaXTwitter } from "react-icons/fa6"

interface Founder {
  id: string
  name: string
  title: string
  description: string
  image: string
  social: {
    instagram?: string
    tiktok?: string
    linkedin?: string
    pinterest?: string
    behance?: string
    x?: string
    youtube?: string
  }
}

interface FoundersProps {
  founders: Founder[]
}

// Sample founders data
const foundersData: Founder[] = [
  {
    id: "1",
    name: "John Doe",
    title: "Lead Architect",
    description: "With over 15 years of experience in architectural design, John brings innovative solutions to every project. His expertise in sustainable design and modern aesthetics has earned him recognition in the industry.",
    image: "/mos.jpg",
    social: {
      instagram: "https://instagram.com/johndoe",
      tiktok: "https://tiktok.com/@johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      pinterest: "https://pinterest.com/johndoe",
      behance: "https://behance.net/johndoe",
      x: "https://x.com/johndoe",
      youtube: "https://youtube.com/@johndoe"
    }
  },
  {
    id: "2", 
    name: "Jane Smith",
    title: "Interior Design Director",
    description: "Jane specializes in creating functional and beautiful interior spaces. Her attention to detail and understanding of client needs has resulted in numerous award-winning projects across residential and commercial sectors.",
    image: "/natty.jpg",
    social: {
      instagram: "https://instagram.com/janesmith",
      tiktok: "https://tiktok.com/@janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      pinterest: "https://pinterest.com/janesmith",
      behance: "https://behance.net/janesmith",
      x: "https://x.com/janesmith",
      youtube: "https://youtube.com/@janesmith"
    }
  }
]

export function TheCrew() {
  return <Founders founders={foundersData} />
}

export function Founders({ founders }: FoundersProps) {
  return (
    <section className="w-full py-20">
      <div className="w-full">
        {/* Title */}
        <div className="pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <p className="text-center text-[28px] md:text-[32px] font-medium text-[#333333] dark:text-[#ec1e24] font-montserrat tracking-wider">
            THE FOUNDERS
          </p>
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {founders.map((founder, index) => (
          <div
            key={founder.id}
            className={`relative ${index % 2 === 0 ? "mb-16 mr-auto" : "ml-auto"} max-w-6xl`}
            style={{
              transform: index % 2 === 0 ? "translateY(0)" : "translateY(-100px)",
            }}
          >
            <div className="flex items-end">
              {/* Image Section - Taller */}
              <div
                className={`flex-shrink-0 w-80 h-96 overflow-hidden ${index % 2 === 0 ? "order-first" : "order-last"}`}
              >
                <img
                  src={founder.image || "/placeholder.svg"}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section - Shorter Info Box */}
              <div className="flex-1 bg-white dark:bg-[#15171a] border border-gray-200 dark:border-white/10 p-6 shadow-lg dark:shadow-[#ec1e24]/20 flex flex-col justify-center max-w-full">
                <div>
                  <h3 className="text-2xl font-bold text-[#001F4B] dark:text-[#ec1e24] mb-2">{founder.name}</h3>
                  <p className="text-[#333333]/70 dark:text-white/70 font-medium mb-4">{founder.title}</p>
                  <p className="text-[#333333]/70 dark:text-white leading-relaxed text-justify mb-6">{founder.description}</p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 justify-start flex-wrap">
                  {founder.social.instagram && (
                    <a
                      href={founder.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[#001F4B] dark:border-[#ec1e24] flex items-center justify-center 
                               hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white transition-colors duration-300 text-[#001F4B] dark:text-[#ec1e24]"
                    >
                      <FaInstagram size={12} />
                    </a>
                  )}
                  {founder.social.tiktok && (
                    <a
                      href={founder.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[#001F4B] dark:border-[#ec1e24] flex items-center justify-center 
                               hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white transition-colors duration-300 text-[#001F4B] dark:text-[#ec1e24]"
                    >
                      <FaTiktok size={12} />
                    </a>
                  )}
                  {founder.social.linkedin && (
                    <a
                      href={founder.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[#001F4B] dark:border-[#ec1e24] flex items-center justify-center 
                               hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white transition-colors duration-300 text-[#001F4B] dark:text-[#ec1e24]"
                    >
                      <FaLinkedin size={12} />
                    </a>
                  )}
                  {founder.social.pinterest && (
                    <a
                      href={founder.social.pinterest}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[#001F4B] dark:border-[#ec1e24] flex items-center justify-center 
                               hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white transition-colors duration-300 text-[#001F4B] dark:text-[#ec1e24]"
                    >
                      <FaPinterest size={12} />
                    </a>
                  )}
                  {founder.social.behance && (
                    <a
                      href={founder.social.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[#001F4B] dark:border-[#ec1e24] flex items-center justify-center 
                               hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white transition-colors duration-300 text-[#001F4B] dark:text-[#ec1e24]"
                    >
                      <FaBehance size={12} />
                    </a>
                  )}
                  {founder.social.x && (
                    <a
                      href={founder.social.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[#001F4B] dark:border-[#ec1e24] flex items-center justify-center 
                               hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white transition-colors duration-300 text-[#001F4B] dark:text-[#ec1e24]"
                    >
                      <FaXTwitter size={12} />
                    </a>
                  )}
                  {founder.social.youtube && (
                    <a
                      href={founder.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[#001F4B] dark:border-[#ec1e24] flex items-center justify-center 
                               hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white transition-colors duration-300 text-[#001F4B] dark:text-[#ec1e24]"
                    >
                      <FaYoutube size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}
