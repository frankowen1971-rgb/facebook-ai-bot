"use client";

import { Search, MapPin, X } from "lucide-react";

type Props = {
  query: string;
  location: string;
  onQueryChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onSearch: () => void;
};

export default function SearchBar({ query, location, onQueryChange, onLocationChange, onSearch }: Props) {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md border border-[#E0E0E0] overflow-hidden">
      {/* Job title input */}
      <div className="flex items-center gap-3 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#E0E0E0]">
        <Search className="w-5 h-5 text-[#0A66C2] flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <label className="block text-[10px] font-semibold text-[#666666] uppercase tracking-wider mb-0.5">
            Job Title or Keyword
          </label>
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              placeholder="e.g. Software Engineer, Designer..."
              className="flex-1 text-sm text-black outline-none placeholder-[#999] bg-transparent"
            />
            {query && (
              <button onClick={() => onQueryChange("")} className="text-[#999] hover:text-black">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Location input */}
      <div className="flex items-center gap-3 flex-1 px-4 py-3">
        <MapPin className="w-5 h-5 text-[#0A66C2] flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <label className="block text-[10px] font-semibold text-[#666666] uppercase tracking-wider mb-0.5">
            Location
          </label>
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              placeholder="City, country, or Remote..."
              className="flex-1 text-sm text-black outline-none placeholder-[#999] bg-transparent"
            />
            {location && (
              <button onClick={() => onLocationChange("")} className="text-[#999] hover:text-black">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search button */}
      <div className="px-3 py-2 flex items-center">
        <button
          onClick={onSearch}
          className="w-full sm:w-auto bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Search className="w-4 h-4" />
          Search Jobs
        </button>
      </div>
    </div>
  );
}
