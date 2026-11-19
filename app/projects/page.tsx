import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../lib/projects";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software projects: Untitled Dice Game, SEC Incident API, Arrow Cube, and a Turing Machine Simulator.",
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Selected work</p>
        <h1>
          Projects with
          <br />
          <span>something to explore.</span>
        </h1>
        <p className="lead">
          Games, backend systems, and interactive tools. Each case study walks
          through the problem, the implementation, and the code behind it.
        </p>
      </header>

      <div className="project-grid projects-page-grid">
        {projects.map(project => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </div>

      <section className="archive-section">
        <p className="eyebrow">More to explore</p>
        <h2>Smaller projects & experiments</h2>
        <div className="archive-links">
          <Link href="/projects/capstone">Capstone project files</Link>
          <Link href="/projects/textgame">Text adventure</Link>
          <Link href="/projects/imagetoenemy">
            Image to Enemy · experimental preview
          </Link>
          <a href="https://github.com/Paradrake2/PersonalWebsite">
            This portfolio · source code
          </a>
        </div>
      </section>
    </main>
  );
}
