// lib/portfolioData.ts
// Single source of truth for all portfolio content

export const personalInfo = {
  name: "Jeeban Mohanty",
  title: "AI Engineer | RAG | LLMs | Agentic AI",
  tagline: "Systems Architect & RAG Practitioner",
  college: "Trident Academy of Technology, Bhubaneswar",
  degree: "B.Tech in Computer Science & Engineering",
  duration: "2023–2027",
  email: "jeebanmohanty45@gmail.com",
  github: "https://github.com/JeebanM",
  linkedin: "https://www.linkedin.com/in/jeeban-mohanty-4b781a28b/",
  about: `I'm Jeeban Mohanty, an AI Engineer focused on Retrieval-Augmented Generation (RAG), Large Language Models, Agentic AI, and full-stack AI systems. I build practical AI applications involving hybrid retrieval, vector databases, LLM evaluation, AI agents, document intelligence, and production-oriented APIs.`,
  status: "Open to AI Engineering Roles",
};

export const projects = [
  {
    id: "ragbench",
    title: "RagBench — RAG Evaluation & Optimization Platform",
    description:
      "A platform for evaluating, comparing, and improving Retrieval-Augmented Generation pipelines. Features document ingestion, recursive chunking, hybrid dense + sparse retrieval, Reciprocal Rank Fusion, cross-encoder reranking, LLM generation, and RAG evaluation metrics — all configurable for interactive experimentation.",
    tags: ["Python", "FastAPI", "Qdrant", "BM25", "RRF", "Gemini", "Sentence Transformers", "Docker", "React"],
    github: "https://github.com/JeebanM",
    demo: "#",
    featured: true,
    icon: "analytics",
    color: "primary",
  },
  {
    id: "sustainiq",
    title: "SustainIQ — Sustainable Facility & Estate Intelligence",
    description:
      "An AI-powered facility intelligence and ESG analytics dashboard designed to monitor, analyze, predict, and optimize building operations. Combines energy analytics, water monitoring, waste tracking, air-quality monitoring, anomaly detection (Isolation Forest), forecasting (Prophet/ARIMA), AI-generated insights, and explainable ML (SHAP/XGBoost).",
    tags: ["Python", "Streamlit", "Gemini", "Prophet", "ARIMA", "XGBoost", "SHAP", "Isolation Forest", "SQLite"],
    github: "https://github.com/JeebanM",
    demo: "#",
    featured: true,
    icon: "eco",
    color: "tertiary",
  },
  {
    id: "ai-interviewer",
    title: "AI Technical Interviewer & Voice Evaluation System",
    description:
      "An AI-powered technical interviewing platform that conducts interviews, evaluates candidate responses, analyzes voice and transcripts, and produces structured assessments. Uses multi-agent orchestration for interview planning, RAG-based question generation, speech transcription, coding assessment, and a recruiter dashboard.",
    tags: ["Generative AI", "Multi-Agent AI", "RAG", "Speech-to-Text", "Text-to-Speech", "FastAPI", "React", "PostgreSQL"],
    github: "https://github.com/JeebanM",
    demo: "#",
    featured: false,
    icon: "record_voice_over",
    color: "secondary",
  },
  {
    id: "pii-detection",
    title: "PII Detection & Redaction AI",
    description:
      "An AI-powered document intelligence system that identifies Personally Identifiable Information (PII) in documents and supports automated detection and redaction workflows. Built using Gemini API and Document AI with OCR. Semi-Finalist at Smart India Hackathon.",
    tags: ["Gemini API", "Document AI", "OCR", "Python", "LLMs"],
    github: "https://github.com/JeebanM",
    demo: "#",
    featured: false,
    icon: "security",
    color: "error",
  },
  {
    id: "talent-bridge",
    title: "Talent Bridge AI",
    description:
      "An AI-based job mapping and candidate profiling platform that analyzes resumes and skills, then matches candidate profiles with relevant job requirements using semantic and vector-based matching. Winner of the BPUT Hackathon 2024.",
    tags: ["Sentence Transformers", "Vector Search", "Embeddings", "FastAPI", "React", "Semantic Matching"],
    github: "https://github.com/JeebanM",
    demo: "#",
    featured: false,
    icon: "groups",
    color: "secondary",
  },
];

export const skills = {
  "AI & Machine Learning": [
    "Generative AI", "LLMs", "RAG", "Agentic AI",
    "Multi-Agent Systems", "Prompt Engineering", "LLM Evaluation",
    "Fine-tuning", "LoRA / QLoRA", "Embeddings", "OCR",
    "Computer Vision", "Speech AI",
  ],
  "RAG & Retrieval": [
    "Qdrant", "Vector Databases", "Dense Retrieval",
    "BM25", "Hybrid Search", "RRF", "Reranking",
    "Cross-Encoders", "Semantic Search", "Chunking", "Document Parsing", "RAGAS",
  ],
  "LLMs & Models": [
    "Gemini", "Claude", "LLaMA", "Mistral",
    "Ollama", "Hugging Face", "Sentence Transformers",
  ],
  "Backend": [
    "Python", "FastAPI", "Node.js", "Express.js", "REST APIs",
  ],
  "Frontend": [
    "React", "Next.js", "TypeScript", "HTML", "CSS",
    "JavaScript", "Tailwind CSS", "Streamlit",
  ],
  "Databases": [
    "PostgreSQL", "MongoDB", "SQLite", "Qdrant", "FAISS",
  ],
  "DevOps & Tools": [
    "Docker", "Git", "GitHub", "GitHub Actions",
    "Vercel", "Render", "Railway", "Postman", "VS Code",
  ],
};

export const experience = [
  {
    role: "Blockchain Intern",
    company: "EcoServeDev",
    department: "Impact Tech Department",
    duration: "June 30 – July 30, 2024",
    type: "internship",
    description:
      "Worked on a Proof-of-Stake based carbon-credit and renewable-energy blockchain project. Debugged and stabilized blockchain application code, worked across frontend, backend, and database components, and assisted with deployment and integration.",
    tags: ["Blockchain", "Proof-of-Stake", "Carbon Credits", "Full-Stack", "Deployment"],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Trident Academy of Technology",
    location: "Bhubaneswar, Odisha",
    duration: "2023 – 2027",
    status: "Currently Enrolled",
  },
];

export const achievements = [
  {
    title: "BPUT Hackathon — Winner 🏆",
    description:
      "Winner of the BPUT Hackathon 2024 for developing Talent Bridge, an AI-based job mapping and candidate profiling ecosystem using semantic and vector-based matching.",
    icon: "emoji_events",
    color: "tertiary",
  },
  {
    title: "Smart India Hackathon — Semi-Finalist 🏆",
    description:
      "Semi-Finalist at Smart India Hackathon for a PII Detection and Redaction AI solution selected under a Ministry of Electronics and Information Technology-related problem statement.",
    icon: "stars",
    color: "primary",
  },
  {
    title: "State-Level Volleyball Champion 🏐",
    description:
      "Represented Odisha at the state level and was selected for the National Volleyball Championship contingent.",
    icon: "sports_volleyball",
    color: "secondary",
  },
  {
    title: "NIT Rourkela — Outdoor Sports Winner 🏆",
    description:
      "Received a trophy from NIT Rourkela for securing first place in an outdoor sports event — Tug of War.",
    icon: "emoji_events",
    color: "primary",
  },
];

export const pipelineSteps = {
  query: {
    title: "User Query Tokenization & Normalization",
    desc: "Incoming requests are tokenized, sanitizing prompt injections, stripping zero-width spaces, and generating dense query embeddings using BAAI/bge-small-en-v1.5.",
    latency: "1.2 ms",
    gain: "0% (Input)",
    icon: "person_search",
    badge: "INGEST",
  },
  processing: {
    title: "Query Expansion & HyDE",
    desc: "Zero-shot pseudo-answer expansion creates hypothetical document embeddings that dramatically elevate vector similarity for ambiguous user queries.",
    latency: "38 ms",
    gain: "+14.2% Recall",
    icon: "tune",
    badge: "EXPAND",
  },
  retrieval: {
    title: "Hybrid Retrieval (Qdrant Dense + BM25 Sparse)",
    desc: "Parallel dual-path retrieval: dense semantic search via Qdrant HNSW index and sparse BM25 keyword matching run concurrently, maximizing recall coverage.",
    latency: "42ms + 18ms",
    gain: "+27.4% MRR",
    icon: "manage_search",
    badge: "ACTIVE PARALLEL",
  },
  rrf: {
    title: "Reciprocal Rank Fusion (k=60)",
    desc: "RRF merges dense and sparse result lists into a unified ranking without requiring score normalization, using the 1/(k + rank) formula for robust score fusion.",
    latency: "4 ms",
    gain: "+8.1% NDCG",
    icon: "merge",
    badge: "FUSE",
  },
  rerank: {
    title: "Cross-Encoder Reranker",
    desc: "ms-marco-MiniLM-L-12-v2 cross-encoder scores query-document pairs jointly, providing fine-grained relevance scoring unavailable to bi-encoders.",
    latency: "62 ms",
    gain: "+19.3% Precision",
    icon: "sort",
    badge: "RERANK",
  },
  llm: {
    title: "LLM Generation (Gemini 2.5 Flash)",
    desc: "Top-k retrieved and reranked chunks are assembled into a structured context window. Gemini generates grounded, citation-aware responses with faithfulness > 0.94.",
    latency: "142 ms TTFT",
    gain: "0.942 Faithfulness",
    icon: "psychology",
    badge: "GENERATE",
  },
};

// AI Assistant system prompt — behavior rules only, facts come from RAG retrieval
export const AI_SYSTEM_PROMPT = `You are Jeeban Mohanty's AI Portfolio Assistant. You help recruiters, engineers, and visitors learn about Jeeban's work, skills, projects, education, and achievements.

RULES:
1. Use the retrieved knowledge context as your primary source of truth. Answer from it directly and accurately.
2. Never invent, assume, or fabricate personal information about Jeeban — marks, CGPA, project details, dates, or any other facts.
3. If the requested information is not present in the retrieved knowledge, say clearly: "I don't have that information in Jeeban's knowledge base."
4. Do not add unrelated information or pad answers with generic AI statements.
5. Do not share Jeeban's email, phone, LinkedIn, GitHub, or other contact details unless the user explicitly asks about contacting him or hiring opportunities.
6. For education, marks, CGPA, certificates, projects, achievements, skills, and experience — rely entirely on the retrieved knowledge.
7. When multiple retrieved sources are relevant, combine them accurately and completely.
8. Keep answers concise but sufficiently detailed to be genuinely useful.
9. Do not claim that information came from a specific document unless that document was actually retrieved and used.
10. If the retrieved information is insufficient to answer confidently, say so honestly instead of guessing.
11. If asked something completely unrelated to Jeeban (e.g., "write me a poem", "what is the weather"), politely redirect: "I'm Jeeban's portfolio assistant — I'm here to help with questions about his work, skills, and background."
12. When a user asks about hiring or contacting Jeeban, always provide: email jeebanmohanty45@gmail.com and LinkedIn https://www.linkedin.com/in/jeeban-mohanty-4b781a28b/`;

// Cached FAQ responses to save Gemini quota
export const FAQ_CACHE: Record<string, string> = {
  "what is ragbench": "RagBench is Jeeban's flagship project — a RAG evaluation and optimization platform. It uses Qdrant for dense vector search, BM25 for sparse keyword matching, RRF fusion to merge results, and a cross-encoder reranker for precision. Achieves 0.942 faithfulness score and 42ms P95 retrieval latency. Designed to benchmark and optimize RAG pipelines on custom corpora.",
  "what technologies does jeeban use": "Jeeban's core stack: Python, FastAPI, Qdrant, PostgreSQL, Docker for backend. AI/ML: Gemini, Claude, LLaMA, Hugging Face, Sentence Transformers. RAG-specific: BM25, RRF Fusion, Cross-Encoder Reranking, Hybrid Search. Frontend: React, Next.js, TypeScript, Streamlit.",
  "what is his education": "Jeeban is currently pursuing a B.Tech in Computer Science & Engineering at Trident Academy of Technology, Bhubaneswar (2023–2027).",
  "how can i contact him": "You can reach Jeeban at jeebanmohanty45@gmail.com or connect on LinkedIn at linkedin.com/in/jeeban-mohanty-4b781a28b/. He's open to AI Engineering roles!",
  "tell me about his projects": "Jeeban has built 5 major AI projects: (1) RagBench — RAG evaluation platform, (2) SustainIQ — AI facility intelligence & ESG dashboard, (3) AI Technical Interviewer — voice-enabled multi-agent interview system, (4) PII Detection & Redaction AI — SIH Semi-Finalist, (5) Talent Bridge AI — BPUT Hackathon 2024 Winner.",
  "is jeeban available for hire": "Yes! Jeeban is actively open to AI Engineering roles. You can reach him at jeebanmohanty45@gmail.com or via LinkedIn. He specializes in RAG systems, LLMs, and Agentic AI.",
  "what are his achievements": "Jeeban's achievements: 🏆 BPUT Hackathon 2024 Winner (Talent Bridge AI), 🏆 Smart India Hackathon Semi-Finalist (PII Detection AI), 🏐 State-Level Volleyball Champion (selected for Nationals), 🏆 NIT Rourkela Outdoor Sports Winner — Tug of War.",
  "what is sustainiq": "SustainIQ is an AI-powered facility intelligence and ESG analytics dashboard. It monitors building operations using IoT/synthetic data, detects anomalies (Isolation Forest), forecasts energy usage (Prophet/ARIMA), provides AI insights (Gemini), and explains ML decisions (XGBoost + SHAP). Built with Python, Streamlit, and SQLite.",
  "tell me about talent bridge": "Talent Bridge AI is an AI-based job mapping and candidate profiling platform. It analyzes resumes and skills, then matches candidates with job requirements using Sentence Transformers and vector-based semantic search. It won the BPUT Hackathon 2024.",
};
