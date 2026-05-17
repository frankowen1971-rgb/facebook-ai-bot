import type { NormalizedJob } from "../types";
import { normalizeDate, inferExperienceLevel, inferCategory, inferCountry, isRemoteLocation, slugId, stripHtml } from "../normalizer";

const URL = "https://jooble.org/api";

interface JoobleJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  snippet: string;
  link: string;
  updated: string;
  type?: string;
}

export async function fetchJooble(): Promise<NormalizedJob[]> {
  const key = process.env.JOOBLE_API_KEY;
  if (!key) throw new Error("missing JOOBLE_API_KEY env var");

  const res = await fetch(`${URL}/${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "JobBoardBD/1.0" },
    body: JSON.stringify({ keywords: "software developer", location: "", page: 1 }),
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json() as { jobs: JoobleJob[] };

  return (data.jobs ?? []).map((j) => ({
    id: slugId("jooble", j.id),
    title: j.title,
    company: j.company,
    location: j.location,
    country: inferCountry(j.location),
    type: isRemoteLocation(j.location) ? "remote" : "full-time",
    category: inferCategory(j.title, []),
    salary: null,
    description: stripHtml(j.snippet).slice(0, 500),
    url: j.link,
    source: "jooble",
    sourceLabel: "Jooble",
    postedAt: normalizeDate(j.updated),
    isRemote: isRemoteLocation(j.location),
    tags: [],
    experienceLevel: inferExperienceLevel(j.title),
  }));
}
