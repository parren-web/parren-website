/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Good enough for an early-access form behind a CDN. Caveats (documented
 * in README):
 * - State lives per server instance: on serverless platforms each function
 *   instance has its own bucket, so this is a soft limit, not a hard one.
 * - Memory is bounded: entries expire out of the window and are pruned.
 * If abuse ever becomes a problem, swap this for a shared store
 * (e.g. Upstash Redis) behind the same `checkRateLimit` signature.
 */

type Bucket = number[]; // timestamps (ms) of recent hits
const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const cutoff = now - windowMs;

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = [];
    buckets.set(key, bucket);
  }

  // Drop expired hits
  while (bucket.length > 0 && bucket[0]! <= cutoff) bucket.shift();

  if (bucket.length >= limit) return false;

  bucket.push(now);

  // Opportunistic pruning so the map can't grow unboundedly
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      if (b.length === 0 || b[b.length - 1]! <= cutoff) buckets.delete(k);
      if (buckets.size <= 4000) break;
    }
  }

  return true;
}
