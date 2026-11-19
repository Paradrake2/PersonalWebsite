import { diceHistoryUrl, type CommitHistoryResult } from "../lib/github-commits";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(value));
}

export default function CommitHistory({ history }: { history: CommitHistoryResult }) {
  return (
    <section className="commit-history" aria-labelledby="commit-history-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Development history</p>
          <h2 id="commit-history-title">Recent GitHub commits</h2>
          <p className="commit-intro">Follow the project through changes recorded in the repository.</p>
        </div>
        <a className="text-action" href={diceHistoryUrl}>View full commit history</a>
      </div>
      {history.source === "snapshot" && history.verifiedOn && (
        <p className="commit-snapshot">Saved history from {formatDate(history.verifiedOn)}. Visit GitHub for the latest changes.</p>
      )}
      <ol className="commit-list">
        {history.commits.map(commit => (
          <li key={commit.sha}>
            <a className="commit-entry" href={commit.url}>
              <time dateTime={commit.date}>{formatDate(commit.date)}</time>
              <span className="commit-message">{commit.message}</span>
              <code className="commit-sha" aria-label={`Commit ${commit.sha.slice(0, 7)}`}>{commit.sha.slice(0, 7)}</code>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
