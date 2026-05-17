import type { NormalizedJob } from "../types";
import { normalizeDate, inferExperienceLevel, parseSalaryText, inferCategory, slugId, stripHtml } from "../normalizer";

const URL = "https://remoteok.com/api";

interface RemoteOkJob {
  id: string;
  epoch: number;
  date: string;
  company: string;
  company_logo?: string;
  position: string;
  tags: string[];
  description: string;
  url: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
}

export async function fetchRemoteOK(): Promise<NormalizedJob[]> {
  const res = await fetch(URL, {
    headers: {
      "User-Agent": "JobBoardBD/1.0 (+https://github.com/frankowen1971-rgb/facebook-ai-bot)",
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json() as (RemoteOkJob | { legal: string })[];
  // First element is legal notice, skip it
  const jobs = data.filter((item): item is RemoteOkJob => "position" in item);

  return jobs.map((j) => ({
    id: slugId("remoteok", j.id),
    title: j.position,
    company: j.company,
    companyLogo: j.company_logo,
    location: j.location || "Remote",
    country: undefined,
    type: "remote" as const,
    category: inferCategory(j.position, j.tags ?? []),
    salary:
      j.salary_min && j.salary_max
        ? { min: j.salary_min, max: j.salary_max, currency: "USD" }
        : parseSalaryText(j.description?.slice(0, 200)),
    description: stripHtml(j.description ?? "").slice(0, 500),
    url: j.url,
    source: "remoteok",
    sourceLabel: "RemoteOK",
    postedAt: j.epoch ? normalizeDate(j.epoch * 1000) : normalizeDate(j.date),
    isRemote: true,
    tags: j.tags ?? [],
    experienceLevel: inferExperienceLevel(j.position),
  }));
}
