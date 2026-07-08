"use client";

import { useTranslations } from "next-intl";
import { Github, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProfileData } from "@/data/profile";

interface ProjectsSectionProps {
  profile: ProfileData;
  locale: string;
}

export default function ProjectsSection({ profile, locale }: ProjectsSectionProps) {
  const t = useTranslations("projects");
  const displayedProjects = profile.projects.slice(0, 4);

  return (
    <section id="projects" className="relative py-16 bg-card border-t border-border dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-primary dark:text-[#00ffcc] tracking-widest block mb-2">
              // FEATURED ARCHIVES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
              {t("title")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted max-w-sm">
            {t("subtitle")}
          </p>
        </div>

        {/* Grille de 4 projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedProjects.map((proj, idx) => {
            const projDesc = proj.description[locale as "fr" | "en"] || proj.description.fr;
            const formattedIndex = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={proj.id}
                className="bg-background border border-border dark:border-white/5 hover:border-primary/20 dark:hover:border-[#00ffcc]/20 rounded-xl p-5 flex flex-col justify-between h-full relative group transition-all duration-300 hover:shadow-neon"
              >
                <div>
                  {/* Index et catégorie */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-primary dark:text-[#00ffcc] font-semibold">
                      [ {formattedIndex} ]
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted bg-card border border-border dark:border-white/5 px-2 py-0.5 rounded">
                      {proj.category}
                    </span>
                  </div>

                  {/* Nom du projet */}
                  <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-primary dark:group-hover:text-[#00ffcc] transition-colors duration-200 uppercase tracking-wide">
                    {proj.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-muted leading-relaxed mb-6">
                    {projDesc}
                  </p>

                  {/* Stack technique */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-card border border-border dark:border-white/5 text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Liens */}
                <div className="flex items-center justify-between pt-4 border-t border-border dark:border-white/5 mt-auto">
                  {proj.demoUrl ? (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary dark:hover:text-[#00ffcc] transition-colors"
                    >
                      <span>Visiter le site</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-muted">// Interne</span>
                  )}

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted hover:text-foreground hover:bg-muted/15 rounded transition-colors"
                      title={t("view_code")}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bouton de redirection natif rapide */}
        {profile.projects.length > 4 && (
          <div className="pt-12 flex justify-center">
            <a
              href={`/${locale}/projets`}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-border dark:border-[#00ffcc] bg-card hover:bg-muted/10 font-mono text-xs text-foreground tracking-wide transition-all focus:outline-none"
            >
              <span>Voir tous mes projets</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary dark:text-[#00ffcc]" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
