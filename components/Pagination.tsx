"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

const navButtonClass =
  "inline-flex items-center justify-center min-h-[44px] min-w-[44px] touch-manipulation select-none [-webkit-tap-highlight-color:transparent] [&_svg]:pointer-events-none transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed";

export default function Pagination({ page, setPage, total }: PaginationProps) {
  const handlePrev = () => {
    if (page > 1) setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    if (page < total) setPage((prev) => Math.min(total, prev + 1));
  };

  if (total <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="relative z-10 flex justify-center sm:justify-end touch-manipulation"
    >
      <div className="flex items-center border shadow-sm overflow-hidden 2xl:border-2 3xl:border-2 4xl:border-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={page === 1}
          className={`${navButtonClass} px-3 sm:px-4 py-2 2xl:px-6 2xl:py-3 3xl:px-8 3xl:py-4 4xl:px-10 4xl:py-5 bg-white dark:bg-white/10 text-black dark:text-white/40 hover:bg-gray-100 dark:hover:bg-white/20 active:bg-gray-200 dark:active:bg-white/30 disabled:hover:bg-white dark:disabled:hover:bg-white/10 disabled:active:bg-white dark:disabled:active:bg-white/10`}
          aria-label="Previous page"
        >
          <ArrowLeft size={18} className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 4xl:w-8 4xl:h-8" />
        </button>

        <span className="flex items-center min-h-[44px] px-3 sm:px-4 text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-medium text-gray-700 dark:text-white/40 whitespace-nowrap 2xl:px-6 3xl:px-8 4xl:px-10 select-none">
          {page} of {total}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={page === total}
          className={`${navButtonClass} px-3 sm:px-4 py-2 2xl:px-6 2xl:py-3 3xl:px-8 3xl:py-4 4xl:px-10 4xl:py-5 bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#001F4B]/80 dark:hover:bg-[#ec1e24]/80 active:bg-[#001F4B]/70 dark:active:bg-[#ec1e24]/70 disabled:hover:bg-[#001F4B] dark:disabled:hover:bg-[#ec1e24] disabled:active:bg-[#001F4B] dark:disabled:active:bg-[#ec1e24]`}
          aria-label="Next page"
        >
          <ArrowRight size={18} className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 4xl:w-8 4xl:h-8" />
        </button>
      </div>
    </nav>
  );
}
