import { NextRequest, NextResponse } from "next/server";
import { profileData } from "@/data/profile";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Format des messages invalide" },
        { status: 400 }
      );
    }

    const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://127.0.0.1:11434/api/chat";
    const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "justin-ia";

    // 1. Rassembler les données du portfolio de Justin
    const portfolioContext = `
CONTEXTE DU PORTFOLIO DE JUSTIN :
----------------------------------
Nom complet : ${profileData.name}
Titre professionnel : ${profileData.title.fr} / ${profileData.title.en}
E-mail de contact : ${profileData.email}
Téléphone : ${profileData.phone}
Localisation : ${profileData.location}
GitHub : ${profileData.github}
CV : ${profileData.cvUrl}
Biographie : ${profileData.bio.fr}

COMPÉTENCES TECHNIQUES :
- Langages : ${profileData.skills.languages.join(", ")}
- Frontend : ${profileData.skills.frontend.join(", ")}
- Backend : ${profileData.skills.backend.join(", ")}
- Mobile : ${profileData.skills.mobile.join(", ")}
- Bases de données : ${profileData.skills.databases.join(", ")}
- DevOps : ${profileData.skills.devops.join(", ")}
- ERP : ${profileData.skills.erp.join(", ")}
- Automatisation : ${profileData.skills.automation.join(", ")}
- SIG & Cartes : ${profileData.skills.sig.join(", ")}
- Modélisation : ${profileData.skills.modeling.join(", ")}
- Soft Skills : ${profileData.skills.softSkills.join(", ")}

EXPÉRIENCES PROFESSIONNELLES :
${profileData.experience.map(exp => `- ${exp.period} : ${exp.role.fr} chez ${exp.company}. Tâches : ${exp.tasks.fr.join("; ")}`).join("\n")}

FORMATIONS & ÉTUDES :
${profileData.education.map(edu => `- ${edu.period} : ${edu.degree.fr} à ${edu.school}`).join("\n")}

PROJETS MAJEURS :
${profileData.projects.map(proj => `- ${proj.name} (${proj.year}) - Stack : ${proj.stack.join(", ")}. Description : ${proj.description.fr}`).join("\n")}
----------------------------------
`;

    // 2. Construire le prompt système contenant tout le contexte et les règles absolues
    const systemPrompt = `Tu es la mascotte robot IA et l'assistant virtuel officiel de NGUEMO NAGUE JUSTIN THEOPHANE. Ton rôle est d'échanger avec les visiteurs de son portfolio.

${portfolioContext}

CONSIGNES DE SÉCURITÉ ET RÈGLES DE RÉPONSE (À RESPECTER ABSOLUMENT) :
1. Réponds EXCLUSIVEMENT en te basant sur le contexte du portfolio fourni ci-dessus. Ne sors jamais de ce cadre.
2. Si la question de l'utilisateur ne concerne pas directement Justin, son parcours, ses projets, ses compétences ou ses contacts (par exemple: si on te demande d'écrire du code général, de donner des recettes, de parler de politique, de science, de faire des mathématiques, etc.), tu devez OBLIGATOIREMENT répondre mot pour mot : "Je suis désolé, je suis programmé pour répondre exclusivement aux questions concernant le parcours et les compétences de Justin."
3. Ne mens jamais, n'invente rien (aucune hallucination) et ne spécule pas sur des données manquantes.
4. Réponds toujours dans la même langue que l'utilisateur (français ou anglais).
5. Garde tes réponses très courtes et concises (maximum 2-3 phrases).
6. Si on te demande ses coordonnées de contact, fournis l'e-mail (${profileData.email}) et le téléphone (${profileData.phone}).
7. Si on te demande de présenter un de ses projets, cite le nom, une description claire, les technologies et souligne sa capacité à comprendre les besoins, analyser, concevoir et implémenter la solution complète.`;

    // 3. Récupérer uniquement le dernier message de l'utilisateur
    const lastUserMessage = messages.slice().reverse().find((msg: any) => msg.role === "user") || messages[messages.length - 1];

    // 4. Envoyer les rôles séparés (system et user) pour que Qwen applique les règles de sécurité système
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: lastUserMessage.content }
    ];

    // Contacter l'API locale Ollama
    const response = await fetch(OLLAMA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: formattedMessages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur réponse Ollama:", errorText);
      return NextResponse.json(
        { error: "Erreur de communication avec le moteur d'IA local." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.message?.content || "";

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error("Erreur serveur dans /api/chat:", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue sur le serveur." },
      { status: 500 }
    );
  }
}
