import assert from "node:assert/strict";
import { test } from "node:test";
import { MAX_IMAGE_BYTES, isEnemy, validateImage } from "../app/lib/ai-contract.ts";
import { BodyTooLargeError, createRateLimiter, matchesImageSignature, positiveInteger, readLimitedBody, tokenMatches } from "../app/lib/ai-guards.ts";

test("uploads allow supported images and reject empty, oversized, and unsupported files", () => {
  for (const type of ["image/png", "image/jpeg", "image/webp"]) assert.equal(validateImage({ type, size: MAX_IMAGE_BYTES }), null);
  assert.ok(validateImage({ type: "image/svg+xml", size: 100 }));
  assert.ok(validateImage({ type: "image/png", size: 0 }));
  assert.ok(validateImage({ type: "image/png", size: MAX_IMAGE_BYTES + 1 }));
});

test("MIME declarations must match file signatures", () => {
  const png = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1]);
  assert.equal(matchesImageSignature(png, "image/png"), true);
  assert.equal(matchesImageSignature(png, "image/jpeg"), false);
  assert.equal(matchesImageSignature(new TextEncoder().encode("<svg>not a PNG</svg>"), "image/png"), false);
  assert.equal(matchesImageSignature(Uint8Array.from([255, 216, 255, 224]), "image/jpeg"), true);
  assert.equal(matchesImageSignature(new TextEncoder().encode("RIFF0000WEBPVP8 "), "image/webp"), true);
});

test("rate limits isolate callers and reset after the window", () => {
  const limit = createRateLimiter(2, 60_000);
  assert.equal(limit("one", 100).allowed, true);
  assert.equal(limit("one", 101).allowed, true);
  assert.deepEqual(limit("one", 102), { allowed: false, retryAfter: 60 });
  assert.equal(limit("two", 103).allowed, true);
  assert.equal(limit("one", 60_100).allowed, true);
});

test("access code comparison rejects absent and incorrect codes", () => {
  assert.equal(tokenMatches(null, "secret"), false);
  assert.equal(tokenMatches("secret", undefined), false);
  assert.equal(tokenMatches("incorrect", "secret"), false);
  assert.equal(tokenMatches("secret", "secret"), true);
});

test("timeouts use safe defaults and cap configured values", () => {
  assert.equal(positiveInteger(undefined, 15000, 20000), 15000);
  assert.equal(positiveInteger("-1", 15000, 20000), 15000);
  assert.equal(positiveInteger("NaN", 15000, 20000), 15000);
  assert.equal(positiveInteger("90000", 15000, 20000), 20000);
  assert.equal(positiveInteger("5000", 15000, 20000), 5000);
});

test("stream size limits do not rely on a content-length header", async () => {
  const request = new Request("http://localhost", { method: "POST", body: "12345" });
  assert.equal(request.headers.has("content-length"), false);
  await assert.rejects(readLimitedBody(request, 4), BodyTooLargeError);
  const valid = new Request("http://localhost", { method: "POST", body: "1234" });
  assert.equal(new TextDecoder().decode(await readLimitedBody(valid, 4)), "1234");
});

test("model output must match bounded enemy data", () => {
  const valid = { name: "Stone sentinel", level: 1, stats: { hp: 20, attack: 5, defense: 10, speed: 1 }, behaviors: ["melee"] };
  assert.equal(isEnemy(valid), true);
  assert.equal(isEnemy({ ...valid, level: 1.5 }), false);
  assert.equal(isEnemy({ ...valid, name: "" }), false);
  assert.equal(isEnemy({ ...valid, behaviors: ["fly"] }), false);
  assert.equal(isEnemy({ ...valid, behaviors: [] }), false);
  assert.equal(isEnemy({ ...valid, stats: { ...valid.stats, hp: -1 } }), false);
  assert.equal(isEnemy({ ...valid, stats: { ...valid.stats, attack: Infinity } }), false);
  assert.equal(isEnemy(null), false);
});
