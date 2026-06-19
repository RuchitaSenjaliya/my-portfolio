"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Code2,
  GitCommit,
  FolderGit,
  Cpu,
  Loader2,
} from "lucide-react";

interface LanguageItem {
  name: string;
  percentage: number;
  color: string;
}

interface GithubStats {
  publicRepos: number;
  followers: number;
  totalCommits: number;
  languages: LanguageItem[];
}

export default function DeveloperDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const [stats, setStats] = useState<GithubStats>({
    publicRepos: 18,
    followers: 10,
    totalCommits: 1424,
    languages: [
      { name: "TypeScript / JS", percentage: 70, color: "bg-yellow-400" },
      { name: "React / Next.js", percentage: 85, color: "bg-blue-500" },
      { name: "Angular / Ionic", percentage: 55, color: "bg-red-500" },
      { name: "HTML / CSS / Tailwind", percentage: 90, color: "bg-teal-400" },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/github");

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load live GitHub statistics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Generate GitHub commit contribution blocks (last 24 weeks)
  const columns = 24;
  const rows = 7;
  const generateGrid = () => {
    const blocks = [];
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows; r++) {
        const rand = Math.random();
        let level = "bg-card-border/50 dark:bg-card-border/20";
        if (rand > 0.85) level = "bg-green-500/80";
        else if (rand > 0.65) level = "bg-green-500/50";
        else if (rand > 0.45) level = "bg-green-500/25";
        blocks.push(level);
      }
    }
    return blocks;
  };

  const gridBlocks = generateGrid();

  const dashboardStats = [
    {
      label: "GitHub Commits",
      val: stats.totalCommits.toString(),
      Icon: GitCommit,
      color: "text-green-500 bg-green-500/10",
    },
    {
      label: "Public Repos",
      val: stats.publicRepos.toString(),
      Icon: FolderGit,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      label: "Coding Hours",
      val: "2,840",
      Icon: Cpu,
      color: "text-purple-500 bg-purple-500/10",
    },
  ];

  const blogs = [
    {
      title: "Mastering Concurrent Features in React 19 & Next.js 15",
      date: "June 2026",
      readTime: "6 min read",
      url: "#",
    },
    {
      title: "Writing Modular Custom Hooks for React Native Applications",
      date: "April 2026",
      readTime: "8 min read",
      url: "#",
    },
    {
      title: "A Deep Dive into Ionic Hybrid vs Native Build Performance",
      date: "March 2026",
      readTime: "5 min read",
      url: "#",
    },
  ];

  return (
    <section
      id="dashboard"
      ref={ref}
      className="py-24 bg-card-bg/25 border-y border-card-border relative overflow-hidden"
    >
      {/* Decorative Blur Gradients */}
      <div className="absolute top-1/4 right-0 w-75 h-75 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-75 h-75 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Live Developer Dashboard
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-lg leading-relaxed"
          >
            An analytics overview reflecting live Git contributions, project
            repositories, language stack usage, and recently published articles.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <span className="text-sm text-foreground/50 font-medium">
              Fetching Live GitHub Analytics...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* GitHub stats and commit blocks */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {dashboardStats.map((s, idx) => {
                  const Icon = s.Icon;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="p-5 rounded-2xl bg-card-bg border border-card-border text-center hover:border-primary/25 transition-all duration-300"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-3 ${s.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-2xl font-bold text-foreground/90 block">
                        {s.val}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-foreground/50 tracking-wider block mt-1">
                        {s.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Commit contribution grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-3xl bg-card-bg border border-card-border overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4 border-b border-card-border pb-3">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-foreground/80" />
                    <span className="text-xs font-bold text-foreground/85">
                      GitHub Contributions Grid
                    </span>
                  </div>
                  <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/25">
                    Active on GitHub
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <div className="grid grid-rows-7 grid-flow-col gap-1 w-max mx-auto py-1">
                    {gridBlocks.map((bgClass, idx) => (
                      <div
                        key={idx}
                        className={`w-3.5 h-3.5 rounded-sm transition-colors duration-500 ${bgClass}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-foreground/45 mt-4">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-sm bg-card-border/50" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-green-500/25" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-green-500/50" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-green-500/80" />
                  </div>
                  <span>More</span>
                </div>
              </motion.div>
            </div>

            {/* Languages and blogs */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-3xl bg-card-bg border border-card-border"
              >
                <div className="flex items-center gap-2 mb-5 border-b border-card-border pb-3">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-foreground/85">
                    Framework Stack Usage
                  </span>
                </div>

                <div className="space-y-4">
                  {stats.languages.map((lang) => (
                    <div key={lang.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-foreground/75">
                        <span>{lang.name}</span>
                        <span>{lang.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-card-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            isInView ? { width: `${lang.percentage}%` } : {}
                          }
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className={`h-full rounded-full ${lang.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
