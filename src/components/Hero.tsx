"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ArrowRight,
  Download,
  Code2,
} from "lucide-react";
import {
  ART_WORDS,
  canvasHeroIcons,
  codeHeroIcons,
  DEV_WORDS,
} from "@/data/heroIcons";
import { downloadFileFromUrl } from "@/utils/helper";
import { ownerInfo, socialLinks } from "@/data/contact";
import { skills } from "@/data/skills";

const topSkillsSnippet = skills
  .slice(0, 5)
  .map((s) => `"${s.name}"`)
  .join(", ");

const codeText = `const developer = {
  name: "${ownerInfo.name}",
  skills: [
    ${topSkillsSnippet}
  ],
  creativity: "Canvas & Mandala Art",
  available: true,
  code: () => "passion ⚡"
};`;

// Helper to simulate typed code character-by-character
function CodeSnippet() {
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(codeText.substring(0, index));
      index++;
      if (index > codeText.length) {
        // Pause and restart
        clearInterval(interval);
        setTimeout(() => {
          setText("");
          index = 0;
          // Restart typing
          const newInterval = setInterval(() => {
            setText(codeText.substring(0, index));
            index++;
            if (index > codeText.length) clearInterval(newInterval);
          }, 25);
        }, 8000);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden font-mono text-[10px] sm:text-xs text-left text-blue-300">
      {/* VS Code title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-[10px] text-white/45 flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5" /> developer.ts
        </span>
      </div>
      {/* Code window */}
      <div className="p-5 min-h-40 relative font-mono leading-relaxed bg-slate-950/40">
        <pre className="text-white/90 whitespace-pre-wrap">
          {text.split("\n").map((line, idx) => {
            // Basic syntax highlighting on output lines
            let formattedLine = line;
            if (line.includes("const")) {
              formattedLine = line.replace(
                "const",
                '<span class="text-pink-500">const</span>',
              );
            }
            if (line.includes("developer")) {
              formattedLine = formattedLine.replace(
                "developer",
                '<span class="text-blue-400">developer</span>',
              );
            }
            if (line.includes("name:")) {
              formattedLine = formattedLine.replace(
                "name:",
                '<span class="text-purple-400">name</span>:',
              );
            }
            if (line.includes("skills:")) {
              formattedLine = formattedLine.replace(
                "skills:",
                '<span class="text-purple-400">skills</span>:',
              );
            }
            if (line.includes("creativity:")) {
              formattedLine = formattedLine.replace(
                "creativity:",
                '<span class="text-purple-400">creativity</span>:',
              );
            }
            if (line.includes("available:")) {
              formattedLine = formattedLine.replace(
                "available:",
                '<span class="text-purple-400">available</span>:',
              );
            }
            if (line.includes("code:")) {
              formattedLine = formattedLine.replace(
                "code:",
                '<span class="text-purple-400">code</span>:',
              );
            }
            if (line.includes("true")) {
              formattedLine = formattedLine.replace(
                "true",
                '<span class="text-amber-500">true</span>',
              );
            }

            return (
              <div key={idx} className="flex gap-4">
                <span className="w-4 text-white/25 text-right select-none">
                  {idx + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
              </div>
            );
          })}
        </pre>
        {/* Cursor */}
        <span className="absolute bottom-6 right-8 w-1.5 h-3.5 bg-primary animate-pulse" />
      </div>
    </div>
  );
}

export default function Hero({
  portfolioMode = "code",
}: {
  portfolioMode?: "code" | "canvas";
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWords = portfolioMode === "code" ? DEV_WORDS : ART_WORDS;
    const currentWord = currentWords[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % currentWords.length);
      }, 0);
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
  }, [currentText, isDeleting, currentWordIndex, portfolioMode]);

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
    downloadFileFromUrl("/Ruchi-Resume.pdf", "Ruchi-Resume.pdf");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-background"
    >
      {/* Colorful Floating Theme-Responsive Background Icons */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={portfolioMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            {(portfolioMode === "code" ? codeHeroIcons : canvasHeroIcons).map(
              (item, idx) => {
                const Icon = item.Icon;
                const stylePosition = item.left
                  ? { top: item.top, left: item.left }
                  : { top: item.top, right: item.right };

                return (
                  <motion.div
                    key={idx}
                    style={{
                      position: "absolute",
                      ...stylePosition,
                      filter: "drop-shadow(0 0 8px currentColor)",
                    }}
                    className={`${item.colorClass} opacity-35 dark:opacity-50 hover:opacity-90 dark:hover:opacity-100 transition-opacity duration-300 select-none`}
                    animate={{
                      x: [0, item.driftX, -item.driftX, 0],
                      y: [0, item.driftY, -item.driftY, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: item.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item.delay,
                    }}
                  >
                    <Icon
                      style={{ width: item.size, height: item.size }}
                      className="stroke-[1.5]"
                    />
                  </motion.div>
                );
              },
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-87.5 md:w-125 h-87.5 md:h-125 rounded-full bg-linear-to-r from-primary/30 to-transparent blur-3xl animate-glow-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-87.5 md:w-125 h-87.5 md:h-125 rounded-full bg-linear-to-r from-secondary/25 to-transparent blur-3xl animate-glow-2 pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio Details */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
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
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            >
              Hi, I am{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ruchita Senjaliya
              </span>
            </motion.h1>

            {/* Typing title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-10 sm:h-12 mt-4 text-xl sm:text-2xl font-semibold text-foreground/85 flex items-center gap-1"
            >
              <span>{currentText}</span>
              <span className="w-0.75 h-6 sm:h-8 bg-primary animate-pulse" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mt-5 text-sm sm:text-base text-foreground/70 leading-relaxed"
            >
              Passionate frontend developer with experience building scalable
              web and mobile applications using React, React Native, Angular,
              Next.js, and TypeScript.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
            >
              <button
                onClick={handleDownloadCV}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-linear-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 active:scale-98 transition-all duration-200 cursor-pointer text-xs"
              >
                <Download className="w-4.5 h-4.5" />
                Download Resume
              </button>
              <button
                onClick={handleScrollToProjects}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-card-bg border border-card-border hover:border-primary/50 text-foreground font-semibold rounded-full active:scale-98 transition-all duration-200 cursor-pointer text-xs"
              >
                {portfolioMode === "canvas"
                  ? "View Art Gallery"
                  : "View Projects"}
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4 mt-12"
            >
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-full bg-card-bg border border-card-border hover:border-primary/45 hover:text-primary hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4.5 h-4.5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Code Snippet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <CodeSnippet />
          </motion.div>
        </div>
      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-1.5 h-1.5 rounded-full bg-foreground"
        />
        <div className="w-px h-5 bg-foreground/20" />
      </div>
    </section>
  );
}
