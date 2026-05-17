import type { NormalizedJob } from "../types";
import { normalizeDate, inferExperienceLevel, inferCategory, slugId, stripHtml } from "../normalizer";

const BASE = "https://data.usajobs.gov/api/search";

interface UsaJobPosition {
  MatchedObjectId: string;
  MatchedObjectDescriptor: {
    PositionTitle: string;
    OrganizationName: string;
    PositionLocationDisplay: string;
    PositionRemuneration: Array<{ MinimumRange: string; MaximumRange: string; CurrencyCode: string }>;
    QualificationSummary: string;
    PositionURI: string;
    PublicationStartDate: string;
    ApplicationCloseDate: string;
    UserArea?: { Details?: { MajorDuties?: string[] } };
  };
}

export async function fetchUSAJobs(): Promise<NormalizedJob[]> {
  const key = process.env.USAJOBS_API_KEY;
  const email = process.env.USAJOBS_EMAIL;
  if (!key || !email) throw new Error("missing USAJOBS_API_KEY / USAJOBS_EMAIL env vars");

  const res = await fetch(`${BASE}?ResultsPerPage=50&JobCategoryCode=2210`, {
    headers: {
      "Host": "data.usajobs.gov",
      "User-Agent": email,
      "Authorization-Key": key,
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json() as { SearchResult: { SearchResultItems: UsaJobPosition[] } };
  const items = data.SearchResult?.SearchResultItems ?? [];

  return items.map((item) => {
    const d = item.MatchedObjectDescriptor;
    const rem = d.PositionRemuneration?.[0];
    return {
      id: slugId("usajobs", item.MatchedObjectId),
      title: d.PositionTitle,
      company: d.OrganizationName,
      location: d.PositionLocationDisplay,
      country: "US",
      type: "full-time" as const,
      category: inferCategory(d.PositionTitle, []),
      salary: rem
        ? { min: parseFloat(rem.MinimumRange), max: parseFloat(rem.MaximumRange), currency: rem.CurrencyCode }
        : null,
      description: stripHtml(d.QualificationSummary ?? "").slice(0, 500),
      url: d.PositionURI,
      source: "usajobs",
      sourceLabel: "USAJobs",
      postedAt: normalizeDate(d.PublicationStartDate),
      isRemote: /remote/i.test(d.PositionLocationDisplay),
      tags: [],
      experienceLevel: inferExperienceLevel(d.PositionTitle),
    };
  });
}
