'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-card-bg/50 border border-card-border" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-card-bg/50 hover:bg-card-bg border border-card-border transition-colors outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Toggle Theme"
      id="theme-toggle-btn"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0, scale: theme === 'dark' ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute text-yellow-500"
      >
        <Sun className="w-5 h-5 fill-yellow-500/20" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : -180, scale: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute text-indigo-400"
      >
        <Moon className="w-5 h-5 fill-indigo-400/20" />
      </motion.div>
    </button>
  );
}
