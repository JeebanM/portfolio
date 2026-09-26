"use client";
import { skills } from "@/lib/portfolioData";

export default function SkillsSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-gutter py-space-xl" id="engineering-stack">
      <div className="flex flex-col gap-space-lg">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-[11px] font-semibold tracking-wider">
            <span className="material-symbols-outlined text-[16px]">stack</span>
            COMPREHENSIVE ENGINEERING STACK
          </div>
          <h2 className="text-[36px] leading-[44px] font-semibold tracking-tight text-on-surface mt-1">
            Skills &amp; Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-md">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-3">
              <h3 className="text-[13px] font-semibold text-on-surface tracking-tight">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-[12px] px-2.5 py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
