import * as cheerio from "cheerio";
import type { NormalizedJob } from "../types";
import { normalizeDate, slugId } from "../normalizer";

const SOURCES = [
  {
    name: "BPSC",
    url: "https://bpsc.gov.bd/site/view/circular_notice",
    baseUrl: "https://bpsc.gov.bd",
    selector: "table tr",
    titleSel: "td:nth-child(2)",
    dateSel: "td:nth-child(3)",
    linkSel: "td:nth-child(2) a",
    source: "bpsc",
    label: "BPSC",
  },
  {
    name: "Teletalk Jobs",
    url: "https://teletalk.com.bd/jobs",
    baseUrl: "https://teletalk.com.bd",
    selector: ".job-item, .career-item, article",
    titleSel: "h2, h3, .title",
    dateSel: ".date, time",
    linkSel: "a",
    source: "teletalk",
    label: "Teletalk",
  },
  {
    name: "MOPA",
    url: "https://mopa.gov.bd/site/notices",
    baseUrl: "https://mopa.gov.bd",
    selector: "table tr, .notice-item",
    titleSel: "td:nth-child(2), .title",
    dateSel: "td:nth-child(3), .date",
    linkSel: "a",
    source: "mopa",
    label: "MOPA (Govt)",
  },
];

async function scrapeSource(cfg: typeof SOURCES[number]): Promise<NormalizedJob[]> {
  const res = await fetch(cfg.url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; JobBoardBD/1.0; +https://github.com/frankowen1971-rgb/facebook-ai-bot)",
      "Accept": "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9,bn;q=0.8",
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const jobs: NormalizedJob[] = [];
  let idx = 0;

  $(cfg.selector).each((_, el) => {
    const title = $(el).find(cfg.titleSel).first().text().trim();
    if (!title || title.length < 5) return;

    const href = $(el).find(cfg.linkSel).first().attr("href") ?? "";
    const fullUrl = href.startsWith("http") ? href : href ? `${cfg.baseUrl}${href}` : cfg.url;
    const dateText = $(el).find(cfg.dateSel).first().text().trim();

    jobs.push({
      id: slugId(cfg.source, `${idx++}-${title.slice(0, 20)}`),
      title,
      company: cfg.name,
      location: "Bangladesh",
      country: "BD",
      type: "full-time",
      category: "Government",
      salary: null,
      description: `Government circular from ${cfg.name}. Visit the official website for full details.`,
      url: fullUrl,
      source: cfg.source,
      sourceLabel: cfg.label,
      postedAt: normalizeDate(dateText),
      isRemote: false,
      tags: ["government", "bangladesh", "circular"],
      experienceLevel: undefined,
    });
  });
  return jobs;
}

export async function fetchBdGovt(): Promise<NormalizedJob[]> {
  const results = await Promise.allSettled(SOURCES.map(scrapeSource));
  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
}
