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
    <footer id="footer" className="bg-white dark:bg-[#15171a] text-gray-800 dark:text-white relative pt-16 scroll-smooth scroll-mt-20">
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
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between px-6 md:px-[100px] gap-10">
        {/* Logo */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <h2 className="text-[32px] text-[#333333]/80 dark:text-white/70 font-medium">NEDF</h2>
          <p className="text-[16px] text-[#001F4B]/60 dark:text-[#ec1e24]/60 mt-2">Less, but Better.</p>
        </div>

        {/* About Us */}
        <div className="flex flex-col justify-center items-center md:items-start md:max-w-lg text-center md:text-left w-full md:w-auto">
          <h3 className="text-[32px] text-[#001F4B] dark:text-[#ec1e24] font-medium mb-2">About Us</h3>
          <p className="text-sm font-medium text-[#333333]/80 dark:text-white/70 leading-relaxed max-w-md md:max-w-none">
            NEDF is a creative studio based in Addis Ababa, Ethiopia, specializing in architectural
            design, interior spaces, and high-end visualizations. We blend design with technology to
            create thoughtful, innovative, and visually compelling environments. From concept to
            execution, our work reflects a commitment to clarity, craft, and bold creative
            expression.
          </p>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <h3 className="text-[32px] text-[#001F4B] dark:text-[#ec1e24] font-medium mt-1 mb-3">Contact Us</h3>
          <div className="flex flex-row gap-2 text-sm mb-4 text-center md:text-left text-[#333333] dark:text-white/70">
            <span>
              <span className="font-medium text-[#001F4B]/60 dark:text-[#ec1e24]">Call</span>: +251945289012
            </span>
            <span>/</span>
            <span>+251900672518</span>
          </div>
          <p className="text-sm mb-4 text-center md:text-left text-[#333333] dark:text-white/70">
            <span className="font-medium text-[#001F4B]/60 dark:text-[#ec1e24]">Email</span>: Nedf123@gmail.com
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

          <p className="font-bold text-[#001F4B]/60 dark:text-[#ec1e24]/60 text-center md:text-left">Follow Us</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="max-w-7xl mx-auto mt-8 px-6 lg:px-[200px]">
        <div className="flex flex-wrap justify-center gap-6 md:gap-20 text-sm text-[#333333] dark:text-white/70 mb-6">
          <Link
            href="/#hero"
            className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transform hover:scale-110 hover:-translate-y-1 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/#portfolio"
            className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transform hover:scale-110 hover:-translate-y-1 transition duration-300"
          >
            Portfolio
          </Link>
          <Link
            href="/#crew"
            className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transform hover:scale-110 hover:-translate-y-1 transition duration-300"
          >
            Team
          </Link>
          <Link
            href="/blog"
            className="hover:text-[#001F4B] dark:hover:text-[#ec1e24] transform hover:scale-110 hover:-translate-y-1 transition duration-300"
          >
            Blog
          </Link>
          <Link
            href="/#footer"
            className="hover:text-[#001F4B] transform hover:scale-110 hover:-translate-y-1 transition duration-300 font-bold"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#001F4B] dark:bg-[#15171a] text-white text-center text-sm py-3 px-6 lg:px-[200px] dark:px-0 dark:mx-auto dark:w-[90%] dark:shadow-[0_-4px_8px_rgba(236,30,36,0.3)]">&copy; 2025, NEDF</div>
    </footer>
  );
}
