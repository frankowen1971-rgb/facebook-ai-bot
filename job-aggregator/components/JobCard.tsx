"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Clock, Bookmark, BookmarkCheck, ArrowUpRight, DollarSign, Tag } from "lucide-react";
import type { NormalizedJob, JobSalary } from "@/lib/types";

const TYPE_STYLES: Record<string, string> = {
  "full-time":  "bg-blue-50 text-blue-700 border-blue-100",
  "part-time":  "bg-amber-50 text-amber-700 border-amber-100",
  "remote":     "bg-teal-50 text-teal-700 border-teal-100",
  "contract":   "bg-purple-50 text-purple-700 border-purple-100",
  "internship": "bg-orange-50 text-orange-700 border-orange-100",
};

const SOURCE_COLORS: Record<string, string> = {
  remotive:       "#00C040",
  arbeitnow:      "#7C3AED",
  remoteok:       "#000000",
  himalayas:      "#0EA5E9",
  weworkremotely: "#1E88E5",
  greenhouse:     "#24A148",
  lever:          "#0D6EFD",
  ashby:          "#FF6B35",
  workable:       "#2196F3",
  themuse:        "#E91E8C",
  jsearch:        "#FF6900",
  findwork:       "#009688",
  adzuna:         "#E84142",
  jooble:         "#1565C0",
  usajobs:        "#003366",
  "bd-govt":      "#006A4E",
  "bd-private":   "#F42A41",
  bpsc:           "#006A4E",
  teletalk:       "#D7242A",
  mopa:           "#1B5E20",
  bdjobstoday:    "#F42A41",
  ejobscircular:  "#FF5722",
};

function formatSalary(sal: JobSalary): string {
  const fmt = (n: number, cur: string) => {
    if (cur === "BDT") return `৳${Math.round(n / 1000)}k`;
    const sym = cur === "GBP" ? "£" : cur === "EUR" ? "€" : "$";
    return n >= 1000 ? `${sym}${Math.round(n / 1000)}k` : `${sym}${n}`;
  };
  return `${fmt(sal.min, sal.currency)} – ${fmt(sal.max, sal.currency)}`;
}

function timeAgo(date: Date | string): string {
  const d = new Date(date);
  const diff = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return `${Math.floor(diff / 30)}mo ago`;
}

function CompanyAvatar({ job }: { job: NormalizedJob }) {
  const [imgError, setImgError] = useState(false);
  const color = SOURCE_COLORS[job.source] ?? "#0A66C2";
  const initials = job.company.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");

  if (job.companyLogo && !imgError) {
    return (
      <img
        src={job.companyLogo}
        alt={job.company}
        onError={() => setImgError(true)}
        className="w-14 h-14 rounded-full object-contain border border-[#E0E0E0] bg-white flex-shrink-0"
      />
    );
  }
  return (
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ring-2 ring-white shadow-sm"
      style={{ backgroundColor: color }}
    >
      {initials || "?"}
    </div>
  );
}

export default function JobCard({ job }: { job: NormalizedJob }) {
  const [saved, setSaved] = useState(false);
  const typeStyle = TYPE_STYLES[job.type] ?? "bg-gray-50 text-gray-700 border-gray-100";
  const sourceColor = SOURCE_COLORS[job.source] ?? "#666";

  return (
    <article className="bg-white border border-[#E0E0E0] rounded-xl p-5 hover:shadow-md hover:border-[#0A66C2]/30 transition-all duration-200 group relative">
      {/* Save */}
      <button
        onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
        aria-label={saved ? "Unsave" : "Save"}
        className="absolute top-4 right-4 p-1.5 rounded-full text-[#aaa] hover:text-[#0A66C2] hover:bg-blue-50 transition-colors z-10"
      >
        {saved ? <BookmarkCheck className="w-5 h-5 text-[#0A66C2]" /> : <Bookmark className="w-5 h-5" />}
      </button>

      <div className="flex gap-4">
        <CompanyAvatar job={job} />

        <div className="flex-1 min-w-0 pr-6">
          {/* Title */}
          <Link href={job.url} target="_blank" rel="noopener noreferrer" className="group/title">
            <h2 className="font-bold text-[17px] text-black leading-snug group-hover/title:text-[#0A66C2] transition-colors line-clamp-1">
              {job.title}
            </h2>
          </Link>

          {/* Company + location */}
          <p className="text-[14px] text-[#333] font-medium mt-0.5">{job.company}</p>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-[#666]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 flex-shrink-0" />
              {timeAgo(job.postedAt)}
            </span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${typeStyle} capitalize`}>
              {job.type}
            </span>
            {job.salary && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-[#057642] border border-emerald-100 flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {formatSalary(job.salary)}
              </span>
            )}
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-50 text-[#666] border border-[#E0E0E0] flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {job.category}
            </span>
            {job.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-[#888] border border-[#E0E0E0]">
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-xs text-[#666] mt-2.5 line-clamp-2 leading-relaxed">
            {job.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F3F2EF]">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ color: sourceColor, backgroundColor: `${sourceColor}15`, border: `1px solid ${sourceColor}30` }}
            >
              {job.sourceLabel}
            </span>
            <Link
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#057642] hover:bg-[#046236] text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors"
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
