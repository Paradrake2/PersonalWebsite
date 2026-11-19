import Link from "next/link";
import type { Project } from "@/app/lib/projects";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}`} className="visual-link" aria-label={`Read the ${project.title} case study`}><ProjectVisual project={project} /></Link>
      <div className="project-card-body">
        <p className="eyebrow">{project.category}</p>
        <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <ul className="tags" aria-label="Technologies">{project.technologies.slice(0, 3).map(technology => <li key={technology}>{technology}</li>)}</ul>
        <div className="card-links"><Link href={`/projects/${project.slug}`}>Case study</Link><a href={project.source}>Source code</a></div>
      </div>
    </article>
  );
}
