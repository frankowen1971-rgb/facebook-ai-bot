"use client";

import { Search, MapPin, X } from "lucide-react";

type Props = {
  query: string;
  location: string;
  onQueryChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onSearch: () => void;
};

export default function SearchBar({
  query,
  location,
  onQueryChange,
  onLocationChange,
  onSearch,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 flex flex-col sm:flex-row gap-2">
      <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-gray-50 rounded-xl">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="চাকরির নাম বা কোম্পানি..."
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
        />
        {query && (
          <button onClick={() => onQueryChange("")}>
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-gray-50 rounded-xl sm:border-l sm:border-gray-200">
        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="শহর বা জেলা (যেমন: ঢাকা)"
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
        />
        {location && (
          <button onClick={() => onLocationChange("")}>
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <button
        onClick={onSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 justify-center"
      >
        <Search className="w-4 h-4" />
        খুঁজুন
      </button>
    </div>
  );
}
