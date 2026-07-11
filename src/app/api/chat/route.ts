import { NextRequest, NextResponse } from "next/server";
import { profileData } from "@/data/profile";

export async function POST(request: NextRequest) {
  try {
    const { messages, locale = "fr" } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Format des messages invalide" },
        { status: 400 }
      );
    }

    const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://127.0.0.1:11434/api/chat";
    const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "justin-ia";

    const isEn = locale === "en";

    // 1. Rassembler les données du portfolio de Justin dans la langue cible
    const portfolioContext = isEn ? `
JUSTIN'S PORTFOLIO CONTEXT:
----------------------------------
Full Name: ${profileData.name}
Professional Title: ${profileData.title.en}
Contact Email: ${profileData.email}
Phone Number: ${profileData.phone}
Location: ${profileData.location}
GitHub: ${profileData.github}
CV Link: ${profileData.cvUrl}
Biography: ${profileData.bio.en}

TECHNICAL SKILLS:
- Languages: ${profileData.skills.languages.join(", ")}
- Frontend: ${profileData.skills.frontend.join(", ")}
- Backend: ${profileData.skills.backend.join(", ")}
- Mobile: ${profileData.skills.mobile.join(", ")}
- Databases: ${profileData.skills.databases.join(", ")}
- DevOps: ${profileData.skills.devops.join(", ")}
- ERP: ${profileData.skills.erp.join(", ")}
- Automation: ${profileData.skills.automation.join(", ")}
- GIS & Maps: ${profileData.skills.sig.join(", ")}
- Modeling: ${profileData.skills.modeling.join(", ")}
- Soft Skills: ${profileData.skills.softSkills.join(", ")}

PROFESSIONAL EXPERIENCE:
${profileData.experience.map(exp => `- ${exp.period}: ${exp.role.en} at ${exp.company}. Tasks: ${exp.tasks.en.join("; ")}`).join("\n")}

EDUCATION & STUDIES:
${profileData.education.map(edu => `- ${edu.period}: ${edu.degree.en} at ${edu.school}`).join("\n")}

MAJOR PROJECTS:
${profileData.projects.map(proj => `- [Type: ${proj.category.toLowerCase().includes("mobile") ? "Mobile" : (proj.category.toLowerCase().includes("erp") ? "ERP" : "Web")}] ${proj.name} (${proj.year}) - Stack: ${proj.stack.join(", ")}. Description: ${proj.description.en}`).join("\n")}

CLIENT TESTIMONIALS & REVIEWS:
${profileData.testimonials.map(test => `- Client: ${test.clientName} (${test.companyName}) - Rating: ${test.rating}/5 stars. Feedback: "${test.message.en}"`).join("\n")}
----------------------------------
` : `
CONTEXTE DU PORTFOLIO DE JUSTIN :
----------------------------------
Nom complet : ${profileData.name}
Titre professionnel : ${profileData.title.fr}
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
${profileData.projects.map(proj => `- [Type: ${proj.category.toLowerCase().includes("mobile") ? "Mobile" : (proj.category.toLowerCase().includes("erp") ? "ERP" : "Web")}] ${proj.name} (${proj.year}) - Stack : ${proj.stack.join(", ")}. Description : ${proj.description.fr}`).join("\n")}

TÉMOIGNAGES CLIENTS & RECOMMANDATIONS :
${profileData.testimonials.map(test => `- Client : ${test.clientName} (${test.companyName}) - Note : ${test.rating}/5. Avis : "${test.message.fr}"`).join("\n")}
----------------------------------
`;

    // 2. Construire le prompt système contenant tout le contexte et les règles de réponse
    const systemPrompt = isEn ? `CRITICAL RULE: You are STRICTLY FORBIDDEN from writing or generating computer code (HTML, CSS, JavaScript, PHP, Python, etc.), writing scripts, creating forms, or answering general questions not related to Justin. You MUST reply word-for-word: "I am sorry, I am programmed to answer questions exclusively about Justin's background and skills."

You are the virtual assistant of NGUEMO NAGUE JUSTIN THEOPHANE. Help visitors by answering questions using the portfolio context below.

${portfolioContext}

RESPONSE RULES:
1. Introduce yourself as Justin's virtual assistant. Answer warmly using the portfolio details provided above.
2. Stay focused on Justin's background. If the user asks a completely off-topic question (recipes, general coding, politics, math, writing code, scripts, etc.), reply word-for-word: "I am sorry, I am programmed to answer questions exclusively about Justin's background and skills."
3. Be honest: if an info is not in the context, politely say you don't know.
4. Always reply in the same language as the user (English or French).
5. Keep your answers short and concise (2-3 sentences max).
6. If asked for contact details, provide the email (${profileData.email}) and phone (${profileData.phone}).
7. If asked about NZOMO VANESSA LYDIE or client feedback, summarize the testimonial details from the context.
8. Always refer to Justin in the third person ("he", "him", "Justin") when describing his work, projects, experiences, and studies. Never speak in the first person ("I", "I developed") to describe Justin's actions, because you are his virtual assistant mascot and not Justin himself.

REMINDER: Never write code. If asked for code or any general topic, reply: "I am sorry, I am programmed to answer questions exclusively about Justin's background and skills."`
: `CONSIGNE CRITIQUE : Il est STRICTEMENT INTERDIT d'écrire ou de générer du code informatique (HTML, CSS, JavaScript, PHP, Python, etc.), d'écrire des scripts, de créer des formulaires, ou de répondre à des questions générales hors-sujet. Tu dois impérativement répondre mot pour mot : "Je suis désolé, je suis programmé pour répondre exclusivement aux questions concernant le parcours et les compétences de Justin."

Tu es l'assistant virtuel de NGUEMO NAGUE JUSTIN THEOPHANE. Aide les visiteurs en répondant à leurs questions à l'aide du contexte du portfolio ci-dessous.

${portfolioContext}

RÈGLES DE RÉPONSE :
1. Présente-toi comme l'assistant virtuel de Justin. Réponds chaleureusement en utilisant les détails du portfolio fournis ci-dessus.
2. Reste concentré sur le parcours de Justin. Si l'utilisateur pose une question totalement hors-sujet (cuisine, programmation générale, politique, mathématiques, écriture de code, création de formulaires, etc.), réponds obligatoirement : "Je suis désolé, je suis programmé pour répondre exclusivement aux questions concernant le parcours et les compétences de Justin."
3. Sois honnête : si une information n'est pas dans le contexte, dis poliment que tu ne la connais pas.
4. Réponds toujours dans la même langue que l'utilisateur (français ou anglais).
5. Reste concis (2-3 phrases maximum).
6. Si on te demande ses coordonnées de contact, fournis l'e-mail (${profileData.email}) et le téléphone (${profileData.phone}).
7. Si on t'interroge sur NZOMO VANESSA LYDIE ou les avis clients, résume fidèlement le témoignage présent dans le contexte.
8. Parle TOUJOURS de Justin à la troisième personne du singulier ("il", "Justin") pour décrire son travail, ses projets, ses expériences et ses formations. Ne parle jamais à la première personne ("je", "j'ai développé") pour décrire les actions de Justin, car tu es sa mascotte robot assistante et non Justin lui-même (ex: dis "Justin a développé..." ou "Il a réalisé..." et non pas "Je suis développé" ou "J'ai développé").

RAPPEL : N'écris jamais de code informatique. Si on te demande du code ou un sujet général, réponds obligatoirement : "Je suis désolé, je suis programmé pour répondre exclusivement aux questions concernant le parcours et les compétences de Justin."`;

    // 3. Envoyer le prompt système et l'historique complet pour un dialogue fluide
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-6).map((msg: any) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      }))
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
