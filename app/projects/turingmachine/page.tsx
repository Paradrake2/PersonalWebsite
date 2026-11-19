import type { Metadata } from "next";
import TuringMachine from "@/app/components/turingmachine/TuringMachine";
import CaseStudy from "../../components/CaseStudy";
import { projects } from "../../lib/projects";
export const metadata: Metadata = { title: "Turing Machine Simulator" };
export default function TuringPage() { return <CaseStudy project={projects[3]}><section id="simulator" className="simulator-section"><p className="eyebrow">Interactive demo</p><TuringMachine /></section></CaseStudy>; }
