import { profileData } from "@/data/profile";
import { Link } from "@/lib/navigation";
import { ArrowLeft } from "lucide-react";
import ProjectsListClient from "./ProjectsListClient";

export default async function ProjetsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bouton retour */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-foreground mb-8 focus:outline-none transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>[ RETOUR ]</span>
        </Link>

        {/* Header */}
        <div className="border-b border-border dark:border-white/5 pb-8 mb-12">
          <span className="font-mono text-xs text-primary dark:text-[#00ffcc] tracking-widest block mb-2">
            // ALL PROJECTS FILE
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
            Archives des Projets
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-2">
            Recherchez et filtrez l'ensemble de mes réalisations web, mobiles, et ERP par technologie.
          </p>
        </div>

        {/* Composant Client pour la recherche interactive */}
        <ProjectsListClient profile={profileData} locale={locale} />

      </div>
    </div>
  );
}
