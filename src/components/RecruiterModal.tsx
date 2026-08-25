"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Download,
  Mail,
  Calendar,
  MapPin,
  Copy,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { downloadFileFromUrl, handleDownloadCV } from "@/utils/helper";
import { ownerInfo } from "@/data/contact";

export default function RecruiterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(ownerInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Shortcut Badge */}
      <div className="fixed bottom-6 right-24 z-30">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-xl tracking-wider uppercase active:scale-95 transition-all outline-none border border-amber-400/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          id="recruiter-mode-fab"
        >
          <Sparkles className="w-4 h-4 animate-spin" />
          For Recruiters
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-card-bg border border-card-border rounded-3xl p-6 relative shadow-2xl recruiter-modal overflow-hidden"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-primary" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-card-border text-foreground/50 hover:text-foreground cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Recruiter Quick Summary
                  </h3>
                  <p className="text-xs text-foreground/50 font-medium">
                    Core achievements and contact sheet
                  </p>
                </div>
              </div>

              {/* Availability Status Badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                <span>
                  Available for Full-time Roles (Immediate Onboarding)
                </span>
              </div>

              {/* Stats & Key Details */}
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-background border border-card-border">
                    <span className="text-xs text-foreground/45 block">
                      Experience
                    </span>
                    <span className="text-base font-bold text-foreground/90 block mt-1">
                      2+ Years
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-background border border-card-border">
                    <span className="text-xs text-foreground/45 block">
                      Specialty
                    </span>
                    <span className="text-base font-bold text-foreground/90 block mt-1">
                      Frontend & Mobile
                    </span>
                  </div>
                </div>

                {/* Core Stack Capsules */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">
                    Core Frameworks
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "React.js",
                      "Next.js",
                      "React Native",
                      "Angular",
                      "TypeScript",
                      "Tailwind CSS",
                    ].map((c) => (
                      <span
                        key={c}
                        className="text-[10px] font-semibold bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-full"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info List */}
                <div className="space-y-2.5 pt-2 border-t border-card-border/60 text-xs">
                  <div className="flex items-center gap-3 text-foreground/85">
                    <MapPin className="w-4 h-4 text-foreground/50 shrink-0" />
                    <span>Gujarat, India (Open to Remote / Relocation)</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/85">
                    <Calendar className="w-4 h-4 text-foreground/50 shrink-0" />
                    <span>Notice Period: Immediate / 0 Days</span>
                  </div>
                </div>

                {/* Copy Email Helper */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-background border border-card-border mt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground/75">
                    <Mail className="w-4 h-4 text-foreground/50" />
                    <span>{ownerInfo.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card-border hover:bg-card-border/80 text-foreground text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  onClick={handleDownloadCV}
                  className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Resume PDF
                </button>
                <a
                  href={ownerInfo.linkedin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-slate-800 border border-slate-700 text-white text-sm font-semibold rounded-xl hover:bg-slate-700 transition-colors cursor-pointer text-center"
                >
                  Visit LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
