import { getJobById, JOBS, formatSalary, timeAgo } from "@/lib/jobs";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  MapPin, Clock, Users, DollarSign, Calendar, Building2,
  CheckCircle2, ArrowLeft, ExternalLink, Bookmark, Share2, Tag,
} from "lucide-react";

export async function generateStaticParams() {
  return JOBS.map((j) => ({ id: j.id }));
}

const TYPE_STYLES: Record<string, string> = {
  "Full-time": "bg-blue-50 text-blue-700 border-blue-100",
  "Part-time": "bg-amber-50 text-amber-700 border-amber-100",
  Remote: "bg-teal-50 text-teal-700 border-teal-100",
  Contract: "bg-purple-50 text-purple-700 border-purple-100",
  Internship: "bg-orange-50 text-orange-700 border-orange-100",
};

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = getJobById(params.id);
  if (!job) notFound();

  const typeStyle = TYPE_STYLES[job.type] ?? "bg-gray-50 text-gray-700 border-gray-100";
  const isExpired = new Date(job.deadline) < new Date();

  const related = JOBS.filter((j) => j.category === job.category && j.id !== job.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#666] hover:text-[#0A66C2] mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Jobs
        </Link>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Header card */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6">
              <div className="flex items-start gap-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ring-2 ring-white shadow"
                  style={{ backgroundColor: job.companyColor }}
                >
                  {job.companyInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-black leading-tight">{job.title}</h1>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Building2 className="w-4 h-4 text-[#666]" />
                    <span className="text-base font-semibold text-[#333]">{job.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-[#666]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {timeAgo(job.postedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {job.applicants} applicants
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${typeStyle}`}>
                  {job.type}
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-[#057642] border border-emerald-100">
                  {formatSalary(job)} / month
                </span>
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-50 text-[#666] border border-[#E0E0E0] flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {job.category}
                </span>
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-50 text-[#666] border border-[#E0E0E0] flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" /> {job.source}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-5 pt-5 border-t border-[#F3F2EF]">
                {isExpired ? (
                  <div className="flex-1 text-center py-2.5 bg-gray-100 rounded-lg text-sm font-semibold text-gray-500">
                    Application Closed
                  </div>
                ) : (
                  <a
                    href={`#`}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#057642] hover:bg-[#046236] text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Apply Now on {job.source}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[#0A66C2] text-[#0A66C2] font-semibold rounded-lg hover:bg-blue-50 transition-colors text-sm">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[#E0E0E0] text-[#666] font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Description card */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6">
              <h2 className="text-base font-bold text-black mb-3">About the Role</h2>
              <p className="text-[15px] text-[#333] leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6">
              <h2 className="text-base font-bold text-black mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-[#333]">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#057642] flex-shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6">
              <h2 className="text-base font-bold text-black mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-[#333]">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#0A66C2] flex-shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0 space-y-4">
            {/* Job overview */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-5">
              <h3 className="text-sm font-bold text-black mb-4">Job Overview</h3>
              <div className="space-y-4">
                {[
                  { icon: DollarSign, label: "Salary", value: `${formatSalary(job)} / month` },
                  { icon: MapPin, label: "Location", value: job.location },
                  { icon: Clock, label: "Posted", value: timeAgo(job.postedAt) },
                  {
                    icon: Calendar,
                    label: "Deadline",
                    value: isExpired ? "Expired" : job.deadline,
                    danger: isExpired,
                  },
                  { icon: Users, label: "Applicants", value: `${job.applicants} people applied` },
                  { icon: ExternalLink, label: "Source", value: job.source },
                ].map(({ icon: Icon, label, value, danger }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#F3F2EF] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#0A66C2]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#999] font-medium">{label}</p>
                      <p className={`text-sm font-semibold ${danger ? "text-red-600" : "text-[#333]"}`}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related jobs */}
            {related.length > 0 && (
              <div className="bg-white border border-[#E0E0E0] rounded-xl p-5">
                <h3 className="text-sm font-bold text-black mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {related.map((j) => (
                    <Link key={j.id} href={`/jobs/${j.id}`} className="flex items-start gap-3 group">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: j.companyColor }}
                      >
                        {j.companyInitial}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-black group-hover:text-[#0A66C2] transition-colors leading-snug">
                          {j.title}
                        </p>
                        <p className="text-xs text-[#666]">{j.company}</p>
                        <p className="text-xs text-[#999] mt-0.5">{formatSalary(j)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="border-t border-[#E0E0E0] bg-white mt-12 py-6 px-4 text-center">
        <p className="text-xs text-[#999]">© 2026 JobBoardBD · Jobs from LinkedIn, Bdjobs, Indeed, Glassdoor</p>
      </footer>
    </>
  );
}
