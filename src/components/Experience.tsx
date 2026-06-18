'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/experience';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';

export default function Experience() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20% 0px' });

  return (
    <section id="experience" ref={containerRef} className="py-24 bg-background relative overflow-hidden">
      {/* Decorative backdrop gradients */}
      <div className="absolute top-1/4 left-10 w-[250px] h-[250px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[250px] h-[250px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Work Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            My professional timeline as a developer, highlighting major responsibilities, frameworks utilized, and engineering practices delivered in production environments.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-card-border transform -translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {experience.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={item.id} className="relative flex flex-col md:flex-row md:items-start">
                  
                  {/* Timeline bullet indicator */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 border-background bg-gradient-to-r from-primary to-secondary transform -translate-x-1/2 z-10 flex items-center justify-center text-white shadow-md">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>

                  {/* Left Column (Alternating Cards or Details) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right ${isEven ? 'md:order-1' : 'md:order-3'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.2 }}
                      className="p-6 rounded-2xl bg-card-bg border border-card-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 relative"
                    >
                      {/* Date Badge */}
                      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4 ${isEven ? 'md:flex-row-reverse md:float-left' : 'md:float-right'}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="clear-both" />

                      <h3 className="text-xl font-bold text-foreground/90 mt-2">{item.role}</h3>
                      <h4 className="text-base font-semibold text-primary/90 mt-1">{item.company}</h4>

                      {/* Responsibilities list */}
                      <ul className={`mt-6 space-y-3 text-sm text-foreground/75 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        {item.responsibilities.map((resp, respIdx) => (
                          <li key={respIdx} className={`flex items-start gap-2.5 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <span className="p-0.5 rounded-full bg-primary/15 text-primary mt-1 shrink-0">
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Spacer for secondary column */}
                  <div className="hidden md:block w-1/2 order-2" />

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
