// components/SplashScreen.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <div className="mb-6">
        <Image src="/nedf-logo.png" alt="NEDF Logo" width={120} height={40} priority />
      </div>

      {/* Spinner */}
      <svg
        className="animate-spin h-10 w-10 text-[#001F4B]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="#001F4B"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="#001F4B"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    </div>
  );
}
