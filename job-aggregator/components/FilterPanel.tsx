"use client";

import type { NormalizedJob, SourceResult } from "@/lib/types";
import { SlidersHorizontal, X } from "lucide-react";

const JOB_TYPES = ["full-time", "part-time", "contract", "internship", "remote"] as const;

const CATEGORIES = [
  "Engineering", "Design", "Marketing", "Finance", "Data Science",
  "Product", "Sales", "Operations", "Healthcare", "Customer Success",
  "HR", "Legal", "Government", "Other",
];

const COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "BD", label: "Bangladesh" },
  { code: "IN", label: "India" },
  { code: "CA", label: "Canada" },
  { code: "DE", label: "Germany" },
];

type Props = {
  selectedCategory: string;
  selectedType: string;
  selectedSource: string;
  selectedCountry: string;
  sourceStats: SourceResult[];
  allJobs: NormalizedJob[];
  onCategoryChange: (c: string) => void;
  onTypeChange: (t: string) => void;
  onSourceChange: (s: string) => void;
  onCountryChange: (c: string) => void;
};

function CheckRow({
  label,
  count,
  checked,
  onClick,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer group py-0.5">
      <div className="flex items-center gap-2.5">
        <div
          onClick={onClick}
          className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ${
            checked ? "bg-[#0A66C2] border-[#0A66C2]" : "border-[#999] group-hover:border-[#0A66C2]"
          }`}
        >
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className="text-sm text-[#333] group-hover:text-black font-medium capitalize">{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-[#999] font-medium tabular-nums">{count}</span>
      )}
    </label>
  );
}

export default function FilterPanel({
  selectedCategory, selectedType, selectedSource, selectedCountry,
  sourceStats, allJobs,
  onCategoryChange, onTypeChange, onSourceChange, onCountryChange,
}: Props) {
  const hasFilters = selectedCategory || selectedType || selectedSource || selectedCountry;

  function countType(t: string) { return allJobs.filter((j) => j.type === t).length; }
  function countCat(c: string)  { return allJobs.filter((j) => j.category === c).length; }
  function countCountry(c: string) { return allJobs.filter((j) => j.country === c).length; }

  const activeSources = sourceStats.filter((s) => s.count > 0);

  return (
    <aside className="bg-white border border-[#E0E0E0] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E0E0E0]">
        <div className="flex items-center gap-2 text-sm font-semibold text-black">
          <SlidersHorizontal className="w-4 h-4 text-[#0A66C2]" />
          Filters
        </div>
        {hasFilters && (
          <button
            onClick={() => { onCategoryChange(""); onTypeChange(""); onSourceChange(""); onCountryChange(""); }}
            className="flex items-center gap-1 text-xs text-[#0A66C2] font-semibold hover:underline"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Job Type */}
      <div className="px-4 py-4 border-b border-[#E0E0E0]">
        <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3">Job Type</h3>
        <div className="space-y-1">
          {JOB_TYPES.map((t) => (
            <CheckRow
              key={t}
              label={t}
              count={countType(t)}
              checked={selectedType === t}
              onClick={() => onTypeChange(selectedType === t ? "" : t)}
            />
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="px-4 py-4 border-b border-[#E0E0E0]">
        <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
          {CATEGORIES.filter((c) => countCat(c) > 0).map((cat) => (
            <CheckRow
              key={cat}
              label={cat}
              count={countCat(cat)}
              checked={selectedCategory === cat}
              onClick={() => onCategoryChange(selectedCategory === cat ? "" : cat)}
            />
          ))}
        </div>
      </div>

      {/* Source */}
      {activeSources.length > 0 && (
        <div className="px-4 py-4 border-b border-[#E0E0E0]">
          <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3">Source</h3>
          <div className="space-y-1">
            {activeSources.map((s) => (
              <CheckRow
                key={s.source}
                label={s.label}
                count={s.count}
                checked={selectedSource === s.source}
                onClick={() => onSourceChange(selectedSource === s.source ? "" : s.source)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Country */}
      <div className="px-4 py-4">
        <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3">Country</h3>
        <div className="space-y-1">
          {COUNTRIES.filter((c) => countCountry(c.code) > 0).map((c) => (
            <CheckRow
              key={c.code}
              label={c.label}
              count={countCountry(c.code)}
              checked={selectedCountry === c.code}
              onClick={() => onCountryChange(selectedCountry === c.code ? "" : c.code)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
