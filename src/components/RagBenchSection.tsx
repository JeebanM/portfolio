"use client";
import { useState } from "react";

type SimState = {
  chunk: string;
  overlap: string;
  mode: string;
  model: string;
  rerank: boolean;
};

type Results = {
  recall: string;
  recallDelta: string;
  mrr: string;
  lat: string;
  faith: string;
};

function simulate(state: SimState): Results {
  const chunkSize = parseInt(state.chunk);
  const isHybrid = state.mode === "hybrid";
  const isReranked = state.rerank;
  const isPro = state.model === "gemini-pro";

  const baseRecall = isHybrid ? 0.912 : 0.764;
  const rerankBoost = isReranked ? 0.028 : 0;
  const chunkBoost = chunkSize === 500 ? 0.008 : chunkSize === 250 ? -0.01 : 0;
  const recall = Math.min(0.999, baseRecall + rerankBoost + chunkBoost);

  const mrr = Math.min(0.999, (isHybrid ? 0.834 : 0.701) + (isReranked ? 0.022 : 0));
  const lat = (isHybrid ? 168 : 112) + (isReranked ? 62 : 0) + (isPro ? 30 : 0);
  const faith = Math.min(0.999, (isPro ? 0.931 : 0.918) + (isReranked ? 0.008 : 0));
  const recallDelta = `+${((recall - 0.764) * 100).toFixed(1)}%`;

  return {
    recall: recall.toFixed(3),
    recallDelta,
    mrr: mrr.toFixed(3),
    lat: `${lat} ms`,
    faith: faith.toFixed(3),
  };
}

export default function RagBenchSection() {
  const [simState, setSimState] = useState<SimState>({
    chunk: "500", overlap: "64", mode: "hybrid", model: "gemini-flash", rerank: true,
  });
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [logs, setLogs] = useState<string[]>([
    "> Initialized benchmark testbed with 1,400 corpus chunks.",
    "> Qdrant vector index loaded: BAAI/bge-small-en-v1.5 (384-dim). RRF fusion enabled (k=60).",
    '> Status: Benchmark idle. Click "RUN EXPERIMENT" to execute test suite.',
  ]);

  const runExperiment = async () => {
    setRunning(true);
    setLogs([`> [${new Date().toISOString()}] Experiment initiated...`]);
    await new Promise((r) => setTimeout(r, 400));
    setLogs((p) => [...p, `> Loading corpus: chunk_size=${simState.chunk}, overlap=${simState.overlap}...`]);
    await new Promise((r) => setTimeout(r, 500));
    setLogs((p) => [...p, `> Retrieval mode: ${simState.mode.toUpperCase()} | Reranker: ${simState.rerank ? "ENABLED" : "DISABLED"}`]);
    await new Promise((r) => setTimeout(r, 600));
    setLogs((p) => [...p, `> Running 200 synthetic validation queries against ${simState.model}...`]);
    await new Promise((r) => setTimeout(r, 700));
    const res = simulate(simState);
    setResults(res);
    setLogs((p) => [...p, `> ✓ Experiment complete. Recall@5: ${res.recall} | MRR: ${res.mrr} | Latency: ${res.lat}`]);
    setRunning(false);
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-gutter py-space-xl" id="ragbench-sandbox">
      <div className="flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
          <div>
            <div className="flex items-center gap-2 text-primary font-mono text-[11px] font-semibold tracking-wider">
              <span className="material-symbols-outlined text-[16px]">science</span>
              RAGBENCH — HYPERPARAMETER SANDBOX
            </div>
            <h2 className="text-[36px] leading-[44px] font-semibold tracking-tight text-on-surface mt-1">
              Interactive RAG Benchmark
            </h2>
            <p className="text-[14px] text-on-surface-variant max-w-2xl mt-1">
              Configure retrieval parameters and simulate benchmark results across 200 synthetic validation queries.
            </p>
          </div>
          <button
            onClick={runExperiment}
            disabled={running}
            id="run-exp-btn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-primary text-on-primary text-[13px] font-semibold hover:opacity-90 transition-all shadow-lg disabled:opacity-60 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">{running ? "hourglass_empty" : "play_arrow"}</span>
            {running ? "RUNNING..." : "RUN EXPERIMENT"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
          {/* Controls */}
          <div className="lg:col-span-1 flex flex-col gap-space-sm p-space-md rounded-xl bg-surface-container-low shadow-xl">
            <span className="text-[11px] font-mono text-outline uppercase tracking-widest">Parameters</span>
            {[
              { label: "Chunk Size", id: "chunk", options: [["250", "250 tokens"], ["500", "500 tokens"], ["1000", "1000 tokens"]] },
              { label: "Overlap", id: "overlap", options: [["32", "32 tokens"], ["64", "64 tokens"], ["128", "128 tokens"]] },
              { label: "Retrieval Mode", id: "mode", options: [["dense", "Dense Only"], ["sparse", "Sparse (BM25)"], ["hybrid", "Hybrid (RRF)"]] },
              { label: "LLM Model", id: "model", options: [["gemini-flash", "Gemini 1.5 Flash"], ["gemini-pro", "Gemini 1.5 Pro"]] },
            ].map((ctrl) => (
              <div key={ctrl.id} className="flex flex-col gap-1">
                <label className="text-[11px] text-outline font-mono">{ctrl.label}</label>
                <select
                  value={simState[ctrl.id as keyof SimState] as string}
                  onChange={(e) => setSimState((s) => ({ ...s, [ctrl.id]: e.target.value }))}
                  className="p-2 rounded bg-surface-container-high text-on-surface text-[13px] font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {ctrl.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
            <div className="flex items-center justify-between pt-1">
              <label className="text-[11px] text-outline font-mono">Cross-Encoder Reranker</label>
              <div className="relative inline-flex items-center cursor-pointer" onClick={() => setSimState((s) => ({ ...s, rerank: !s.rerank }))}>
                <div className={`w-11 h-6 rounded-full transition-colors ${simState.rerank ? "bg-primary" : "bg-surface-container-highest"}`}>
                  <div className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white transition-transform ${simState.rerank ? "translate-x-5" : ""}`} />
                </div>
                <span className="ml-2 text-[11px] font-mono text-tertiary">{simState.rerank ? "ENABLED" : "DISABLED"}</span>
              </div>
            </div>
          </div>

          {/* Results + Console */}
          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "Recall@5", value: results?.recall ?? "—", delta: results?.recallDelta ?? "", color: "text-tertiary" },
                { label: "MRR", value: results?.mrr ?? "—", delta: results ? "Rank 1-2" : "", color: "text-secondary" },
                { label: "Latency", value: results?.lat ?? "—", delta: results ? `p95: ${parseInt(results.lat) + 42}ms` : "", color: "text-on-surface" },
                { label: "Faithfulness", value: results?.faith ?? "—", delta: "", color: "text-primary" },
              ].map((m) => (
                <div key={m.label} className="p-3 rounded-lg bg-surface-container-low flex flex-col items-center text-center">
                  <span className="text-[11px] text-outline font-mono">{m.label}</span>
                  <span className={`text-[22px] font-bold font-mono ${m.color}`}>{m.value}</span>
                  {m.delta && <span className="text-[11px] font-mono text-tertiary">{m.delta}</span>}
                </div>
              ))}
            </div>

            {/* Console */}
            <div className="rounded-xl bg-surface-container-lowest shadow-2xl overflow-hidden flex-1">
              <div className="flex items-center justify-between px-4 py-2 bg-surface-container-high border-b border-outline-variant/30">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-error" />
                  <span className="w-3 h-3 rounded-full bg-tertiary-fixed" />
                  <span className="w-3 h-3 rounded-full bg-tertiary" />
                </div>
                <span className="text-[11px] font-mono text-outline">ragbench_eval.py</span>
                <span className={`text-[11px] font-mono ${running ? "text-tertiary animate-pulse" : "text-secondary"}`}>
                  {running ? "RUNNING" : results ? "COMPLETE" : "READY"}
                </span>
              </div>
              <div className="p-4 font-mono text-[12px] space-y-1 min-h-[140px]">
                {logs.map((log, i) => (
                  <div key={i} className={log.includes("✓") ? "text-tertiary" : log.includes(">") ? "text-on-surface-variant" : "text-outline"}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
