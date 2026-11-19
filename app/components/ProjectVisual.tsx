import type { Project } from "@/app/lib/projects";
import Image from "next/image";

export default function ProjectVisual({ project }: { project: Project }) {
  if (project.image) return <div className={`project-screenshot project-screenshot-${project.slug}`}><Image src={project.image} alt={project.imageAlt || project.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 560px" /></div>;
  return (
    <div className={`project-visual visual-${project.slug}`} role="img" aria-label={`${project.title}: ${project.slug === "untitleddicegame" ? "dice and card loadout concept illustration" : project.slug === "arrowcube" ? "cube puzzle illustration" : project.slug === "sec-incident-api" ? "incident API workflow diagram" : "tape and state transition illustration"}`}>
      <div className="visual-topline"><span>{project.category}</span><span aria-hidden="true">{project.slug === "sec-incident-api" ? "{ }" : "[ ]"}</span></div>
      {project.slug === "untitleddicegame" && <div className="dice-art" aria-hidden="true"><div className="dice-row">{[[4], [0, 4, 8], [0, 2, 3, 5, 6, 8]].map((pips, die) => <div className="die-face" key={die}>{Array.from({ length: 9 }, (_, pip) => <span className={pips.includes(pip) ? "die-pip" : ""} key={pip} />)}</div>)}</div><div className="dice-loadout">{[1, 2, 3, 4, 5, 6].map(slot => <span key={slot}>{slot}</span>)}</div><span className="art-caption">ROLL / REROLL / RESOLVE</span></div>}
      {project.slug === "arrowcube" && <div className="cube-art" aria-hidden="true"><div className="cube-face">{["↑", "→", "↑", "←", "↓", "→", "↑", "←", "↓"].map((arrow, i) => <span key={i}>{arrow}</span>)}</div><span className="art-caption">ONE CUBE. THE RIGHT SEQUENCE.</span></div>}
      {project.slug === "sec-incident-api" && <div className="api-art" aria-hidden="true"><div className="code-line"><span className="method">POST</span> /api/v1/incidents</div><div className="api-flow"><span>RECEIVED</span><i /><span>UNDER_REVIEW</span><i /><span>HUMAN REVIEW</span></div><span className="art-caption">EVIDENCE / ASSESSMENT / REVIEW</span></div>}
      {project.slug === "turingmachine" && <div className="tape-art" aria-hidden="true"><span className="state-chip">q0</span><div className="tape-cells">{["_", "1", "0", "1", "_"].map((symbol, i) => <span className={i === 2 ? "tape-active" : ""} key={i}>{symbol}</span>)}</div><span className="art-caption">READ / WRITE / MOVE</span></div>}
    </div>
  );
}
