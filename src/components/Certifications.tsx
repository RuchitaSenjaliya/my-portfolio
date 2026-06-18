'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { certifications } from '../data/certifications';
import { Award, ArrowUpRight, GraduationCap } from 'lucide-react';

export default function Certifications() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20% 0px' });

  return (
    <section id="certifications" ref={containerRef} className="py-24 bg-background relative overflow-hidden">
      {/* Decorative backdrop gradients */}
      <div className="absolute right-0 top-1/4 w-[250px] h-[250px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[250px] h-[250px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            Professional milestones and validation of technical capabilities certified by industry-leading academies.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card-bg border border-card-border hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Certification Icon & Top elements */}
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Award className="w-6 h-6" />
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/40 hover:text-primary transition-colors cursor-pointer"
                      aria-label={`Verify ${cert.title}`}
                    >
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>

                {/* Title and details */}
                <h3 className="text-base font-bold text-foreground/90 mt-5 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-foreground/60 mt-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>{cert.issuer}</span>
                </p>
              </div>

              {/* Date Footer */}
              <div className="mt-6 pt-4 border-t border-card-border/60 flex items-center justify-between text-xs text-foreground/50">
                <span>Credential Date</span>
                <span className="font-semibold text-foreground/70">{cert.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
