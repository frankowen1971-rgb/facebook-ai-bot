"use client";

import { useState, useMemo, useEffect } from "react";
import { JOBS, getJobs } from "@/lib/jobs";
import JobCard from "@/components/JobCard";
import JobSkeleton from "@/components/JobSkeleton";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import Pagination from "@/components/Pagination";
import Navbar from "@/components/Navbar";
import { Briefcase, TrendingUp, Building2, Globe2, SearchX, ArrowRight } from "lucide-react";

const JOBS_PER_PAGE = 5;

const QUICK_FILTERS = ["Remote", "Full-time", "Internship", "Engineering", "Design", "Marketing"];

export default function JobBoard() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const jobs = useMemo(
    () => getJobs({ search: activeQuery, category, type, location: activeLocation }),
    [activeQuery, category, type, activeLocation]
  );

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const paginatedJobs = jobs.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE);

  function handleSearch() {
    setLoading(true);
    setActiveQuery(query);
    setActiveLocation(location);
    setPage(1);
    setTimeout(() => setLoading(false), 600);
  }

  function handleQuickFilter(filter: string) {
    const isType = ["Remote", "Full-time", "Part-time", "Contract", "Internship"].includes(filter);
    if (isType) {
      setType((prev) => (prev === filter ? "" : filter));
    } else {
      setCategory((prev) => (prev === filter ? "" : filter));
    }
    setPage(1);
  }

  useEffect(() => { setPage(1); }, [category, type]);

  const stats = useMemo(() => ({
    total: JOBS.length,
    companies: new Set(JOBS.map((j) => j.company)).size,
    remote: JOBS.filter((j) => j.type === "Remote").length,
  }), []);

  const isFiltered = activeQuery || activeLocation || category || type;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-[#F3F2EF] border-b border-[#E0E0E0] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#0A66C2] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <TrendingUp className="w-3.5 h-3.5" />
            {stats.total} new jobs added this week
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-black leading-tight tracking-tight mb-3">
            Find your next{" "}
            <span className="text-[#0A66C2]">opportunity</span>
          </h1>
          <p className="text-[#666] text-lg">
            Jobs from Grameenphone, bKash, Google, Microsoft and top companies — all in one place.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-3xl mx-auto mb-6">
          <SearchBar
            query={query}
            location={location}
            onQueryChange={setQuery}
            onLocationChange={setLocation}
            onSearch={handleSearch}
          />
        </div>

        {/* Quick filters */}
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2">
          {QUICK_FILTERS.map((f) => {
            const active = type === f || category === f;
            return (
              <button
                key={f}
                onClick={() => handleQuickFilter(f)}
                className={`text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
                  active
                    ? "bg-[#0A66C2] text-white border-[#0A66C2]"
                    : "bg-white text-[#333] border-[#E0E0E0] hover:border-[#0A66C2] hover:text-[#0A66C2]"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="max-w-xl mx-auto grid grid-cols-3 gap-4 mt-8">
          {[
            { icon: Briefcase, value: `${stats.total}+`, label: "Active Jobs" },
            { icon: Building2, value: `${stats.companies}+`, label: "Companies" },
            { icon: Globe2, value: `${stats.remote}+`, label: "Remote Jobs" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-xl font-bold text-black mb-0.5">
                <Icon className="w-4 h-4 text-[#0A66C2]" />
                {value}
              </div>
              <p className="text-xs text-[#666]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Jobs column */}
          <div className="flex-1 min-w-0">
            {/* Result header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-black">
                  {isFiltered
                    ? `${jobs.length} result${jobs.length !== 1 ? "s" : ""} found`
                    : "All Jobs"}
                </h2>
                {isFiltered && (
                  <p className="text-xs text-[#666] mt-0.5">
                    Showing {Math.min((page - 1) * JOBS_PER_PAGE + 1, jobs.length)}–{Math.min(page * JOBS_PER_PAGE, jobs.length)} of {jobs.length}
                  </p>
                )}
              </div>
              {isFiltered && (
                <button
                  onClick={() => {
                    setQuery(""); setLocation(""); setActiveQuery(""); setActiveLocation("");
                    setCategory(""); setType(""); setPage(1);
                  }}
                  className="text-xs text-[#0A66C2] font-semibold hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Loading skeletons */}
            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => <JobSkeleton key={i} />)}
              </div>
            )}

            {/* Empty state */}
            {!loading && jobs.length === 0 && (
              <div className="bg-white border border-[#E0E0E0] rounded-xl py-16 px-6 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchX className="w-8 h-8 text-[#0A66C2]" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">No jobs found</h3>
                <p className="text-sm text-[#666] max-w-xs mx-auto mb-6">
                  Try different keywords or remove some filters to see more results.
                </p>
                <button
                  onClick={() => {
                    setQuery(""); setLocation(""); setActiveQuery(""); setActiveLocation("");
                    setCategory(""); setType(""); setPage(1);
                  }}
                  className="inline-flex items-center gap-2 bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#004182] transition-colors"
                >
                  View all jobs
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Job list */}
            {!loading && jobs.length > 0 && (
              <>
                <div className="space-y-3">
                  {paginatedJobs.map((job) => <JobCard key={job.id} job={job} />)}
                </div>
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-20">
              <FilterPanel
                selectedCategory={category}
                selectedType={type}
                onCategoryChange={setCategory}
                onTypeChange={setType}
              />

              {/* CTA Card */}
              <div className="mt-4 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-xl p-5 text-white">
                <h3 className="font-bold text-base mb-1">Post a Job</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Reach thousands of qualified candidates.
                </p>
                <button className="w-full bg-white text-[#0A66C2] text-sm font-bold py-2 rounded-full hover:bg-blue-50 transition-colors">
                  Get Started →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E0E0E0] bg-white mt-12 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0A66C2] rounded flex items-center justify-center">
              <Briefcase className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm text-black">JobBoardBD</span>
          </div>
          <p className="text-xs text-[#666]">
            Jobs sourced from LinkedIn · Bdjobs · Indeed · Glassdoor
          </p>
          <p className="text-xs text-[#999]">© 2026 JobBoardBD. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
