'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { skills } from '../data/skills';
import { 
  Code2, Shield, FileJson, Blocks, FileCode, Brush, Wind, 
  Smartphone, Cpu, Layers, RefreshCw, Server, Database, Flame, 
  GitBranch, Github, Figma, Terminal
} from 'lucide-react';

// Map specific skills to corresponding Lucide icons for maximum visual variety
const skillIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'React.js': AtomIcon, // Fallback to React style or Code
  'Next.js': AtomIcon,
  'Angular': Shield,
  'JavaScript': FileJson,
  'TypeScript': Blocks,
  'HTML': FileCode,
  'CSS': Brush,
  'Tailwind CSS': Wind,
  'Material UI': Brush,
  'Ionic': Smartphone,
  'React Native': Smartphone,
  'Expo': Smartphone,
  'Redux': Cpu,
  'Context API': Layers,
  'React Query': RefreshCw,
  'RxJS': Layers,
  'Node.js': Server,
  'Express.js': Server,
  'PostgreSQL': Database,
  'Firebase': Flame,
  'Git': GitBranch,
  'GitHub': Github,
  'Postman': Terminal,
  'Figma': Figma,
  'VS Code': Code2,
};

// Simple React Icon fallback
function AtomIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 21.8c-4.8 0-8.8-4-8.8-8.8 0-4.8 4-8.8 8.8-8.8 4.8 0 8.8 4 8.8 8.8 0 4.8-4 8.8-8.8 8.8Z" />
      <path d="M12 2.2c4.8 0 8.8 4 8.8 8.8 0 4.8-4 8.8-8.8 8.8-4.8 0-8.8-4-8.8-8.8 0-4.8 4-8.8 8.8-8.8Z" transform="rotate(60 12 12)" />
      <path d="M12 2.2c4.8 0 8.8 4 8.8 8.8 0 4.8-4 8.8-8.8 8.8-4.8 0-8.8-4-8.8-8.8 0-4.8 4-8.8 8.8-8.8Z" transform="rotate(120 12 12)" />
    </svg>
  );
}

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Core categories
  const categories = ['All', 'Frontend', 'Mobile', 'State Management', 'Database', 'Tools'];

  // Filter skills based on selected category
  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" ref={containerRef} className="py-24 bg-card-bg/25 border-y border-card-border relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Technical Stack Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-sm sm:text-base leading-relaxed"
          >
            A grid representation of my programming frameworks, languages, and developer tools. Use filters to query categories.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                  : 'bg-card-bg border-card-border text-foreground/70 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {cat === 'Backend Knowledge' ? 'Backend' : cat}
            </button>
          ))}
        </div>

        {/* Grid Gallery */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => {
              const Icon = skillIcons[skill.name] || Code2;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.02 }}
                  className="group relative p-4 pb-5 rounded-2xl bg-card-bg border border-card-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex items-center justify-between overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    {/* Icon container */}
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-foreground/90 block group-hover:text-primary transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[9px] text-foreground/45 uppercase tracking-wider block mt-0.5 font-medium">
                        {skill.category === 'Backend Knowledge' ? 'Backend' : skill.category}
                      </span>
                    </div>
                  </div>

                  {/* High visibility percentage pill badge */}
                  <div className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold font-mono border border-primary/20 shrink-0">
                    {skill.level}%
                  </div>

                  {/* Sleek bottom edge progress line indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-card-border/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
