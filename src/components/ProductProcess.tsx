'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, PenTool, LayoutTemplate, Network, ShieldCheck, Rocket, ArrowRight } from 'lucide-react';

export default function ProductProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  const steps = [
    {
      step: '01',
      title: 'Idea Discovery',
      icon: Lightbulb,
      description: 'Analyzing requirements, identifying core problems, mapping user journeys, and drafting feature scopes.',
      color: 'from-yellow-500/20 to-orange-500/10 text-yellow-500',
    },
    {
      step: '02',
      title: 'Figma Wireframing',
      icon: PenTool,
      description: 'Creating high-fidelity UI/UX layouts in Figma, planning component boundaries, and testing interactions.',
      color: 'from-pink-500/20 to-rose-500/10 text-pink-500',
    },
    {
      step: '03',
      title: 'UI Development',
      icon: LayoutTemplate,
      description: 'Coding clean, accessible JSX components using Tailwind CSS and Framer Motion for premium visuals.',
      color: 'from-blue-500/20 to-cyan-500/10 text-blue-500',
    },
    {
      step: '04',
      title: 'API Integration',
      icon: Network,
      description: 'Connecting database services, setting up state models (Redux/React Query), and synchronizing data feeds.',
      color: 'from-purple-500/20 to-violet-500/10 text-purple-500',
    },
    {
      step: '05',
      title: 'Testing & Vitals',
      icon: ShieldCheck,
      description: 'Performing responsive inspections, auditing SEO headers, and running unit tests to ensure stability.',
      color: 'from-green-500/20 to-emerald-500/10 text-green-500',
    },
    {
      step: '06',
      title: 'Deployment',
      icon: Rocket,
      description: 'Publishing optimized code bundles to Vercel/Expo, setting up monitoring hooks, and live-launching.',
      color: 'from-red-500/20 to-amber-500/10 text-red-500',
    },
  ];

  return (
    <section id="process" ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute right-0 top-1/4 w-[250px] h-[250px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[250px] h-[250px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            How I Build Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            A breakdown of my end-to-end engineering lifecycle, moving systematically from initial concepts to verified live deployments.
          </motion.p>
        </div>

        {/* Steps Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-6 rounded-3xl bg-card-bg border border-card-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                whileHover={{ y: -5 }}
              >
                {/* Arrow indicator for flows */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 text-card-border pointer-events-none group-hover:text-primary transition-colors duration-300">
                    {/* Only show arrows between items in the same row */}
                    {(idx + 1) % 3 !== 0 && <ArrowRight className="w-5 h-5" />}
                  </div>
                )}

                <div>
                  {/* Step Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary/20 to-secondary/20 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                      {item.step}
                    </span>
                  </div>

                  {/* Title and body */}
                  <h3 className="text-lg font-bold text-foreground/90 mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
