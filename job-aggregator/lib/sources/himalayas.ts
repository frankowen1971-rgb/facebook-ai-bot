import type { NormalizedJob } from "../types";
import { normalizeJobType, normalizeDate, inferExperienceLevel, inferCategory, slugId, stripHtml } from "../normalizer";

const BASE = "https://himalayas.app/jobs/api";

interface HimalayasJob {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  locationRestrictions?: string[];
  jobType: string;
  categories: string[];
  salaryCurrencyCode?: string;
  salaryMin?: number;
  salaryMax?: number;
  applicationUrl?: string;
  shortDescription?: string;
  description?: string;
  createdAt: string;
  tags?: string[];
}

export async function fetchHimalayas(): Promise<NormalizedJob[]> {
  const all: NormalizedJob[] = [];
  let offset = 0;
  const limit = 20;

  for (let i = 0; i < 5; i++) {
    const res = await fetch(`${BASE}?limit=${limit}&offset=${offset}`, {
      headers: { "User-Agent": "JobBoardBD/1.0" },
      next: { revalidate: 0 },
    });
    if (!res.ok) break;
    const data = await res.json() as { jobs?: HimalayasJob[] };
    if (!data.jobs?.length) break;

    for (const j of data.jobs) {
      all.push({
        id: slugId("himalayas", j.id),
        title: j.title,
        company: j.companyName,
        companyLogo: j.companyLogo,
        location: j.locationRestrictions?.join(", ") || "Remote",
        country: undefined,
        type: normalizeJobType(j.jobType),
        category: j.categories?.[0] ?? inferCategory(j.title, j.tags ?? []),
        salary:
          j.salaryMin && j.salaryMax
            ? { min: j.salaryMin, max: j.salaryMax, currency: j.salaryCurrencyCode ?? "USD" }
            : null,
        description: stripHtml(j.shortDescription ?? j.description ?? "").slice(0, 500),
        url: j.applicationUrl ?? `https://himalayas.app/jobs/${j.id}`,
        source: "himalayas",
        sourceLabel: "Himalayas",
        postedAt: normalizeDate(j.createdAt),
        isRemote: true,
        tags: j.tags ?? [],
        experienceLevel: inferExperienceLevel(j.title),
      });
    }
    offset += limit;
  }
  return all;
}
