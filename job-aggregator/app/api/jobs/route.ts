import { NextRequest, NextResponse } from "next/server";
import { fetchAllJobs } from "@/lib/sources";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  try {
    const forceRefresh = req.nextUrl.searchParams.get("refresh") === "true";
    const result = await fetchAllJobs(forceRefresh);

    // Apply filters from query params
    const search = req.nextUrl.searchParams.get("search")?.toLowerCase();
    const source = req.nextUrl.searchParams.get("source");
    const type = req.nextUrl.searchParams.get("type");
    const category = req.nextUrl.searchParams.get("category");
    const country = req.nextUrl.searchParams.get("country");
    const isRemote = req.nextUrl.searchParams.get("remote");

    let jobs = result.jobs;

    if (search) {
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(search) ||
          j.company.toLowerCase().includes(search) ||
          j.description.toLowerCase().includes(search) ||
          j.tags.some((t) => t.toLowerCase().includes(search))
      );
    }
    if (source) jobs = jobs.filter((j) => j.source === source);
    if (type) jobs = jobs.filter((j) => j.type === type);
    if (category) jobs = jobs.filter((j) => j.category === category);
    if (country) jobs = jobs.filter((j) => j.country === country);
    if (isRemote === "true") jobs = jobs.filter((j) => j.isRemote);

    return NextResponse.json(
      {
        jobs,
        total: jobs.length,
        stats: result.stats,
        fetched: result.fetched,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
          "X-Total-Jobs": String(result.total),
          "X-Sources-Count": String(result.stats.filter((s) => s.count > 0).length),
        },
      }
    );
  } catch (err) {
    console.error("[API /jobs]", err);
    return NextResponse.json(
      { error: "Failed to fetch jobs", message: String(err) },
      { status: 500 }
    );
  }
}
