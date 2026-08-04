"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "../data/projects";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

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
      <div className="absolute top-1/4 right-0 w-[350px] h-87.5 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-87.5 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            My Projects
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group rounded-3xl bg-card-bg border border-card-border overflow-hidden flex flex-col justify-between hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div>
                {/* Project Header (Responsive Mock Graphic supporting both Desktop and Mobile frames) */}
                <div className="relative h-56 w-full border-b border-card-border overflow-hidden bg-slate-950">
                  {project.isMobile ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 flex items-center justify-center p-3 select-none">
                      {/* CSS Phone Frame Mockup */}
                      <div className="relative h-[200px] aspect-[9/19.5] rounded-[24px] border-[5px] border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex flex-col justify-between">
                        {/* Speaker/Camera Notch (Dynamic Island shape) */}
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-slate-800 z-30" />
                        {/* Mobile Screenshot */}
                        <div className="relative w-full h-full">
                          <Image
                            src={project.image}
                            alt={project.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  )}
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
                <div className="p-6 pb-2">
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
              <div className="px-6 pb-6 pt-4 mt-auto">
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
