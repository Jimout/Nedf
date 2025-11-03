"use client";

import Image from "next/image";
import { FaLinkedin, FaInstagram, FaTwitter, FaDribbble } from "react-icons/fa";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { motion } from "framer-motion";

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  bio: string;
  idx: number;
  socials?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    dribbble?: string;
  };
}

function TeamMemberCard({ image, name, role, bio, socials, idx }: TeamMemberProps) {
  const socialData = [
    { Icon: FaLinkedin, url: socials?.linkedin },
    { Icon: FaInstagram, url: socials?.instagram },
    { Icon: FaTwitter, url: socials?.twitter },
    { Icon: FaDribbble, url: socials?.dribbble },
  ];

  return (
    <div className={`flex flex-col items-center text-center space-y-4 w-full max-w-[300px] ${idx === 0 ? "lg:mr-auto" : idx === 2 ? "lg:ml-auto" : "lg:mx-auto"}`}>
      {/* Avatar */}
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={120}
          height={120}
          className="rounded-full object-cover shadow-lg w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40"
        />
        <div className="absolute inset-0 rounded-full bg-[#15171a] opacity-10" />
      </div>

      {/* Content */}
      <div className="space-y-3 w-full">
        <div>
          <h3 className="text-lg font-medium text-[#001F4B] dark:text-[#ec1e24] font-montserrat">{name}</h3>
          <p className="text-xs text-[#333333]/40 dark:text-white/60 font-montserrat">{role}</p>
        </div>

        <div className="border-t border-gray-300 dark:border-white/20 w-16 mx-auto" />

        <p className="text-sm text-[#333333]/80 dark:text-white/70 leading-relaxed px-4 font-montserrat">
          {bio}
        </p>

        {/* Social Links */}
        <div className="flex gap-3 justify-center pt-2">
          {socialData.map(
            ({ Icon, url }, idx) =>
              url && (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#001F4B]/20 dark:border-white/20 flex items-center justify-center 
                             hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white hover:border-transparent transition-colors duration-300 text-[#001F4B]/20 dark:text-white/20"
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

export function OurTeam() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const team = [
    {
      name: "Sarah Johnson",
      role: "Lead Designer",
      bio: "Creative visionary with 8+ years of experience in interior design and space planning.",
      image: "/test3.png",
      socials: { linkedin: "#", instagram: "#", twitter: "#" },
    },
    {
      name: "Michael Chen",
      role: "Senior Architect",
      bio: "Expert in sustainable architecture and innovative building solutions.",
      image: "/tes4.png",
      socials: { linkedin: "#", instagram: "#", dribbble: "#" },
    },
    {
      name: "Emily Rodriguez",
      role: "Project Manager",
      bio: "Ensures seamless project execution and client satisfaction from start to finish.",
      image: "/test3.png",
      socials: { linkedin: "#", instagram: "#", twitter: "#" },
    },
    {
      name: "David Kim",
      role: "3D Visualization Specialist",
      bio: "Brings designs to life with stunning 3D renders and virtual walkthroughs.",
      image: "/tes4.png",
      socials: { linkedin: "#", instagram: "#", dribbble: "#" },
    },
    {
      name: "Lisa Thompson",
      role: "Client Relations Manager",
      bio: "Builds lasting relationships and ensures exceptional client experiences.",
      image: "/test3.png",
      socials: { linkedin: "#", instagram: "#", twitter: "#" },
    },
    {
      name: "James Wilson",
      role: "Technical Consultant",
      bio: "Provides expert technical guidance and ensures project feasibility.",
      image: "/tes4.png",
      socials: { linkedin: "#", instagram: "#", dribbble: "#" },
    },
  ];

  // Different items per page for different screen sizes
  const mobileItemsPerPage = 1;    // Mobile: 1 per slide
  const tabletItemsPerPage = 2;    // Tablet: 2 per slide  
  const desktopItemsPerPage = 3;   // Desktop: 3 per slide
  
  const getItemsPerPage = () => {
    if (isMobile) return mobileItemsPerPage;
    if (windowWidth < 1024) return tabletItemsPerPage; // lg breakpoint
    return desktopItemsPerPage;
  };
  
  const itemsPerPage = getItemsPerPage();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768); // md breakpoint (768px)
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset current index when screen size changes to prevent out-of-bounds
  useEffect(() => {
    const newTotalPages = Math.ceil(team.length / itemsPerPage);
    if (currentIndex >= newTotalPages) {
      setCurrentIndex(0);
    }
  }, [itemsPerPage, currentIndex, team.length]);
  
  const totalPages = Math.ceil(team.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handlePageChange = (page: number) => {
    setCurrentIndex(page - 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const startIndex = currentIndex * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeam = team.slice(startIndex, endIndex);

  return (
    <section id="OurTeam" className="pb-20 w-full relative z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <h2 className="text-center text-3xl font-bold sm:text-4xl font-montserrat tracking-tight mb-12" style={{ color: '#ec1e24' }}>
          OUR TEAM
        </h2>

        {/* Team Members Slider */}
        <div 
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalPages }, (_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full justify-end">
                  {team.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((member, idx) => (
                    <TeamMemberCard key={idx} {...member} idx={idx} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: Dot Indicators, Desktop: Pagination */}
        {totalPages > 1 && (
          <>
        {/* Mobile & Tablet - Dot Indicators */}
        <div className="flex justify-end gap-2 mt-12 lg:hidden">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-[#001F4B] dark:bg-[#ec1e24] scale-125"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        {/* Desktop - Pagination */}
        <div className="hidden lg:flex justify-end mt-12">
          <Pagination
            page={currentIndex + 1}
            setPage={handlePageChange}
            total={totalPages}
          />
        </div>
          </>
        )}
      </div>
    </section>
  );
}