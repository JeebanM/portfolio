"use client";
import { experience, education, achievements } from "@/lib/portfolioData";

export default function ExperienceSection() {
  return (
    <section className="w-full bg-surface-container-lowest py-space-xl" id="experience-education">
      <div className="w-full max-w-[1440px] mx-auto px-gutter flex flex-col gap-space-xl">

        {/* Experience + Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
          {/* Experience */}
          <div className="flex flex-col gap-space-md">
            <div>
              <div className="flex items-center gap-2 text-primary font-mono text-[11px] font-semibold tracking-wider">
                <span className="material-symbols-outlined text-[16px]">work</span>
                EXPERIENCE
              </div>
              <h2 className="text-[28px] font-semibold tracking-tight text-on-surface mt-1">Work History</h2>
            </div>
            {experience.map((exp) => (
              <div key={exp.role} className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[16px] font-semibold text-on-surface">{exp.role}</h3>
                    <p className="text-[13px] text-primary font-mono">{exp.company}</p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-surface-container text-outline shrink-0">{exp.duration}</span>
                </div>
                <p className="text-[13px] text-on-surface-variant mt-2 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="flex flex-col gap-space-md">
            <div>
              <div className="flex items-center gap-2 text-secondary font-mono text-[11px] font-semibold tracking-wider">
                <span className="material-symbols-outlined text-[16px]">school</span>
                EDUCATION
              </div>
              <h2 className="text-[28px] font-semibold tracking-tight text-on-surface mt-1">Academic Background</h2>
            </div>
            {education.map((edu) => (
              <div key={edu.degree} className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[16px] font-semibold text-on-surface">{edu.degree}</h3>
                    <p className="text-[13px] text-secondary font-mono">{edu.institution}</p>
                    <p className="text-[12px] text-outline mt-0.5">{edu.location}</p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-surface-container text-outline shrink-0">{edu.duration}</span>
                </div>
                <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-mono px-2 py-1 rounded-full bg-tertiary/10 text-tertiary">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  {edu.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div id="achievements">
          <div className="flex items-center gap-2 text-tertiary font-mono text-[11px] font-semibold tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">emoji_events</span>
            ACHIEVEMENTS
          </div>
          <h2 className="text-[28px] font-semibold tracking-tight text-on-surface mb-space-md">Engineering &amp; Athletic Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            {achievements.map((ach) => (
              <div key={ach.title} className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${ach.color}/10 text-${ach.color}`}>
                  <span className="material-symbols-outlined text-[20px]">{ach.icon}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-on-surface">{ach.title}</h3>
                <p className="text-[13px] text-on-surface-variant leading-relaxed">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
