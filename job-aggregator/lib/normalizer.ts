import type { JobType, ExperienceLevel, JobSalary } from "./types";

export function normalizeJobType(raw: string | undefined): JobType {
  if (!raw) return "full-time";
  const s = raw.toLowerCase().replace(/[_\s]+/g, "-");
  if (s.includes("remote")) return "remote";
  if (s.includes("part")) return "part-time";
  if (s.includes("contract") || s.includes("freelance")) return "contract";
  if (s.includes("intern")) return "internship";
  return "full-time";
}

export function normalizeDate(raw: string | number | undefined): Date {
  if (!raw) return new Date();
  const d = new Date(raw);
  return isNaN(d.getTime()) ? new Date() : d;
}

const LEVELS: [ExperienceLevel, RegExp][] = [
  ["intern", /intern/i],
  ["entry", /junior|entry[- ]?level|associate|graduate/i],
  ["senior", /senior|sr\.|staff|principal/i],
  ["lead", /lead|manager|head of|director/i],
  ["executive", /vp|vice president|cto|ceo|chief/i],
];

export function inferExperienceLevel(title: string, desc?: string): ExperienceLevel | undefined {
  const text = `${title} ${desc ?? ""}`;
  for (const [level, re] of LEVELS) {
    if (re.test(text)) return level;
  }
  return "mid";
}

const SALARY_RE = /\$?([\d,]+)\s*(?:k|K)?(?:\s*[-–to]+\s*\$?([\d,]+)\s*(?:k|K)?)?/;

export function parseSalaryText(text: string | undefined): JobSalary | null {
  if (!text) return null;
  const m = SALARY_RE.exec(text);
  if (!m) return null;
  const toNum = (s: string) => {
    const n = parseFloat(s.replace(/,/g, ""));
    return text.includes("k") || text.includes("K") ? n * 1000 : n;
  };
  const min = toNum(m[1]);
  const max = m[2] ? toNum(m[2]) : min;
  if (!min || min < 100) return null;
  const currency = text.includes("£") ? "GBP" : text.includes("€") ? "EUR" : "USD";
  return { min, max, currency };
}

export function isRemoteLocation(loc: string | undefined): boolean {
  if (!loc) return false;
  return /remote|anywhere|worldwide|global/i.test(loc);
}

const CATEGORY_KEYWORDS: [string, RegExp][] = [
  ["Engineering", /engineer|developer|devops|backend|frontend|fullstack|software|sre|platform|infrastructure|mobile|ios|android|architect/i],
  ["Data Science", /data sci|machine learning|ml |ai |nlp|deep learning|analyst|analytics|bi |tableau|spark|kafka/i],
  ["Design", /design|ux|ui |product design|figma|visual|creative/i],
  ["Product", /product manager|product owner|pm |program manager/i],
  ["Marketing", /market|seo|growth|content|copywriter|brand|social media|demand gen/i],
  ["Sales", /sales|account exec|business dev|bdr|sdr|revenue/i],
  ["Finance", /financ|account|bookkeep|payroll|tax|audit|cfo/i],
  ["Operations", /operat|logistics|supply chain|scm|warehou|fulfillment/i],
  ["Healthcare", /health|medical|nurse|doctor|pharma|clinical|biotech/i],
  ["Education", /teach|educat|tutor|curriculum|learning|instructor/i],
  ["Customer Success", /customer success|support|cx |help desk|technical support/i],
  ["HR", /recruit|talent|hr |human resources|people ops/i],
  ["Legal", /legal|counsel|compliance|attorney|lawyer|paralegal/i],
];

export function inferCategory(title: string, tags: string[]): string {
  const text = `${title} ${tags.join(" ")}`.toLowerCase();
  for (const [cat, re] of CATEGORY_KEYWORDS) {
    if (re.test(text)) return cat;
  }
  return "Other";
}

/** Deduplicate by normalized title+company key */
export function deduplicateJobs<T extends { title: string; company: string; url: string }>(
  jobs: T[]
): T[] {
  const seen = new Map<string, T>();
  for (const job of jobs) {
    const key = `${job.title.toLowerCase().trim()}|${job.company.toLowerCase().trim()}`;
    if (!seen.has(key)) seen.set(key, job);
  }
  return Array.from(seen.values());
}

export function slugId(source: string, raw: string | number): string {
  return `${source}-${String(raw).replace(/[^a-z0-9]/gi, "-")}`;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function inferCountry(location: string): string | undefined {
  const loc = location.toLowerCase();
  if (/bangladesh|dhaka|chittagong|sylhet/.test(loc)) return "BD";
  if (/united states|usa|\bus\b|new york|san francisco|seattle|boston|austin/.test(loc)) return "US";
  if (/united kingdom|uk\b|london|manchester/.test(loc)) return "GB";
  if (/canada|toronto|vancouver|montreal/.test(loc)) return "CA";
  if (/germany|berlin|munich|hamburg/.test(loc)) return "DE";
  if (/india|bangalore|mumbai|delhi|hyderabad/.test(loc)) return "IN";
  if (/remote|worldwide|anywhere/i.test(loc)) return undefined;
  return undefined;
}
