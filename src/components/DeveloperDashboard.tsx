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

interface ContributionNode {
  date: string;
  count: number;
  level: number;
  isPadding?: boolean;
}

interface GithubStats {
  publicRepos: number;
  followers: number;
  totalCommits: number;
  languages: LanguageItem[];
  contributions: ContributionNode[];
}

export default function DeveloperDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const currentYear = new Date().getFullYear();
  const [stats, setStats] = useState<GithubStats>({
    publicRepos: 18,
    followers: 10,
    totalCommits: 257,
    languages: [
      { name: "TypeScript / JS", percentage: 70, color: "bg-yellow-400" },
      { name: "React / Next.js", percentage: 85, color: "bg-blue-500" },
      { name: "Angular / Ionic", percentage: 55, color: "bg-red-500" },
      { name: "HTML / CSS / Tailwind", percentage: 90, color: "bg-teal-400" },
    ],
    contributions: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<string>(currentYear.toString());

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

  const getContributionColorClass = (level: number) => {
    switch (level) {
      case 0:
        return "bg-card-border/55 dark:bg-card-border/20";
      case 1:
        return "bg-green-500/25";
      case 2:
        return "bg-green-500/50";
      case 3:
        return "bg-green-500/75";
      case 4:
        return "bg-green-500";
      default:
        return "bg-card-border/55 dark:bg-card-border/20";
    }
  };

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

  // Extract unique years from contributions
  const availableYears = Array.from(
    new Set(stats.contributions.map((c) => c.date.split("-")[0])),
  )
    .filter(Boolean)
    .sort((a, b) => b.localeCompare(a));

  // Determine current month or fallback to latest available month
  // Filter contributions based on active selector
  const rawFilteredContributions = (() => {
    return stats.contributions.filter((c) =>
      c.date.startsWith(`${selectedPeriod}-`),
    );
  })();

  // Sort and pad contributions to align weekdays properly (Sunday starting)
  const gridContributions = (() => {
    if (rawFilteredContributions.length === 0) return [];

    const sorted = [...rawFilteredContributions].sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    const firstDate = new Date(sorted[0].date);
    const firstDayOfWeek = firstDate.getDay(); // 0 is Sunday, 6 is Saturday

    // Create padding blocks for the start of the week
    const paddingStart = Array.from({ length: firstDayOfWeek }, () => ({
      date: "",
      count: 0,
      level: 0,
      isPadding: true,
    }));

    const combined = [...paddingStart, ...sorted];

    // Complete the last column to make it a perfect multiple of 7
    const paddingEndLength = (7 - (combined.length % 7)) % 7;
    const paddingEnd = Array.from({ length: paddingEndLength }, () => ({
      date: "",
      count: 0,
      level: 0,
      isPadding: true,
    }));

    return [...combined, ...paddingEnd];
  })();

  // Generate month labels for each week column
  const monthLabels = (() => {
    const cols = Math.ceil(gridContributions.length / 7);
    const labels: string[] = [];
    let prevMonth = "";

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let w = 0; w < cols; w++) {
      let weekMonth = "";
      for (let d = 0; d < 7; d++) {
        const block = gridContributions[w * 7 + d];
        if (block && block.date) {
          const monthPart = block.date.split("-")[1];
          if (monthPart) {
            const monthIdx = parseInt(monthPart, 10) - 1;
            weekMonth = monthNames[monthIdx];
            break;
          }
        }
      }

      if (weekMonth && (w === 0 || weekMonth !== prevMonth)) {
        labels.push(weekMonth);
        prevMonth = weekMonth;
      } else {
        labels.push("");
      }
    }
    return labels;
  })();

  // Group cells into weeks (columns of 7 days)
  const weeks = (() => {
    const list: ContributionNode[][] = [];
    for (let i = 0; i < gridContributions.length; i += 7) {
      list.push(gridContributions.slice(i, i + 7));
    }
    return list;
  })();

  return (
    <section
      id="dashboard"
      ref={ref}
      className="py-24 bg-card-bg/25 border-y border-card-border relative overflow-hidden"
    >
      {/* Decorative Blur Gradients */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-card-border pb-4">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-foreground/80" />
                    <span className="text-xs font-bold text-foreground/85">
                      {`Contributions: ${selectedPeriod}`}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {availableYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedPeriod(year)}
                        className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg border transition-all duration-200 cursor-pointer ${
                          selectedPeriod === year
                            ? "bg-primary/10 text-primary border-primary/20 shadow-xs"
                            : "bg-card-bg border-card-border text-foreground/60 hover:text-foreground/80 hover:border-card-border/80"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto w-full">
                  <div className="flex gap-1.5 items-start w-max mx-auto py-1">
                    {/* Weekday labels column */}
                    <div className="flex flex-col">
                      {/* Spacer for month row */}
                      <div className="h-3 mb-1" />
                      {/* Weekday cells */}
                      <div className="w-[28px] shrink-0 grid grid-rows-7 gap-1 text-[9px] text-foreground/40 font-semibold select-none text-right pr-1.5">
                        <div className="h-3.5 flex items-center justify-end"></div>
                        <div className="h-3.5 flex items-center justify-end">
                          Mon
                        </div>
                        <div className="h-3.5 flex items-center justify-end"></div>
                        <div className="h-3.5 flex items-center justify-end">
                          Wed
                        </div>
                        <div className="h-3.5 flex items-center justify-end"></div>
                        <div className="h-3.5 flex items-center justify-end">
                          Fri
                        </div>
                        <div className="h-3.5 flex items-center justify-end"></div>
                      </div>
                    </div>

                    {/* Weeks Row Container */}
                    <div className="flex gap-1">
                      {weeks.map((week, weekIdx) => {
                        const label = monthLabels[weekIdx];
                        const isNewMonth = label !== "";
                        const weekMargin =
                          weekIdx > 0 && isNewMonth ? "ml-3.5" : "";

                        return (
                          <div
                            key={weekIdx}
                            className={`flex flex-col ${weekMargin}`}
                          >
                            {/* Month label */}
                            <div className="h-3 mb-1 text-[9px] text-foreground/45 font-bold overflow-visible whitespace-nowrap select-none w-3.5 flex items-center justify-start">
                              {label}
                            </div>

                            {/* Cells in Week */}
                            <div className="grid grid-rows-7 gap-1">
                              {week.map((block, dayIdx) => {
                                if (block.isPadding) {
                                  return (
                                    <div
                                      key={dayIdx}
                                      className="w-3.5 h-3.5 bg-transparent opacity-0 pointer-events-none cursor-default"
                                    />
                                  );
                                }
                                return (
                                  <div
                                    key={dayIdx}
                                    className={`w-3.5 h-3.5 rounded-sm transition-colors duration-350 cursor-pointer ${getContributionColorClass(block.level)}`}
                                    title={
                                      block.date
                                        ? `${block.date}: ${block.count} commits`
                                        : "No contributions recorded"
                                    }
                                  />
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
