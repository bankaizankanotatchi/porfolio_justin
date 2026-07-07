import fs from "fs/promises";
import path from "path";

export async function ensureAssetsExist() {
  const publicDir = path.join(process.cwd(), "public");
  const cvDest = path.join(publicDir, "cv.pdf");
  const profileDest = path.join(publicDir, "profile.jpg");
  
  const cvSource = "/home/kes-dev-server/.gemini/antigravity-ide/brain/661e1f28-ffa2-49c4-b65f-8f55186b48e9/media__1783418019231.pdf";
  const profileSource = "/home/kes-dev-server/.gemini/antigravity-ide/brain/661e1f28-ffa2-49c4-b65f-8f55186b48e9/media__1783418113756.jpg";

  try {
    await fs.mkdir(publicDir, { recursive: true });
    
    // Copier le CV
    try {
      await fs.access(cvDest);
    } catch {
      await fs.copyFile(cvSource, cvDest);
      console.log("CV PDF copié dans public/");
    }

    // Copier la photo
    try {
      await fs.access(profileDest);
    } catch {
      await fs.copyFile(profileSource, profileDest);
      console.log("Photo de profil copiée dans public/");
    }
  } catch (error) {
    console.error("Erreur d'initialisation des assets médias:", error);
  }
}
