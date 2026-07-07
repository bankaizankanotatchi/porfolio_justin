import { profileData } from "@/data/profile";
import { ensureAssetsExist } from "@/lib/setup";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import ContactSection from "@/components/contact/ContactSection";
import { MessageSquare } from "lucide-react";

export default async function PortfolioPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // S'assurer que le CV et la photo sont copiés dans le répertoire public
  await ensureAssetsExist();

  return (
    <div className="relative bg-background text-foreground overflow-hidden w-full">
      {/* Sections du Portfolio */}
      <div id="home">
        <HeroSection profile={profileData} locale={locale} />
      </div>
      
      <div id="about">
        <AboutSection profile={profileData} locale={locale} />
      </div>
      
      <div id="skills">
        <SkillsSection profile={profileData} />
      </div>
      
      <div id="projects">
        <ProjectsSection profile={profileData} locale={locale} />
      </div>
      
      <div id="testimonials">
        <TestimonialsSection testimonials={profileData.testimonials} locale={locale} />
      </div>
      
      <div id="contact">
        <ContactSection profile={profileData} />
      </div>

      {/* SLOT CHATBOT FLOUTANT PRÉPARÉ */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative group">
          {/* Tooltip */}
          <div className="absolute right-0 bottom-full mb-2 bg-card border border-border text-[10px] md:text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none whitespace-nowrap text-foreground flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-ping" />
            <span>Assistant IA (Bientôt disponible)</span>
          </div>

          {/* Bouton du Chatbot */}
          <button
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-primary to-secondary text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all focus:outline-none border border-white/10"
            aria-label="AI Chatbot placeholder"
          >
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
