import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/app/lib/projects";
import ProjectVisual from "./ProjectVisual";
import ProjectGallery from "./ProjectGallery";

export default function CaseStudy({ project, children, media }: { project: Project; children?: ReactNode; media?: ReactNode }) {
  return (
    <main id="main-content" className="page-shell case-study">
      <Link href="/projects" className="back-link">All projects</Link>
      <header className="page-heading"><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p className="lead">{project.summary}</p>
        <div className="actions">{project.demo && <Link className="button button-primary" href={project.demo}>{project.demoLabel}</Link>}<a className="button button-secondary" href={project.source}>View source code</a></div>
      </header>
      <dl className="project-facts"><div><dt>My role</dt><dd>{project.role}</dd></div><div><dt>Built with</dt><dd>{project.technologies.join(" · ")}</dd></div></dl>
      {media ?? (project.screenshots?.length ? <ProjectGallery screenshots={project.screenshots} /> : <figure><ProjectVisual project={project} /><figcaption>{project.image ? `${project.title} preview.` : "Concept illustration of the project."} {project.demo ? "Open the demo to see it in action." : "Explore the implementation in the source code."}</figcaption></figure>)}
      <div className="case-columns"><section><p className="eyebrow">The problem</p><h2>What I set out to build</h2><p>{project.problem}</p><h3>Core features</h3><ul className="feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section><section><p className="eyebrow">The approach</p><h2>Technical decisions</h2><ul className="decision-list">{project.decisions.map(decision => <li key={decision}>{decision}</li>)}</ul></section></div>
      {project.note && <p className="notice">{project.note}</p>}
      {children}
      <section className="contact-strip"><div><p className="eyebrow">See the implementation</p><h2>Explore the code behind the project.</h2></div><a className="button button-secondary" href={project.source}>Open GitHub repository</a></section>
    </main>
  );
}
