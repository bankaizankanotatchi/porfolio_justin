import { profileData } from "@/data/profile";
import { Link } from "@/lib/navigation";
import { ArrowLeft, Briefcase, Calendar } from "lucide-react";

export default async function ExperiencesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const profile = profileData;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bouton retour */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-foreground mb-8 focus:outline-none transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>[ RETOUR ]</span>
        </Link>

        {/* Header */}
        <div className="border-b border-border dark:border-white/5 pb-8 mb-10">
          <span className="font-mono text-xs text-primary dark:text-[#00ffcc] tracking-widest block mb-2">
            // FULL WORK HISTORY
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
            Expériences Professionnelles
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-2">
            Historique complet des postes occupés, des missions réalisées et des technologies déployées.
          </p>
        </div>

        {/* Timeline complète */}
        <div className="divide-y divide-border dark:divide-white/5">
          {profile.experience.map((exp, idx) => {
            const roleName = exp.role[locale as "fr" | "en"] || exp.role.fr;
            const tasks = exp.tasks[locale as "fr" | "en"] || exp.tasks.fr;

            return (
              <div
                key={`${exp.company}-${idx}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 first:pt-0 last:pb-0 items-start"
              >
                {/* Période */}
                <div className="md:col-span-4 font-mono text-xs sm:text-sm text-muted font-medium">
                  [{exp.period}]
                </div>

                {/* Détails */}
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
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
