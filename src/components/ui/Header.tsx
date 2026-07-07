"use client";

import { useState, useEffect } from "react";
import { usePathname } from "@/lib/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const activeLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  // Détecter si l'utilisateur est sur une sous-page (/experiences ou /projets)
  const isSubpage =
    pathname.includes("/experiences") ||
    pathname.includes("/projets");

  useEffect(() => {
    const handleScroll = () => {
      // Défilement de la barre de progression
      setScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }

      // Scroll Spy (Section Active) sur la page principale
      if (!isSubpage) {
        const sections = ["home", "about", "skills", "projects", "testimonials", "contact"];
        let current = "home";

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Détection quand la section occupe le haut du viewport (marge de 120px)
            if (rect.top <= 120 && rect.bottom >= 120) {
              current = section;
              break;
            }
          }
        }
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSubpage]);

  // Si on est sur une sous-page, la section active correspond au path
  useEffect(() => {
    if (pathname.includes("/experiences")) {
      setActiveSection("about"); // Expériences fait partie de la section About
    } else if (pathname.includes("/projets")) {
      setActiveSection("projects");
    }
  }, [pathname]);

  const navItems = [
    { name: "Accueil", hash: "home" },
    { name: "À Propos", hash: "about" },
    { name: "Compétences", hash: "skills" },
    { name: "Projets", hash: "projects" },
    { name: "Témoignages", hash: "testimonials" },
    { name: "Contact", hash: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "py-3 bg-background/90 dark:bg-background/90 backdrop-blur-md border-b border-border dark:border-white/5"
            : "py-5 bg-transparent"
          }`}
      >
        {/* Barre de progression de scroll */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border dark:bg-white/5 z-10">
          <motion.div
            className="h-full bg-primary dark:bg-[#00ffcc]"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href={`/${activeLocale}`} className="flex items-center gap-1.5 focus:outline-none">
            <span className="font-display font-bold text-xl md:text-2xl tracking-wider text-primary dark:text-[#00ffcc]">
              NAGUE.J
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.hash;
              // Si on est sur une sous-page, rediriger vers la page principale + le hash
              const targetUrl = isSubpage
                ? `/${activeLocale}#${item.hash}`
                : `#${item.hash}`;

              return (
                <a
                  key={item.hash}
                  href={targetUrl}
                  className={`text-sm font-semibold transition-colors duration-200 relative py-1 focus:outline-none ${isActive
                      ? "text-primary dark:text-[#00ffcc]"
                      : "text-foreground/70 hover:text-foreground"
                    }`}
                >
                  <span>{item.name}</span>
                  {/* Ligne de soulignement animée pour la section active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeHeaderUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary dark:bg-[#00ffcc]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action buttons (Theme, Language, Hamburger) */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full border border-border dark:border-white/5 bg-card text-foreground hover:bg-muted/10 transition-colors md:hidden focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-card border-b border-border dark:border-white/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 flex flex-col gap-3">
                {navItems.map((item) => {
                  const isActive = activeSection === item.hash;
                  const targetUrl = isSubpage
                    ? `/${activeLocale}#${item.hash}`
                    : `#${item.hash}`;

                  return (
                    <a
                      key={item.hash}
                      href={targetUrl}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-semibold py-2 border-b border-border/10 transition-colors flex items-center justify-between ${isActive
                          ? "text-primary dark:text-[#00ffcc]"
                          : "text-foreground"
                        }`}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-primary dark:bg-[#00ffcc]" />
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
// Import des composants enfants pour éviter les erreurs d'import circulaire
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
