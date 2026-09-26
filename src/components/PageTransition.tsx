"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  { text: "Initializing RAG pipeline...",        delay: 0,    color: "text-on-surface-variant" },
  { text: "Loading vector database [Qdrant]",    delay: 400,  color: "text-on-surface-variant" },
  { text: "Embedding model: BAAI/bge-small ✓",  delay: 800,  color: "text-tertiary"            },
  { text: "Hybrid retrieval: BM25 + Dense ✓",   delay: 1100, color: "text-tertiary"            },
  { text: "Cross-encoder reranker: online ✓",   delay: 1400, color: "text-tertiary"            },
  { text: "Connecting to Gemini 2.5 Flash...",  delay: 1700, color: "text-on-surface-variant" },
  { text: "LLM gateway: authenticated ✓",       delay: 2100, color: "text-tertiary"            },
  { text: "Agentic workflows: active ✓",        delay: 2400, color: "text-tertiary"            },
  { text: "SYSTEM READY",                        delay: 2800, color: "text-primary"             },
];

const TOTAL_DURATION = 3400;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [loading, setLoading]         = useState(true);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showCursor, setShowCursor]   = useState(true);
  const [exiting, setExiting]         = useState(false);

  useEffect(() => {
    // Reveal each boot line at its delay
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });

    // Blink cursor
    const blink = setInterval(() => setShowCursor((v) => !v), 500);

    // Start exit animation
    const exitTimer = setTimeout(() => {
      clearInterval(blink);
      setShowCursor(false);
      setExiting(true);
    }, TOTAL_DURATION);

    // Unmount loader
    const doneTimer = setTimeout(() => setLoading(false), TOTAL_DURATION + 700);

    return () => {
      clearInterval(blink);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center px-8"
            animate={exiting ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Top label */}
            <div className="w-full max-w-lg mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-surface-container-high flex items-center justify-center shadow-[0_0_16px_rgba(208,188,255,0.3)]">
                  <span className="font-bold text-primary text-xs">JM</span>
                </div>
                <span className="text-[11px] font-mono text-on-surface-variant tracking-widest">PORTFOLIO OS v2.5</span>
              </div>
              <span className="text-[10px] font-mono text-outline tracking-widest">BOOT SEQUENCE</span>
            </div>

            {/* Terminal box */}
            <div className="w-full max-w-lg rounded-lg bg-surface-container border border-outline-variant/30 shadow-[0_0_40px_rgba(208,188,255,0.08)] overflow-hidden">
              {/* Terminal titlebar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-surface-container-high border-b border-outline-variant/20">
                <span className="w-2.5 h-2.5 rounded-full bg-error/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary/60" />
                <span className="ml-auto text-[10px] font-mono text-outline">jeeban@portfolio:~</span>
              </div>

              {/* Terminal body */}
              <div className="px-5 py-4 flex flex-col gap-1.5 min-h-[220px]">
                {BOOT_LINES.map((line, i) =>
                  visibleLines.includes(i) ? (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-outline text-[11px] font-mono shrink-0">❯</span>
                      <span
                        className={`text-[12px] font-mono ${line.color} ${
                          line.text === "SYSTEM READY"
                            ? "font-bold tracking-widest text-[13px]"
                            : ""
                        }`}
                      >
                        {line.text}
                      </span>
                      {/* Blinking cursor only on last visible line */}
                      {i === visibleLines[visibleLines.length - 1] && visibleLines.length < BOOT_LINES.length && (
                        <span
                          className={`w-1.5 h-3.5 bg-primary rounded-sm transition-opacity ${
                            showCursor ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      )}
                    </motion.div>
                  ) : null
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-lg mt-4 h-[2px] rounded-full bg-surface-container-high overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: TOTAL_DURATION / 1000, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page fade-in after loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={!loading ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
