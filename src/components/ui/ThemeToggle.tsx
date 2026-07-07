"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-border/20 animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-full border border-border bg-card hover:bg-muted/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 w-9.5 h-9.5 flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: -20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="text-foreground"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
