import type { NormalizedJob } from "../types";
import { normalizeDate, normalizeJobType, inferExperienceLevel, inferCategory, inferCountry, isRemoteLocation, slugId, stripHtml } from "../normalizer";

const BASE = "https://api.adzuna.com/v1/api/jobs";

interface AdzunaJob {
  id: string;
  title: string;
  company: { display_name: string };
  location: { display_name: string; area?: string[] };
  description: string;
  redirect_url: string;
  created: string;
  contract_type?: string;
  salary_min?: number;
  salary_max?: number;
  category: { label: string; tag: string };
}

export async function fetchAdzuna(): Promise<NormalizedJob[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) throw new Error("missing ADZUNA_APP_ID / ADZUNA_APP_KEY env vars");

  const countries = ["gb", "us", "au"];
  const all: NormalizedJob[] = [];

  for (const country of countries) {
    try {
      const res = await fetch(
        `${BASE}/${country}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=50&content-type=application/json`,
        { headers: { "User-Agent": "JobBoardBD/1.0" }, next: { revalidate: 0 } }
      );
      if (!res.ok) continue;
      const data = await res.json() as { results: AdzunaJob[] };

      for (const j of data.results ?? []) {
        const loc = j.location.display_name;
        all.push({
          id: slugId("adzuna", j.id),
          title: j.title,
          company: j.company.display_name,
          location: loc,
          country: inferCountry(loc) ?? country.toUpperCase(),
          type: normalizeJobType(j.contract_type),
          category: j.category.label ?? inferCategory(j.title, [j.category.tag]),
          salary: j.salary_min && j.salary_max
            ? { min: j.salary_min, max: j.salary_max, currency: country === "gb" ? "GBP" : country === "au" ? "AUD" : "USD" }
            : null,
          description: stripHtml(j.description).slice(0, 500),
          url: j.redirect_url,
          source: "adzuna",
          sourceLabel: "Adzuna",
          postedAt: normalizeDate(j.created),
          isRemote: isRemoteLocation(loc),
          tags: [j.category.tag],
          experienceLevel: inferExperienceLevel(j.title),
        });
      }
    } catch {
      // country-level failures silently skipped
    }
  }
  return all;
}
