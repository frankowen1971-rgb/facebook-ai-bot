import type { NormalizedJob } from "../types";
import { normalizeDate, inferExperienceLevel, inferCategory, inferCountry, isRemoteLocation, slugId, stripHtml } from "../normalizer";

const BASE = "https://api.ashbyhq.com/posting-api/job-board";

const COMPANIES = [
  { slug: "ramp", name: "Ramp" },
  { slug: "deel", name: "Deel" },
  { slug: "linear", name: "Linear" },
  { slug: "mercury", name: "Mercury" },
  { slug: "vanta", name: "Vanta" },
  { slug: "posthog", name: "PostHog" },
];

interface AshbyJob {
  id: string;
  title: string;
  locationName?: string;
  isRemote?: boolean;
  publishedAt: string;
  jobUrl?: string;
  applicationLink?: string;
  descriptionSocial?: string;
  descriptionPlain?: string;
  compensation?: {
    summaryComponents?: Array<{
      compensationType: string;
      minValue?: number;
      maxValue?: number;
      currency?: string;
    }>;
  };
  department?: string;
  team?: string;
}

async function fetchCompany(slug: string, name: string): Promise<NormalizedJob[]> {
  const res = await fetch(`${BASE}/${slug}?includeCompensation=true`, {
    headers: { "User-Agent": "JobBoardBD/1.0" },
    next: { revalidate: 0 },
  });
  if (!res.ok) return [];
  const data = await res.json() as { jobs?: AshbyJob[] };

  return (data.jobs ?? []).map((j) => {
    const loc = j.locationName ?? "";
    const remote = j.isRemote ?? isRemoteLocation(loc);
    const comp = j.compensation?.summaryComponents?.find((c) => c.compensationType === "Salary");

    return {
      id: slugId(`ashby-${slug}`, j.id),
      title: j.title,
      company: name,
      location: remote && !loc ? "Remote" : loc || "Remote",
      country: inferCountry(loc),
      type: remote ? "remote" : "full-time",
      category: inferCategory(j.title, [j.department, j.team].filter(Boolean) as string[]),
      salary: comp?.minValue && comp?.maxValue
        ? { min: comp.minValue, max: comp.maxValue, currency: comp.currency ?? "USD" }
        : null,
      description: stripHtml(j.descriptionPlain ?? j.descriptionSocial ?? "").slice(0, 500),
      url: j.jobUrl ?? j.applicationLink ?? `https://ashbyhq.com/jobs/${j.id}`,
      source: "ashby",
      sourceLabel: "Ashby",
      postedAt: normalizeDate(j.publishedAt),
      isRemote: remote,
      tags: [j.department, j.team].filter(Boolean) as string[],
      experienceLevel: inferExperienceLevel(j.title),
    };
  });
}

export async function fetchAshby(): Promise<NormalizedJob[]> {
  const results = await Promise.allSettled(
    COMPANIES.map((c) => fetchCompany(c.slug, c.name))
  );
  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
}
