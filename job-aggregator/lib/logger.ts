const isDev = process.env.NODE_ENV !== "production";

function ts() {
  return new Date().toISOString().slice(11, 19);
}

export const log = {
  info: (msg: string) => console.log(`[${ts()}] ℹ  ${msg}`),
  success: (source: string, count: number, ms: number) =>
    console.log(`[${ts()}] ✓  ${source.padEnd(20)} ${count} jobs  (${ms}ms)`),
  error: (source: string, err: unknown) =>
    console.error(`[${ts()}] ✗  ${source.padEnd(20)} ${err instanceof Error ? err.message : String(err)}`),
  skip: (source: string, reason: string) =>
    isDev && console.log(`[${ts()}] ⟳  ${source.padEnd(20)} skipped — ${reason}`),
  section: (title: string) =>
    console.log(`\n[${ts()}] ═══ ${title} ═══`),
};
