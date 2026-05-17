export type JobType = "full-time" | "part-time" | "contract" | "internship" | "remote";
export type ExperienceLevel = "intern" | "entry" | "mid" | "senior" | "lead" | "executive";

export interface JobSalary {
  min: number;
  max: number;
  currency: string;
}

export interface NormalizedJob {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  country?: string;
  type: JobType;
  category: string;
  salary: JobSalary | null;
  description: string;
  url: string;
  source: string;
  sourceLabel: string;
  postedAt: Date;
  isRemote: boolean;
  tags: string[];
  experienceLevel?: ExperienceLevel;
}

export interface SourceResult {
  source: string;
  label: string;
  jobs: NormalizedJob[];
  count: number;
  error?: string;
  durationMs: number;
}

export interface AggregatedResult {
  jobs: NormalizedJob[];
  stats: SourceResult[];
  total: number;
  fetched: Date;
}
