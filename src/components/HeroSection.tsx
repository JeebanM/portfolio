"use client";
import { personalInfo } from "@/lib/portfolioData";

export default function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-gutter py-space-xl overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] rounded-full bg-secondary/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-space-lg">
        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high shadow-sm">
            <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#4edea3] animate-pulse" />
            <span className="text-[11px] text-on-surface tracking-wider font-mono">
              {personalInfo.tagline} // {personalInfo.degree.toUpperCase()} ({personalInfo.duration})
            </span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-secondary text-[11px]">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            <span>DETERMINISTIC RETRIEVAL &amp; AGENTIC RUNTIMES</span>
          </div>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-space-xs max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-primary font-mono tracking-widest">// PRODUCTION AI SYSTEMS</span>
            <span className="h-px w-24 bg-surface-container-highest" />
          </div>
          <h1 className="text-[48px] sm:text-[64px] leading-[1.1] font-bold tracking-tight text-on-surface">
            {personalInfo.name.split(" ")[0]}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">
              {personalInfo.name.split(" ")[1]}
            </span>
          </h1>
          <p className="text-[28px] leading-[36px] text-secondary-fixed-dim font-medium tracking-tight">
            {personalInfo.title.split("|").map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="text-outline mx-2">|</span>}
                {part.trim()}
              </span>
            ))}
          </p>
        </div>

        {/* Body + telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            <p className="text-[16px] leading-relaxed text-on-surface-variant max-w-3xl">
              {personalInfo.about}
            </p>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low shadow-inner">
              <span className="material-symbols-outlined text-primary text-[22px] shrink-0">school</span>
              <span className="text-[14px] text-on-surface">
                <strong className="font-semibold">{personalInfo.degree}</strong> •{" "}
                {personalInfo.college}{" "}
                <span className="text-outline font-mono">· {personalInfo.duration}</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <button
                onClick={() => scrollTo("demo-trailer")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-primary text-on-primary text-[13px] font-semibold hover:opacity-90 transition-all shadow-[0_0_20px_rgba(208,188,255,0.4)]"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                Watch Demo
              </button>
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all text-[13px] font-semibold shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                View Projects
              </button>
              <button
                onClick={() => scrollTo("ragbench-sandbox")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-surface-container-high text-secondary hover:text-on-surface hover:bg-surface-container-highest transition-all text-[13px] font-semibold shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">science</span>
                Explore RagBench
              </button>
              <button
                onClick={() => scrollTo("ask-assistant")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container-low text-on-surface hover:bg-surface-container text-[13px] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">smart_toy</span>
                Ask Jeeban&apos;s AI
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container-low text-on-surface hover:bg-surface-container text-[13px] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Contact
              </button>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded bg-surface-container-lowest text-on-surface hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_12px_rgba(208,188,255,0.25)] transition-all duration-200 text-[13px] font-mono"
              >
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Telemetry card */}
          <div className="lg:col-span-4 p-space-md rounded-xl bg-surface-container-low shadow-xl flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-outline font-mono uppercase tracking-wider">Operational Health</span>
              <span className="flex items-center gap-1 text-[11px] text-tertiary font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping" />
                ONLINE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Qdrant Ingestion", value: "12.4k docs", sub: "Dense + BM25", color: "text-primary" },
                { label: "P95 Retrieval", value: "42 ms", sub: "Reciprocal Rank", color: "text-secondary" },
                { label: "Avg Faithfulness", value: "0.942", sub: "Zero Hallucination", color: "text-on-surface" },
                { label: "Agents Deployed", value: "7 Active", sub: "Multi-turn loop", color: "text-primary-fixed-dim" },
              ].map((m) => (
                <div key={m.label} className="p-2.5 rounded bg-surface-container flex flex-col">
                  <span className="text-[11px] text-outline">{m.label}</span>
                  <span className={`text-[18px] font-bold font-mono ${m.color}`}>{m.value}</span>
                  <span className="text-[11px] text-tertiary">{m.sub}</span>
                </div>
              ))}
            </div>
            <div className="p-2.5 rounded bg-surface-container-highest/60 flex items-center justify-between text-on-surface-variant text-[11px] font-mono">
              <span>LLM GATEWAY: GEMINI 1.5 PRO</span>
              <span className="text-tertiary">TTFT 142ms</span>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="w-full py-3 px-space-md rounded bg-surface-container-lowest shadow-sm flex items-center gap-space-md overflow-x-auto whitespace-nowrap">
          <span className="text-[11px] text-outline font-mono uppercase tracking-widest shrink-0">// CORE SPEC:</span>
          <div className="flex items-center gap-3 font-mono text-[11px] text-on-surface-variant tracking-wider shrink-0">
            {["RAG", "LLMs", "AI AGENTS", "VECTOR SEARCH", "HYBRID RETRIEVAL", "RERANKING", "EVALUATION", "PYTHON", "FASTAPI", "QDRANT", "DOCKER"].map((t, i) => (
              <span key={t}>
                <span className={i % 3 === 0 ? "text-primary font-semibold" : i % 3 === 1 ? "text-secondary" : "text-on-surface"}>{t}</span>
                {i < 10 && <span className="text-outline-variant ml-3">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
