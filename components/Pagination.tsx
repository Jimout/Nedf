"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

export default function Pagination({ page, setPage, total }: PaginationProps) {
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < total) setPage(page + 1);
  };

  return (
    <div className="flex justify-center sm:justify-end">
      <div className="flex items-center border shadow-sm overflow-hidden 2xl:border-2 3xl:border-2 4xl:border-2">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-3 sm:px-4 py-2 2xl:px-6 2xl:py-3 3xl:px-8 3xl:py-4 4xl:px-10 4xl:py-5 bg-white dark:bg-white/10 text-black dark:text-white/40 hover:bg-gray-100 dark:hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors`}
          aria-label="Previous page"
        >
          <ArrowLeft size={18} className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 4xl:w-8 4xl:h-8" />
        </button>

        {/* Page Indicator */}
        <span className="px-3 sm:px-4 py-2 text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-medium text-gray-700 dark:text-white/40 whitespace-nowrap 2xl:px-6 2xl:py-3 3xl:px-8 3xl:py-4 4xl:px-10 4xl:py-5">
          {page} of {total}
        </span>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={page === total}
          className={`px-3 sm:px-4 py-2 2xl:px-6 2xl:py-3 3xl:px-8 3xl:py-4 4xl:px-10 4xl:py-5 bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#001F4B]/80 dark:hover:bg-[#ec1e24]/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors`}
          aria-label="Next page"
        >
          <ArrowRight size={18} className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 4xl:w-8 4xl:h-8" />
        </button>
      </div>
    </div>
  );
}
