import type { NormalizedJob } from "../types";
import { normalizeJobType, normalizeDate, inferExperienceLevel, inferCategory, inferCountry, slugId, stripHtml } from "../normalizer";

const BASE = "https://www.arbeitnow.com/api/job-board-api";

interface ArbeitnowJob {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: number;
}

export async function fetchArbeitnow(): Promise<NormalizedJob[]> {
  const all: NormalizedJob[] = [];
  // Fetch 2 pages (50 jobs each)
  for (let page = 1; page <= 2; page++) {
    const res = await fetch(`${BASE}?page=${page}`, {
      headers: { "User-Agent": "JobBoardBD/1.0" },
      next: { revalidate: 0 },
    });
    if (!res.ok) break;
    const data = await res.json() as { data: ArbeitnowJob[] };
    if (!data.data?.length) break;

    for (const j of data.data) {
      all.push({
        id: slugId("arbeitnow", j.slug),
        title: j.title,
        company: j.company_name,
        location: j.location || "Germany",
        country: inferCountry(j.location),
        type: j.remote ? "remote" : normalizeJobType(j.job_types?.[0]),
        category: inferCategory(j.title, j.tags),
        salary: null,
        description: stripHtml(j.description).slice(0, 500),
        url: j.url,
        source: "arbeitnow",
        sourceLabel: "Arbeitnow",
        postedAt: normalizeDate(j.created_at * 1000),
        isRemote: j.remote,
        tags: j.tags ?? [],
        experienceLevel: inferExperienceLevel(j.title),
      });
    }
  }
  return all;
}
