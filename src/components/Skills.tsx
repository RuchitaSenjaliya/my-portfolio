"use client";

import { ForwardRefExoticComponent, RefAttributes, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "../data/skills";
import {
  Code2,
  Smartphone,
  Layers,
  Server,
  Database,
  Wrench,
  LucideProps,
} from "lucide-react";

// Map categories to appropriate icons for display
const categoryIcons: Record<
  string,
  ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
> = {
  Frontend: Code2,
  Mobile: Smartphone,
  "State Management": Layers,
  "Backend Knowledge": Server,
  Database: Database,
  Tools: Wrench,
};

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20% 0px" });

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 bg-card-bg/25 border-y border-card-border relative overflow-hidden"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            My Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            A comprehensive breakdown of my technical expertise, frameworks, and
            devtools. Animated indicators reflect hands-on experience and
            proficiency.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, catIdx) => {
            const IconComponent = categoryIcons[category] || Code2;
            const categorySkills = skills.filter(
              (s) => s.category === category,
            );

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIdx * 0.08 }}
                className="p-6 rounded-2xl bg-card-bg border border-card-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Title */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-card-border">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground/90">
                      {category}
                    </h3>
                  </div>

                  {/* Skills Progress Bars */}
                  <div className="space-y-5">
                    {categorySkills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm font-medium">
                          <span className="text-foreground/85">
                            {skill.name}
                          </span>
                          <span className="text-primary">{skill.level}%</span>
                        </div>
                        {/* Track */}
                        <div className="h-2 w-full rounded-full bg-card-border overflow-hidden">
                          {/* Animated Fill */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={
                              isInView ? { width: `${skill.level}%` } : {}
                            }
                            transition={{
                              duration: 1.2,
                              delay: catIdx * 0.1,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
