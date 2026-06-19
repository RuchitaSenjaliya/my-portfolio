"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "../data/projects";
import {
  ExternalLink,
  Github,
  Sparkles,
  LayoutDashboard,
  CalendarRange,
  BrainCircuit,
  Leaf,
} from "lucide-react";

// Render custom interactive SVG dashboards instead of plain placeholders
function ProjectMockImage({ type }: { type: string }) {
  if (type === "employee_mgmt") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-600/20 via-indigo-950/40 to-slate-950 flex flex-col justify-between p-4 font-mono select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">
              Employee Dashboard
            </span>
          </div>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
            Active
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 my-auto">
          {[
            { label: "Staff Count", val: "142", color: "text-cyan-400" },
            { label: "Onboarded", val: "98%", color: "text-green-400" },
            { label: "Retention", val: "92.4%", color: "text-indigo-400" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/5 border border-white/15 p-2 rounded-lg flex flex-col justify-center"
            >
              <span className="text-[9px] text-white/50">{item.label}</span>
              <span className={`text-sm font-bold ${item.color} mt-0.5`}>
                {item.val}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-gradient-to-r from-blue-400 to-indigo-400" />
          </div>
          <span className="text-[10px] text-white/50">85%</span>
        </div>
      </div>
    );
  }

  if (type === "hotel_mgmt") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-600/20 via-violet-950/40 to-slate-950 flex flex-col justify-between p-4 font-mono select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <CalendarRange className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">
              Room Allocation
            </span>
          </div>
          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
            Live Bookings
          </span>
        </div>
        <div className="space-y-2 my-auto">
          {[
            {
              room: "Deluxe 104",
              guest: "John Doe",
              status: "Booked",
              width: "w-full",
              bg: "bg-purple-500/20 text-purple-300",
            },
            {
              room: "Suite 201",
              guest: "Jane Smith",
              status: "Checking Out",
              width: "w-[75%]",
              bg: "bg-amber-500/20 text-amber-300",
            },
          ].map((row) => (
            <div
              key={row.room}
              className="flex items-center justify-between text-[11px] bg-white/5 border border-white/10 p-2 rounded-lg"
            >
              <span className="font-bold text-white/80">{row.room}</span>
              <span className="text-white/40">{row.guest}</span>
              <span
                className={`px-2 py-0.5 rounded text-[9px] font-bold ${row.bg}`}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
        <div className="text-[9px] text-white/40 flex justify-between">
          <span>Occupancy: 82%</span>
          <span>Daily Rev: $1,420</span>
        </div>
      </div>
    );
  }

  // if (type === "code_blogs") {
  //   return (
  //     <div className="w-full h-full bg-gradient-to-br from-emerald-600/20 via-emerald-950/40 to-slate-950 flex flex-col justify-between p-4 font-mono select-none overflow-hidden">
  //       <div className="flex items-center justify-between border-b border-white/10 pb-2">
  //         <div className="flex items-center gap-1.5">
  //           <BrainCircuit className="w-4 h-4 text-emerald-400" />
  //           <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">
  //             Code Blogs
  //           </span>
  //         </div>
  //         <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
  //       </div>
  //       <div className="my-auto space-y-2">
  //         <div className="text-[11px] text-white/60 bg-white/5 border border-white/10 p-2 rounded-lg relative">
  //           <span className="text-emerald-400 font-bold block mb-1">
  //             Prompt Input
  //           </span>
  //           "Write an SEO blog about Next.js 15 routing"
  //         </div>
  //         <div className="text-[10px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg">
  //           <span className="text-[9px] text-white/50 block">
  //             AI Output (SEO Optimized)
  //           </span>
  //           "Next.js 15 introduces robust route handlers..."
  //         </div>
  //       </div>
  //       <div className="flex items-center justify-between text-[9px] text-white/40">
  //         <span>Keywords Match: 94%</span>
  //         <span>Tokens: 420</span>
  //       </div>
  //     </div>
  //   );
  // }

  // default to agrosmart
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-600/20 via-green-950/40 to-slate-950 flex flex-col justify-between p-4 font-mono select-none overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <Leaf className="w-4 h-4 text-green-400" />
          <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">
            AgroSmart Agritech
          </span>
        </div>
        <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30">
          Direct chat
        </span>
      </div>
      <div className="my-auto space-y-1">
        <div className="flex items-center justify-between text-[10px] bg-white/5 border border-white/10 p-1.5 rounded">
          <span className="text-white/80">Organic Wheat</span>
          <span className="text-green-400 font-bold">$22 / Bag</span>
        </div>
        <div className="flex items-center justify-between text-[10px] bg-white/5 border border-white/10 p-1.5 rounded">
          <span className="text-white/80">Pesticide free Rice</span>
          <span className="text-green-400 font-bold">$18 / Bag</span>
        </div>
      </div>
      <div className="bg-emerald-500/15 border border-emerald-500/25 p-2 rounded-lg flex items-center justify-between text-[10px]">
        <span className="text-white/60">WhatsApp Client connected</span>
        <span className="w-2 h-2 rounded-full bg-green-400" />
      </div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 bg-card-bg/25 border-y border-card-border relative overflow-hidden"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            A curated showcase of scalable web and mobile applications I have
            designed and programmed, demonstrating end-to-end implementation and
            styling.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group rounded-2xl bg-card-bg border border-card-border overflow-hidden flex flex-col justify-between hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div>
                {/* Project Header (SVG Mock Graphic instead of generic image placeholder) */}
                <div className="relative h-56 w-full border-b border-card-border overflow-hidden bg-slate-950">
                  <ProjectMockImage type={project.image} />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-white/10 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground/95 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed mt-3">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-foreground/75">
                      {project.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/80 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technologies footer */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold tracking-wide bg-card-border/60 dark:bg-card-border/30 border border-card-border/80 px-2.5 py-1 rounded-full text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
