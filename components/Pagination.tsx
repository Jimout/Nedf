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
    <div className="flex justify-end">
      <div className="flex items-center border shadow-sm overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-2 bg-white text-black hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <ArrowLeft size={18} />
        </button>

        {/* Page Indicator */}
        <span className="px-4 py-2 text-sm font-medium text-gray-700">
          {page} of {total}
        </span>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={page === total}
          className={`px-4 py-2 bg-[#001F4B] text-white hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
