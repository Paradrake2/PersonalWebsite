import type { Metadata } from "next";
import CaseStudy from "../../components/CaseStudy";
import { projects } from "../../lib/projects";
import CommitHistory from "../../components/CommitHistory";
import { getDiceCommits } from "../../lib/github-commits";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Untitled Dice Game",
  description: "A Unity and C# project combining dice rerolls, card loadouts, and turn-based combat.",
};

export default async function UntitledDiceGamePage() {
  const project = projects.find(project => project.slug === "untitleddicegame")!;
  const history = await getDiceCommits();
  return <CaseStudy project={project}><CommitHistory history={history} /></CaseStudy>;
}
