import type { NormalizedJob } from "../types";
import { normalizeDate, inferExperienceLevel, inferCategory, inferCountry, isRemoteLocation, slugId, stripHtml } from "../normalizer";

const BASE = "https://api.lever.co/v0/postings";

const COMPANIES = [
  { slug: "netflix", name: "Netflix" },
  { slug: "github", name: "GitHub" },
  { slug: "shopify", name: "Shopify" },
  { slug: "palantir", name: "Palantir" },
  { slug: "lyft", name: "Lyft" },
  { slug: "eventbrite", name: "Eventbrite" },
  { slug: "mixpanel", name: "Mixpanel" },
];

interface LeverJob {
  id: string;
  text: string;
  categories: {
    team?: string;
    location?: string;
    commitment?: string;
    department?: string;
  };
  description?: string;
  descriptionPlain?: string;
  hostedUrl: string;
  createdAt: number;
  additionalPlain?: string;
}

async function fetchCompany(slug: string, name: string): Promise<NormalizedJob[]> {
  const res = await fetch(`${BASE}/${slug}?mode=json`, {
    headers: { "User-Agent": "JobBoardBD/1.0" },
    next: { revalidate: 0 },
  });
  if (!res.ok) return [];
  const data = await res.json() as LeverJob[];

  return (Array.isArray(data) ? data : []).map((j) => {
    const loc = j.categories?.location ?? "";
    return {
      id: slugId(`lever-${slug}`, j.id),
      title: j.text,
      company: name,
      location: loc || "Remote",
      country: inferCountry(loc),
      type: isRemoteLocation(loc) ? "remote" : "full-time",
      category: inferCategory(j.text, j.categories?.team ? [j.categories.team] : []),
      salary: null,
      description: stripHtml(j.descriptionPlain ?? j.description ?? "").slice(0, 500),
      url: j.hostedUrl,
      source: "lever",
      sourceLabel: "Lever",
      postedAt: normalizeDate(j.createdAt),
      isRemote: isRemoteLocation(loc),
      tags: [j.categories?.team, j.categories?.department].filter(Boolean) as string[],
      experienceLevel: inferExperienceLevel(j.text),
    };
  });
}

export async function fetchLever(): Promise<NormalizedJob[]> {
  const results = await Promise.allSettled(
    COMPANIES.map((c) => fetchCompany(c.slug, c.name))
  );
  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
}
