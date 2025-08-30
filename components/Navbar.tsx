'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Team', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full ">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto py-2 px-4 md:px-[122px] -mt-[30px]">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/nedf-logo.png"
            alt="NEDF Studios Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex ml-8 space-x-[80px] text-m font-medium max-w-[700px] flex-grow">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'transition duration-300 ease-in-out pb-1 whitespace-nowrap',
                  isActive
                    ? 'text-[#001F4B] underline underline-offset-4 decoration-[#001F4B]'
                    : 'text-[#333333] hover:text-[#003366] hover:scale-105'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Hamburger button with spin+scale animation */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden ml-4 relative w-8 h-8 flex items-center justify-center focus:outline-none"
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#001F4B"
            strokeWidth={1.5}
            className={cn(
              'absolute w-6 h-6 transition-transform duration-500 ease-in-out',
              isOpen
                ? 'opacity-0 scale-50 rotate-180 pointer-events-none'
                : 'opacity-100 scale-100 rotate-0'
            )}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          {/* X icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#001F4B"
            strokeWidth={1.5}
            className={cn(
              'absolute w-6 h-6 transition-transform duration-500 ease-in-out',
              isOpen
                ? 'opacity-100 scale-100 rotate-0'
                : 'opacity-0 scale-50 -rotate-180 pointer-events-none'
            )}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 border-t border-gray-200 bg-white max-w-[1280px] mx-auto flex flex-col items-center space-y-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block transition duration-300 ease-in-out pb-1 text-[#333333] text-center',
                  isActive
                    ? 'underline underline-offset-4 decoration-[#001F4B]'
                    : 'hover:text-[#003366] hover:scale-105'
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
