"use client";
import { projects } from "@/lib/portfolioData";

const colorMap: Record<string, string> = {
  primary: "text-primary bg-primary/10",
  secondary: "text-secondary bg-secondary/10",
  tertiary: "text-tertiary bg-tertiary/10",
  error: "text-error bg-error/10",
};

export default function ProjectsSection() {
  return (
    <section className="w-full bg-surface-container-lowest py-space-xl" id="projects">
      <div className="w-full max-w-[1440px] mx-auto px-gutter flex flex-col gap-space-lg">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-[11px] font-semibold tracking-wider">
            <span className="material-symbols-outlined text-[16px]">folder_special</span>
            PRODUCTION SYSTEMS &amp; CASE STUDIES
          </div>
          <h2 className="text-[36px] leading-[44px] font-semibold tracking-tight text-on-surface mt-1">
            Featured Projects
          </h2>
          <p className="text-[14px] text-on-surface-variant max-w-2xl mt-1">
            End-to-end AI systems built for production — from RAG pipelines to agentic workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary/40 hover:shadow-[0_0_24px_rgba(208,188,255,0.1)] transition-all duration-300 overflow-hidden"
            >
              {/* Card header */}
              <div className="p-space-md flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[project.color] ?? colorMap.primary}`}>
                    <span className="material-symbols-outlined text-[20px]">{project.icon}</span>
                  </div>
                  {project.featured && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      FEATURED
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-on-surface leading-snug group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-on-surface-variant mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Metrics */}
                {(project as { metrics?: Record<string, string> }).metrics && (
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries((project as { metrics?: Record<string, string> }).metrics!).map(([k, v]) => (
                      <span key={k} className="text-[11px] font-mono px-2 py-1 rounded bg-surface-container-high text-tertiary">
                        {k.toUpperCase()}: {v}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card footer */}
              <div className="px-space-md pb-space-md flex items-center gap-2 border-t border-outline-variant/20 pt-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors text-[12px]"
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                {project.demo && project.demo !== "#" && (
                  <a
                    href={project.demo}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20 text-[12px] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
