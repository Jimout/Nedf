"use client";

import Link from "next/link";
import { SiInstagram, SiTiktok, SiLinkedin, SiPinterest, SiBehance } from "react-icons/si";

export default function Footer() {
  const socialIcons = [
    { Icon: SiInstagram, label: "Instagram", href: "https://www.instagram.com/nedf_studios/" },
    { Icon: SiTiktok, label: "TikTok", href: "https://www.tiktok.com/@nedf_studios" },
    { Icon: SiLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/nedfstudios" },
    { Icon: SiPinterest, label: "Pinterest", href: "https://www.pinterest.com/nedfstudios" },
    { Icon: SiBehance, label: "Behance", href: "https://www.behance.net/ndfjkindia" },
  ];

  return (
    <footer id="footer" className="bg-white dark:bg-[#15171a] text-gray-800 dark:text-white relative min-h-screen flex flex-col justify-center scroll-smooth scroll-mt-20">
      {/* Divider Line */}
      <div
        className="mx-auto mb-8 bg-[#001F4B] dark:bg-[#ec1e24]"
        style={{
          width: "90%",
          height: "1px",
          borderRadius: "3px",
        }}
      />

      {/* Main Grid */}
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between px-6 md:px-[100px] gap-10 flex-grow items-center">
        {/* Logo */}
        <div className="flex flex-col justify-center items-center md:items-start md:pl-8 lg:pl-12 xl:pl-16">
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#333333]/80 dark:text-white/70 font-medium font-montserrat">NEDF</h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-[#001F4B]/60 dark:text-[#ec1e24]/60 mt-2 font-montserrat">Less, but Better.</p>
        </div>

        {/* Navigation Links - 2 Columns */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <div className="grid grid-cols-2 gap-y-6 text-sm text-[#333333] dark:text-white/70 font-montserrat" style={{ columnGap: '60px' }}>
            <Link href="/" className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transition duration-300">Home</Link>
            <Link href="/#services" className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transition duration-300">Services</Link>
            <Link href="/#portfolio" className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transition duration-300">Portfolio</Link>
            <Link href="/#crew" className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transition duration-300">About</Link>
            <Link href="/#steps" className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transition duration-300">How NEDF Works</Link>
            <Link href="/#OurTeam" className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transition duration-300">Our Team</Link>
            <Link href="/#testimonials" className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transition duration-300">Client Reflection</Link>
            <Link href="/#studio-notes" className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transition duration-300">Studio Notes</Link>
            <Link href="/#subscription" className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transition duration-300">Subscribe</Link>
            <Link href="/#footer" className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transition duration-300">Contact Us</Link>
          </div>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <h3 className="text-3xl sm:text-4xl md:text-5xl text-[#001F4B] dark:text-[#ec1e24] font-medium mb-3 font-montserrat">Contact Us</h3>
          <div className="flex flex-row gap-2 text-base sm:text-lg mb-4 text-center md:text-left text-[#333333] dark:text-white/70 font-montserrat">
            <span>
              <span className="font-medium text-[#001F4B]/60 dark:text-[#ec1e24] font-montserrat">Call</span>: +251945289012
            </span>
            <span>/</span>
            <span>+251900672518</span>
          </div>
          <p className="text-base sm:text-lg mb-4 text-center md:text-left text-[#333333] dark:text-white/70 font-montserrat">
            <span className="font-medium text-[#001F4B]/60 dark:text-[#ec1e24] font-montserrat">Email</span>: Nedf123@gmail.com
          </p>

          {/* Social Icons */}
          <div className="flex gap-2 mb-4 justify-center md:justify-start">
            {socialIcons.map(({ Icon, label, href }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full border border-[#001F4B] dark:border-[#ec1e24] flex items-center justify-center text-[#001F4B] dark:text-[#ec1e24]
                           hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white transition-colors duration-300"
              >
                <Icon size={12} />
              </a>
            ))}
          </div>

          <p className="font-bold text-[#001F4B]/60 dark:text-[#ec1e24]/60 text-center md:text-left font-montserrat">Follow Us</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#001F4B] dark:bg-[#15171a] text-white text-center text-sm py-3 px-6 lg:px-[200px] dark:px-0 dark:mx-auto dark:w-[90%] dark:shadow-[0_-4px_8px_rgba(236,30,36,0.3)] font-montserrat mt-auto">&copy; 2025, NEDF</div>
    </footer>
  );
}
