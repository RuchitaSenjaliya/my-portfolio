"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ChevronRight, Play } from "lucide-react";
import { ownerInfo } from "@/data/contact";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

interface TerminalModeProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function TerminalMode({ isOpen, setIsOpen }: TerminalModeProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "help",
      output: `Welcome to ${ownerInfo.name}'s interactive terminal. Type "help" to see all available developer commands.`,
    },
  ]);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Prevent background body scroll when terminal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    // Keep shortcut trigger Ctrl + ` (Backtick) active
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1">
            <p>Available commands:</p>
            <p className="text-yellow-400">
              {" "}
              about{" "}
              <span className="text-white/60">
                - Learn about {ownerInfo.name}
              </span>
            </p>
            <p className="text-yellow-400">
              {" "}
              skills{" "}
              <span className="text-white/60">
                - Print technical capabilities
              </span>
            </p>
            <p className="text-yellow-400">
              {" "}
              projects{" "}
              <span className="text-white/60">
                - Showcase featured applications
              </span>
            </p>
            <p className="text-yellow-400">
              {" "}
              contact{" "}
              <span className="text-white/60">
                - Show social links and email details
              </span>
            </p>
            {/* <p className="text-yellow-400">  art       <span className="text-white/60">- Info on Canvas & Mandala Art pages</span></p> */}
            <p className="text-yellow-400">
              {" "}
              clear <span className="text-white/60">- Clear terminal logs</span>
            </p>
            <p className="text-yellow-400">
              {" "}
              exit <span className="text-white/60">- Close terminal mode</span>
            </p>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-1.5">
            <p className="text-primary font-bold">
              {ownerInfo.name} - {ownerInfo.role}
            </p>
            <p className="text-white/80">
              &quot;Passionate frontend developer with experience building
              scalable web and mobile applications using React, React Native,
              Angular, Ionic, Next.js, and TypeScript.&quot;
            </p>
            <p className="text-white/60">
              Duration: {ownerInfo.experience} Professional Experience
            </p>
          </div>
        );
        break;

      case "skills": {
        const skillCategories = Array.from(new Set(skills.map((s) => s.category)));
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            {skillCategories.map((cat) => (
              <div key={cat}>
                <p className="text-primary font-semibold border-b border-white/10 pb-0.5">
                  {cat}
                </p>
                <p className="text-white/80">
                  {skills
                    .filter((s) => s.category === cat)
                    .map((s) => s.name)
                    .join(", ")}
                </p>
              </div>
            ))}
          </div>
        );
        break;
      }

      case "projects":
        output = (
          <div className="space-y-2.5 mt-1">
            {projects.map((proj, idx) => (
              <div key={proj.id}>
                <p className="text-yellow-400 font-bold">
                  {idx + 1}. {proj.title}
                </p>
                <p className="text-white/75 text-xs mt-0.5">
                  <span className="text-primary font-mono">{proj.tech.slice(0, 4).join(" • ")}</span> | {proj.description}
                </p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1">
            <p>
              Email:{" "}
              <a
                href={`mailto:${ownerInfo.email}`}
                className="text-blue-400 hover:underline"
              >
                {ownerInfo.email}
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href={ownerInfo.linkedin.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {ownerInfo.linkedin.displayUsername}
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href={ownerInfo.git.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {ownerInfo.git.username}
              </a>
            </p>
          </div>
        );
        break;

      // case "art":
      //   output = `${ownerInfo.name} runs a creative art showcase! She is specialized in Canvas paintings and geometric Mandala artwork. Switch to 'Canvas Mode' at the top of the navbar to visually view her collection.`;
      //   break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
        setIsOpen(false);
        setInput("");
        return;

      default:
        output = `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        >
          <motion.div
            className="w-full max-w-3xl h-[450px] bg-slate-900 border border-slate-700 rounded-2xl flex flex-col overflow-hidden shadow-2xl font-mono text-xs md:text-sm text-green-400"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-white/60 font-semibold">
                  ruchita-portfolio-cli.sh
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/30 hidden sm:inline">
                  Press Ctrl+` to toggle
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded text-white/50 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Console logs */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  {/* Prompt input */}
                  <div className="flex items-center gap-2 text-white/60">
                    <ChevronRight className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-green-500">guest@ruchita-dev:~$</span>
                    <span className="text-white font-semibold">
                      {item.command}
                    </span>
                  </div>
                  {/* Prompt output */}
                  <div className="pl-6 text-white/90 leading-relaxed font-sans">
                    {item.output}
                  </div>
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>

            {/* Console typing input */}
            <form
              onSubmit={handleCommandSubmit}
              className="flex items-center gap-2 px-5 py-3.5 bg-slate-950 border-t border-slate-800 shrink-0"
            >
              <span className="text-green-500 font-bold">
                guest@ruchita-dev:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command e.g. 'help', 'skills', 'about'..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-white placeholder-green-600/40 text-xs sm:text-sm"
                autoComplete="off"
                autoCapitalize="off"
              />
              <button
                type="submit"
                className="text-white/40 hover:text-green-400 cursor-pointer"
              >
                <Play className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
