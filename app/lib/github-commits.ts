import { diceCommitSnapshot } from "../../content/projects/untitleddicegame/commits.ts";

const repository = "https://github.com/Paradrake2/UntitledDiceGame";
export const diceHistoryUrl = `${repository}/commits/main/`;
export const diceCommitsApi = "https://api.github.com/repos/Paradrake2/UntitledDiceGame/commits?sha=main&per_page=6";

export type GitHubCommit = { sha: string; url: string; message: string; date: string };
export type CommitHistoryResult = {
  commits: GitHubCommit[];
  source: "github" | "snapshot";
  verifiedOn?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function parseCommits(value: unknown): GitHubCommit[] {
  if (!Array.isArray(value)) return [];
  const commits: GitHubCommit[] = [];
  for (const item of value) {
    if (!isRecord(item) || typeof item.sha !== "string" || !/^[a-f0-9]{40}$/.test(item.sha) || !isRecord(item.commit)) continue;
    const commit = item.commit;
    if (typeof commit.message !== "string" || !isRecord(commit.committer)) continue;
    const date = commit.committer.date;
    if (typeof date !== "string" || !Number.isFinite(Date.parse(date))) continue;
    commits.push({
      sha: item.sha,
      url: `${repository}/commit/${item.sha}`,
      message: commit.message.split(/\r?\n/, 1)[0].trim().slice(0, 200) || `Commit ${item.sha.slice(0, 7)}`,
      date,
    });
    if (commits.length === 6) break;
  }
  return commits;
}

export async function getDiceCommits(fetcher: typeof fetch = fetch): Promise<CommitHistoryResult> {
  try {
    const response = await fetcher(diceCommitsApi, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "Leo-Goldstein-Portfolio" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error("Commit history unavailable");
    const commits = parseCommits(await response.json());
    if (!commits.length) throw new Error("Commit history unavailable");
    return { commits, source: "github" };
  } catch {
    return { commits: diceCommitSnapshot.commits, source: "snapshot", verifiedOn: diceCommitSnapshot.verifiedOn };
  }
}
