export interface LocalizedString {
  fr: string;
  en: string;
}

export interface Project {
  id: string;
  name: string;
  stack: string[];
  year: string;
  description: LocalizedString;
  category: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillGroup {
  languages: string[];
  frontend: string[];
  backend: string[];
  mobile: string[];
  databases: string[];
  devops: string[];
  erp: string[];
  automation: string[];
  sig: string[];
  modeling: string[];
  softSkills: string[];
}

export interface Experience {
  company: string;
  role: LocalizedString;
  period: string;
  tasks: {
    fr: string[];
    en: string[];
  };
}

export interface Education {
  school: string;
  degree: LocalizedString;
  period: string;
  mention?: LocalizedString;
}

export interface Testimony {
  id: string;
  clientName: string;
  companyName: string;
  rating: number;
  message: LocalizedString;
}

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  cvUrl: string;
  avatarUrl: string;
  title: LocalizedString;
  bio: LocalizedString;
  skills: SkillGroup;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  testimonials: Testimony[];
}

export const profileData: ProfileData = {
  name: "NAGUE JUSTIN",
  email: "naguejustin78@gmail.com",
  phone: "+237 656876123",
  location: "Douala-Kotto, Cameroun",
  github: "https://github.com/bankaizankanotatchi",
  cvUrl: "/cv.pdf",
  avatarUrl: "/profile.jpg",
  title: {
    fr: "Développeur Fullstack (Web & Mobile) & Odoo",
    en: "Fullstack Developer (Web & Mobile) & Odoo Expert"
  },
  bio: {
    fr: "Développeur Fullstack passionné avec une expertise solide dans le développement d'applications web/mobiles et l'intégration de solutions ERP (Odoo). Diplômé de l'Institut Universitaire de la Côte (IUC) en Génie Logiciel, j'accompagne les entreprises dans l'automatisation de processus (n8n, scripts) et le déploiement d'infrastructures robustes (DevOps, Docker, CI/CD).",
    en: "Passionate Fullstack Developer with a solid expertise in web/mobile development and ERP integrations (Odoo). Graduated in Software Engineering from the Institut Universitaire de la Côte (IUC), I assist companies in process automation (n8n, scripting) and deploying robust infrastructures (DevOps, Docker, CI/CD)."
  },
  skills: {
    languages: ["C", "C#", "Python", "PHP", "JavaScript", "TypeScript", "Bash", "Java", "Visual Basic"],
    frontend: ["Next.js", "React", "Tailwind CSS", "Bootstrap", "HTML/CSS", "jQuery"],
    backend: ["Django", "Laravel", "FastAPI"],
    mobile: ["Flutter", "React Native"],
    databases: ["PostgreSQL", "MySQL", "Firebase", "Supabase"],
    devops: ["Docker", "Kubernetes", "Administration Système", "Gestion de VPS", "Redis", "Git/GitHub", "GitHub Actions", "Pipelines CI/CD"],
    erp: ["Odoo (Création de modules, customisation, API)"],
    automation: ["n8n", "Agents IA"],
    sig: ["Intégration de cartes", "Géolocalisation & Tracking", "Inventaires géolocalisés"],
    modeling: ["UML (Astah UML, WinDesign, Workbench)", "MCD", "Diagramme de classes / cas d'utilisation"],
    softSkills: ["Travail d'équipe", "Gestion de projet", "Méthodologie Agile/Scrum", "Esprit de recherche"]
  },
  projects: [
    {
      id: "mon-aie",
      name: "Mon-AIE",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "PHP Backend", "Brevo"],
      year: "2025",
      description: {
        fr: "Application web pour Ambassador International Entreprise, société spécialisée dans l'immigration. Présente les services et l'entreprise, met en avant les promotions/campagnes, facilite la prise de rendez-vous et le suivi des dossiers clients.",
        en: "Web application for Ambassador International Enterprise, an immigration company. Presents services, highlights campaigns, facilitates appointments booking and client case tracking."
      },
      category: "Web Application"
    },
    {
      id: "innov-immo",
      name: "Innov-Immo",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      year: "2025",
      description: {
        fr: "Site vitrine moderne présentant l'entreprise immobilière Innov-Immo avec une interface fluide et des animations soignées.",
        en: "Modern showcase website presenting the real estate company Innov-Immo with a sleek interface and smooth animations."
      },
      category: "Web Showcase"
    },
    {
      id: "innov-btp",
      name: "Innov-BTP",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      year: "2025",
      description: {
        fr: "Site vitrine présentant l'entreprise de construction et BTP Innov-BTP mettant en avant leurs réalisations majeures.",
        en: "Showcase website presenting the construction and civil engineering company Innov-BTP, highlighting their major achievements."
      },
      category: "Web Showcase"
    },
    {
      id: "shikaku",
      name: "Shikaku",
      stack: ["Flutter", "FastAPI", "MinIO"],
      year: "2026",
      description: {
        fr: "Jeu mobile multijoueur en ligne et en local. Le but est de remporter la partie en réalisant le plus de carrés possible sur une grille de jeu dynamique.",
        en: "Online and local multiplayer mobile game. Win the game by drawing the most squares on a dynamic grid."
      },
      category: "Mobile Game"
    },
    {
      id: "fc-elite",
      name: "FC Elite",
      stack: ["Flutter", "FastAPI", "MinIO"],
      year: "2025",
      description: {
        fr: "Application mobile de gestion d'une équipe de football (gestion des joueurs, entraînements, compositions d'équipes, saisons et notes de performances style FIFA).",
        en: "Mobile application for managing a football team (players, training sessions, team lineups, seasons, and FIFA-style performance ratings)."
      },
      category: "Mobile App"
    },
    {
      id: "web-enterprise-like-odoo18",
      name: "web_enterprise_like_odoo18",
      stack: ["Odoo", "Python", "XML"],
      year: "2025",
      description: {
        fr: "Module Odoo installable sur la version Community, recréant un dashboard similaire à la version Enterprise pour faciliter l'accès rapide aux modules internes.",
        en: "Odoo module installable on the Community version, recreating a dashboard similar to the Enterprise version to facilitate quick access to internal modules."
      },
      category: "ERP Module"
    },
    {
      id: "rfid",
      name: "RFID Presence",
      stack: ["Flutter", "Firebase", "C (Arduino)"],
      year: "2024",
      description: {
        fr: "Application et système de gestion de présence détectant les étudiants via des puces RFID intégrées à leur carte d'étudiant pour automatiser l'appel.",
        en: "Attendance management app and system detecting students via RFID chips integrated in their student cards to automate roll call."
      },
      category: "IoT / Mobile App"
    },
    {
      id: "camchive",
      name: "CamChive",
      stack: ["Flutter", "Firebase"],
      year: "2023",
      description: {
        fr: "Application mobile développée chez Camerica pour numériser et sécuriser des documents physiques importants de voyage afin d'éviter les pertes régulières.",
        en: "Mobile application developed at Camerica to digitize and secure important physical travel documents to prevent recurring file loss."
      },
      category: "Mobile App"
    },
    {
      id: "cars",
      name: "Cars Vitrine",
      stack: ["HTML", "CSS", "JavaScript"],
      year: "2023",
      description: {
        fr: "Site vitrine interactif et haut de gamme pour une entreprise concessionnaire de vente de voitures de luxe.",
        en: "Interactive and high-end showcase website for a luxury car dealership."
      },
      category: "Web Showcase"
    },
    {
      id: "chat-app",
      name: "Chat Application",
      stack: ["PHP", "MySQL", "jQuery", "Bootstrap 5"],
      year: "2023",
      description: {
        fr: "Application complète de messagerie instantanée avec salons de discussion en temps réel et partage de fichiers.",
        en: "Full instant messaging application with real-time chat rooms and file sharing features."
      },
      category: "Web Application"
    }
  ],
  experience: [
        {
      company: "KES INSPECTIONS AND PROJECTS",
      role: {
        fr: "Développeur Fullstack (Web & Mobile)",
        "en": "Fullstack Developer (Web & Mobile)"
      },
      period: "2025 - en cours",
      tasks: {
        fr: [
          "Développement de modules Odoo personnalisés pour faciliter le travail et la collaboration de différents départements.",
          "Automatisation de processus métier avec n8n (relances automatiques par email et SMS, intégration d'API).",
          "Contribution au développement d'applications internes d'inspection et de contrôle qualité électrique (KES)."
        ],
        en: [
          "Developed customized Odoo modules to simplify communication and operations across departments.",
          "Automated business workflows using n8n (automated email and SMS reminders, API integrations).",
          "Contributed to building internal web/mobile applications for electrical inspection and quality control."
        ]
      }
    },
    {
      company: "Camerica",
      role: {
        fr: "Développeur Web / Mobile",
        en: "Web / Mobile Developer"
      },
      period: "01/2023 - 04/2024",
      tasks: {
        fr: [
          "Développement du site web d'infographie et de sérigraphie de l'entreprise et intégration d'un module de prise de rendez-vous.",
          "Conception et développement de CamChive, une application mobile de numérisation et sécurisation de documents physiques (dossiers de voyage).",
          "Développement d'un système de facturation numérique pour remplacer les facturations manuelles sujettes aux erreurs."
        ],
        en: [
          "Developed the company's graphic design and screen-printing website, integrating an online booking portal.",
          "Designed and built CamChive, a mobile app to digitize and secure critical physical travel documents.",
          "Developed a digital invoicing system to replace error-prone manual paper invoicing."
        ]
      }
    },
    {
      company: "Ambassador International Entreprise",
      role: {
        fr: "Développeur Web / DevOps",
        en: "Web Developer / DevOps"
      },
      period: "03/2025 - en cours",
      tasks: {
        fr: [
          "Développement du site web de l'entreprise pour présenter ses services et faciliter la prise de rendez-vous.",
          "Automatisation du processus de déploiement continu (CI/CD) sur un serveur web VPS et maintenance régulière.",
          "Sécurisation du serveur contre les attaques courantes pour garantir une disponibilité maximale.",
          "Optimisation du référencement naturel (SEO) de qualité sur tous les navigateurs."
        ],
        en: [
          "Developed the company's website to showcase services and streamline appointment scheduling.",
          "Automated continuous deployment (CI/CD) workflows on a VPS server and performed regular maintenance.",
          "Secured the server against common exploits to ensure maximum service uptime.",
          "Optimized SEO for high organic rankings across all web browsers."
        ]
      }
    },
    {
      company: "Freelance",
      role: {
        fr: "Développeur Mobile / DevOps",
        en: "Mobile Developer / DevOps"
      },
      period: "09/2025 - 12/2025",
      tasks: {
        fr: [
          "Développement d'une application mobile de jeu multijoueur en ligne et en local (Shikaku).",
          "Déploiement et hébergement de l'infrastructure backend (FastAPI, MinIO) pour qu'elle soit accessible à tous."
        ],
        en: [
          "Developed a mobile multiplayer game with online and local support (Shikaku).",
          "Deployed and hosted the backend infrastructure (FastAPI, MinIO) for global accessibility."
        ]
      }
    },
    {
      company: "Freelance",
      role: {
        fr: "Développeur Odoo 18 / DevOps",
        en: "Odoo 18 Developer / DevOps"
      },
      period: "11/2025 - 12/2025",
      tasks: {
        fr: [
          "Déploiement d'instances Odoo 18 sur des serveurs d'entreprise pour un accès centralisé des employés.",
          "Mise en place de sauvegardes journalières automatisées de la base de données Odoo.",
          "Développement de modules personnalisés Odoo et couplage avec les modules natifs serveur."
        ],
        en: [
          "Deployed Odoo 18 instances on business servers for centralized employee access.",
          "Implemented automated daily database backups for the Odoo instances.",
          "Developed custom Odoo modules and integrated them with default server-side modules."
        ]
      }
    },
    {
      company: "Freelance",
      role: {
        fr: "Développeur Odoo 18",
        en: "Odoo 18 Developer"
      },
      period: "10/2025 - 11/2025",
      tasks: {
        fr: [
          "Développement de modules personnalisés spécifiques à l'entreprise pour centraliser les processus métiers.",
          "Formation des équipes sur l'utilisation du nouveau module ERP et de ses fonctionnalités associées.",
          "Développement de tableaux de bord RH reliés au module paie pour une vue d'ensemble et génération de rapports sécurisés."
        ],
        en: [
          "Developed custom company-specific modules to centralize corporate business workflows.",
          "Trained team members on using the newly deployed ERP module and its features.",
          "Developed HR dashboards connected to the payroll module for consolidated visibility and secure reporting."
        ]
      }
    }

  ],
  education: [
    {
      school: "Institut Universitaire de la Côte (IUC), Douala",
      degree: {
        fr: "Licence Professionnelle en Génie Logiciel",
        en: "Bachelor's Degree in Software Engineering"
      },
      period: "2024 - 2025",
      mention: {
        fr: "With Honors",
        en: "With Honors"
      }
    },
    {
      school: "Institut Universitaire de la Côte (IUC), Douala",
      degree: {
        fr: "BTS en Génie Logiciel (Brevet de Technicien Supérieur)",
        en: "Higher National Diploma (HND) in Software Engineering"
      },
      period: "2023 - 2024",
      mention: {
        fr: "With Honors",
        en: "With Honors"
      }
    },
    {
      school: "Lycée d'Akwa Nord, Douala",
      degree: {
        fr: "Baccalauréat Scientifique (Série D)",
        en: "Scientific Baccalaureate (D Series)"
      },
      period: "2021 - 2022",
      mention: {
        fr: "With Honors",
        en: "With Honors"
      }
    }
  ],
  testimonials: [
    {
      id: "1",
      clientName: "NZOMO VANESSA LYDIE",
      companyName: "Directrice Générale, CAMERICA",
      rating: 5,
      message: {
        fr: "Justin a fourni un excellent travail sur CamChive. L'application a parfaitement sécurisé l'archivage de nos dossiers et résolu nos pertes récurrentes de documents physiques.",
        en: "Justin did an excellent job on CamChive. The application secured our document archiving and solved our recurring losses of physical travel folders."
      }
    },
    {
      id: "2",
      clientName: "ONOMO JEAN BAPTISTE",
      companyName: "Data Analyst, KES",
      rating: 5,
      message: {
        fr: "Un ingénieur rigoureux et autonome. Ses intégrations n8n et le développement de nos modules Odoo RH et paie sur-mesure ont considérablement amélioré notre productivité interne.",
        en: "A meticulous and self-reliant engineer. His n8n integrations and custom Odoo HR/payroll modules have greatly enhanced our internal productivity."
      }
    },
    {
      id: "3",
      clientName: "Ambassador International Client",
      companyName: "Ambassador International Enterprise",
      rating: 5,
      message: {
        fr: "La refonte complète de notre plateforme web facilite grandement la prise de rendez-vous pour nos clients en immigration. Son travail sur le SEO et l'infrastruture VPS est de très haut niveau.",
        en: "The complete redesign of our web platform has made appointment booking for immigration clients seamless. His work on SEO and VPS infrastructure is top-notch."
      }
    }
  ]
};
