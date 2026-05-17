import Link from "next/link";
import { MapPin, Clock, DollarSign, Star, ExternalLink } from "lucide-react";
import type { Job } from "@/lib/jobs";

const TYPE_COLORS: Record<string, string> = {
  "Full-time": "bg-green-100 text-green-800",
  "Part-time": "bg-yellow-100 text-yellow-800",
  Remote: "bg-blue-100 text-blue-800",
  Contract: "bg-purple-100 text-purple-800",
  Internship: "bg-orange-100 text-orange-800",
};

const LOGO_COLORS = [
  "bg-blue-500", "bg-green-500", "bg-purple-500",
  "bg-red-500", "bg-orange-500", "bg-teal-500",
  "bg-pink-500", "bg-indigo-500",
];

function daysAgo(dateStr: string): string {
  const diff = Math.floor(
    (new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "আজ";
  if (diff === 1) return "গতকাল";
  return `${diff} দিন আগে`;
}

export default function JobCard({ job }: { job: Job }) {
  const logoColor = LOGO_COLORS[parseInt(job.id) % LOGO_COLORS.length];

  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <div className={`bg-white rounded-xl border ${job.featured ? "border-blue-200 shadow-md" : "border-gray-200 shadow-sm"} p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-200 h-full`}>
        {job.featured && (
          <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold mb-2">
            <Star className="w-3 h-3 fill-amber-400" />
            ফিচার্ড
          </div>
        )}

        <div className="flex items-start gap-3 mb-3">
          <div className={`${logoColor} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
            {job.companyLogo}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${TYPE_COLORS[job.type] ?? "bg-gray-100 text-gray-700"}`}>
            {job.type}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {job.category}
          </span>
        </div>

        <div className="space-y-1 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{job.salary}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            {daysAgo(job.postedAt)}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <ExternalLink className="w-3 h-3" />
            {job.source}
          </div>
        </div>
      </div>
    </Link>
  );
}
