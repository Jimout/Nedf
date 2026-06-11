"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

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
        <Button
          type="button"
          variant="paginationPrev"
          size="pagination"
          onClick={handlePrev}
          disabled={page === 1}
          aria-label="Previous page"
          className="[&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-5 sm:[&_svg]:h-5 2xl:[&_svg]:w-6 2xl:[&_svg]:h-6 3xl:[&_svg]:w-7 3xl:[&_svg]:h-7 4xl:[&_svg]:w-8 4xl:[&_svg]:h-8"
        >
          <ArrowLeft size={18} />
        </Button>

        <span className="flex items-center min-h-[44px] px-3 sm:px-4 text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-medium text-gray-700 dark:text-white/40 whitespace-nowrap 2xl:px-6 3xl:px-8 4xl:px-10 select-none">
          {page} of {total}
        </span>

        <Button
          type="button"
          variant="paginationNext"
          size="pagination"
          onClick={handleNext}
          disabled={page === total}
          aria-label="Next page"
          className="[&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-5 sm:[&_svg]:h-5 2xl:[&_svg]:w-6 2xl:[&_svg]:h-6 3xl:[&_svg]:w-7 3xl:[&_svg]:h-7 4xl:[&_svg]:w-8 4xl:[&_svg]:h-8"
        >
          <ArrowRight size={18} />
        </Button>
      </div>
    </nav>
  );
}
