"use client";

import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { HelpCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("nav");

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-background">
      <div className="neon-glow-blob top-1/4 left-1/4 w-80 h-80 bg-accent-cyan/15" />
      <div className="neon-glow-blob bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/15" />

      <div className="bg-[#0a0a0f] rounded-xl border border-white/5 p-8 md:p-12 shadow-neon max-w-md w-full relative z-10">
        <HelpCircle className="w-16 h-16 text-primary animate-bounce mx-auto mb-6" />
        <h1 className="font-display font-extrabold text-6xl text-gradient-cyan-purple mb-4">
          404
        </h1>
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
          Page Introuvable
        </h2>
        <p className="text-xs md:text-sm text-muted mb-8 leading-relaxed">
          Le module que vous cherchez n'existe pas ou a été déplacé vers une autre dimension numérique.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-neon font-semibold text-xs md:text-sm hover:scale-[1.01] transition-all focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("home")}</span>
        </Link>
      </div>
    </div>
  );
}
