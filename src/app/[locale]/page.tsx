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
    </div>
  );
}
