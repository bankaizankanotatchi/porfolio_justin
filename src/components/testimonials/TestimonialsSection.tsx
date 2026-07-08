"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight } from "lucide-react";
import { Testimony } from "@/data/profile";

interface TestimonialsSectionProps {
  testimonials: Testimony[];
  locale: string;
}

export default function TestimonialsSection({ testimonials, locale }: TestimonialsSectionProps) {
  const t = useTranslations("testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimony = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-primary dark:text-[#00ffcc] tracking-widest block mb-2">
              // RECOMMENDATIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
              {t("title")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted max-w-sm">
            {t("subtitle")}
          </p>
        </div>

        {/* CAROUSEL TRADITIONNEL (UN SEUL AVIS EN FOCUS) */}
        {testimonials.length > 0 ? (
          <div className="relative">
            
            {/* Conteneur principal de la carte */}
            <div className="bg-card border border-border dark:border-white/5 rounded-xl p-8 md:p-12 shadow-sm hover:shadow-neon transition-shadow duration-300 relative">
              <MessageSquareQuote className="absolute top-6 right-6 w-12 h-12 text-primary/5 dark:text-[#00ffcc] select-none" />

              <div className="min-h-[160px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {/* Notation étoiles */}
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < activeTestimony.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-border dark:text-gray-700"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Commentaire */}
                    <p className="text-sm sm:text-base md:text-lg text-foreground/90 italic leading-relaxed font-medium">
                      "{activeTestimony.message[locale as "fr" | "en"] || activeTestimony.message.fr}"
                    </p>

                    {/* Profil client */}
                    <div className="pt-2">
                      <span className="text-xs sm:text-sm font-bold text-foreground block">
                        {activeTestimony.clientName}
                      </span>
                      <span className="font-mono text-[10px] text-primary dark:text-[#00ffcc] uppercase tracking-wider block">
                        {activeTestimony.companyName}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Contrôles de navigation (Boutons précédents / suivants aux extrémités ou centrés en bas) */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-between mt-6">
                {/* Indicateurs de points (Dots) */}
                <div className="flex items-center gap-1.5">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentIndex
                          ? "bg-primary dark:bg-[#00ffcc] w-4"
                          : "bg-border dark:bg-gray-700 hover:bg-foreground/50"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Boutons flèches */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full border border-border dark:border-white/10 bg-card hover:bg-muted/10 text-foreground transition-all focus:outline-none hover:scale-105 active:scale-95"
                    aria-label="Previous testimony"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full border border-border dark:border-white/10 bg-card hover:bg-muted/10 text-foreground transition-all focus:outline-none hover:scale-105 active:scale-95"
                    aria-label="Next testimony"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="text-center py-12 bg-card border border-border dark:border-white/5 rounded-xl max-w-3xl mx-auto p-8">
            <p className="font-mono text-xs text-muted">{t("no_testimonials")}</p>
          </div>
        )}

      </div>
    </section>
  );
}
