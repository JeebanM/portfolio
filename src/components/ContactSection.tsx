"use client";
import { useState } from "react";
import { personalInfo } from "@/lib/portfolioData";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" }); // website = honeypot
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", website: "" });
      } else {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="w-full bg-surface-container-lowest py-space-xl" id="contact">
      <div className="w-full max-w-[1440px] mx-auto px-gutter">
        <div className="max-w-2xl mx-auto flex flex-col gap-space-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-primary font-mono text-[11px] font-semibold tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">mail</span>
              CONTACT
            </div>
            <h2 className="text-[36px] leading-[44px] font-semibold tracking-tight text-on-surface">
              Get In Touch
            </h2>
            <p className="text-[14px] text-on-surface-variant mt-2">
              Interested in working together? Send a message and I&apos;ll get back to you directly.
            </p>
          </div>

          {status === "success" ? (
            <div className="p-space-lg rounded-xl bg-tertiary/10 border border-tertiary/30 flex flex-col items-center gap-3 text-center">
              <span className="material-symbols-outlined text-tertiary text-[48px]">check_circle</span>
              <h3 className="text-[18px] font-semibold text-on-surface">Message Sent!</h3>
              <p className="text-[14px] text-on-surface-variant">Thanks for reaching out. I&apos;ll reply to your email directly.</p>
              <button onClick={() => setStatus("idle")} className="text-[13px] text-outline hover:text-on-surface transition-colors mt-1">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-xl">
              {/* Honeypot — hidden from humans */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-mono text-outline uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2.5 text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-mono text-outline uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2.5 text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-outline uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="I'd like to discuss an AI Engineering opportunity..."
                  className="bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2.5 text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-[13px] text-error bg-error/10 rounded-lg px-3 py-2">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 rounded-lg bg-primary text-on-primary text-[14px] font-semibold hover:opacity-90 disabled:opacity-60 transition-all shadow-md flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Send Message
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-space-md pt-1">
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 text-[12px] text-on-surface-variant hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined text-[14px]">mail</span>
                  {personalInfo.email}
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[12px] text-secondary hover:opacity-80 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
