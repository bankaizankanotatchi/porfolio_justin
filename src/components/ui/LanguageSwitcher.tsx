"use client";

import { usePathname, useRouter } from "@/lib/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const nextLocale = locale === "fr" ? "en" : "fr";
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card hover:bg-muted/10 transition-all font-medium text-xs md:text-sm tracking-wide text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Switch language"
    >
      <Globe className="w-3.5 h-3.5 text-primary" />
      <span>{locale === "fr" ? "EN" : "FR"}</span>
    </button>
  );
}
