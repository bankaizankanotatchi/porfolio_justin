"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

// Chemins absolus vers les fichiers de base de données JSON
const getDbPath = (filename: string) => path.join(process.cwd(), "src", "data", filename);

// --- UTILITAIRES DE LECTURE/ÉCRITURE ---

async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  try {
    const filePath = getDbPath(filename);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    // Si le fichier n'existe pas, on retourne la valeur par défaut
    return defaultValue;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<boolean> {
  try {
    const filePath = getDbPath(filename);
    // Assurer que le dossier existe
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Erreur d'écriture dans ${filename}:`, error);
    return false;
  }
}

// --- STRUCTURES DE DONNÉES ---

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
}

export interface Review {
  id: string;
  clientName: string;
  companyName: string;
  message: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// --- ACTIONS PROFIL ---

async function ensureAssetsExist() {
  const publicDir = path.join(process.cwd(), "public");
  const cvDest = path.join(publicDir, "cv.pdf");
  const profileDest = path.join(publicDir, "profile.jpg");

  const cvSource = "/home/kes-dev-server/.gemini/antigravity-ide/brain/661e1f28-ffa2-49c4-b65f-8f55186b48e9/media__1783418019231.pdf";
  const profileSource = "/home/kes-dev-server/.gemini/antigravity-ide/brain/661e1f28-ffa2-49c4-b65f-8f55186b48e9/media__1783418113756.jpg";

  try {
    await fs.mkdir(publicDir, { recursive: true });

    // Vérifier et copier le CV
    try {
      await fs.access(cvDest);
    } catch {
      await fs.copyFile(cvSource, cvDest);
      console.log("CV PDF copié avec succès dans public/");
    }

    // Vérifier et copier la photo
    try {
      await fs.access(profileDest);
    } catch {
      await fs.copyFile(profileSource, profileDest);
      console.log("Photo de profil copiée avec succès dans public/");
    }
  } catch (error) {
    console.error("Erreur lors de la copie des assets médias:", error);
  }
}

export async function getProfile(): Promise<ProfileData> {
  await ensureAssetsExist();
  return readJsonFile<ProfileData>("profile.json", {} as ProfileData);
}


export async function updateProfile(
  newData: ProfileData,
  adminPasswordAttempt: string
): Promise<{ success: boolean; error?: string }> {
  const correctPassword = process.env.ADMIN_PASSWORD || "justinadmin123";
  if (adminPasswordAttempt !== correctPassword) {
    return { success: false, error: "Mot de passe incorrect." };
  }

  const success = await writeJsonFile("profile.json", newData);
  if (success) {
    revalidatePath("/", "layout");
    return { success: true };
  }
  return { success: false, error: "Erreur lors de l'enregistrement des modifications." };
}

// --- ACTIONS AVIS / TÉMOIGNAGES ---

export async function getReviews(onlyApproved = false): Promise<Review[]> {
  const reviews = await readJsonFile<Review[]>("reviews.json", []);
  if (onlyApproved) {
    return reviews.filter((r) => r.approved);
  }
  // Trier les avis du plus récent au plus ancien
  return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function submitReview(data: {
  clientName: string;
  companyName: string;
  message: string;
  rating: number;
}): Promise<{ success: boolean; error?: string }> {
  // Validation simple
  if (!data.clientName || !data.message || data.rating < 1 || data.rating > 5) {
    return { success: false, error: "Données de formulaire invalides." };
  }

  const reviews = await readJsonFile<Review[]>("reviews.json", []);
  const newReview: Review = {
    id: Math.random().toString(36).substring(2, 9),
    clientName: data.clientName,
    companyName: data.companyName || "Freelance / Client",
    message: data.message,
    rating: data.rating,
    approved: false, // Nécessite l'approbation d'un admin
    createdAt: new Date().toISOString(),
  };

  reviews.push(newReview);
  const success = await writeJsonFile("reviews.json", reviews);
  if (success) {
    revalidatePath("/", "layout");
    return { success: true };
  }
  return { success: false, error: "Impossible de soumettre votre avis." };
}

export async function approveReview(
  id: string,
  adminPasswordAttempt: string
): Promise<{ success: boolean; error?: string }> {
  const correctPassword = process.env.ADMIN_PASSWORD || "justinadmin123";
  if (adminPasswordAttempt !== correctPassword) {
    return { success: false, error: "Mot de passe incorrect." };
  }

  const reviews = await readJsonFile<Review[]>("reviews.json", []);
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) {
    return { success: false, error: "Avis introuvable." };
  }

  reviews[index].approved = true;
  const success = await writeJsonFile("reviews.json", reviews);
  if (success) {
    revalidatePath("/", "layout");
    return { success: true };
  }
  return { success: false, error: "Erreur d'enregistrement." };
}

export async function deleteReview(
  id: string,
  adminPasswordAttempt: string
): Promise<{ success: boolean; error?: string }> {
  const correctPassword = process.env.ADMIN_PASSWORD || "justinadmin123";
  if (adminPasswordAttempt !== correctPassword) {
    return { success: false, error: "Mot de passe incorrect." };
  }

  const reviews = await readJsonFile<Review[]>("reviews.json", []);
  const filtered = reviews.filter((r) => r.id !== id);
  const success = await writeJsonFile("reviews.json", filtered);
  if (success) {
    revalidatePath("/", "layout");
    return { success: true };
  }
  return { success: false, error: "Erreur lors de la suppression." };
}

// --- ACTIONS CONTACT ---

export async function getContacts(adminPasswordAttempt: string): Promise<{ success: boolean; data?: ContactMessage[]; error?: string }> {
  const correctPassword = process.env.ADMIN_PASSWORD || "justinadmin123";
  if (adminPasswordAttempt !== correctPassword) {
    return { success: false, error: "Mot de passe incorrect." };
  }

  const contacts = await readJsonFile<ContactMessage[]>("contacts.json", []);
  // Trier par date du plus récent au plus ancien
  const sorted = contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return { success: true, data: sorted };
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!data.name || !data.email || !data.message) {
    return { success: false, error: "Veuillez remplir les champs obligatoires (Nom, Email, Message)." };
  }

  const contacts = await readJsonFile<ContactMessage[]>("contacts.json", []);
  const newContact: ContactMessage = {
    id: Math.random().toString(36).substring(2, 9),
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    message: data.message,
    read: false,
    createdAt: new Date().toISOString(),
  };

  contacts.push(newContact);
  const success = await writeJsonFile("contacts.json", contacts);
  if (success) {
    return { success: true };
  }
  return { success: false, error: "Erreur lors de l'envoi de votre message." };
}

export async function markContactRead(
  id: string,
  adminPasswordAttempt: string
): Promise<{ success: boolean; error?: string }> {
  const correctPassword = process.env.ADMIN_PASSWORD || "justinadmin123";
  if (adminPasswordAttempt !== correctPassword) {
    return { success: false, error: "Mot de passe incorrect." };
  }

  const contacts = await readJsonFile<ContactMessage[]>("contacts.json", []);
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) {
    return { success: false, error: "Message introuvable." };
  }

  contacts[index].read = true;
  const success = await writeJsonFile("contacts.json", contacts);
  if (success) {
    return { success: true };
  }
  return { success: false, error: "Erreur d'enregistrement." };
}

export async function deleteContact(
  id: string,
  adminPasswordAttempt: string
): Promise<{ success: boolean; error?: string }> {
  const correctPassword = process.env.ADMIN_PASSWORD || "justinadmin123";
  if (adminPasswordAttempt !== correctPassword) {
    return { success: false, error: "Mot de passe incorrect." };
  }

  const contacts = await readJsonFile<ContactMessage[]>("contacts.json", []);
  const filtered = contacts.filter((c) => c.id !== id);
  const success = await writeJsonFile("contacts.json", filtered);
  if (success) {
    return { success: true };
  }
  return { success: false, error: "Erreur lors de la suppression." };
}
