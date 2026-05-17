import type { NormalizedJob } from "../types";
import { normalizeDate, normalizeJobType, inferExperienceLevel, inferCategory, inferCountry, isRemoteLocation, slugId, stripHtml } from "../normalizer";

const BASE = "https://findwork.dev/api/jobs/";

interface FindworkJob {
  id: number;
  role: string;
  company_name: string;
  company_logo?: string;
  location: string;
  remote?: boolean;
  employment_type: string;
  date_posted: string;
  url: string;
  keywords: string[];
  text?: string;
}

export async function fetchFindwork(): Promise<NormalizedJob[]> {
  const key = process.env.FINDWORK_API_KEY;
  if (!key) throw new Error("missing FINDWORK_API_KEY env var");

  const all: NormalizedJob[] = [];
  let url: string | null = `${BASE}?order_by=-date`;

  for (let i = 0; i < 3 && url; i++) {
    const res = await fetch(url, {
      headers: { "Authorization": `Token ${key}`, "User-Agent": "JobBoardBD/1.0" },
      next: { revalidate: 0 },
    });
    if (!res.ok) break;
    const data = await res.json() as { results: FindworkJob[]; next: string | null };
    url = data.next;

    for (const j of data.results ?? []) {
      const remote = j.remote ?? isRemoteLocation(j.location);
      all.push({
        id: slugId("findwork", j.id),
        title: j.role,
        company: j.company_name,
        companyLogo: j.company_logo,
        location: remote && !j.location ? "Remote" : j.location || "Remote",
        country: inferCountry(j.location),
        type: remote ? "remote" : normalizeJobType(j.employment_type),
        category: inferCategory(j.role, j.keywords),
        salary: null,
        description: stripHtml(j.text ?? "").slice(0, 500),
        url: j.url,
        source: "findwork",
        sourceLabel: "Findwork",
        postedAt: normalizeDate(j.date_posted),
        isRemote: remote,
        tags: j.keywords ?? [],
        experienceLevel: inferExperienceLevel(j.role),
      });
    }
  }
  return all;
}
