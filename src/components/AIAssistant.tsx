"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, User, Bot, Loader2 } from "lucide-react";

import { downloadFileFromUrl, handleDownloadCV } from "@/utils/helper";
import { ownerInfo } from "@/data/contact";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

interface Message {
  sender: "user" | "bot";
  text: string;
  isTyping?: boolean;
}

const suggestions = [
  "What technologies do you know?",
  "Tell me about AgroSmart.",
  "Show React Native projects.",
  "Download Resume.",
];

const topSkillsList = skills.map((s) => s.name).join(", ");
const projectListFormatted = projects
  .map((p, idx) => `${idx + 1}. ${p.title} (${p.tech.slice(0, 3).join(", ")})`)
  .join("\n");

const knowledgeBase: Record<string, string> = {
  default: `I'm ${ownerInfo.name}'s AI Assistant! Ask me anything about her skills, experience, or projects. You can try clicking the suggestions below.`,
  tech: `${ownerInfo.name} is a ${ownerInfo.role} with ${ownerInfo.experience} of experience. Her core stack includes ${topSkillsList}.`,
  experience: `${ownerInfo.name} has been working as a ${ownerInfo.role} since 2023. She has built scalable web apps with React, hybrid/native mobile apps with React Native, and maintained enterprise projects with Angular and Ionic.`,
  agrosmart: `AgroSmart is a React Native app built by ${ownerInfo.name}. It integrates Firebase, Redux Toolkit, and the WhatsApp API, allowing farmers to list products, receive push notifications, check pricing alerts, and chat directly with buyers.`,
  reactnative: `${ownerInfo.name}'s React Native projects include AgroSmart (a smart agritech platform with Firebase) and other hybrid applications. She has extensive experience with Expo, state management, and push notification configurations.`,
  projects: `${ownerInfo.name}'s major projects are:\n${projectListFormatted}`,
  resume: `You can download ${ownerInfo.name}'s resume right from this chat! [Click here to download Resume](action:download)`,
  art: `Yes, besides coding, ${ownerInfo.name} is a passionate artist! She creates beautiful Mandala Art and Canvas Paintings. Switch to 'Canvas Mode' at the top of the navbar to explore her art gallery!`,
  contact: `You can reach ${ownerInfo.name} via email at ${ownerInfo.email}, find her on LinkedIn (${ownerInfo.linkedin.link}), or GitHub (${ownerInfo.git.link}).`,
};

interface AIAssistantProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AIAssistant({ isOpen, setIsOpen }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I am Ruchita's AI assistant. Ask me anything about her development work, certifications, or art page!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const getResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (
      q.includes("tech") ||
      q.includes("skill") ||
      q.includes("stack") ||
      q.includes("know")
    )
      return knowledgeBase.tech;
    if (q.includes("agrosmart") || q.includes("agro"))
      return knowledgeBase.agrosmart;
    if (
      q.includes("react native") ||
      q.includes("native") ||
      q.includes("mobile")
    )
      return knowledgeBase.reactnative;
    if (q.includes("project") || q.includes("portfolio"))
      return knowledgeBase.projects;
    if (q.includes("resume") || q.includes("cv") || q.includes("download"))
      return knowledgeBase.resume;
    if (
      q.includes("art") ||
      q.includes("mandala") ||
      q.includes("canvas") ||
      q.includes("creative") ||
      q.includes("artist")
    )
      return knowledgeBase.art;
    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("reach") ||
      q.includes("social")
    )
      return knowledgeBase.contact;
    if (
      q.includes("experience") ||
      q.includes("job") ||
      q.includes("work") ||
      q.includes("history")
    )
      return knowledgeBase.experience;
    return `I'm not sure about that, but ${ownerInfo.name} is skilled in React, Next.js, Angular, React Native, and Ionic! You can reach her at ${ownerInfo.email}.`;
  };

  const simulateBotResponse = (textResponse: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: textResponse }]);
    }, 1200);
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    setInput("");

    if (
      textToSend.toLowerCase().includes("resume") ||
      textToSend.toLowerCase().includes("cv")
    ) {
      handleDownloadCV();
    }

    const responseText = getResponse(textToSend);
    simulateBotResponse(responseText);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 100, x: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 100, x: -100 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="fixed bottom-6 right-6 w-[90vw] sm:w-[400px] h-125 rounded-3xl bg-card-bg border border-card-border shadow-2xl z-50 overflow-hidden flex flex-col recruiter-modal"
        >
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-white/20">
                <Sparkles className="w-5 h-5 text-yellow-200" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">
                  {`Ruchita's AI Assistant`}
                </h3>
                <span className="text-[10px] text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-ping" />{" "}
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${isBot ? "" : "flex-row-reverse"}`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${isBot ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}
                  >
                    {isBot ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[75%] ${
                      isBot
                        ? "bg-card-border/60 text-foreground/90 rounded-tl-none"
                        : "bg-primary text-white rounded-tr-none"
                    }`}
                  >
                    {msg.text.includes("[Click here to download Resume]") ? (
                      <div>
                        <span>
                          {`You can download Ruchita's resume right from this
                          chat!`}{" "}
                        </span>
                        <button
                          onClick={handleDownloadCV}
                          className="font-bold underline text-blue-400 dark:text-blue-300 cursor-pointer block mt-1 hover:opacity-80"
                        >
                          Click here to download Resume
                        </button>
                      </div>
                    ) : (
                      msg.text.split("\n").map((line, lIdx) => (
                        <p key={lIdx} className={lIdx > 0 ? "mt-1" : ""}>
                          {line}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing simulation */}
            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-none bg-card-border/60 text-foreground/90 flex items-center gap-1">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-[11px] text-foreground/50">
                    Typing...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="p-3 border-t border-card-border/60 bg-card-bg/50">
            <span className="text-[10px] font-bold text-foreground/40 block mb-2 px-1 uppercase tracking-wider">
              Suggested Questions
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto">
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  onClick={() => handleSendMessage(sug)}
                  className="text-[10px] text-foreground/75 bg-background border border-card-border hover:border-primary/40 hover:text-primary px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="p-3 border-t border-card-border flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about Ruchita's work..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-background border border-card-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-xs text-foreground"
            />
            <button
              onClick={() => handleSendMessage(input)}
              className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/95 transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
