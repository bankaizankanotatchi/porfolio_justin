"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Code,
  Layout,
  Server,
  Smartphone,
  Database,
  Cpu,
  Layers,
  Bot,
  Map,
  Compass,
  MessageSquareHeart,
  Terminal
} from "lucide-react";
import { ProfileData, SkillGroup } from "@/data/profile";

interface SkillsSectionProps {
  profile: ProfileData;
}

export default function SkillsSection({ profile }: SkillsSectionProps) {
  const t = useTranslations("skills");

  // Association des catégories avec des icônes
  const categoryIcons: Record<keyof SkillGroup, React.ComponentType<{ className?: string }>> = {
    languages: Code,
    frontend: Layout,
    backend: Server,
    mobile: Smartphone,
    databases: Database,
    devops: Cpu,
    erp: Layers,
    automation: Bot,
    sig: Map,
    modeling: Compass,
    softSkills: MessageSquareHeart,
  };

  const categories = Object.keys(profile.skills) as (keyof SkillGroup)[];

  const containerVariants = {
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
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section id="skills" className="relative py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-primary dark:text-[#00ffcc] tracking-widest block mb-2">
              // TECH STACKS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
              {t("title")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted max-w-sm">
            {t("subtitle")}
          </p>
        </div>

        {/* Grille complète de toutes les compétences */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Terminal;
            const skillList = profile.skills[cat];

            return (
              <motion.div
                key={cat}
                variants={itemVariants}
                className="bg-card border border-border dark:border-[#00ffcc]  hover:border-primary/20 dark:hover:border-primary/20 rounded-xl p-5 flex flex-col transition-all duration-300 hover:shadow-neon"
              >
                {/* En-tête de catégorie */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border dark:border-[#00ffcc] ">
                  <Icon className="w-4 h-4 text-primary dark:text-[#00ffcc]" />
                  <h3 className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                    {t(`categories.${cat}`)}
                  </h3>
                </div>

                {/* Liste des technos */}
                <div className="flex flex-wrap gap-1.5">
                  {skillList.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs font-semibold px-2.5 py-1 rounded bg-background border border-border dark:border-[#00ffcc]  text-muted hover:border-primary dark:hover:border-[#00ffcc]/30 hover:text-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
