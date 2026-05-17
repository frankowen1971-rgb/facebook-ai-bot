const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface CacheEntry<T> {
  data: T;
  expires: number;
}

class JobCache {
  private store = new Map<string, CacheEntry<unknown>>();

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
      this.store.delete(key);
      return null;
    }
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlMs = CACHE_TTL_MS): void {
    this.store.set(key, { data, expires: Date.now() + ttlMs });
  }

  del(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

// Singleton persisted across hot reloads in Next.js dev mode
const g = globalThis as typeof globalThis & { __jobCache?: JobCache };
if (!g.__jobCache) g.__jobCache = new JobCache();
export const cache = g.__jobCache;
