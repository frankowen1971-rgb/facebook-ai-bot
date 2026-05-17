import type { NormalizedJob } from "../types";
import { normalizeDate, inferExperienceLevel, inferCategory, inferCountry, isRemoteLocation, slugId, stripHtml } from "../normalizer";

const BASE = "https://boards-api.greenhouse.io/v1/boards";

const COMPANIES = [
  { token: "stripe", name: "Stripe" },
  { token: "airbnb", name: "Airbnb" },
  { token: "doordash", name: "DoorDash" },
  { token: "robinhood", name: "Robinhood" },
  { token: "coinbase", name: "Coinbase" },
  { token: "figma", name: "Figma" },
  { token: "notion", name: "Notion" },
  { token: "vercel", name: "Vercel" },
  { token: "anthropic", name: "Anthropic" },
  { token: "openai", name: "OpenAI" },
];

interface GhJob {
  id: number;
  title: string;
  location?: { name: string };
  absolute_url: string;
  updated_at: string;
  content?: string;
  metadata?: unknown[];
  departments?: Array<{ name: string }>;
}

async function fetchCompany(token: string, name: string): Promise<NormalizedJob[]> {
  const res = await fetch(`${BASE}/${token}/jobs?content=true`, {
    headers: { "User-Agent": "JobBoardBD/1.0" },
    next: { revalidate: 0 },
  });
  if (!res.ok) return [];
  const data = await res.json() as { jobs: GhJob[] };

  return (data.jobs ?? []).map((j) => {
    const loc = j.location?.name ?? "";
    const dept = j.departments?.[0]?.name ?? "";
    return {
      id: slugId(`gh-${token}`, j.id),
      title: j.title,
      company: name,
      location: loc || "Remote",
      country: inferCountry(loc),
      type: isRemoteLocation(loc) ? "remote" : "full-time",
      category: inferCategory(j.title, dept ? [dept] : []),
      salary: null,
      description: stripHtml(j.content ?? "").slice(0, 500),
      url: j.absolute_url,
      source: "greenhouse",
      sourceLabel: "Greenhouse",
      postedAt: normalizeDate(j.updated_at),
      isRemote: isRemoteLocation(loc),
      tags: dept ? [dept] : [],
      experienceLevel: inferExperienceLevel(j.title),
    };
  });
}

export async function fetchGreenhouse(): Promise<NormalizedJob[]> {
  const results = await Promise.allSettled(
    COMPANIES.map((c) => fetchCompany(c.token, c.name))
  );
  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
}
