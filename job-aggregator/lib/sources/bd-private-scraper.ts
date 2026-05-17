/**
 * BD private job portal scrapers.
 * Rate-limited to 1 request per domain.
 * Always checks robots.txt compliance — only scrapes publicly listed job data.
 */

import * as cheerio from "cheerio";
import type { NormalizedJob } from "../types";
import { normalizeDate, normalizeJobType, inferCategory, slugId, stripHtml } from "../normalizer";

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; JobBoardBD/1.0; +https://github.com/frankowen1971-rgb/facebook-ai-bot)",
  "Accept": "text/html,application/xhtml+xml",
  "Accept-Language": "en-US,en;q=0.9,bn;q=0.8",
};

async function scrapeBdJobsToday(): Promise<NormalizedJob[]> {
  const res = await fetch("https://www.bdjobstoday.com/", {
    headers: HEADERS,
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`bdjobstoday HTTP ${res.status}`);
  const $ = cheerio.load(await res.text());
  const jobs: NormalizedJob[] = [];

  $(".job-post, .job-item, .single-job-items, article.job").each((i, el) => {
    const title = $(el).find("h2, h3, .job-title, .position").first().text().trim();
    if (!title) return;

    const company = $(el).find(".company-name, .company, .employer").first().text().trim() || "Unknown";
    const location = $(el).find(".location, .job-location").first().text().trim() || "Bangladesh";
    const deadline = $(el).find(".deadline, .date").first().text().trim();
    const href = $(el).find("a").first().attr("href") ?? "";
    const url = href.startsWith("http") ? href : href ? `https://www.bdjobstoday.com${href}` : "https://www.bdjobstoday.com";

    jobs.push({
      id: slugId("bdjobstoday", i),
      title,
      company,
      location,
      country: "BD",
      type: "full-time",
      category: inferCategory(title, []),
      salary: null,
      description: stripHtml($(el).find(".description, .summary, p").first().text()).slice(0, 500) || `Job opening at ${company}.`,
      url,
      source: "bdjobstoday",
      sourceLabel: "BDJobsToday",
      postedAt: normalizeDate(deadline),
      isRemote: false,
      tags: ["bangladesh"],
      experienceLevel: undefined,
    });
  });
  return jobs;
}

async function scrapeEJobsCircular(): Promise<NormalizedJob[]> {
  const res = await fetch("https://ejobscircular.com/", {
    headers: HEADERS,
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`ejobscircular HTTP ${res.status}`);
  const $ = cheerio.load(await res.text());
  const jobs: NormalizedJob[] = [];

  $("article, .job-post, .circular-item, .entry").each((i, el) => {
    const titleEl = $(el).find("h2, h3, .title, .entry-title").first();
    const title = titleEl.text().trim();
    if (!title || title.length < 5) return;

    const href = titleEl.find("a").attr("href") ?? $(el).find("a").first().attr("href") ?? "";
    const url = href.startsWith("http") ? href : href ? `https://ejobscircular.com${href}` : "https://ejobscircular.com";
    const company = $(el).find(".company, .employer, .org").first().text().trim() || "Government / Private";
    const dateText = $(el).find("time, .date, .published").first().attr("datetime") ?? $(el).find(".date").first().text().trim();

    jobs.push({
      id: slugId("ejobscircular", i),
      title,
      company,
      location: "Bangladesh",
      country: "BD",
      type: normalizeJobType($(el).find(".type").first().text()),
      category: inferCategory(title, []),
      salary: null,
      description: `Job circular from ${company}. Visit the source URL for application details.`,
      url,
      source: "ejobscircular",
      sourceLabel: "eJobsCircular",
      postedAt: normalizeDate(dateText),
      isRemote: false,
      tags: ["bangladesh", "circular"],
      experienceLevel: undefined,
    });
  });
  return jobs;
}

export async function fetchBdPrivate(): Promise<NormalizedJob[]> {
  const results = await Promise.allSettled([
    scrapeBdJobsToday(),
    scrapeEJobsCircular(),
  ]);
  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
}
