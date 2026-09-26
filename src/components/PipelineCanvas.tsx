"use client";
import { useState } from "react";
import { pipelineSteps } from "@/lib/portfolioData";

type StepKey = keyof typeof pipelineSteps;

const steps: { id: StepKey; label: string; sub: string; color: string }[] = [
  { id: "query", label: "User Query", sub: "Tokenize: 1.2ms", color: "text-primary" },
  { id: "processing", label: "Query Processing", sub: "HyDE / Expansion", color: "text-secondary" },
  { id: "retrieval", label: "Dual Retrieval", sub: "Dense + BM25", color: "text-primary" },
  { id: "rrf", label: "RRF Fusion", sub: "k=60 | 4ms", color: "text-tertiary" },
  { id: "rerank", label: "Cross-Encoder", sub: "Reranker", color: "text-primary-container" },
  { id: "llm", label: "LLM Generate", sub: "Gemini 1.5 Pro", color: "text-secondary" },
];

export default function PipelineCanvas() {
  const [active, setActive] = useState<StepKey>("retrieval");
  const data = pipelineSteps[active];

  return (
    <section className="w-full bg-surface-container-lowest py-space-xl">
      <div className="w-full max-w-[1440px] mx-auto px-gutter flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
          <div>
            <div className="flex items-center gap-2 text-primary font-mono text-[11px] font-semibold tracking-wider">
              <span className="material-symbols-outlined text-[16px]">account_tree</span>
              SYSTEM ARCHITECTURE DIAGNOSTICS
            </div>
            <h2 className="text-[36px] leading-[44px] font-semibold tracking-tight text-on-surface mt-1">
              Production-Grade Hybrid RAG Flow
            </h2>
            <p className="text-[14px] text-on-surface-variant max-w-2xl mt-1">
              Click any pipeline node to inspect its runtime latency, algorithm, and performance gain.
            </p>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-surface-container font-mono text-[11px] text-outline">
            <span className="w-2 h-2 rounded-full bg-tertiary" />
            CLICK ANY NODE TO INSPECT
          </div>
        </div>

        {/* Pipeline nodes */}
        <div className="relative w-full rounded-xl bg-surface-container-low p-space-md shadow-2xl overflow-x-auto">
          <div className="min-w-[900px] flex items-center justify-between relative py-space-md">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div
                  onClick={() => setActive(step.id)}
                  className={`cursor-pointer flex flex-col items-center gap-2 w-32 p-3 rounded-lg transition-all shadow-md text-center
                    ${active === step.id
                      ? "bg-surface-container-high ring-1 ring-primary shadow-primary/20"
                      : "bg-surface-container hover:bg-surface-container-high"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                    ${active === step.id ? "bg-primary text-on-primary" : "bg-surface-container-highest " + step.color}`}>
                    <span className="material-symbols-outlined text-[20px]">
                      {pipelineSteps[step.id].icon}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-on-surface">{step.label}</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container-lowest text-outline">{step.sub}</span>
                </div>
                {i < steps.length - 1 && (
                  <span className="material-symbols-outlined text-outline-variant text-[24px] mx-1">trending_flat</span>
                )}
              </div>
            ))}
          </div>

          {/* Inspector panel */}
          <div className="mt-space-md p-space-md rounded-lg bg-surface-container-highest/80 backdrop-blur-md shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
            <div className="flex items-start gap-3 flex-1">
              <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">{data.icon}</span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[18px] font-semibold text-on-surface">{data.title}</span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-tertiary/20 text-tertiary">{data.badge}</span>
                </div>
                <p className="text-[14px] text-on-surface-variant mt-1 max-w-2xl">{data.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-space-lg shrink-0">
              <div className="flex flex-col items-center">
                <span className="text-[11px] text-outline font-mono">LATENCY</span>
                <span className="text-[22px] font-bold font-mono text-secondary">{data.latency}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[11px] text-outline font-mono">GAIN</span>
                <span className="text-[22px] font-bold font-mono text-tertiary">{data.gain}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
