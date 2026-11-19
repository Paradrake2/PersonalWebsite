import assert from "node:assert/strict";
import { test } from "node:test";
import { diceCommitsApi, getDiceCommits, parseCommits } from "../app/lib/github-commits.ts";

const sha = "0123456789abcdef0123456789abcdef01234567";
const fixture = {
  sha,
  html_url: "https://example.com/untrusted-link",
  commit: { message: "Improve card selection\n\nLonger explanation", committer: { date: "2026-11-18T12:00:00Z" } },
};

test("commit summaries use the first line and link to the expected repository", () => {
  assert.deepEqual(parseCommits([fixture]), [{
    sha,
    message: "Improve card selection",
    date: "2026-11-18T12:00:00Z",
    url: `https://github.com/Paradrake2/UntitledDiceGame/commit/${sha}`,
  }]);
  assert.equal(parseCommits(Array(10).fill(fixture)).length, 6);
});

test("invalid commit records are ignored", () => {
  assert.deepEqual(parseCommits({ message: "API rate limit exceeded" }), []);
  assert.deepEqual(parseCommits([null, {}, { ...fixture, sha: "invalid" }, { ...fixture, commit: { message: "Example", committer: { date: "invalid" } } }]), []);
});

test("current history uses an hourly cached public request", async () => {
  const fetcher: typeof fetch = async (input, options) => {
    assert.equal(input, diceCommitsApi);
    assert.equal(options?.next?.revalidate, 3600);
    assert.equal(new Headers(options?.headers).has("Authorization"), false);
    return Response.json([fixture]);
  };
  const result = await getDiceCommits(fetcher);
  assert.equal(result.source, "github");
  assert.equal(result.commits[0].sha, sha);
});

test("network errors, rate limits, and malformed responses use the dated snapshot", async () => {
  const fetchers: (typeof fetch)[] = [
    async () => { throw new Error("Network unavailable"); },
    async () => new Response("Rate limited", { status: 429 }),
    async () => new Response("Invalid JSON"),
    async () => Response.json([]),
  ];
  for (const fetcher of fetchers) {
    const result = await getDiceCommits(fetcher);
    assert.equal(result.source, "snapshot");
    assert.equal(result.verifiedOn, "2026-11-18");
    assert.equal(result.commits.length, 6);
    assert.ok(result.commits.every(commit => commit.url.startsWith("https://github.com/Paradrake2/UntitledDiceGame/commit/")));
  }
});
