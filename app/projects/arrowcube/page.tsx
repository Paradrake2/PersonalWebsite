import type { Metadata } from "next";
import CaseStudy from "../../components/CaseStudy";
import { projects } from "../../lib/projects";
export const metadata: Metadata = { title: "Arrow Cube" };
export default function ArrowCubePage() { return <CaseStudy project={projects[2]} />; }
