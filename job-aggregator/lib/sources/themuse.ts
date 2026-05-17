import type { NormalizedJob } from "../types";
import { normalizeDate, inferExperienceLevel, inferCategory, inferCountry, isRemoteLocation, slugId, stripHtml } from "../normalizer";

const BASE = "https://www.themuse.com/api/public/jobs";

interface MuseJob {
  id: number;
  name: string;
  company: { name: string; id: number };
  locations: Array<{ name: string }>;
  categories: Array<{ name: string }>;
  levels: Array<{ name: string; short_name: string }>;
  type: string;
  publication_date: string;
  short_name: string;
  refs: { landing_page: string };
  contents?: string;
}

export async function fetchTheMuse(): Promise<NormalizedJob[]> {
  const all: NormalizedJob[] = [];

  for (let page = 1; page <= 3; page++) {
    const res = await fetch(`${BASE}?page=${page}&descending=true`, {
      headers: { "User-Agent": "JobBoardBD/1.0" },
      next: { revalidate: 0 },
    });
    if (!res.ok) break;
    const data = await res.json() as { results: MuseJob[]; total: number };
    if (!data.results?.length) break;

    for (const j of data.results) {
      const loc = j.locations?.[0]?.name ?? "";
      const remote = isRemoteLocation(loc) || j.locations?.some((l) => isRemoteLocation(l.name));
      const level = j.levels?.[0]?.short_name?.toLowerCase() ?? "";

      all.push({
        id: slugId("themuse", j.id),
        title: j.name,
        company: j.company.name,
        location: loc || "Unknown",
        country: inferCountry(loc),
        type: remote ? "remote" : "full-time",
        category: j.categories?.[0]?.name ?? inferCategory(j.name, []),
        salary: null,
        description: stripHtml(j.contents ?? "").slice(0, 500),
        url: j.refs.landing_page,
        source: "themuse",
        sourceLabel: "The Muse",
        postedAt: normalizeDate(j.publication_date),
        isRemote: remote,
        tags: j.categories?.map((c) => c.name) ?? [],
        experienceLevel: level.includes("senior") ? "senior"
          : level.includes("entry") ? "entry"
          : level.includes("mid") ? "mid"
          : undefined,
      });
    }
  }
  return all;
}
