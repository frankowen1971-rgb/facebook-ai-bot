import { XMLParser } from "fast-xml-parser";
import type { NormalizedJob } from "../types";
import { normalizeDate, inferExperienceLevel, inferCategory, slugId, stripHtml } from "../normalizer";

const FEEDS = [
  { url: "https://weworkremotely.com/categories/remote-programming-jobs.rss", cat: "Engineering" },
  { url: "https://weworkremotely.com/categories/remote-design-jobs.rss", cat: "Design" },
  { url: "https://weworkremotely.com/categories/remote-marketing-jobs.rss", cat: "Marketing" },
  { url: "https://weworkremotely.com/remote-jobs.rss", cat: null },
];

const parser = new XMLParser({ ignoreAttributes: false });

interface RssItem {
  title?: string;
  link?: string | string[];
  "pub:company"?: string;
  "pub:region"?: string;
  description?: string;
  pubDate?: string;
  guid?: string | { "#text": string };
}

function extractLink(item: RssItem): string {
  const links = Array.isArray(item.link) ? item.link : [item.link ?? ""];
  return links.find((l) => l?.startsWith("http")) ?? links[0] ?? "";
}

function parseGuid(guid: RssItem["guid"]): string {
  if (!guid) return String(Math.random());
  return typeof guid === "string" ? guid : guid["#text"] ?? String(Math.random());
}

export async function fetchWeWorkRemotely(): Promise<NormalizedJob[]> {
  const all: NormalizedJob[] = [];

  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, {
        headers: { "User-Agent": "JobBoardBD/1.0" },
        next: { revalidate: 0 },
      });
      if (!res.ok) continue;
      const xml = await res.text();
      const parsed = parser.parse(xml);
      const items: RssItem[] = parsed?.rss?.channel?.item ?? [];

      for (const item of items) {
        const title = item.title ?? "";
        if (!title || title.toLowerCase().includes("we work remotely")) continue;

        const [company, ...rest] = title.split(": ");
        const jobTitle = rest.join(": ") || company;
        const actualCompany = rest.length ? company : "Unknown";

        all.push({
          id: slugId("wwr", parseGuid(item.guid)),
          title: jobTitle.trim(),
          company: actualCompany.trim(),
          location: item["pub:region"] || "Remote",
          country: undefined,
          type: "remote",
          category: feed.cat ?? inferCategory(jobTitle, []),
          salary: null,
          description: stripHtml(item.description ?? "").slice(0, 500),
          url: extractLink(item),
          source: "weworkremotely",
          sourceLabel: "We Work Remotely",
          postedAt: normalizeDate(item.pubDate),
          isRemote: true,
          tags: [],
          experienceLevel: inferExperienceLevel(jobTitle),
        });
      }
    } catch {
      // individual feed failures are silently skipped
    }
  }
  return all;
}
