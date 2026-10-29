// All site content lives here. Edit this file to update the portfolio —
// no component changes needed.

export const site = {
  name: "Saksham Upreti",
  firstName: "Saksham",
  lastName: "Upreti",
  role: "Full-Stack & AI Engineer",
  tagline:
    "I build retrieval-augmented AI systems and the full-stack products around them — from sharded vector search to the UI you click.",
  location: "India",
  email: "sakshamupreti101@gmail.com",
  phone: "+91 8445892556",
  github: "https://github.com/saksham101s",
  linkedin: "https://www.linkedin.com/in/saksham-upreti-15539b288",
  resume: "/Saksham_Upreti_Resume.pdf",
  currently: "SWE Intern @ BIOWELLTH",
  // Set NEXT_PUBLIC_SITE_URL in Vercel once you have the final domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://saksham-upreti.vercel.app",
};

export const about = {
  paragraphs: [
    "I'm a Computer Science undergrad at BTKIT (class of 2027) who likes the part of AI engineering most people skip: the systems underneath. Chunking strategies, embedding pipelines, sharded indexes, failover, tracing — the plumbing that decides whether a RAG app is a demo or a product.",
    "Right now I'm a Software Engineering Intern at BIOWELLTH, shipping Azure AI Foundry features into a production app and working across the stack. On the side I build AI tools end-to-end — a distributed RAG engine, a document-chat app, and a GitHub App that reviews PRs with full-repo context.",
  ],
  stats: [
    { value: "3", label: "AI systems built end-to-end" },
    { value: "1", label: "production AI integration shipped" },
    { value: "'27", label: "B.Tech CS, BTKIT" },
  ],
};

export type Experience = {
  company: string;
  title: string;
  period: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "BIOWELLTH",
    title: "Software Engineering Intern",
    period: "Jan 2026 — Present",
    current: true,
    points: [
      "Integrated Microsoft Azure AI Foundry capabilities into the production application, evaluating new AI features and wiring them into the existing product.",
      "Diagnosed and fixed frontend bugs and shipped UI improvements, improving end-user experience and overall product stability.",
      "Delivered features across the full stack, building backend functionality alongside frontend work.",
    ],
    tags: ["Azure AI Foundry", "Full-Stack", "Production"],
  },
];

export type Project = {
  slug: string;
  name: string;
  summary: string;
  score: number; // "similarity" shown on the card
  status: "active" | "in development" | "shipped";
  period: string;
  stack: string[];
  points: string[];
  pipeline: string[]; // rendered as an animated flow diagram
  github?: string;
  demo?: string;
  keywords: string[]; // used by the ⌘K search
};

export const projects: Project[] = [
  {
    slug: "distributed-rag",
    name: "Distributed RAG System",
    summary:
      "A horizontally-sharded RAG engine with consistent hashing, scatter-gather over gRPC and failure-tolerant retrieval.",
    score: 0.97,
    status: "active",
    period: "Aug 2026 — Present",
    stack: ["Python", "FastAPI", "gRPC", "FAISS", "Redis", "PostgreSQL", "Docker", "OpenTelemetry"],
    points: [
      "Implemented consistent hashing from scratch to distribute vector embeddings across FAISS index nodes with minimal data movement on node join/leave.",
      "Built a scatter-gather query coordinator over gRPC that queries all shards concurrently, merges ranked results and tolerates partial shard failures via timeouts.",
      "Added shard replication, health-check-based failover, Redis caching and end-to-end OpenTelemetry tracing.",
    ],
    pipeline: ["Query", "Coordinator", "Shards ×N", "Merge + Rank", "Response"],
    keywords: ["distributed", "rag", "sharding", "consistent hashing", "grpc", "faiss", "python", "fastapi", "redis", "systems", "backend", "vector"],
  },
  {
    slug: "documind",
    name: "DocuMind",
    summary:
      "Full-stack AI document chat — upload PDFs and hold grounded, context-aware Q&A over them.",
    score: 0.93,
    status: "active",
    period: "Aug 2026 — Present",
    stack: ["Next.js", "TypeScript", "pgvector", "Voyage AI", "Anthropic API", "Clerk", "Supabase", "Tailwind"],
    points: [
      "Complete RAG pipeline: chunking, Voyage AI embeddings, pgvector retrieval and grounded generation with the Anthropic API.",
      "Clerk authentication, Supabase Storage for files, and a Next.js App Router frontend with a custom Tailwind design system.",
      "Implementing Contextual Retrieval with prompt caching to push retrieval accuracy beyond standard chunk-based RAG.",
    ],
    pipeline: ["PDF", "Chunk", "Embed", "pgvector", "Claude"],
    keywords: ["documind", "pdf", "chat", "rag", "nextjs", "typescript", "pgvector", "anthropic", "claude", "full-stack", "frontend", "contextual retrieval"],
  },
  {
    slug: "argus",
    name: "Argus — AI Code Review",
    summary:
      "A GitHub App that reviews every pull request with full-repository context, not just the diff.",
    score: 0.9,
    status: "in development",
    period: "In development",
    stack: ["Next.js", "TypeScript", "pgvector", "Voyage AI", "Anthropic API", "Auth.js", "Octokit", "Semgrep"],
    points: [
      "Retrieval over a vector index of the whole repo to catch duplicated logic and conflicts with existing patterns.",
      "Pipeline: GitHub webhooks → Next.js route handlers → pgvector retrieval → Claude-generated structured findings posted as inline PR comments.",
      "GitHub App + OAuth (Auth.js) and database foundations done; webhook/diff pipeline in progress, Semgrep pass and quality dashboard planned.",
    ],
    pipeline: ["Webhook", "Route Handler", "Retrieve", "Claude", "PR Comments"],
    keywords: ["argus", "code review", "github app", "pull request", "pr", "nextjs", "pgvector", "claude", "anthropic", "devtools", "octokit"],
  },
];

export const skills: { cluster: string; items: string[] }[] = [
  { cluster: "AI / RAG", items: ["Retrieval-Augmented Generation", "Vector Embeddings", "pgvector", "FAISS", "Contextual Retrieval", "Prompt Engineering", "Anthropic API", "Azure AI Foundry"] },
  { cluster: "Web & Backend", items: ["Next.js (App Router)", "React", "Tailwind CSS", "FastAPI", "REST APIs", "gRPC", "GitHub Apps / Octokit", "Auth.js", "Clerk"] },
  { cluster: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { cluster: "Data & Infra", items: ["PostgreSQL", "Supabase", "Redis", "Docker", "OpenTelemetry", "Semgrep"] },
  { cluster: "Mobile", items: ["Flutter", "Dart", "Firebase"] },
  { cluster: "Tools", items: ["Git / GitHub", "Claude Code", "Cursor"] },
];

export const education = {
  school: "Bipin Tripathi Kumaon Institute of Technology",
  degree: "B.Tech, Computer Science",
  period: "2023 — 2027 (Expected)",
  coursework: ["Data Structures", "Algorithms", "Databases", "Operating Systems", "Machine Learning"],
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
