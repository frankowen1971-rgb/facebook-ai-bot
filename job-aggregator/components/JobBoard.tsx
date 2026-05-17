"use client";

import { useState, useMemo } from "react";
import { JOBS, getJobs } from "@/lib/jobs";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import { Briefcase, TrendingUp } from "lucide-react";

export default function JobBoard() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("");

  const jobs = useMemo(
    () =>
      getJobs({
        search: activeQuery,
        category,
        type,
        location: activeLocation,
      }),
    [activeQuery, category, type, activeLocation]
  );

  const stats = useMemo(() => {
    const companies = new Set(JOBS.map((j) => j.company)).size;
    const remoteCount = JOBS.filter((j) => j.type === "Remote").length;
    return { total: JOBS.length, companies, remote: remoteCount };
  }, []);

  function handleSearch() {
    setActiveQuery(query);
    setActiveLocation(location);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="flex justify-center mb-4">
            <span className="bg-blue-500/30 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              বাংলাদেশের সেরা জব পোর্টাল
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            আপনার স্বপ্নের চাকরি<br />
            <span className="text-blue-200">এখানেই খুঁজুন</span>
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            LinkedIn, Bdjobs, Indeed, Glassdoor-সহ সকল প্ল্যাটফর্মের চাকরি একসাথে
          </p>
          <SearchBar
            query={query}
            location={location}
            onQueryChange={setQuery}
            onLocationChange={setLocation}
            onSearch={handleSearch}
          />
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur rounded-xl py-4">
            <p className="text-2xl font-bold">{stats.total}+</p>
            <p className="text-blue-200 text-sm">সক্রিয় চাকরি</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl py-4">
            <p className="text-2xl font-bold">{stats.companies}+</p>
            <p className="text-blue-200 text-sm">কোম্পানি</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl py-4">
            <p className="text-2xl font-bold">{stats.remote}+</p>
            <p className="text-blue-200 text-sm">রিমোট চাকরি</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterPanel
              selectedCategory={category}
              selectedType={type}
              onCategoryChange={setCategory}
              onTypeChange={setType}
            />
          </div>

          {/* Job Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                {jobs.length === 0
                  ? "কোনো চাকরি পাওয়া যায়নি"
                  : `${jobs.length}টি চাকরি পাওয়া গেছে`}
              </h2>
              {(activeQuery || activeLocation || category !== "All" || type) && (
                <button
                  onClick={() => {
                    setQuery("");
                    setLocation("");
                    setActiveQuery("");
                    setActiveLocation("");
                    setCategory("All");
                    setType("");
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  সব রিসেট করুন
                </button>
              )}
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">কোনো চাকরি খুঁজে পাওয়া যায়নি</p>
                <p className="text-sm mt-1">ভিন্ন কীওয়ার্ড বা ফিল্টার দিয়ে চেষ্টা করুন</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
