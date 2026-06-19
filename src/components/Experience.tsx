'use client';

import { ForwardRefExoticComponent, RefAttributes, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight, Layers, Code2, Smartphone, Cpu, LucideProps } from 'lucide-react';

interface Milestone {
  year: string;
  role: string;
  company: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  milestones: string[];
  tech: string[];
}

const timelineData: Milestone[] = [
  {
    year: '2023',
    role: 'Frontend Developer',
    company: 'Solute Labs Pvt. Ltd.',
    icon: Code2,
    milestones: [
      'Developed scalable React.js web architectures with Redux state machines.',
      'Designed and coded modular responsive admin dashboards with Material UI.',
      'Collaborated closely with Figma designers to code pixel-perfect interfaces.'
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'React.js', 'GitHub'],
  },
  {
    year: '2024',
    role: 'Enterprise Web & Angular Systems',
    company: 'Tech Solutions Inc.',
    icon: Layers,
    milestones: [
      'Built and integrated responsive interfaces with Angular and RxJS state engines.',
      'Constructed enterprise-grade hybrid mobile layouts using Ionic and Cordova.',
      'Restructured modular components, decreasing overall code bundle sizes by 20%.'
    ],
    tech: ['Angular', 'Ionic', 'TypeScript', 'RxJS', 'JSON Rest APIs'],
    visualMock: 'angular_enterprise'
  },
  {
    year: '2025',
    role: 'Mobile Architecture Specialist',
    company: 'Tech Solutions Inc.',
    icon: Smartphone,
    milestones: [
      'Created cross-platform native iOS/Android mobile apps with React Native.',
      'Configured secure local caching and push alert sync pipelines with Expo/Firebase.',
      'Integrated direct buyer-seller WhatsApp dispatch systems.'
    ],
    tech: ['React Native', 'Expo', 'Redux Toolkit', 'Firebase API', 'React Query'],
    visualMock: 'mobile_react_native'
  },
  {
    year: '2026',
    role: 'AI & Next.js 15 System Design',
    company: 'Tech Solutions Inc. / Freelance',
    icon: Cpu,
    milestones: [
      'Designed and built AI content generators utilising Next.js and OpenAI API.',
      'Engineered search-engine-indexing pipelines (Robots/Sitemaps) for next-gen sites.',
      'Deployed edge-ready SSR applications to Vercel clouds.'
    ],
    tech: ['Next.js 15', 'OpenAI API', 'Tailwind CSS v4', 'Edge Server Actions'],
    visualMock: 'next_ai_system'
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside container to animate indicator bar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            My Career Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            A scroll-driven journey detailing how my technical role, architectural thinking, and code stack matured year-by-year.
          </motion.p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Scroll-driven Vertical Indicator Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary origin-top transform -translate-x-1/2" 
          />
          {/* Static gray line beneath */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-card-border transform -translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const IconComponent = item.icon;

              return (
                <div key={item.year} className="relative flex flex-col md:flex-row md:items-start">
                  
                  {/* Timeline bullet indicator */}
                  <motion.div 
                    whileInView={{ scale: [0.5, 1.2, 1] }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="absolute left-4 md:left-1/2 w-9 h-9 rounded-full border-4 border-background bg-gradient-to-r from-primary to-secondary transform -translate-x-1/2 z-10 flex items-center justify-center text-white shadow-lg"
                  >
                    <span className="text-[10px] font-bold">{item.year}</span>
                  </motion.div>

                  {/* Left Column (Content cards) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right ${isEven ? 'md:order-1' : 'md:order-3'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="p-6 rounded-3xl bg-card-bg border border-card-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 relative"
                    >
                      {/* Date Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <IconComponent className="w-3.5 h-3.5" />
                        <span>{item.year} Milestone</span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground/90 mt-2">{item.role}</h3>
                      <h4 className="text-sm font-semibold text-primary mt-1">{item.company}</h4>

                      {/* Milestones list */}
                      <ul className={`mt-5 space-y-3.5 text-xs text-foreground/75 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        {item.milestones.map((mil, milIdx) => (
                          <li key={milIdx} className={`flex items-start gap-2.5 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <span className="p-0.5 rounded-full bg-primary/15 text-primary mt-0.5 shrink-0">
                              <ChevronRight className="w-3 h-3" />
                            </span>
                            <span>{mil}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technical Capsules */}
                      <div className={`flex flex-wrap gap-1.5 mt-6 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                        {item.tech.map((t) => (
                          <span key={t} className="text-[9px] font-bold bg-card-border/60 dark:bg-card-border/30 border border-card-border/80 px-2 py-0.5 rounded-md text-foreground/80">
                            {t}
                          </span>
                        ))}
                      </div>
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
