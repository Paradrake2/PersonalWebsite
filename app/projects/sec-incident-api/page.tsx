import type { Metadata } from "next";
import CaseStudy from "../../components/CaseStudy";
import { projects } from "../../lib/projects";
export const metadata: Metadata = { title: "SEC Incident API" };
export default function IncidentApiPage() { return <CaseStudy project={projects[1]} />; }
