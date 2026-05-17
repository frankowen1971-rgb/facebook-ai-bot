import { getJobById, JOBS } from "@/lib/jobs";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Building2,
  CheckCircle2,
  Tag,
} from "lucide-react";

export async function generateStaticParams() {
  return JOBS.map((j) => ({ id: j.id }));
}

const TYPE_COLORS: Record<string, string> = {
  "Full-time": "bg-green-100 text-green-800 border-green-200",
  "Part-time": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Remote: "bg-blue-100 text-blue-800 border-blue-200",
  Contract: "bg-purple-100 text-purple-800 border-purple-200",
  Internship: "bg-orange-100 text-orange-800 border-orange-200",
};

const LOGO_COLORS = [
  "bg-blue-500", "bg-green-500", "bg-purple-500",
  "bg-red-500", "bg-orange-500", "bg-teal-500",
  "bg-pink-500", "bg-indigo-500",
];

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = getJobById(params.id);
  if (!job) notFound();

  const logoColor = LOGO_COLORS[parseInt(job.id) % LOGO_COLORS.length];
  const typeStyle = TYPE_COLORS[job.type] ?? "bg-gray-100 text-gray-700 border-gray-200";

  const deadlineDate = new Date(job.deadline);
  const isExpired = deadlineDate < new Date();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        সব চাকরি দেখুন
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white">
          <div className="flex items-start gap-5">
            <div className={`${logoColor} w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg`}>
              {job.companyLogo}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">{job.title}</h1>
              <div className="flex items-center gap-2 text-blue-100">
                <Building2 className="w-4 h-4" />
                <span className="font-medium">{job.company}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Meta badges */}
        <div className="px-8 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${typeStyle}`}>
            {job.type}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
            <Tag className="w-3.5 h-3.5" />
            {job.category}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
            <ExternalLink className="w-3.5 h-3.5" />
            {job.source}
          </span>
        </div>

        <div className="px-8 py-8">
          {/* Quick info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">অবস্থান</span>
              </div>
              <p className="text-gray-800 font-medium text-sm">{job.location}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">বেতন</span>
              </div>
              <p className="text-gray-800 font-medium text-sm">{job.salary}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">পোস্ট তারিখ</span>
              </div>
              <p className="text-gray-800 font-medium text-sm">{job.postedAt}</p>
            </div>
            <div className={`${isExpired ? "bg-red-50" : "bg-orange-50"} rounded-xl p-4`}>
              <div className={`flex items-center gap-2 ${isExpired ? "text-red-600" : "text-orange-600"} mb-1`}>
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">ডেডলাইন</span>
              </div>
              <p className={`${isExpired ? "text-red-700" : "text-gray-800"} font-medium text-sm`}>
                {isExpired ? "মেয়াদ শেষ" : job.deadline}
              </p>
            </div>
          </div>

          {/* Description */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
              চাকরির বিবরণ
            </h2>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </section>

          {/* Responsibilities */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-green-600 rounded-full inline-block" />
              দায়িত্বসমূহ
            </h2>
            <ul className="space-y-2">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-purple-600 rounded-full inline-block" />
              যোগ্যতা ও প্রয়োজনীয়তা
            </h2>
            <ul className="space-y-2">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          {/* Apply CTA */}
          <div className="border-t border-gray-200 pt-6">
            {isExpired ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-600 font-semibold">এই চাকরির আবেদনের সময় শেষ হয়ে গেছে</p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={job.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {job.source}-এ আবেদন করুন
                </a>
                <Link
                  href="/"
                  className="px-6 py-3.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium text-center transition-colors"
                >
                  অন্য চাকরি দেখুন
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
