"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-[#666] hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-[#E0E0E0]"
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="px-3 py-2 text-sm text-[#999]">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
              currentPage === page
                ? "bg-[#0A66C2] text-white"
                : "text-[#666] hover:bg-white hover:text-black border border-transparent hover:border-[#E0E0E0]"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-[#666] hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-[#E0E0E0]"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
