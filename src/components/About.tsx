'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Briefcase, Zap, Smartphone, Cpu, Code2 } from 'lucide-react';

// Counter component for animated statistics
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 2000; // ms
      const incrementTime = Math.max(Math.floor(duration / end), 20);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-bold text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20% 0px' });

  const stats = [
    { label: 'Years Experience', value: 2, suffix: '+' },
    { label: 'Projects Completed', value: 8, suffix: '+' },
    { label: 'Technologies Used', value: 12, suffix: '+' },
    { label: 'Happy Clients', value: 7, suffix: '+' },
  ];

  const highlights = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'Building modular, highly performant web architectures using modern React and Angular frameworks.',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Creating smooth, native-feeling cross-platform mobile apps with React Native, Expo, and Ionic.',
    },
    {
      icon: Cpu,
      title: 'Problem Solving',
      description: 'Applying clean algorithms and data-flow designs to build robust and scalable features.',
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Maximizing application speed, SEO scores, bundle sizing, and core web vitals.',
    },
    {
      icon: Award,
      title: 'API Integration',
      description: 'Structuring clean data synchronization and offline storage mechanisms with RESTful and GraphQL endpoints.',
    },
    {
      icon: Briefcase,
      title: '2+ Years Experience',
      description: 'Solid foundation of writing testable, production-ready code in fast-moving engineering teams.',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Decorative backdrop gradients */}
      <div className="absolute right-0 top-1/3 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            I am a Frontend Developer dedicated to creating visual, responsive, and performance-optimized user interfaces. By blending clean design aesthetics with scalable engineering practices, I build experiences that run smoothly on any screen.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-card-bg border border-card-border text-center hover:border-primary/30 transition-colors"
            >
              <div className="mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm font-medium text-foreground/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, idx) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group p-6 rounded-2xl bg-card-bg border border-card-border hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
