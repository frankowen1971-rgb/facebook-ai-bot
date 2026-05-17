"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Clock, Users, Bookmark, BookmarkCheck, ArrowUpRight } from "lucide-react";
import type { Job } from "@/lib/jobs";
import { formatSalary, timeAgo } from "@/lib/jobs";

const TYPE_STYLES: Record<string, string> = {
  "Full-time": "bg-blue-50 text-blue-700 border-blue-100",
  "Part-time": "bg-amber-50 text-amber-700 border-amber-100",
  Remote: "bg-teal-50 text-teal-700 border-teal-100",
  Contract: "bg-purple-50 text-purple-700 border-purple-100",
  Internship: "bg-orange-50 text-orange-700 border-orange-100",
};

export default function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="bg-white border border-[#E0E0E0] rounded-xl p-5 hover:shadow-md hover:border-[#0A66C2]/30 transition-all duration-200 group relative">
      {/* Save button */}
      <button
        onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
        aria-label={saved ? "Unsave job" : "Save job"}
        className="absolute top-4 right-4 p-1.5 rounded-full text-[#666] hover:text-[#0A66C2] hover:bg-blue-50 transition-colors z-10"
      >
        {saved
          ? <BookmarkCheck className="w-5 h-5 text-[#0A66C2]" />
          : <Bookmark className="w-5 h-5" />
        }
      </button>

      <div className="flex gap-4">
        {/* Company logo */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ring-2 ring-white shadow-sm"
          style={{ backgroundColor: job.companyColor }}
        >
          {job.companyInitial}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-6">
          {/* Title */}
          <Link href={`/jobs/${job.id}`} className="group/title">
            <h2 className="font-bold text-[18px] text-black leading-snug group-hover/title:text-[#0A66C2] transition-colors line-clamp-1 pr-2">
              {job.title}
            </h2>
          </Link>

          {/* Company */}
          <p className="text-[15px] text-[#333] font-medium mt-0.5">{job.company}</p>

          {/* Location + posted */}
          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-[#666]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
              {timeAgo(job.postedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 flex-shrink-0" />
              {job.applicants} applicants
            </span>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mt-3">
            {/* Job type */}
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${TYPE_STYLES[job.type] ?? "bg-gray-50 text-gray-700 border-gray-100"}`}>
              {job.type}
            </span>

            {/* Salary */}
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-[#057642] border border-emerald-100">
              {formatSalary(job)}
            </span>

            {/* Category */}
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-50 text-[#666] border border-[#E0E0E0]">
              {job.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#666] mt-3 line-clamp-2 leading-relaxed">
            {job.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F3F2EF]">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#999] font-medium">via {job.source}</span>
              {job.featured && (
                <span className="text-xs font-semibold text-[#0A66C2] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  Featured
                </span>
              )}
            </div>

            <Link
              href={`/jobs/${job.id}`}
              className="flex items-center gap-1.5 bg-[#057642] hover:bg-[#046236] text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
            >
              Apply Now
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
