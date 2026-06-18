"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ArrowRight,
  Download,
} from "lucide-react";

const words = [
  "Frontend Developer",
  "React Developer",
  "React Native Developer",
];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && currentText === currentWord) {
      // Pause at full word
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 150);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1),
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("projects");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleDownloadCV = () => {
    // Generate simple dynamic dummy CV content and download
    const cvContent = `
    RUCHITA SENJALIYA
    Frontend Developer
    Email: ruchita.senjaliya.dev@gmail.com
    Website: https://ruchita.dev
    GitHub: https://github.com/ruchita-senjaliya

    SUMMARY:
    Passionate frontend developer with experience building scalable web and mobile applications using React, React Native, Angular, Ionic, Next.js, and TypeScript.

    CORE EXPERTISE:
    - Frontend: React.js, Next.js, Angular, JavaScript, TypeScript, Tailwind CSS, Material UI, Ionic
    - Mobile: React Native, Expo
    - State Management: Redux, Context API, React Query
    - Tools: Git, GitHub, Figma, VS Code
    `;
    const blob = new Blob([cvContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Ruchita_Senjaliya_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background"
    >
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-gradient-to-r from-primary/30 to-transparent blur-3xl animate-glow-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-gradient-to-r from-secondary/25 to-transparent blur-3xl animate-glow-2 pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-1.5 rounded-full glass border border-card-border mb-6 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Available for Opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          Hi, I am{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Ruchita Senjaliya
          </span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-10 sm:h-12 mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/80 flex items-center justify-center gap-1"
        >
          <span>{currentText}</span>
          <span className="w-[3px] h-6 sm:h-8 bg-primary animate-pulse" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mt-6 text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed"
        >
          Passionate frontend developer with experience building scalable web
          and mobile applications using React, React Native, Angular,
          Next.js, and TypeScript.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
        >
          <button
            onClick={handleDownloadCV}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 active:scale-98 transition-all duration-200 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </button>
          <button
            onClick={handleScrollToProjects}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-card-bg border border-card-border hover:border-primary/50 text-foreground font-semibold rounded-full active:scale-98 transition-all duration-200 cursor-pointer"
          >
            View Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-6 mt-16"
        >
          {[
            {
              Icon: Github,
              href: "https://github.com/RuchitaSenjaliya",
              label: "GitHub",
            },
            {
              Icon: Linkedin,
              href: "https://linkedin.com/in/ruchita-senjaliya",
              label: "LinkedIn",
            },
            {
              Icon: Instagram,
              href: "https://instagram.com/ruchita_senjaliya",
              label: "Instagram",
            },
            {
              Icon: Mail,
              href: "mailto:ruchita.senjaliya.dev@gmail.com",
              label: "Email",
            },
          ].map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-full bg-card-bg border border-card-border hover:border-primary/45 hover:text-primary hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
        <span className="text-xs font-semibold tracking-wider text-foreground/50 uppercase">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-1.5 h-1.5 rounded-full bg-foreground"
        />
        <div className="w-[1px] h-6 bg-foreground/20" />
      </div>
    </section>
  );
}
