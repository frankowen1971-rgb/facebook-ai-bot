"use client";

import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/jobs";

type Props = {
  selectedCategory: string;
  selectedType: string;
  onCategoryChange: (c: string) => void;
  onTypeChange: (t: string) => void;
};

export default function FilterPanel({
  selectedCategory,
  selectedType,
  onCategoryChange,
  onTypeChange,
}: Props) {
  return (
    <aside className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-6 h-fit">
      <div>
        <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
          ক্যাটাগরি
        </h3>
        <div className="space-y-1">
          {JOB_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {cat === "All" ? "সব ক্যাটাগরি" : cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
          চাকরির ধরন
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => onTypeChange("")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === ""
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            সব ধরন
          </button>
          {JOB_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === type
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {(selectedCategory !== "All" || selectedType !== "") && (
        <button
          onClick={() => {
            onCategoryChange("All");
            onTypeChange("");
          }}
          className="w-full text-center text-sm text-red-500 hover:text-red-700 font-medium py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          ফিল্টার রিসেট করুন
        </button>
      )}
    </aside>
  );
}
