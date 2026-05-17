import type { NormalizedJob } from "../types";
import { normalizeDate, normalizeJobType, inferExperienceLevel, inferCategory, inferCountry, isRemoteLocation, slugId, stripHtml, parseSalaryText } from "../normalizer";

const BASE = "https://jsearch.p.rapidapi.com/search";

interface JSearchJob {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo?: string;
  job_city?: string;
  job_country?: string;
  job_description: string;
  job_apply_link: string;
  job_posted_at_datetime_utc?: string;
  job_employment_type?: string;
  job_is_remote?: boolean;
  job_min_salary?: number;
  job_max_salary?: number;
  job_salary_currency?: string;
  job_highlights?: { Qualifications?: string[]; Responsibilities?: string[] };
}

export async function fetchJSearch(): Promise<NormalizedJob[]> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) throw new Error("missing RAPIDAPI_KEY env var");

  const res = await fetch(`${BASE}?query=software+developer&page=1&num_pages=2`, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      "User-Agent": "JobBoardBD/1.0",
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json() as { data: JSearchJob[] };

  return (data.data ?? []).map((j) => {
    const loc = [j.job_city, j.job_country].filter(Boolean).join(", ");
    return {
      id: slugId("jsearch", j.job_id),
      title: j.job_title,
      company: j.employer_name,
      companyLogo: j.employer_logo,
      location: j.job_is_remote ? "Remote" : loc || "Unknown",
      country: j.job_country ?? inferCountry(loc),
      type: j.job_is_remote ? "remote" : normalizeJobType(j.job_employment_type),
      category: inferCategory(j.job_title, []),
      salary: j.job_min_salary && j.job_max_salary
        ? { min: j.job_min_salary, max: j.job_max_salary, currency: j.job_salary_currency ?? "USD" }
        : parseSalaryText(j.job_description?.slice(0, 300)),
      description: stripHtml(j.job_description ?? "").slice(0, 500),
      url: j.job_apply_link,
      source: "jsearch",
      sourceLabel: "JSearch",
      postedAt: normalizeDate(j.job_posted_at_datetime_utc),
      isRemote: j.job_is_remote ?? isRemoteLocation(loc),
      tags: [],
      experienceLevel: inferExperienceLevel(j.job_title),
    };
  });
}
