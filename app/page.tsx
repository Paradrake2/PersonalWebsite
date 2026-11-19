import Link from "next/link";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./lib/projects";
import { profile } from "./lib/profile";

export default function Home() {
  return <main id="main-content">
    <section className="hero page-shell">
      <div className="hero-copy"><p className="eyebrow">Leo Goldstein / Software developer</p><h1>Curiosity.<br />Code.<br /><span>Something you can use.</span></h1><p className="hero-role">Computer Science student at Purdue Indianapolis</p><p className="lead">I build games, interactive web applications, and backend APIs—turning ideas into software you can play with, explore, and build on.</p><div className="actions"><Link className="button button-primary" href="/projects">View projects</Link><a className="button button-secondary" href={profile.github}>GitHub</a><a className="button button-secondary" href={profile.linkedin}>LinkedIn</a><a className="text-action" href={profile.resume}>Request résumé</a></div></div>
      <aside className="hero-note" aria-label="Development interests"><span className="note-label">IDEAS INTO IMPLEMENTATIONS</span><div className="hero-code" aria-hidden="true"><span className="code-muted">const</span> developer = &#123;<br /><span className="code-indent">name: <span className="code-value">&quot;Leo&quot;</span>,</span><br /><span className="code-indent">focus: [</span><br /><span className="code-indent double"><span className="code-value">&quot;games&quot;</span>,</span><br /><span className="code-indent double"><span className="code-value">&quot;web&quot;</span>,</span><br /><span className="code-indent double"><span className="code-value">&quot;systems&quot;</span></span><br /><span className="code-indent">]</span><br />&#125;;</div><p>A good way to understand something?<br /><strong>Build it. Then make it better.</strong></p></aside>
    </section>
    <section className="work-section page-shell" aria-labelledby="selected-work"><div className="section-heading"><div><p className="eyebrow">Selected work</p><h2 id="selected-work">A few things I’ve built.</h2></div><Link className="text-action" href="/projects">Explore all projects</Link></div><div className="project-grid">{projects.slice(0, 3).map(project => <ProjectCard project={project} key={project.slug} />)}</div></section>
    <section className="about-preview page-shell"><p className="eyebrow">How I learn</p><div><h2>I learn by making<br />ideas work.</h2><p>From dice-driven combat to a simulator’s transition rules, I like projects that connect an interesting problem with a concrete implementation.</p><Link className="text-action" href="/aboutme">More about me</Link></div></section>
    <section className="page-shell"><div className="contact-strip"><div><p className="eyebrow">Let’s connect</p><h2>Have a project or opportunity in mind?</h2><p>I’d like to hear about it.</p></div><Link className="button button-primary" href="/contact">Get in touch</Link></div></section>
  </main>;
}
