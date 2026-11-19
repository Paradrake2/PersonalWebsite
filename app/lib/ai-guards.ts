import { createHash, timingSafeEqual } from "node:crypto";
import type { ImageType } from "./ai-contract.ts";

// Deliberately process-local. Public multi-instance use needs a shared limiter.
export function createRateLimiter(limit: number, windowMs: number) {
  const buckets = new Map<string, { count: number; resetAt: number }>();
  return (key: string, now = Date.now()) => {
    for (const [id, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(id);
    const bucket = buckets.get(key) ?? { count: 0, resetAt: now + windowMs };
    if (bucket.count >= limit || (!buckets.has(key) && buckets.size >= 10000)) return { allowed: false, retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
    bucket.count += 1;
    buckets.set(key, bucket);
    return { allowed: true, retryAfter: 0 };
  };
}
export function positiveInteger(value: string | undefined, fallback: number, max: number) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? Math.min(number, max) : fallback;
}
export function tokenMatches(actual: string | null, expected: string | undefined) {
  if (!actual || !expected) return false;
  // Hash before comparison to avoid exposing token length in a timing comparison.
  const a = createHash("sha256").update(actual).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
export function matchesImageSignature(bytes: Uint8Array, type: ImageType) {
  if (type === "image/png") return bytes.length >= 24 && [137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => bytes[i] === byte) && String.fromCharCode(...bytes.slice(12, 16)) === "IHDR";
  if (type === "image/jpeg") return bytes.length >= 4 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  return bytes.length >= 16 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
}
export class BodyTooLargeError extends Error {}
export async function readLimitedBody(request: Request, max: number) {
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  let length = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > max) { await reader.cancel(); throw new BodyTooLargeError(); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
  return body;
}
