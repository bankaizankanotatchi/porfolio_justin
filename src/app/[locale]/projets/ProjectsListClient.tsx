"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Search, Github, ArrowUpRight } from "lucide-react";
import { ProfileData } from "@/data/profile";

interface ProjectsListClientProps {
  profile: ProfileData;
  locale: string;
}

export default function ProjectsListClient({ profile, locale }: ProjectsListClientProps) {
  const t = useTranslations("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string>("all");

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    profile.projects.forEach((proj) => {
      proj.stack.forEach((tech) => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [profile.projects]);

  const filteredProjects = useMemo(() => {
    return profile.projects.filter((proj) => {
      const desc = proj.description[locale as "fr" | "en"] || proj.description.fr;
      const matchesSearch =
        proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTech =
        selectedTech === "all" || proj.stack.includes(selectedTech);

      return matchesSearch && matchesTech;
    });
  }, [profile.projects, searchQuery, selectedTech, locale]);

  return (
    <div>
      {/* Filtres & Recherche */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-12 border-b border-border dark:border-white/5 pb-8">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Chercher un projet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border dark:border-white/5 bg-card focus:outline-none focus:border-primary dark:focus:border-[#00ffcc] text-xs text-foreground font-mono"
          />
        </div>

        <div className="overflow-x-auto scrollbar-none flex items-center gap-1.5 py-1">
          <button
            onClick={() => setSelectedTech("all")}
            className={`px-3 py-1.5 rounded text-xs font-mono tracking-wide transition-all focus:outline-none flex-shrink-0 border ${
              selectedTech === "all"
                ? "bg-foreground text-background border-foreground"
                : "bg-background border-border dark:border-white/5 text-muted hover:text-foreground"
            }`}
          >
            [{t("filter_all")}]
          </button>
          {allTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1.5 rounded text-xs font-mono tracking-wide transition-all focus:outline-none flex-shrink-0 border ${
                selectedTech === tech
                  ? "bg-primary/10 text-primary border-primary/20 dark:bg-[#00ffcc]/10 dark:text-[#00ffcc] dark:border-[#00ffcc]/30"
                  : "bg-background border-border dark:border-white/5 text-muted hover:text-foreground"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Grille de projets - Rendu React purement natif et instantané */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj, idx) => {
          const projDesc = proj.description[locale as "fr" | "en"] || proj.description.fr;
          const formattedIndex = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={proj.id}
              className="bg-card border border-border dark:border-white/5 hover:border-primary/20 dark:hover:border-[#00ffcc]/20 rounded-xl p-5 flex flex-col justify-between h-full relative group transition-all duration-200 hover:shadow-neon"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-primary dark:text-[#00ffcc] font-semibold">
                    [ {formattedIndex} ]
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted bg-background border border-border dark:border-white/5 px-2 py-0.5 rounded">
                    {proj.category}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-primary dark:group-hover:text-[#00ffcc] transition-colors duration-200 uppercase tracking-wide">
                  {proj.name}
                </h3>

                <p className="text-xs text-muted leading-relaxed mb-6">
                  {projDesc}
                </p>

                <div className="flex flex-wrap gap-1 mb-6">
                  {proj.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-background border border-border dark:border-white/5 text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

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

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="font-mono text-xs text-muted">{t("no_projects")}</p>
        </div>
      )}
    </div>
  );
}
