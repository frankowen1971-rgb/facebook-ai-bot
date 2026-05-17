"use client";

import { JOB_CATEGORIES, JOB_TYPES, JOBS } from "@/lib/jobs";
import { SlidersHorizontal, X } from "lucide-react";

type Props = {
  selectedCategory: string;
  selectedType: string;
  onCategoryChange: (c: string) => void;
  onTypeChange: (t: string) => void;
};

function countByCategory(cat: string) {
  return JOBS.filter((j) => j.category === cat).length;
}

function countByType(type: string) {
  return JOBS.filter((j) => j.type === type).length;
}

const hasFilters = (cat: string, type: string) => cat !== "" || type !== "";

export default function FilterPanel({ selectedCategory, selectedType, onCategoryChange, onTypeChange }: Props) {
  return (
    <aside className="bg-white border border-[#E0E0E0] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E0E0E0]">
        <div className="flex items-center gap-2 text-sm font-semibold text-black">
          <SlidersHorizontal className="w-4 h-4 text-[#0A66C2]" />
          Filters
        </div>
        {hasFilters(selectedCategory, selectedType) && (
          <button
            onClick={() => { onCategoryChange(""); onTypeChange(""); }}
            className="flex items-center gap-1 text-xs text-[#0A66C2] font-semibold hover:underline"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Job Type */}
      <div className="px-4 py-4 border-b border-[#E0E0E0]">
        <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3">Job Type</h3>
        <div className="space-y-2">
          {JOB_TYPES.map((type) => (
            <label key={type} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <div
                  onClick={() => onTypeChange(selectedType === type ? "" : type)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                    selectedType === type
                      ? "bg-[#0A66C2] border-[#0A66C2]"
                      : "border-[#999] group-hover:border-[#0A66C2]"
                  }`}
                >
                  {selectedType === type && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-[#333] group-hover:text-black font-medium">{type}</span>
              </div>
              <span className="text-xs text-[#999] font-medium tabular-nums">{countByType(type)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="px-4 py-4">
        <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-2">
          {JOB_CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <div
                  onClick={() => onCategoryChange(selectedCategory === cat ? "" : cat)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#0A66C2] border-[#0A66C2]"
                      : "border-[#999] group-hover:border-[#0A66C2]"
                  }`}
                >
                  {selectedCategory === cat && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-[#333] group-hover:text-black font-medium">{cat}</span>
              </div>
              <span className="text-xs text-[#999] font-medium tabular-nums">{countByCategory(cat)}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
