"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { ProfileData } from "@/data/profile";

interface AboutSectionProps {
  profile: ProfileData;
  locale: string;
}

export default function AboutSection({ profile, locale }: AboutSectionProps) {
  const t = useTranslations("about");
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const displayedExperiences = profile.experience.slice(0, 3);

  return (
    <section id="about" className="relative py-16 bg-background border-t border-border dark:border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-primary dark:text-[#00ffcc] tracking-widest block mb-2">
              // CHRONOLOGY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
              {t("title")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted max-w-sm">
            {t("bio_intro")}
          </p>
        </div>

        {/* Tab Swappers */}
        <div className="flex justify-start gap-4 mb-16 border-b border-border dark:border-white/5 pb-4">
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2 pb-4 text-xs font-mono font-bold tracking-widest uppercase transition-all focus:outline-none border-b-2 -mb-5 ${
              activeTab === "experience"
                ? "border-primary dark:border-[#00ffcc] text-primary dark:text-[#00ffcc]"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t("experience_title")}</span>
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 pb-4 text-xs font-mono font-bold tracking-widest uppercase transition-all focus:outline-none border-b-2 -mb-5 ${
              activeTab === "education"
                ? "border-primary dark:border-[#00ffcc] text-primary dark:text-[#00ffcc]"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t("formation_title")}</span>
          </button>
        </div>

        {/* Dynamic Chronological List */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "experience" ? (
              <motion.div
                key="experience"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0 }}
                viewport={{ once: true }}
                className="divide-y divide-border dark:divide-white/5"
              >
                {displayedExperiences.map((exp, idx) => {
                  const roleName = exp.role[locale as "fr" | "en"] || exp.role.fr;
                  const tasks = exp.tasks[locale as "fr" | "en"] || exp.tasks.fr;

                  return (
                    <motion.div
                      key={`${exp.company}-${idx}`}
                      variants={itemVariants}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 first:pt-0 last:pb-0 items-start"
                    >
                      {/* Left: Date/Period */}
                      <div className="md:col-span-4 font-mono text-xs sm:text-sm text-muted font-medium">
                        [{exp.period}]
                      </div>

                      {/* Right: Company details */}
                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-foreground uppercase tracking-wide">
                            {roleName}
                          </h3>
                          <span className="font-mono text-xs text-primary dark:text-[#00ffcc] font-semibold">
                            {exp.company}
                          </span>
                        </div>

                        <ul className="space-y-2 text-xs sm:text-sm text-muted leading-relaxed">
                          {tasks.map((task, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2">
                              <span className="text-primary dark:text-[#00ffcc] mt-1 flex-shrink-0 font-mono">›</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Bouton de redirection natif rapide */}
                {profile.experience.length > 3 && (
                  <div className="pt-8 flex justify-center">
                    <a
                      href={`/${locale}/experiences`}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-border dark:border-[#00ffcc]  bg-card hover:bg-muted/10 font-mono text-xs text-foreground tracking-wide transition-all focus:outline-none"
                    >
                      <span>Voir toutes mes expériences</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary dark:text-[#00ffcc]" />
                    </a>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="education"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0 }}
                viewport={{ once: true }}
                className="divide-y divide-border dark:divide-white/5"
              >
                {profile.education.map((edu, idx) => {
                  const degreeName = edu.degree[locale as "fr" | "en"] || edu.degree.fr;
                  const mention = edu.mention ? (edu.mention[locale as "fr" | "en"] || edu.mention.fr) : null;

                  return (
                    <motion.div
                      key={`${edu.school}-${idx}`}
                      variants={itemVariants}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 first:pt-0 last:pb-0 items-start"
                    >
                      {/* Left: Date/Period */}
                      <div className="md:col-span-4 font-mono text-xs sm:text-sm text-muted font-medium">
                        [{edu.period}]
                      </div>

                      {/* Right: Degree details */}
                      <div className="md:col-span-8 space-y-2">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-foreground uppercase tracking-wide">
                            {degreeName}
                          </h3>
                          <span className="font-mono text-xs text-primary dark:text-[#00ffcc] font-semibold">
                            {edu.school}
                          </span>
                        </div>

                        {mention && (
                          <div className="inline-flex items-center font-mono text-[10px] text-accent-emerald bg-accent-emerald/5 border border-accent-emerald/15 px-2.5 py-0.5 rounded">
                            {mention}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
