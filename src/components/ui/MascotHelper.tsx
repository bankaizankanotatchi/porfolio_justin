"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/lib/navigation";
import { useLocale } from "next-intl";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MascotHelper() {
  const pathname = usePathname();
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState("home");
  const [bubbleText, setBubbleText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isSuccessState, setIsSuccessState] = useState(false);

  // Position X & Y de la mascotte par rapport au viewport
  const [targetX, setTargetX] = useState(24);
  const [targetY, setTargetY] = useState(500);
  const [isFlying, setIsFlying] = useState(false);
  const [showBubble, setShowBubble] = useState(true); // Gère l'affichage de la bulle d'aide

  // Écouter un événement pour le succès du formulaire de contact
  useEffect(() => {
    const handleSuccess = () => {
      setIsSuccessState(true);
      setTimeout(() => setIsSuccessState(false), 6000);
    };

    window.addEventListener("contact-submit-success", handleSuccess);
    return () => window.removeEventListener("contact-submit-success", handleSuccess);
  }, []);

  // Détection de la section active lors du défilement
  useEffect(() => {
    if (pathname.includes("/experiences")) {
      setActiveSection("experiences");
      return;
    }
    if (pathname.includes("/projets")) {
      setActiveSection("projets");
      return;
    }

    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "testimonials", "contact"];
      let current = "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Déclencher l'état "vol" (Pose 3) lors du changement de section active
  useEffect(() => {
    setIsFlying(true);
    const timer = setTimeout(() => {
      setIsFlying(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeSection]);

  // Calculer et animer les coordonnées X & Y de la mascotte + visibilité de la bulle
  useEffect(() => {
    const handlePositionUpdate = () => {
      if (activeSection === "home") {
        // En bas à gauche sur la page d'accueil
        setTargetX(24);
        setTargetY(window.innerHeight - 140);
        setShowBubble(true); // Toujours visible sur le Hero
        return;
      }

      const section = document.getElementById(activeSection);
      if (section) {
        const h2 = section.querySelector("h2");
        if (h2) {
          const rect = h2.getBoundingClientRect();
          
          // Coordonnée X : à droite du texte du titre h2 (+ marge de 20px)
          let x = rect.left + rect.width + 20;
          // Coordonnée Y : alignée verticalement sur le titre h2
          let y = rect.top - 15;

          // Clamper X pour éviter que le robot ou sa bulle (total ~320px) ne sortent de l'écran
          x = Math.max(24, Math.min(window.innerWidth - 340, x));
          // Clamper Y pour que le robot reste toujours visible dans l'écran
          y = Math.max(100, Math.min(window.innerHeight - 180, y));

          setTargetX(x);
          setTargetY(y);

          // La bulle s'affiche UNIQUEMENT si le titre H2 de la section est visible dans l'écran
          const isTitleVisible = rect.top >= 40 && rect.top <= window.innerHeight - 150;
          setShowBubble(isTitleVisible);
        } else {
          // Fallback de secours
          const rect = section.getBoundingClientRect();
          setTargetX(24);
          setTargetY(Math.max(100, Math.min(window.innerHeight - 180, rect.top + 40)));
          setShowBubble(false);
        }
      }
    };

    window.addEventListener("scroll", handlePositionUpdate);
    window.addEventListener("resize", handlePositionUpdate);
    handlePositionUpdate(); // Init position

    return () => {
      window.removeEventListener("scroll", handlePositionUpdate);
      window.removeEventListener("resize", handlePositionUpdate);
    };
  }, [activeSection]);

  // Messages du guide
  const guides: Record<string, { fr: string; en: string }> = {
    home: {
      fr: "Bienvenue sur mon site ! Admire le MacBook 3D animé codé en pur CSS ! Utilise le menu pour naviguer.",
      en: "Welcome to my portfolio! Check out the animated 3D MacBook coded in pure CSS! Use the menu to browse."
    },
    about: {
      fr: "Voici mon parcours professionnel. Clique sur le bouton en bas pour voir tout l'historique !",
      en: "Here is my career chronology. Click the button below to open the complete history!"
    },
    skills: {
      fr: "Mon stack technique complet ! Tout mon savoir-faire y est listé et catégorisé sans devoir remonter !",
      en: "My complete tech stack! All my know-how is listed and categorized without scrolling up!"
    },
    projects: {
      fr: "Voici mes projets phares. Clique sur 'Visiter le site' pour voir les démos de mes applications en direct !",
      en: "Here are my key projects. Click 'Visiter le site' to check out my live application demos!"
    },
    testimonials: {
      fr: "Ce que mes clients disent de moi. Clique sur les flèches en bas pour faire défiler le carrousel !",
      en: "What my clients say about my work. Click the arrow buttons at the bottom to scroll through!"
    },
    contact: {
      fr: "Besoin de mes services ? Remplis ce formulaire pour m'envoyer directement un e-mail !",
      en: "Need my services? Fill out this form to send me an email directly!"
    },
    experiences: {
      fr: "Tu consultes mon historique de carrière complet ! Clique sur [ RETOUR ] pour revenir à l'accueil.",
      en: "You are viewing my full career timeline! Click [ RETOUR ] to go back home."
    },
    projets: {
      fr: "Recherche et filtre mes réalisations par mot-clé ou par technologie sur cette page d'archives !",
      en: "Search and filter all my creations by keyword or technology on this archive page!"
    }
  };

  useEffect(() => {
    if (isSuccessState) {
      setBubbleText(locale === "en" ? "Awesome! Your message has been sent successfully!" : "Super ! Ton message a bien été envoyé automatiquement !");
      return;
    }
    const textData = guides[activeSection] || guides.home;
    const msg = locale === "en" ? textData.en : textData.fr;
    setBubbleText(msg);
  }, [activeSection, locale, isSuccessState]);

  if (isDismissed) return null;

  // Déterminer la pose du robot :
  // - "pose3" (vol/curved plume) si en déplacement ou formulaire soumis avec succès
  // - "pose1" (doigt pointé) : à l'arrêt sur les sections
  const robotPose: "pose1" | "pose3" = (isFlying || isSuccessState) ? "pose3" : "pose1";

  return (
    // Masqué sur mobile, visible sur desktop
    <motion.div
      className="hidden md:flex fixed z-40 items-start gap-4 pointer-events-none"
      animate={{ x: targetX, y: targetY }}
      transition={{ type: "spring", stiffness: 90, damping: 15 }}
      style={{
        left: 0,
        top: 0,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none"
      }}
    >
      
      {/* 1. COMPOSANT MASCOTTE ROBOT SVG DESSINÉ */}
      <div className="relative pointer-events-auto flex flex-col items-center select-none w-20">
        
        {/* Flottement vertical de la mascotte */}
        <div className="w-20 h-24 relative flex items-center justify-center animate-[floatMascot_3.5s_ease-in-out_infinite]">
          
          <svg
            width="80"
            height="96"
            viewBox="0 0 100 120"
            className="overflow-visible filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
          >
            <defs>
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f3f4f6" />
                <stop offset="100%" stopColor="#e5e7eb" />
              </linearGradient>

              <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>

              <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2e1065" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>

              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* --- FLAMME DE PROPULSION (CYAN JET PLUME) --- */}
            {robotPose === "pose1" ? (
              <g className="animate-[flickerJet_0.15s_infinite_alternate]">
                <path d="M 45 92 L 50 115 L 55 92 Z" fill="#00ffcc" opacity="0.8" />
                <path d="M 47 92 L 50 106 L 53 92 Z" fill="#3b82f6" opacity="0.9" />
              </g>
            ) : (
              <g className="animate-[flickerJet_0.1s_infinite_alternate]">
                {/* Flamme incurvée de vol */}
                <path d="M 44 92 C 40 105, 32 112, 22 116 C 35 110, 48 102, 54 92 Z" fill="#00ffcc" opacity="0.9" />
                <path d="M 46 92 C 43 100, 38 104, 30 107 C 40 103, 48 98, 52 92 Z" fill="#3b82f6" opacity="0.9" />
              </g>
            )}

            {/* --- BRAS DROIT (RIGHT ARM) --- */}
            {robotPose === "pose1" ? (
              <g>
                <path d="M 68 76 Q 80 66, 78 52" fill="none" stroke="#4b5563" strokeWidth="6" strokeLinecap="round" />
                <circle cx="78" cy="49" r="4" fill="#6d28d9" />
                <path d="M 78 49 L 81 42" stroke="#6d28d9" strokeWidth="3" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                <path d="M 68 76 Q 78 84, 82 76" fill="none" stroke="#4b5563" strokeWidth="6" strokeLinecap="round" />
                <circle cx="83" cy="73" r="4" fill="#6d28d9" />
              </g>
            )}

            {/* --- BRAS GAUCHE (LEFT ARM) --- */}
            {robotPose === "pose1" ? (
              <g>
                <path d="M 32 76 Q 22 74, 25 84" fill="none" stroke="#4b5563" strokeWidth="6" strokeLinecap="round" />
                <circle cx="26" cy="85" r="4" fill="#6d28d9" />
              </g>
            ) : (
              <g>
                <path d="M 32 76 Q 16 66, 18 52" fill="none" stroke="#4b5563" strokeWidth="6" strokeLinecap="round" />
                {/* Main thumbs up */}
                <circle cx="18" cy="49" r="4.5" fill="#6d28d9" />
                <path d="M 18 49 L 14 46" stroke="#6d28d9" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            )}

            {/* --- CORPS / BUSTE (TORSO) --- */}
            <path d="M 34 68 L 66 68 L 58 92 C 50 96, 50 96, 42 92 Z" fill="url(#bodyGrad)" stroke="#4b5563" strokeWidth="3.5" />
            <circle cx="50" cy="80" r="9" fill="#ffffff" stroke="#4b5563" strokeWidth="2.5" />

            {/* Badge Buste */}
            {robotPose === "pose1" ? (
              <g>
                <circle cx="50" cy="80" r="9" fill="#3b82f6" />
                <text x="50" y="84" fontStyle="italic" fontWeight="bold" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">i</text>
              </g>
            ) : (
              <g>
                <circle cx="50" cy="80" r="9" fill="#10b981" />
                <text x="50" y="83.5" fontWeight="black" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">OK</text>
              </g>
            )}

            <rect x="29" y="70" width="6" height="8" rx="2" fill="#4b5563" />
            <rect x="65" y="70" width="6" height="8" rx="2" fill="#4b5563" />

            {/* --- ANTENNES (ANTENNAE) --- */}
            <line x1="38" y1="28" x2="28" y2="18" stroke="#4b5563" strokeWidth="3" />
            <line x1="33" y1="26" x2="31" y2="21" stroke="#4b5563" strokeWidth="2" />
            <line x1="36" y1="23" x2="33" y2="18" stroke="#4b5563" strokeWidth="2" />
            <circle cx="28" cy="18" r="4.5" fill="#8b5cf6" stroke="#4b5563" strokeWidth="1.5" />

            <line x1="62" y1="28" x2="72" y2="18" stroke="#4b5563" strokeWidth="3" />
            <line x1="67" y1="26" x2="69" y2="21" stroke="#4b5563" strokeWidth="2" />
            <line x1="64" y1="23" x2="67" y2="18" stroke="#4b5563" strokeWidth="2" />
            <circle cx="72" cy="18" r="4.5" fill="#8b5cf6" stroke="#4b5563" strokeWidth="1.5" />

            {/* Étincelle */}
            {robotPose === "pose1" && (
              <path d="M 46 11 L 50 5 L 48 16 L 54 10" fill="none" stroke="#00ffcc" strokeWidth="2" strokeLinecap="round" filter="url(#neonGlow)" />
            )}

            {/* --- TÊTE / CASQUE (HEAD / HELMET) --- */}
            <rect x="22" y="28" width="56" height="44" rx="20" fill="url(#bodyGrad)" stroke="#4b5563" strokeWidth="3.5" />
            <path d="M 23 44 C 23 30, 77 30, 77 44" fill="url(#purpleGrad)" />
            <ellipse cx="50" cy="32" r="10" fill="#8b5cf6" stroke="#4b5563" strokeWidth="2" />
            <text x="50" y="36.5" fontWeight="bold" fontSize="13" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">P</text>

            <rect x="18" y="42" width="5" height="16" rx="2" fill="#6d28d9" stroke="#4b5563" strokeWidth="2" />
            <rect x="77" y="42" width="5" height="16" rx="2" fill="#6d28d9" stroke="#4b5563" strokeWidth="2" />

            {/* Visière */}
            <rect x="28" y="42" width="44" height="24" rx="10" fill="url(#screenGrad)" stroke="#4b5563" strokeWidth="2.5" />

            {/* --- YEUX DYNAMIQUES --- */}
            {robotPose === "pose1" ? (
              <g filter="url(#neonGlow)">
                <path d="M 34 56 C 36 52, 40 52, 42 56" fill="none" stroke="#00ffcc" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 58 56 C 60 52, 64 52, 66 56" fill="none" stroke="#00ffcc" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            ) : (
              <g filter="url(#neonGlow)">
                <circle cx="37" cy="56" r="3.5" fill="#00ffcc" />
                <path d="M 58 56 C 60 52, 64 52, 66 56" fill="none" stroke="#00ffcc" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            )}

            {/* Bouche LED */}
            <path d="M 46 61 Q 50 64, 54 61" fill="none" stroke="#00ffcc" strokeWidth="2.5" strokeLinecap="round" filter="url(#neonGlow)" />
          </svg>

        </div>

        {/* Ombre */}
        <div className="w-12 h-1.5 bg-black/10 dark:bg-black/35 rounded-full blur-[2.5px] mt-1.5 animate-[shadowMascot_3.5s_ease-in-out_infinite]" />
      </div>

      {/* 2. BULLE DE BANDE DESSINÉE (SPEECH BUBBLE COMIC BOOK STYLE) */}
      <AnimatePresence>
        {isVisible && !isFlying && showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-white text-black border-[3px] border-black p-4 rounded-2xl max-w-[240px] shadow-[5px_5px_0px_#000] relative pointer-events-auto font-sans leading-tight text-xs flex flex-col gap-2"
          >
            {/* Flèche de la bulle */}
            <div className="absolute bottom-5 -left-[11px] w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-black border-b-[8px] border-b-transparent">
              <div className="absolute -top-[5px] left-[3px] w-0 h-0 border-t-[5px] border-t-transparent border-r-[5px] border-r-white border-b-[5px] border-b-transparent" />
            </div>

            {/* En-tête */}
            <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-0.5">
              <span className="font-mono text-[9px] text-gray-500 font-extrabold uppercase tracking-wider">
                GUIDE IA
              </span>
              <button
                onClick={() => setIsDismissed(true)}
                className="p-0.5 rounded hover:bg-gray-100 transition-colors"
                title="Masquer le guide"
              >
                <X className="w-4 h-4 text-black hover:text-red-500 transition-colors" />
              </button>
            </div>

            {/* Message de BD */}
            <p className="font-bold text-gray-900 leading-normal select-none">
              {bubbleText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
