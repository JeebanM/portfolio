"use client";
import { useState, useRef, useEffect } from "react";
import { personalInfo } from "@/lib/portfolioData";

type Source = { source: string; title: string };

type Message = {
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
  rag?: boolean;
  cached?: boolean;
};

const SUGGESTIONS = [
  "What are Jeeban's 10th marks?",
  "What is his CGPA?",
  "Tell me about RagBench",
  "Is Jeeban available for hire?",
];

/** Format the source path into a readable label. */
function formatSource(source: string): string {
  return source
    .split("/")
    .pop()!
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm Jeeban's AI assistant — powered by RAG. Ask me anything about his marks, projects, skills, or experience. I retrieve answers directly from his knowledge base. 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 1 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: msg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text: data.reply,
            sources: data.sources ?? [],
            rag: data.rag ?? false,
            cached: data.cached ?? false,
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text: data.error ?? "Something went wrong. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Network error. Please check your connection.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <section
      className="w-full max-w-[1440px] mx-auto px-gutter py-space-xl"
      id="ask-assistant"
    >
      <div className="flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
          <div>
            <div className="flex items-center gap-2 text-secondary font-mono text-[11px] font-semibold tracking-wider">
              <span className="material-symbols-outlined text-[16px]">
                smart_toy
              </span>
              ASK JEEBAN AI
            </div>
            <h2 className="text-[36px] leading-[44px] font-semibold tracking-tight text-on-surface mt-1">
              Chat with Jeeban&apos;s AI
            </h2>
            <p className="text-[14px] text-on-surface-variant max-w-xl mt-1">
              Powered by Gemini + RAG. Answers retrieved from Jeeban&apos;s
              personal knowledge base — marks, projects, skills, and more.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_#4edea3]" />
            <span className="text-[11px] font-mono text-tertiary">
              RAG · GEMINI ONLINE
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-2xl overflow-hidden max-w-3xl w-full mx-auto">
          {/* Chat window */}
          <div
            ref={chatContainerRef}
            className="h-[400px] overflow-y-auto p-space-md flex flex-col gap-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Message bubble */}
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2.5 text-[14px] leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-on-surface"
                  }`}
                >
                  {m.text}
                </div>

                {/* Source citations — only for assistant RAG messages */}
                {m.role === "assistant" &&
                  m.rag &&
                  m.sources &&
                  m.sources.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5 max-w-[80%]">
                      {m.sources.map((s, si) => (
                        <span
                          key={si}
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/15 font-mono"
                        >
                          <span className="material-symbols-outlined text-[11px]">
                            description
                          </span>
                          {formatSource(s.source)}
                        </span>
                      ))}
                    </div>
                  )}

                {/* Cached badge */}
                {m.role === "assistant" && m.cached && (
                  <span className="mt-1 text-[9px] font-mono text-outline/60">
                    cached
                  </span>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface-container rounded-xl px-4 py-2.5 flex gap-1 items-center">
                  <span
                    className="w-2 h-2 rounded-full bg-outline animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-outline animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-outline animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* CTA after messages */}
          {messages.length > 1 && (
            <div className="px-space-md py-2 bg-surface-container border-t border-outline-variant/20 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-outline">
                Interested in working with Jeeban?
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-[11px] px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[13px]">
                  mail
                </span>{" "}
                Email
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] px-2 py-1 rounded bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors flex items-center gap-1"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-3 h-3 fill-current shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] px-2 py-1 rounded bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[13px]">
                  description
                </span>{" "}
                Resume
              </a>
            </div>
          )}

          {/* Suggestions */}
          <div className="px-space-md py-2 flex gap-2 flex-wrap border-t border-outline-variant/10">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="p-3 bg-surface-container-high flex items-center gap-2 border-t border-outline-variant/20"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about marks, projects, skills, achievements..."
              className="flex-1 bg-surface-container rounded-lg px-3 py-2 text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                send
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
