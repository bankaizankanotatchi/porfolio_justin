"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from "lucide-react";
import { ProfileData } from "@/data/profile";

interface ContactSectionProps {
  profile: ProfileData;
}

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  email: z.string().email("Adresse email invalide."),
  phone: z.string().optional(),
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection({ profile }: ContactSectionProps) {
  const t = useTranslations("contact");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      // Envoi direct par e-mail en arrière-plan (AJAX) via FormSubmit
      const response = await fetch("https://formsubmit.co/ajax/naguejustin78@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || "Non renseigné",
          message: data.message,
          _subject: `Nouveau message de contact de ${data.name} sur le Portfolio`
        })
      });

      if (response.ok) {
        setSuccess("Votre message a été envoyé directement et automatiquement avec succès !");
        window.dispatchEvent(new Event("contact-submit-success"));
        reset();
      } else {
        setError("Erreur lors de l'envoi automatique. Veuillez réessayer.");
      }
    } catch (err) {
      setError("Une erreur réseau est survenue lors de l'envoi du message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 bg-card border-t border-border dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-primary dark:text-[#00ffcc] tracking-widest block mb-2">
              // TRANSMIT PATH
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
              {t("title")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted max-w-sm">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* COORDONNÉES (GAUCHE - col-span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-background border border-border dark:border-white/5 rounded-xl p-6 md:p-8 shadow-sm">
            <div>
              <h3 className="font-mono text-xs font-bold text-foreground uppercase tracking-wider mb-6 pb-3 border-b border-border dark:border-white/5">
                // {t("info_title")}
              </h3>

              <div className="space-y-4">
                {/* Localisation */}
                <div className="flex items-center gap-4 py-3 border-b border-border dark:border-white/5">
                  <div className="p-2.5 rounded bg-card border border-border dark:border-white/5 text-primary dark:text-[#00ffcc]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-muted uppercase block">Localisation</span>
                    <span className="text-xs text-foreground/90 font-medium">{profile.location}</span>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-center gap-4 py-3 border-b border-border dark:border-white/5">
                  <div className="p-2.5 rounded bg-card border border-border dark:border-white/5 text-primary dark:text-[#00ffcc]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-muted uppercase block">Téléphone</span>
                    <a href={`tel:${profile.phone}`} className="text-xs text-foreground/90 font-medium hover:underline">
                      {profile.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 py-3">
                  <div className="p-2.5 rounded bg-card border border-border dark:border-white/5 text-primary dark:text-[#00ffcc]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-muted uppercase block">Adresse Email</span>
                    <a href={`mailto:${profile.email}`} className="text-xs text-foreground/90 font-medium hover:underline">
                      {profile.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Disponibilité */}
            <div className="mt-8 pt-6 border-t border-border dark:border-white/5">
              <span className="font-mono text-[9px] text-primary dark:text-[#00ffcc] tracking-widest uppercase block mb-1">
                // STATUS ACTIVE
              </span>
              <p className="text-xs text-muted leading-relaxed font-mono">
                Consulting Odoo 18, développement mobile (Flutter/FastAPI), architectures Next.js, automatisations CI/CD (n8n, Docker).
              </p>
            </div>
          </div>

          {/* FORMULAIRE DE CONTACT (DROITE - col-span 7) */}
          <div className="lg:col-span-7 bg-background border border-border dark:border-white/5 rounded-xl p-6 md:p-8 shadow-sm">
            <h3 className="font-mono text-xs font-bold text-foreground uppercase tracking-wider mb-6 pb-3 border-b border-border dark:border-white/5">
              // {t("form_title")}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nom */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase text-muted font-bold">{t("fields.name")}</label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`px-3 py-2 rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary/20 text-xs text-foreground transition-all ${
                      errors.name ? "border-red-500" : "border-border dark:border-white/5 focus:border-primary dark:focus:border-[#00ffcc]"
                    }`}
                  />
                  {errors.name && (
                    <span className="font-mono text-[9px] text-red-500">{errors.name.message}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase text-muted font-bold">{t("fields.email")}</label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`px-3 py-2 rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary/20 text-xs text-foreground transition-all ${
                      errors.email ? "border-red-500" : "border-border dark:border-white/5 focus:border-primary dark:focus:border-[#00ffcc]"
                    }`}
                  />
                  {errors.email && (
                    <span className="font-mono text-[9px] text-red-500">{errors.email.message}</span>
                  )}
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase text-muted font-bold">{t("fields.phone")}</label>
                <input
                  type="text"
                  {...register("phone")}
                  className="px-3 py-2 rounded-lg border border-border dark:border-white/5 bg-card focus:outline-none focus:border-primary dark:focus:border-[#00ffcc] focus:ring-1 focus:ring-primary/20 text-xs text-foreground transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase text-muted font-bold">{t("fields.message")}</label>
                <textarea
                  rows={4}
                  {...register("message")}
                  className={`px-3 py-2 rounded-lg border bg-card focus:outline-none focus:ring-1 focus:ring-primary/20 text-xs text-foreground transition-all resize-none ${
                    errors.message ? "border-red-500" : "border-border dark:border-white/5 focus:border-primary dark:focus:border-[#00ffcc]"
                  }`}
                />
                {errors.message && (
                  <span className="font-mono text-[9px] text-red-500">{errors.message.message}</span>
                )}
              </div>

              {/* Feedbacks */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 font-mono text-[10px] text-accent-emerald bg-accent-emerald/5 border border-accent-emerald/10 p-3 rounded-lg"
                  >
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>{success}</span>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 font-mono text-[10px] text-red-500 bg-red-500/5 border border-red-500/10 p-3 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-semibold text-xs tracking-wider uppercase transition-all hover:opacity-90"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? t("fields.submitting") : t("fields.submit")}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
