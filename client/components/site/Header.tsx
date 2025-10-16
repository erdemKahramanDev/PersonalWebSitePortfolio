/**
 * Header Component
 * 
 * Responsive navigation with smooth scroll to sections
 * Features: Mobile menu, social links, theme toggle
 * 
 * @author Ahmed Erdem Kahraman
 * @date 2025
 */

import { Link } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Github, Linkedin } from "lucide-react";

const nav = [
  { label: "Yeteneklerim", id: "about" },
  { label: "İş Birliği", id: "collaboration" },
  { label: "İletişim", id: "contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/erdemKahramanDev", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/erdem-kahraman-807415213/", label: "LinkedIn" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2 sm:gap-2.5 font-mono text-base sm:text-lg font-semibold tracking-tight transition-all hover:scale-105">
          <img src="/icons/logo.png" alt="Logo" className="h-8 w-10 sm:h-10 sm:w-12 transition-transform group-hover:scale-110" />
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent hidden xs:inline sm:inline">
            Ahmed Erdem Kahraman
          </span>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent xs:hidden sm:hidden">
            A. E. Kahraman
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <button 
              key={n.label} 
              onClick={(e) => scrollToSection(e as any, n.id)}
              className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-accent transition-all bg-transparent border-0 cursor-pointer rounded-md hover:bg-accent/10 group"
            >
              {n.label}
              <span className="absolute inset-x-4 bottom-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          ))}
        </nav>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/60 hover:text-accent transition-all rounded-md hover:bg-accent/10 hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="hidden md:block h-6 w-px bg-border/50" />

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all"
              aria-label="Menü"
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          <ThemeToggle />
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} border-t border-border/40 bg-background/95 backdrop-blur`}>
        <div className="container flex flex-col gap-1 py-4">
          {nav.map((n, idx) => (
            <button 
              key={n.label} 
              onClick={(e) => { scrollToSection(e as any, n.id); setOpen(false); }} 
              className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-accent/10 text-left w-full bg-transparent border-0 cursor-pointer transition-all animate-in slide-in-from-top duration-300"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {n.label}
            </button>
          ))}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-border/30 mt-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/60 hover:text-accent transition-all rounded-md hover:bg-accent/10"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
