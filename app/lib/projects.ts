export type ProjectScreenshot = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  technologies: string[];
  problem: string;
  decisions: string[];
  features: string[];
  source: string;
  demo?: string;
  demoLabel?: string;
  note?: string;
  image?: string;
  imageAlt?: string;
  screenshots?: ProjectScreenshot[];
};

export const projects: Project[] = [
  {
    slug: "untitleddicegame",
    image: "/projects/untitleddicegame/Screenshot 2026-11-18 194041.png",
    imageAlt: "Untitled Dice Game combat prototype showing an enemy, turn indicator, and six card slots",
    screenshots: [
      {
        src: "/projects/untitleddicegame/Screenshot 2026-11-18 194041.png",
        alt: "Combat screen with enemy stats above a six-slot loadout of attack, shield, and fire cards",
        title: "Turn-based combat",
        caption: "The combat prototype brings together enemy stats, a turn indicator, and the six-card loadout.",
        width: 758,
        height: 460,
      },
      {
        src: "/projects/untitleddicegame/Screenshot 2026-11-18 193946.png",
        alt: "Main menu with gem-based upgrades on the left and a grid of achievement icons on the right",
        title: "Progression and achievements",
        caption: "The main menu brings gem-based upgrades and achievement progress into one view.",
        width: 865,
        height: 486,
      },
      {
        src: "/projects/untitleddicegame/Screenshot 2026-11-18 194001.png",
        alt: "Card shop showing the current loadout beside separate purchasable and upgradable card sections",
        title: "Card shop and loadout",
        caption: "The shop separates card purchases from upgrades while keeping the current loadout visible.",
        width: 856,
        height: 474,
      },
    ],
    title: "Untitled Dice Game",
    category: "Game development",
    summary: "A dice-driven Unity game where rerolls and a customizable card loadout shape turn-based battles.",
    role: "Game creator & developer",
    technologies: ["Unity", "C#", "ScriptableObjects"],
    problem: "Combine the uncertainty of dice rolls with deliberate choices about rerolls, card placement, and upgrades.",
    decisions: [
      "Die faces map to card positions, while duplicate rolls and special combinations modify a card's effect.",
      "Cards use ScriptableObjects with shared stat and upgrade definitions; runtime clones keep in-game changes separate from the original assets.",
      "Combat events let interface animations respond to gameplay changes, and serialized run data supports saving and resuming progress.",
    ],
    features: ["Dice rolls, selective rerolls, and combination bonuses", "Card loadouts and turn-based combat", "Card upgrades, status effects, and saved runs"],
    source: "https://github.com/Paradrake2/UntitledDiceGame",
  },
  {
    slug: "sec-incident-api",
    image: "/projects/sec-incident-api.png",
    imageAlt: "Swagger documentation showing the incident creation, assessment, and review API endpoints",
    title: "SEC Incident API",
    category: "Backend engineering",
    summary: "A team coursework API for collecting incident evidence and supporting a human review workflow.",
    role: "Team 105 · coursework contributor",
    technologies: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "pytest"],
    problem: "Give an incident detection service a structured way to submit evidence, track incident state, and support subsequent review.",
    decisions: [
      "A REST interface separates incident ingestion from the detection service that submits reports.",
      "Explicit incident states separate preliminary rule-based screening from human review decisions.",
      "PostgreSQL persistence and automated API tests support the backend workflow.",
    ],
    features: ["Incident submission and retrieval", "State tracking and preliminary assessment", "Human review and related-incident links"],
    source: "https://github.com/Paradrake2/sec450-incident-api",
    demo: "https://sec450-incident-api.onrender.com/docs",
    demoLabel: "Explore API docs",
    note: "Educational prototype using synthetic data. The public demo is unauthenticated; do not submit real incident information. Screening and draft output require human review.",
  },
  {
    slug: "arrowcube",
    image: "/projects/arrowcube.png",
    imageAlt: "Arrow Cube browser game with a cube of directional arrows",
    title: "Arrow Cube",
    category: "Puzzle game",
    summary: "A 3D logic puzzle about finding the right order to remove arrows from a cube.",
    role: "Game developer",
    technologies: ["Unity", "3D puzzles", "Browser game"],
    problem: "Turn a simple removal rule into a spatial reasoning puzzle that rewards planning ahead.",
    decisions: [
      "The cube layout makes the removal sequence a spatial problem rather than a flat list of moves.",
      "A browser-playable version makes the puzzle accessible from a direct link.",
    ],
    features: ["3D cube-based puzzle", "Order-dependent arrow removal", "Playable browser demo on itch.io"],
    source: "https://github.com/Paradrake2/ArrowCube",
    demo: "https://paradrake2.itch.io/arrowcube",
    demoLabel: "Play on itch.io",
  },
  {
    slug: "turingmachine",
    image: "/projects/turingmachine.png",
    imageAlt: "The Turing machine simulator with tape input, states, and transition rule controls",
    title: "Turing Machine Simulator",
    category: "Interactive learning",
    summary: "An interactive tool for exploring states, tape symbols, and the rules behind a Turing machine.",
    role: "Developer",
    technologies: ["TypeScript", "React", "Next.js"],
    problem: "Make an abstract computer science model tangible by letting students define rules and inspect the resulting tape.",
    decisions: [
      "Transition rules explicitly represent the current state, read symbol, write symbol, next state, and head movement.",
      "Execution stays in the browser, so experimenting does not require a server round trip.",
      "A step limit prevents a non-halting rule set from blocking the page indefinitely.",
    ],
    features: ["Editable input and alphabet", "Custom states and acceptance conditions", "Configurable transition rules"],
    source: "https://github.com/Paradrake2/TuringMachineProject",
    demo: "/projects/turingmachine#simulator",
    demoLabel: "Try the simulator",
  },
];
