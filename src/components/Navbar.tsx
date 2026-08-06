"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Code,
  Palette,
  Terminal,
  MessageSquareCode,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import ThemeCustomizer from "./ThemeCustomizer";

import { smoothScrollToElement } from "@/utils/helper";

interface NavbarProps {
  portfolioMode: "code" | "canvas";
  setPortfolioMode: (mode: "code" | "canvas") => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
}

export default function Navbar({
  portfolioMode,
  setPortfolioMode,
  isTerminalOpen,
  setIsTerminalOpen,
  isAIAssistantOpen,
  setIsAIAssistantOpen,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = useMemo(() => {
    return portfolioMode === "code"
      ? [
          { name: "Home", href: "#home" },
          { name: "About", href: "#about" },
          { name: "Skills", href: "#skills" },
          { name: "Experience", href: "#experience" },
          { name: "Projects", href: "#projects" },
          { name: "Certifications", href: "#certifications" },
          { name: "Contact", href: "#contact" },
        ]
      : [
          { name: "Home", href: "#home" },
          { name: "Art Showcase", href: "#art" },
          { name: "Contact", href: "#contact" },
        ];
  }, [portfolioMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Intersection Observer to track active section
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.href.replace("#", ""));
      if (section) observer.observe(section);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [portfolioMode, navItems]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace("#", "");
    smoothScrollToElement(targetId, 80);
    setActiveSection(targetId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "glass-nav py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2 text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wider hover:opacity-95 transition-opacity"
        >
          RS
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative text-xs font-semibold uppercase tracking-wider transition-colors hover:text-primary ${
                    activeSection === item.href.replace("#", "")
                      ? "text-primary"
                      : "text-foreground/75"
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.replace("#", "") && (
                    <motion.div
                      layoutId="activeNavLink"
                      className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-card-border" />

          {/* Mode Switcher */}
          {/* <div className="flex items-center bg-card-bg/60 border border-card-border p-1 rounded-full text-xs shrink-0 select-none">
            <button
              onClick={() => setPortfolioMode('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                portfolioMode === 'code' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Code
            </button>
            <button
              onClick={() => setPortfolioMode('canvas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                portfolioMode === 'canvas' 
                  ? 'bg-secondary text-white shadow-md' 
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Canvas
            </button>
          </div> */}

          <div className="h-6 w-px bg-card-border" />

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTerminalOpen(!isTerminalOpen)}
              className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer border transition-colors outline-none focus:ring-2 focus:ring-primary/50 ${
                isTerminalOpen
                  ? "bg-primary border-primary text-white shadow-md"
                  : "bg-card-bg/50 hover:bg-card-bg border-card-border text-foreground/80"
              }`}
              aria-label="Toggle Terminal Console"
              id="nav-terminal-btn"
            >
              <Terminal className="w-5 h-5" />
            </button>

            {/* <button
              onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
              className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer border transition-colors outline-none focus:ring-2 focus:ring-primary/50 ${
                isAIAssistantOpen 
                  ? 'bg-primary border-primary text-white shadow-md' 
                  : 'bg-card-bg/50 hover:bg-card-bg border-card-border text-foreground/80'
              }`}
              aria-label="Toggle AI Assistant"
              id="nav-ai-btn"
            >
              <MessageSquareCode className="w-5 h-5" />
            </button> */}

            <ThemeToggle />
            <ThemeCustomizer />
          </div>
        </div>

        {/* Mobile layout controls */}
        <div className="flex items-center gap-2 lg:hidden select-none">
          {/* Mode Switcher */}
          {/* <div className="flex items-center bg-card-bg/60 border border-card-border p-0.5 rounded-full text-[10px]">
            <button
              onClick={() => setPortfolioMode("code")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                portfolioMode === "code"
                  ? "bg-primary text-white"
                  : "text-foreground/60"
              }`}
            >
              <Code className="w-3 h-3" />
              Code
            </button>
            <button
              onClick={() => setPortfolioMode("canvas")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                portfolioMode === "canvas"
                  ? "bg-secondary text-white"
                  : "text-foreground/60"
              }`}
            >
              <Palette className="w-3 h-3" />
              Art
            </button>
          </div> */}

          <button
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
              isTerminalOpen
                ? "bg-primary border-primary text-white"
                : "bg-card-bg/50 border-card-border text-foreground/80"
            }`}
            aria-label="Terminal"
          >
            <Terminal className="w-4.5 h-4.5" />
          </button>

          {/* <button
            onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
              isAIAssistantOpen
                ? "bg-primary border-primary text-white"
                : "bg-card-bg/50 border-card-border text-foreground/80"
            }`}
            aria-label="AI Assistant"
          >
            <MessageSquareCode className="w-4.5 h-4.5" />
          </button> */}

          <ThemeToggle />
          <ThemeCustomizer />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-full hover:bg-card-bg border border-card-border cursor-pointer transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-nav border-t border-card-border mt-3"
          >
            <ul className="flex flex-col gap-4 py-6 px-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block py-2 text-base font-medium rounded-lg px-3 hover:bg-primary/10 transition-colors ${
                      activeSection === item.href.replace("#", "")
                        ? "text-primary bg-primary/5"
                        : "text-foreground/75"
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
