import type { NormalizedJob } from "../types";
import { normalizeJobType, normalizeDate, inferExperienceLevel, parseSalaryText, inferCategory, slugId, stripHtml } from "../normalizer";

const URL = "https://remotive.com/api/remote-jobs";

interface RemotiveJob {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo?: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
}

export async function fetchRemotive(): Promise<NormalizedJob[]> {
  const res = await fetch(URL, {
    headers: { "User-Agent": "JobBoardBD/1.0" },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json() as { jobs: RemotiveJob[] };

  return data.jobs.map((j) => ({
    id: slugId("remotive", j.id),
    title: j.title,
    company: j.company_name,
    companyLogo: j.company_logo,
    location: j.candidate_required_location || "Remote",
    country: undefined,
    type: normalizeJobType(j.job_type),
    category: inferCategory(j.title, j.tags),
    salary: parseSalaryText(j.salary),
    description: stripHtml(j.description).slice(0, 500),
    url: j.url,
    source: "remotive",
    sourceLabel: "Remotive",
    postedAt: normalizeDate(j.publication_date),
    isRemote: true,
    tags: j.tags ?? [],
    experienceLevel: inferExperienceLevel(j.title),
  }));
}
