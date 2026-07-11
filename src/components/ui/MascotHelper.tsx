"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "@/lib/navigation";
import { useLocale } from "next-intl";
import { X, ArrowLeft, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- SOUS-COMPOSANT : MASCOTTE ROBOT IA DESSINÉE (SVG ANIMÉ) ---
function RobotSVG({ pose, isLoading, scale = 1 }: { pose: "pose1" | "pose3"; isLoading: boolean; scale?: number }) {
  return (
    <div className="relative flex items-center justify-center animate-[floatMascot_3.5s_ease-in-out_infinite]" style={{ transform: `scale(${scale})` }}>
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
        {pose === "pose1" ? (
          <g className="animate-[flickerJet_0.15s_infinite_alternate]">
            <path d="M 45 92 L 50 115 L 55 92 Z" fill="#00ffcc" opacity="0.8" />
            <path d="M 47 92 L 50 106 L 53 92 Z" fill="#3b82f6" opacity="0.9" />
          </g>
        ) : (
          <g className="animate-[flickerJet_0.1s_infinite_alternate]">
            <path d="M 44 92 C 40 105, 32 112, 22 116 C 35 110, 48 102, 54 92 Z" fill="#00ffcc" opacity="0.9" />
            <path d="M 46 92 C 43 100, 38 104, 30 107 C 40 103, 48 98, 52 92 Z" fill="#3b82f6" opacity="0.9" />
          </g>
        )}

        {/* --- BRAS DROIT --- */}
        {pose === "pose1" ? (
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

        {/* --- BRAS GAUCHE --- */}
        {pose === "pose1" ? (
          <g>
            <path d="M 32 76 Q 22 74, 25 84" fill="none" stroke="#4b5563" strokeWidth="6" strokeLinecap="round" />
            <circle cx="26" cy="85" r="4" fill="#6d28d9" />
          </g>
        ) : (
          <g>
            <path d="M 32 76 Q 16 66, 18 52" fill="none" stroke="#4b5563" strokeWidth="6" strokeLinecap="round" />
            <circle cx="18" cy="49" r="4.5" fill="#6d28d9" />
            <path d="M 18 49 L 14 46" stroke="#6d28d9" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        )}

        {/* --- CORPS --- */}
        <path d="M 34 68 L 66 68 L 58 92 C 50 96, 50 96, 42 92 Z" fill="url(#bodyGrad)" stroke="#4b5563" strokeWidth="3.5" />
        <circle cx="50" cy="80" r="9" fill="#ffffff" stroke="#4b5563" strokeWidth="2.5" />

        {/* Badge Buste */}
        {pose === "pose1" ? (
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

        {/* --- ANTENNES --- */}
        <line x1="38" y1="28" x2="28" y2="18" stroke="#4b5563" strokeWidth="3" />
        <line x1="33" y1="26" x2="31" y2="21" stroke="#4b5563" strokeWidth="2" />
        <line x1="36" y1="23" x2="33" y2="18" stroke="#4b5563" strokeWidth="2" />
        <circle cx="28" cy="18" r="4.5" fill="#8b5cf6" stroke="#4b5563" strokeWidth="1.5" />

        <line x1="62" y1="28" x2="72" y2="18" stroke="#4b5563" strokeWidth="3" />
        <line x1="67" y1="26" x2="69" y2="21" stroke="#4b5563" strokeWidth="2" />
        <line x1="64" y1="23" x2="67" y2="18" stroke="#4b5563" strokeWidth="2" />
        <circle cx="72" cy="18" r="4.5" fill="#8b5cf6" stroke="#4b5563" strokeWidth="1.5" />

        {/* Étincelle */}
        {pose === "pose1" && (
          <path d="M 46 11 L 50 5 L 48 16 L 54 10" fill="none" stroke="#00ffcc" strokeWidth="2" strokeLinecap="round" filter="url(#neonGlow)" />
        )}

        {/* --- TÊTE --- */}
        <rect x="22" y="28" width="56" height="44" rx="20" fill="url(#bodyGrad)" stroke="#4b5563" strokeWidth="3.5" />
        <path d="M 23 44 C 23 30, 77 30, 77 44" fill="url(#purpleGrad)" />
        <ellipse cx="50" cy="32" r="10" fill="#8b5cf6" stroke="#4b5563" strokeWidth="2" />
        <text x="50" y="36.5" fontWeight="bold" fontSize="13" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">P</text>

        <rect x="18" y="42" width="5" height="16" rx="2" fill="#6d28d9" stroke="#4b5563" strokeWidth="2" />
        <rect x="77" y="42" width="5" height="16" rx="2" fill="#6d28d9" stroke="#4b5563" strokeWidth="2" />

        {/* Visière */}
        <rect x="28" y="42" width="44" height="24" rx="10" fill="url(#screenGrad)" stroke="#4b5563" strokeWidth="2.5" />

        {/* --- YEUX DYNAMIQUES --- */}
        {pose === "pose1" ? (
          <g filter="url(#neonGlow)">
            <path d="M 34 56 C 36 52, 40 52, 42 56" fill="none" stroke="#00ffcc" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 58 56 C 60 52, 64 52, 66 56" fill="none" stroke="#00ffcc" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        ) : (
          <g filter="url(#neonGlow)">
            <circle cx="37" cy="56" r="3.5" fill="#00ffcc" className={isLoading ? "animate-pulse" : ""} />
            <path d="M 58 56 C 60 52, 64 52, 66 56" fill="none" stroke="#00ffcc" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        )}

        {/* Bouche */}
        <path d="M 46 61 Q 50 64, 54 61" fill="none" stroke="#00ffcc" strokeWidth="2.5" strokeLinecap="round" filter="url(#neonGlow)" />
      </svg>
    </div>
  );
}

// --- SOUS-COMPOSANT : DECODEUR MARKDOWN MAISON ULTRA-LÉGER ---
function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, idx) => {
        let isList = false;
        let cleanLine = line;

        // Détecter les puces de liste
        if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
          isList = true;
          cleanLine = line.trim().substring(2);
        }

        // Remplacer **texte** par <strong>texte</strong>
        const parts = [];
        const boldRegex = /\*\*([^*]+)\*\*/g;
        let match;
        let lastIndex = 0;

        while ((match = boldRegex.exec(cleanLine)) !== null) {
          const matchIndex = match.index;
          const matchedText = match[1];

          if (matchIndex > lastIndex) {
            parts.push(cleanLine.substring(lastIndex, matchIndex));
          }
          parts.push(
            <strong key={matchIndex} className="font-extrabold text-blue-600 dark:text-cyan-400">
              {matchedText}
            </strong>
          );
          lastIndex = boldRegex.lastIndex;
        }

        if (lastIndex < cleanLine.length) {
          parts.push(cleanLine.substring(lastIndex));
        }

        const renderedLine = parts.length > 0 ? parts : cleanLine;

        if (isList) {
          return (
            <div key={idx} className="flex gap-1.5 pl-1.5 items-start">
              <span className="text-primary select-none mt-1.5 text-[8px]">•</span>
              <p className="flex-1 text-[11px] font-semibold leading-normal text-left">{renderedLine}</p>
            </div>
          );
        }

        return (
          <p key={idx} className="text-[11px] font-semibold leading-normal text-left min-h-[1em]">
            {renderedLine}
          </p>
        );
      })}
    </div>
  );
}

export default function MascotHelper() {
  const pathname = usePathname();
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState("home");
  const [bubbleText, setBubbleText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isSuccessState, setIsSuccessState] = useState(false);

  // États pour la messagerie interactive
  const [isChatMode, setIsChatMode] = useState(false);
  const [mascotState, setMascotState] = useState<"floating" | "pulling" | "header" | "pushing">("floating");
  const [showFloatingMascot, setShowFloatingMascot] = useState(true);
  const [isTransitioningToChat, setIsTransitioningToChat] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Position X & Y de la mascotte par rapport au viewport (hors mode chat)
  const [targetX, setTargetX] = useState(24);
  const [targetY, setTargetY] = useState(500);
  const [isFlying, setIsFlying] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleOpenChat = () => {
    if (window.innerWidth < 768) {
      setIsChatMode(true);
      setMascotState("header");
      setShowFloatingMascot(false);
      return;
    }
    // 1. Lancer le vol en diagonale vers le bord droit de l'écran
    setIsTransitioningToChat(true);
    setTargetX(window.innerWidth - 64);
    setTargetY(80);

    // 2. Une fois sur le bord, ouvrir le volet
    setTimeout(() => {
      setShowFloatingMascot(false);
      setMascotState("pulling");
      setIsChatMode(true);
      setIsTransitioningToChat(false);
    }, 500);
  };

  const handleCloseChat = () => {
    if (window.innerWidth < 768) {
      setIsChatMode(false);
      setMascotState("floating");
      setShowFloatingMascot(true);
      return;
    }
    setMascotState("pushing");
    setTimeout(() => {
      // 1. Placer le guide flottant au bord avant le slide-out
      setTargetX(window.innerWidth - 64);
      setTargetY(80);
      setShowFloatingMascot(true);
      setIsChatMode(false);

      // 2. Une fois le volet sorti (600ms), renvoyer en diagonale vers la position initiale de guide
      setTimeout(() => {
        setMascotState("floating");
      }, 600);
    }, 600);
  };

  // Gérer la hauteur du viewport visuel sur mobile pour s'adapter au clavier virtuel
  const [viewportHeight, setViewportHeight] = useState("100dvh");

  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const handleResize = () => {
      if (window.visualViewport) {
        setViewportHeight(`${window.visualViewport.height}px`);
      }
    };

    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, [isChatMode]);

  // Détecter si l'écran est un mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Ajuster la marge de droite du site (body) pour pousser le contenu en mode chat sur desktop
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    const body = document.body;
    if (isChatMode) {
      body.classList.add("chat-active");
    } else {
      body.classList.remove("chat-active");
    }

    return () => {
      body.classList.remove("chat-active");
    };
  }, [isChatMode, isMobile]);

  // Charger le message d'accueil initial en fonction de la langue
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content:
          locale === "en"
            ? "Hello! I am Justin's virtual AI assistant. Ask me anything about his background, projects, or technical skills!"
            : "Salut ! Je suis l'assistant virtuel de Justin. Pose-moi toutes tes questions sur son parcours, ses projets ou ses compétences !",
      },
    ]);
  }, [locale]);

  // Faire défiler vers le bas lors de la réception d'un message
  useEffect(() => {
    if (isChatMode) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatMode, isLoading]);

  // Écouter le succès du formulaire de contact
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
    setIsDismissed(false);
    const timer = setTimeout(() => {
      setIsFlying(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeSection]);

  // Calculer et animer les coordonnées X & Y de la mascotte + visibilité de la bulle
  useEffect(() => {
    const handlePositionUpdate = () => {
      if (isTransitioningToChat || mascotState === "pushing") return;

      // 1. Sur Mobile : Position fixe en bas à gauche
      if (window.innerWidth < 768) {
        setTargetX(16);
        setTargetY(window.innerHeight - 130);
        setShowBubble(true);
        return;
      }

      // 2. Sur Desktop pour le Hero
      if (activeSection === "home") {
        setTargetX(24);
        setTargetY(window.innerHeight - 200);
        setShowBubble(true);
        return;
      }

      // 3. Sur Desktop pour les autres sections (suivi du titre H2)
      const section = document.getElementById(activeSection);
      if (section) {
        const h2 = section.querySelector("h2");
        if (h2) {
          const rect = h2.getBoundingClientRect();

          let x = rect.left + rect.width + 20;
          let y = rect.top - 15;

          // Clamper les coordonnées
          x = Math.max(24, Math.min(window.innerWidth - 340, x));
          y = Math.max(100, Math.min(window.innerHeight - 180, y));

          setTargetX(x);
          setTargetY(y);

          const isTitleVisible = rect.top >= 40 && rect.top <= window.innerHeight - 150;
          setShowBubble(isTitleVisible);
        } else {
          const rect = section.getBoundingClientRect();
          setTargetX(24);
          setTargetY(Math.max(100, Math.min(window.innerHeight - 180, rect.top + 40)));
          setShowBubble(false);
        }
      }
    };

    window.addEventListener("scroll", handlePositionUpdate);
    window.addEventListener("resize", handlePositionUpdate);
    handlePositionUpdate();

    // Planifier des rafraîchissements pendant et après les transitions du body
    const timer1 = setTimeout(handlePositionUpdate, 150);
    const timer2 = setTimeout(handlePositionUpdate, 350);
    const timer3 = setTimeout(handlePositionUpdate, 500);

    return () => {
      window.removeEventListener("scroll", handlePositionUpdate);
      window.removeEventListener("resize", handlePositionUpdate);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [activeSection, isChatMode, mascotState, isMobile]);

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

    if (isMobile) {
      setBubbleText(locale === "en" ? "Do you have any questions?" : "Vous avez des questions ?");
      return;
    }

    const textData = guides[activeSection] || guides.home;
    const msg = locale === "en" ? textData.en : textData.fr;
    setBubbleText(msg);
  }, [activeSection, locale, isSuccessState, isMobile]);

  // Fonction d'envoi du message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: inputVal };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInputVal("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages, locale }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      } else {
        const errMsg =
          locale === "en"
            ? "I cannot answer you at the moment, Justin my developer is performing maintenance"
            : "Je ne peux pas vous répondre pour le moment,Justin mon developpeur effectue une maintenance";
        setMessages((prev) => [...prev, { role: "assistant", content: errMsg }]);
      }
    } catch (error) {
      const errMsg =
        locale === "en"
          ? "I cannot answer you at the moment, Justin my developer is performing maintenance"
          : "Je ne peux pas vous répondre pour le moment,Justin mon developpeur effectue une maintenance";
      setMessages((prev) => [...prev, { role: "assistant", content: errMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const robotPose: "pose1" | "pose3" = (isFlying || isSuccessState || isLoading) ? "pose3" : "pose1";

  return (
    <>
      {/* 1. MOTEUR FLOTTANT (Robot + Bulle en mode normal sur mobile et desktop) */}
      <AnimatePresence>
        {showFloatingMascot && (
          <motion.div
            key="floating-mascot"
            initial={{ opacity: 0, x: targetX, y: targetY }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: targetX,
              y: targetY
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.2 },
              x: { type: "spring", stiffness: 90, damping: 15 },
              y: { type: "spring", stiffness: 90, damping: 15 }
            }}
            className="flex fixed z-40 items-start gap-4 pointer-events-none"
            style={{
              left: 0,
              top: 0
            }}
          >
            {/* Clique sur la mascotte pour ouvrir le chat */}
            <div
              className="relative pointer-events-auto flex flex-col items-center select-none w-20 cursor-pointer"
              onClick={handleOpenChat}
              title={locale === "en" ? "Click to chat with AI!" : "Cliquez pour discuter avec l'IA !"}
            >
              <motion.div
                layoutId="mascot-robot"
                animate={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <RobotSVG pose={robotPose} isLoading={isLoading} />
              </motion.div>
              <div className="w-12 h-1.5 bg-black/10 dark:bg-black/35 rounded-full blur-[2.5px] mt-1.5 animate-[shadowMascot_3.5s_ease-in-out_infinite]" />
            </div>

            {/* Bulle d'aide contextuelle */}
            {showBubble && !isDismissed && !isTransitioningToChat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                className="hidden md:flex bg-white text-black border-[3px] border-black p-4 rounded-2xl max-w-[240px] shadow-[5px_5px_0px_#000] relative pointer-events-auto font-sans leading-tight text-xs flex flex-col gap-2"
              >
                {/* Flèche */}
                <div className="absolute bottom-5 -left-[11px] w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-black border-b-[8px] border-b-transparent">
                  <div className="absolute -top-[5px] left-[3px] w-0 h-0 border-t-[5px] border-t-transparent border-r-[5px] border-r-white border-b-[5px] border-b-transparent" />
                </div>

                <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-0.5">
                  <span className="font-mono text-[9px] text-gray-500 font-extrabold uppercase tracking-wider">
                    GUIDE IA
                  </span>
                  <button
                    onClick={() => setIsDismissed(true)}
                    className="p-0.5 rounded hover:bg-gray-100 transition-colors"
                    title="Masquer"
                  >
                    <X className="w-4 h-4 text-black hover:text-red-500 transition-colors" />
                  </button>
                </div>

                <p className="font-bold text-gray-900 leading-normal select-none">
                  {bubbleText}
                </p>

                <div className="border-t border-black/10 pt-2 mt-1 flex justify-center">
                  <button
                    onClick={handleOpenChat}
                    className="w-full text-center font-mono text-[9px] font-extrabold uppercase py-1 border-2 border-black bg-primary text-white shadow-[2px_2px_0px_#000] hover:bg-primary/95 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]"
                  >
                    {locale === "en" ? "💬 Chat with my AI" : "💬 Discuter avec mon IA"}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MODE DISCUSSION (MODAL SHEET SUR DESKTOP / MODAL PLEIN ÉCRAN SUR MOBILE) */}
      <AnimatePresence onExitComplete={() => {
        if (!isChatMode) {
          setMascotState("floating");
        }
      }}>
        {isChatMode && (
          isMobile ? (
            // A. MODAL PLEIN ÉCRAN POUR LES MOBILES (Robot intégré dans le header)
            <motion.div
              key="mobile-chat-modal"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ height: viewportHeight }}
              className="fixed top-0 left-0 right-0 bg-white dark:bg-background text-foreground z-50 flex flex-col p-4 pointer-events-auto overflow-hidden"
            >
              {/* Header avec Robot */}
              <div className="flex items-center justify-between border-b-2 border-black dark:border-white/20 pb-2 mb-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCloseChat}
                    className="p-1 rounded-full border-2 border-black dark:border-white/20 bg-gray-100 dark:bg-zinc-800 active:scale-90 transition-transform"
                  >
                    <ArrowLeft className="w-5 h-5 text-black dark:text-white" />
                  </button>
                  <div className="w-12 h-12 flex items-center justify-center overflow-visible">
                    <RobotSVG pose={robotPose} isLoading={isLoading} scale={0.6} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-extrabold text-sm text-black dark:text-white">ASSISTANT DE JUSTIN</span>
                    <span className="font-mono text-[8px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                      IA ACTIVE
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleCloseChat();
                    setIsDismissed(true);
                  }}
                  className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Historique */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-2 bg-gray-50 dark:bg-zinc-950/20 rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10 scrollbar-thin">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[85%] p-2.5 rounded-xl border-2 border-black dark:border-white/20 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] leading-snug ${msg.role === "user"
                      ? "self-end bg-blue-100 dark:bg-blue-900/30 text-black dark:text-white"
                      : "self-start bg-white dark:bg-zinc-900 text-black dark:text-white"
                      }`}
                  >
                    <MarkdownRenderer content={msg.content} />
                  </div>
                ))}
                {isLoading && (
                  <div className="self-start max-w-[85%] p-2.5 rounded-xl border-2 border-black dark:border-white/20 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] bg-white dark:bg-zinc-900 text-left animate-pulse">
                    <span className="font-bold text-gray-400 dark:text-gray-500">reflexion...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Formulaire de saisie Multiligne */}
              <form onSubmit={handleSendMessage} className="flex gap-2 mt-3 items-end flex-shrink-0">
                <textarea
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  rows={3}
                  placeholder={locale === "en" ? "Ask a question..." : "Poser une question..."}
                  disabled={isLoading}
                  className="flex-1 border-2 border-black dark:border-white/20 px-2.5 py-1.5 rounded-lg text-xs outline-none bg-white dark:bg-zinc-900 text-black dark:text-white font-semibold focus:ring-1 focus:ring-primary placeholder-gray-400 disabled:opacity-50 resize-none h-16 max-h-16"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputVal.trim()}
                  className="p-3.5 border-2 border-black dark:border-white/20 bg-primary text-white rounded-lg shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] dark:active:shadow-[1px_1px_0px_rgba(255,255,255,0.15)] disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          ) : (
            // B. MODAL SHEET FIXÉ À DROITE SUR DESKTOP (23% de largeur de l'écran)
            <motion.div
              key="desktop-chat-sheet"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onAnimationComplete={(definition) => {
                if (isChatMode && mascotState === "pulling") {
                  setMascotState("header");
                }
              }}
              className="fixed top-0 right-0 h-screen w-[23vw] min-w-[280px] bg-white dark:bg-background border-l-[3px] border-black dark:border-white/20 shadow-[-5px_0_0px_#000] dark:shadow-[-5px_0_0px_rgba(255,255,255,0.15)] z-50 flex flex-col p-4 pointer-events-auto"
            >
              {/* Unique mascotte dans le volet desktop qui glisse de manière fluide de gauche à droite */}
              <motion.div
                layoutId="mascot-robot"
                animate={{
                  rotate: mascotState === "pulling" ? -90 : mascotState === "pushing" ? 90 : 0
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`absolute z-50 flex items-center justify-center overflow-visible pointer-events-none w-10 h-10 transition-[left,top] duration-300 ${(mascotState === "pulling" || mascotState === "pushing")
                  ? "-left-12 top-6"
                  : "left-4 top-4"
                  }`}
              >
                <RobotSVG pose={robotPose} isLoading={isLoading} scale={0.5} />
              </motion.div>

              {/* Header avec Robot intégré */}
              <div className="flex items-center justify-between border-b-2 border-black dark:border-white/20 pb-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 flex items-center justify-center overflow-visible">
                    {/* Placeholder pour maintenir l'alignement */}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-extrabold text-[12px] leading-tight text-black dark:text-white">IA DE JUSTIN</span>
                    <span className="font-mono text-[8px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1 leading-none mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                      ACTIVE
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCloseChat}
                    className="font-mono text-[9px] px-1.5 py-0.5 border-2 border-black dark:border-white/20 bg-gray-100 dark:bg-zinc-800 font-extrabold hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors uppercase shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_rgba(255,255,255,0.15)] text-black dark:text-white"
                  >
                    {locale === "en" ? "Back" : "Retour"}
                  </button>
                </div>
              </div>

              {/* Historique des messages */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-2 border border-dashed border-gray-400 dark:border-white/15 rounded-lg bg-gray-50/50 dark:bg-zinc-950/20 scrollbar-thin">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[85%] p-2.5 rounded-xl border-2 border-black dark:border-white/20 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] leading-snug ${msg.role === "user"
                      ? "self-end bg-blue-100 dark:bg-blue-900/30 text-black dark:text-white"
                      : "self-start bg-white dark:bg-zinc-900 text-black dark:text-white"
                      }`}
                  >
                    <MarkdownRenderer content={msg.content} />
                  </div>
                ))}
                {isLoading && (
                  <div className="self-start max-w-[85%] p-2.5 rounded-xl border-2 border-black dark:border-white/20 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] bg-white dark:bg-zinc-900 text-left animate-pulse">
                    <span className="font-bold text-gray-400 dark:text-gray-500">reflexion...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Zone d'écriture Multiligne (3 lignes max) */}
              <form onSubmit={handleSendMessage} className="flex gap-2 mt-3 items-end">
                <textarea
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  rows={3}
                  placeholder={locale === "en" ? "Ask a question..." : "Poser une question..."}
                  disabled={isLoading}
                  className="flex-1 border-2 border-black dark:border-white/20 px-2.5 py-1.5 rounded-lg text-xs outline-none bg-white dark:bg-zinc-900 text-black dark:text-white font-semibold focus:ring-1 focus:ring-primary placeholder-gray-400 disabled:opacity-50 resize-none h-16 max-h-16"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputVal.trim()}
                  className="p-3.5 border-2 border-black dark:border-white/20 bg-primary text-white rounded-lg shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] dark:active:shadow-[1px_1px_0px_rgba(255,255,255,0.15)] transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes floatMascot {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(1deg); }
        }
        @keyframes shadowMascot {
          0%, 100% { transform: scale(1); opacity: 0.75; }
          50% { transform: scale(0.8); opacity: 0.35; }
        }
        @keyframes flickerJet {
          0% { transform: scaleY(1); opacity: 0.95; }
          100% { transform: scaleY(0.85); opacity: 0.75; }
        }
      `}</style>
    </>
  );
}
