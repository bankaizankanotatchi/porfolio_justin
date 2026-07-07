"use client";

import { Github, Linkedin, Mail, Phone, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border dark:border-white/5 bg-background py-8 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display font-bold text-lg tracking-wider text-primary dark:text-[#00ffcc]">
            NGUEMO NAGUE JUSTIN THEOPHANE
          </span>
          <span className="text-xs text-muted mt-1">
            All rights reserved.
          </span>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/bankaizankanotatchi"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-border dark:border-white/5 hover:border-primary dark:hover:border-[#00ffcc] text-foreground/80 hover:text-primary dark:hover:text-[#00ffcc] transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="mailto:naguejustin78@gmail.com"
            className="p-2 rounded-full border border-border dark:border-white/5 hover:border-primary dark:hover:border-[#00ffcc] text-foreground/80 hover:text-primary dark:hover:text-[#00ffcc] transition-all duration-200"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="tel:+237656876123"
            className="p-2 rounded-full border border-border dark:border-white/5 hover:border-primary dark:hover:border-[#00ffcc] text-foreground/80 hover:text-primary dark:hover:text-[#00ffcc] transition-all duration-200"
            aria-label="Phone"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
