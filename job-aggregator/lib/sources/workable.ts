import type { NormalizedJob } from "../types";
import { normalizeDate, inferExperienceLevel, inferCategory, inferCountry, isRemoteLocation, slugId, stripHtml } from "../normalizer";

const BASE = "https://apply.workable.com/api/v3/accounts";

const COMPANIES = [
  { slug: "buffer", name: "Buffer" },
  { slug: "hotjar", name: "Hotjar" },
  { slug: "typeform", name: "Typeform" },
  { slug: "revolut", name: "Revolut" },
];

interface WorkableJob {
  id: string;
  title: string;
  location?: { city?: string; country?: string; telecommuting?: boolean };
  employment_type?: string;
  published_on?: string;
  url: string;
  department?: string;
  description?: string;
  requirements?: string;
}

async function fetchCompany(slug: string, name: string): Promise<NormalizedJob[]> {
  const res = await fetch(`${BASE}/${slug}/jobs`, {
    headers: { "User-Agent": "JobBoardBD/1.0" },
    next: { revalidate: 0 },
  });
  if (!res.ok) return [];
  const data = await res.json() as { results?: WorkableJob[] };

  return (data.results ?? []).map((j) => {
    const loc = [j.location?.city, j.location?.country].filter(Boolean).join(", ");
    const remote = j.location?.telecommuting ?? isRemoteLocation(loc);
    return {
      id: slugId(`workable-${slug}`, j.id),
      title: j.title,
      company: name,
      location: remote && !loc ? "Remote" : loc || "Remote",
      country: j.location?.country ?? inferCountry(loc),
      type: remote ? "remote" : "full-time",
      category: inferCategory(j.title, j.department ? [j.department] : []),
      salary: null,
      description: stripHtml(j.description ?? j.requirements ?? "").slice(0, 500),
      url: j.url,
      source: "workable",
      sourceLabel: "Workable",
      postedAt: normalizeDate(j.published_on),
      isRemote: remote,
      tags: j.department ? [j.department] : [],
      experienceLevel: inferExperienceLevel(j.title),
    };
  });
}

export async function fetchWorkable(): Promise<NormalizedJob[]> {
  const results = await Promise.allSettled(
    COMPANIES.map((c) => fetchCompany(c.slug, c.name))
  );
  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
}
