import { NextResponse } from "next/server";
import { fetchAllJobs } from "@/lib/sources";
import { cache } from "@/lib/cache";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST() {
  try {
    cache.del("aggregated-jobs");
    const result = await fetchAllJobs(true);
    return NextResponse.json({
      message: "Refresh complete",
      total: result.total,
      sources: result.stats.map((s) => ({
        source: s.source,
        label: s.label,
        count: s.count,
        error: s.error,
        durationMs: s.durationMs,
      })),
      fetched: result.fetched,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "POST to this endpoint to force a refresh" });
}
