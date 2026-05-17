import type { NormalizedJob, SourceResult, AggregatedResult } from "../types";
import { deduplicateJobs } from "../normalizer";
import { cache } from "../cache";
import { log } from "../logger";

import { fetchRemotive } from "./remotive";
import { fetchArbeitnow } from "./arbeitnow";
import { fetchRemoteOK } from "./remoteok";
import { fetchHimalayas } from "./himalayas";
import { fetchWeWorkRemotely } from "./weworkremotely";
import { fetchUSAJobs } from "./usajobs";
import { fetchGreenhouse } from "./greenhouse";
import { fetchLever } from "./lever";
import { fetchAshby } from "./ashby";
import { fetchWorkable } from "./workable";
import { fetchAdzuna } from "./adzuna";
import { fetchJooble } from "./jooble";
import { fetchJSearch } from "./jsearch";
import { fetchTheMuse } from "./themuse";
import { fetchFindwork } from "./findwork";
import { fetchBdGovt } from "./bd-govt-scraper";
import { fetchBdPrivate } from "./bd-private-scraper";

const CACHE_KEY = "aggregated-jobs";

interface SourceDef {
  key: string;
  label: string;
  fn: () => Promise<NormalizedJob[]>;
  requiresEnv?: string[];
}

const SOURCES: SourceDef[] = [
  // Zero-auth — always attempted
  { key: "remotive",       label: "Remotive",         fn: fetchRemotive },
  { key: "arbeitnow",      label: "Arbeitnow",        fn: fetchArbeitnow },
  { key: "remoteok",       label: "RemoteOK",         fn: fetchRemoteOK },
  { key: "himalayas",      label: "Himalayas",        fn: fetchHimalayas },
  { key: "weworkremotely", label: "We Work Remotely", fn: fetchWeWorkRemotely },
  { key: "themuse",        label: "The Muse",         fn: fetchTheMuse },
  // ATS public feeds — always attempted
  { key: "greenhouse",     label: "Greenhouse",       fn: fetchGreenhouse },
  { key: "lever",          label: "Lever",            fn: fetchLever },
  { key: "ashby",          label: "Ashby",            fn: fetchAshby },
  { key: "workable",       label: "Workable",         fn: fetchWorkable },
  // BD scrapers — always attempted
  { key: "bd-govt",        label: "BD Govt",          fn: fetchBdGovt },
  { key: "bd-private",     label: "BD Private",       fn: fetchBdPrivate },
  // Requires API keys — only attempted if env vars present
  { key: "usajobs",   label: "USAJobs",  fn: fetchUSAJobs,  requiresEnv: ["USAJOBS_API_KEY", "USAJOBS_EMAIL"] },
  { key: "adzuna",    label: "Adzuna",   fn: fetchAdzuna,   requiresEnv: ["ADZUNA_APP_ID", "ADZUNA_APP_KEY"] },
  { key: "jooble",    label: "Jooble",   fn: fetchJooble,   requiresEnv: ["JOOBLE_API_KEY"] },
  { key: "jsearch",   label: "JSearch",  fn: fetchJSearch,  requiresEnv: ["RAPIDAPI_KEY"] },
  { key: "findwork",  label: "Findwork", fn: fetchFindwork, requiresEnv: ["FINDWORK_API_KEY"] },
];

function hasEnvVars(keys: string[]): boolean {
  return keys.every((k) => Boolean(process.env[k]));
}

async function runSource(def: SourceDef): Promise<SourceResult> {
  const start = Date.now();

  if (def.requiresEnv && !hasEnvVars(def.requiresEnv)) {
    log.skip(def.label, `set ${def.requiresEnv.join(", ")} in .env`);
    return { source: def.key, label: def.label, jobs: [], count: 0, error: "missing env vars", durationMs: 0 };
  }

  try {
    const jobs = await def.fn();
    const ms = Date.now() - start;
    log.success(def.label, jobs.length, ms);
    return { source: def.key, label: def.label, jobs, count: jobs.length, durationMs: ms };
  } catch (err) {
    const ms = Date.now() - start;
    log.error(def.label, err);
    return { source: def.key, label: def.label, jobs: [], count: 0, error: String(err), durationMs: ms };
  }
}

export async function fetchAllJobs(forceRefresh = false): Promise<AggregatedResult> {
  if (!forceRefresh) {
    const cached = cache.get<AggregatedResult>(CACHE_KEY);
    if (cached) {
      log.info(`Cache hit — ${cached.total} jobs (fetched ${cached.fetched.toISOString()})`);
      return cached;
    }
  }

  log.section("Fetching jobs from all sources");
  const start = Date.now();

  const settled = await Promise.allSettled(SOURCES.map(runSource));
  const stats: SourceResult[] = settled.map((r) =>
    r.status === "fulfilled" ? r.value : { source: "unknown", label: "Unknown", jobs: [], count: 0, error: String(r.reason), durationMs: 0 }
  );

  const allJobs = stats.flatMap((s) => s.jobs);
  const deduped = deduplicateJobs(allJobs);
  const sorted = deduped.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

  const result: AggregatedResult = {
    jobs: sorted,
    stats,
    total: sorted.length,
    fetched: new Date(),
  };

  log.section(`Done — ${sorted.length} unique jobs from ${stats.filter((s) => s.count > 0).length} sources in ${Date.now() - start}ms`);

  cache.set(CACHE_KEY, result);
  return result;
}

export { SOURCES };
