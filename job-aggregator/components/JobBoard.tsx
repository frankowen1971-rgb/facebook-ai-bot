"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import type { NormalizedJob, SourceResult } from "@/lib/types";
import JobCard from "@/components/JobCard";
import JobSkeleton from "@/components/JobSkeleton";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import Pagination from "@/components/Pagination";
import Navbar from "@/components/Navbar";
import { Briefcase, TrendingUp, Building2, Globe2, SearchX, ArrowRight, RefreshCw, Wifi, WifiOff, AlertCircle } from "lucide-react";

const JOBS_PER_PAGE = 10;

const QUICK_FILTERS = [
  { label: "Remote", type: "type", value: "remote" },
  { label: "Full-time", type: "type", value: "full-time" },
  { label: "Internship", type: "type", value: "internship" },
  { label: "Engineering", type: "category", value: "Engineering" },
  { label: "Design", type: "category", value: "Design" },
  { label: "Data Science", type: "category", value: "Data Science" },
];

interface ApiResponse {
  jobs: NormalizedJob[];
  total: number;
  stats: SourceResult[];
  fetched: string;
}

export default function JobBoard() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [source, setSource] = useState("");
  const [country, setCountry] = useState("");
  const [page, setPage] = useState(1);

  const [allJobs, setAllJobs] = useState<NormalizedJob[]>([]);
  const [stats, setStats] = useState<SourceResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  const fetchJobs = useCallback(async (refresh = false) => {
    if (refresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/jobs${refresh ? "?refresh=true" : ""}`);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data: ApiResponse = await res.json();
      setAllJobs(data.jobs ?? []);
      setStats(data.stats ?? []);
      setFetchedAt(data.fetched ?? null);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const filteredJobs = useMemo(() => {
    let result = allJobs;
    if (activeQuery) {
      const q = activeQuery.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (activeLocation) {
      const loc = activeLocation.toLowerCase();
      result = result.filter((j) => j.location.toLowerCase().includes(loc));
    }
    if (type) result = result.filter((j) => j.type === type);
    if (category) result = result.filter((j) => j.category === category);
    if (source) result = result.filter((j) => j.source === source);
    if (country) result = result.filter((j) => j.country === country);
    return result;
  }, [allJobs, activeQuery, activeLocation, type, category, source, country]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE);

  function handleSearch() {
    setActiveQuery(query);
    setActiveLocation(location);
    setPage(1);
  }

  function handleQuickFilter(filter: typeof QUICK_FILTERS[number]) {
    if (filter.type === "type") setType((prev) => (prev === filter.value ? "" : filter.value));
    else setCategory((prev) => (prev === filter.value ? "" : filter.value));
    setPage(1);
  }

  function clearAll() {
    setQuery(""); setLocation(""); setActiveQuery(""); setActiveLocation("");
    setCategory(""); setType(""); setSource(""); setCountry(""); setPage(1);
  }

  useEffect(() => { setPage(1); }, [category, type, source, country]);

  const activeSources = stats.filter((s) => s.count > 0);
  const isFiltered = activeQuery || activeLocation || category || type || source || country;

  const statsData = useMemo(() => ({
    total: allJobs.length,
    companies: new Set(allJobs.map((j) => j.company)).size,
    remote: allJobs.filter((j) => j.isRemote).length,
  }), [allJobs]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-[#F3F2EF] border-b border-[#E0E0E0] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#0A66C2] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <TrendingUp className="w-3.5 h-3.5" />
            {loading ? "Loading jobs..." : `${statsData.total.toLocaleString()} live jobs from ${activeSources.length} sources`}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-black leading-tight tracking-tight mb-3">
            Find your next{" "}
            <span className="text-[#0A66C2]">opportunity</span>
          </h1>
          <p className="text-[#666] text-lg">
            Real-time jobs from Remotive, Greenhouse, Lever, WeWorkRemotely, Himalayas and more.
          </p>
        </div>

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
            const active = (f.type === "type" && type === f.value) || (f.type === "category" && category === f.value);
            return (
              <button
                key={f.value}
                onClick={() => handleQuickFilter(f)}
                className={`text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
                  active
                    ? "bg-[#0A66C2] text-white border-[#0A66C2]"
                    : "bg-white text-[#333] border-[#E0E0E0] hover:border-[#0A66C2] hover:text-[#0A66C2]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Live stats */}
        <div className="max-w-xl mx-auto grid grid-cols-3 gap-4 mt-8">
          {[
            { icon: Briefcase,  value: loading ? "…" : `${statsData.total.toLocaleString()}+`,   label: "Live Jobs" },
            { icon: Building2, value: loading ? "…" : `${statsData.companies.toLocaleString()}+`, label: "Companies" },
            { icon: Globe2,    value: loading ? "…" : `${statsData.remote.toLocaleString()}+`,   label: "Remote Jobs" },
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

      {/* Status bar */}
      {(fetchedAt || error) && (
        <div className={`border-b px-4 py-2 flex items-center justify-between text-xs ${error ? "bg-red-50 border-red-100 text-red-600" : "bg-[#F3F2EF] border-[#E0E0E0] text-[#666]"}`}>
          <div className="flex items-center gap-2">
            {error
              ? <><WifiOff className="w-3.5 h-3.5" />{error}</>
              : <><Wifi className="w-3.5 h-3.5 text-green-600" />Data fetched {new Date(fetchedAt!).toLocaleTimeString()}</>
            }
          </div>
          <button
            onClick={() => fetchJobs(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-[#0A66C2] font-semibold hover:underline disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Jobs column */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-black">
                  {loading ? "Loading…" : isFiltered
                    ? `${filteredJobs.length.toLocaleString()} result${filteredJobs.length !== 1 ? "s" : ""}`
                    : `${allJobs.length.toLocaleString()} jobs`}
                </h2>
                {!loading && filteredJobs.length > 0 && (
                  <p className="text-xs text-[#666] mt-0.5">
                    Page {page} of {totalPages} · {Math.min((page - 1) * JOBS_PER_PAGE + 1, filteredJobs.length)}–{Math.min(page * JOBS_PER_PAGE, filteredJobs.length)} shown
                  </p>
                )}
              </div>
              {isFiltered && (
                <button onClick={clearAll} className="text-xs text-[#0A66C2] font-semibold hover:underline">
                  Clear filters
                </button>
              )}
            </div>

            {/* Error state */}
            {error && !loading && (
              <div className="bg-white border border-red-200 rounded-xl p-6 text-center mb-4">
                <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                <p className="font-semibold text-black mb-1">Failed to load jobs</p>
                <p className="text-sm text-[#666] mb-4">{error}</p>
                <button
                  onClick={() => fetchJobs()}
                  className="bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#004182]"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Skeletons */}
            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => <JobSkeleton key={i} />)}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && filteredJobs.length === 0 && (
              <div className="bg-white border border-[#E0E0E0] rounded-xl py-16 px-6 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchX className="w-8 h-8 text-[#0A66C2]" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">No jobs found</h3>
                <p className="text-sm text-[#666] max-w-xs mx-auto mb-6">
                  {allJobs.length === 0 ? "No jobs loaded yet. Try refreshing." : "Try different keywords or remove some filters."}
                </p>
                <button
                  onClick={allJobs.length === 0 ? () => fetchJobs(true) : clearAll}
                  className="inline-flex items-center gap-2 bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#004182]"
                >
                  {allJobs.length === 0 ? <><RefreshCw className="w-4 h-4" /> Refresh</> : <><ArrowRight className="w-4 h-4" /> View all jobs</>}
                </button>
              </div>
            )}

            {/* Job list */}
            {!loading && filteredJobs.length > 0 && (
              <>
                <div className="space-y-3">
                  {paginatedJobs.map((job) => (
                    <JobCard key={job.id} job={job as any} />
                  ))}
                </div>
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-20 space-y-4">
              <FilterPanel
                selectedCategory={category}
                selectedType={type}
                selectedSource={source}
                selectedCountry={country}
                sourceStats={stats}
                onCategoryChange={setCategory}
                onTypeChange={setType}
                onSourceChange={setSource}
                onCountryChange={setCountry}
                allJobs={allJobs}
              />

              {/* Sources status card */}
              {activeSources.length > 0 && (
                <div className="bg-white border border-[#E0E0E0] rounded-xl p-4">
                  <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3">
                    Live Sources ({activeSources.length})
                  </h3>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {stats.map((s) => (
                      <div key={s.source} className="flex items-center justify-between text-xs">
                        <span className={`font-medium ${s.count > 0 ? "text-[#333]" : "text-[#bbb]"}`}>
                          {s.count > 0 ? "✓" : s.error?.includes("missing env") ? "⟳" : "✗"}{" "}
                          {s.label}
                        </span>
                        <span className={`tabular-nums ${s.count > 0 ? "text-[#0A66C2] font-semibold" : "text-[#bbb]"}`}>
                          {s.count > 0 ? s.count : s.error?.includes("missing env") ? "key?" : "err"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-xl p-5 text-white">
                <h3 className="font-bold text-base mb-1">Post a Job</h3>
                <p className="text-blue-100 text-sm mb-4">Reach thousands of qualified candidates.</p>
                <button className="w-full bg-white text-[#0A66C2] text-sm font-bold py-2 rounded-full hover:bg-blue-50">
                  Get Started →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E0E0E0] bg-white mt-12 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0A66C2] rounded flex items-center justify-center">
              <Briefcase className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm text-black">JobBoardBD</span>
          </div>
          <p className="text-xs text-[#666]">
            Real-time jobs · {activeSources.length} sources · Updated hourly
          </p>
          <p className="text-xs text-[#999]">© 2026 JobBoardBD</p>
        </div>
      </footer>
    </>
  );
}
