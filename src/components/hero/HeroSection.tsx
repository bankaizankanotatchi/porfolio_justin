"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Github, Linkedin, MapPin } from "lucide-react";
import { ProfileData } from "@/data/profile";

const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#050508]/10 dark:bg-[#050508]/50 animate-pulse" />,
});

interface HeroSectionProps {
  profile: ProfileData;
  locale: string;
}

export default function HeroSection({ profile, locale }: HeroSectionProps) {
  const t = useTranslations("hero");
  const localTitle = profile.title[locale as "fr" | "en"] || profile.title.fr;
  const localBio = profile.bio[locale as "fr" | "en"] || profile.bio.fr;

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 lg:p-20 overflow-hidden bg-background text-foreground"
    >
      {/* 3D MACBOOK COMPUTER IN THE CENTER */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none w-full h-full">
        <div className="w-full h-[40vh] max-w-4xl opacity-100 flex items-center justify-center">
          <Hero3DCanvas />
        </div>
      </div>

      {/* TOP LEFT EXTREMITY (GREETING & NAME & JOB TITLE) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 self-start max-w-xl mt-16 md:mt-24"
      >
        <span className="font-mono text-xs tracking-widest text-primary dark:text-[#00ffcc] uppercase block mb-3 font-semibold">
          // {t("greeting")}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-foreground leading-none">
          {profile.name}
        </h1>
        <div className="h-[1px] w-24 bg-gradient-to-r from-primary dark:from-[#00ffcc] to-transparent my-4" />
        <p className="font-mono text-xs sm:text-sm text-muted uppercase tracking-widest">
          {localTitle}
        </p>

        {/* Info lieu */}
        <div className="flex items-center gap-1.5 text-xs text-muted font-mono mt-3">
          <MapPin className="w-3.5 h-3.5 text-primary dark:text-[#00ffcc]" />
          <span>{profile.location}</span>
        </div>
      </motion.div>

      {/* BOTTOM RIGHT EXTREMITY (BIO & ACTIONS & SOCIALS) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="z-10 self-end max-w-md text-right mb-5 flex flex-col items-end gap-6 mt-16 lg:mt-0"
      >
        <p className="hidden md:block text-xs sm:text-sm text-muted leading-relaxed max-w-sm text-right">
          {localBio}
        </p>

        {/* Coordonnées rapides */}
        <div className="font-mono text-[10px] text-muted flex flex-col items-end gap-1">
          <span>EMAIL: {profile.email}</span>
          <span>PHONE: {profile.phone}</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 w-full sm:w-auto">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-foreground hover:bg-foreground/90 text-background font-semibold text-xs transition-all duration-200"
          >
            <span>{t("cta_projects")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={profile.cvUrl}
            download
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border dark:border-white/10 hover:bg-muted/10 text-foreground font-semibold text-xs transition-all duration-200"
          >
            <FileText className="w-3.5 h-3.5 text-primary dark:text-[#00ffcc]" />
            <span>{t("download_cv")}</span>
          </a>
        </div>

        {/* Sociaux */}
        <div className="hidden md:flex items-center gap-4 mt-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
