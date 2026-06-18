'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';

export interface AccentTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  primaryRgb: string;
  secondaryRgb: string;
}

export const accentThemes: AccentTheme[] = [
  {
    id: 'classic-indigo',
    name: 'Classic Indigo',
    primary: '#2563eb',
    secondary: '#7c3aed',
    primaryRgb: '37, 99, 235',
    secondaryRgb: '124, 58, 237',
  },
  {
    id: 'emerald-teal',
    name: 'Emerald Teal',
    primary: '#059669',
    secondary: '#0d9488',
    primaryRgb: '5, 150, 105',
    secondaryRgb: '13, 148, 136',
  },
  {
    id: 'cyber-sunset',
    name: 'Cyber Sunset',
    primary: '#e11d48',
    secondary: '#d97706',
    primaryRgb: '225, 29, 72',
    secondaryRgb: '217, 119, 6',
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    primary: '#0891b2',
    secondary: '#c026d3',
    primaryRgb: '8, 145, 178',
    secondaryRgb: '192, 38, 211',
  },
];

export default function ThemeCustomizer() {
  const [activeTheme, setActiveTheme] = useState<AccentTheme>(accentThemes[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Sync with saved preference or default
    try {
      const stored = localStorage.getItem('accent-theme');
      if (stored) {
        const parsed = JSON.parse(stored) as AccentTheme;
        const matching = accentThemes.find((t) => t.id === parsed.id);
        if (matching) {
          setActiveTheme(matching);
          applyTheme(matching);
        }
      }
    } catch (e) {
      console.error('Failed to parse accent theme', e);
    }
  }, []);

  const applyTheme = (theme: AccentTheme) => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');

    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--primary-rgb', theme.primaryRgb);
    root.style.setProperty('--secondary-rgb', theme.secondaryRgb);

    // Update selection & glow variables dynamically
    root.style.setProperty(
      '--selection-bg',
      isDark ? `rgba(${theme.secondaryRgb}, 0.3)` : `rgba(${theme.primaryRgb}, 0.15)`
    );
    root.style.setProperty(
      '--glow-1',
      isDark ? `rgba(${theme.primaryRgb}, 0.15)` : `rgba(${theme.primaryRgb}, 0.1)`
    );
    root.style.setProperty(
      '--glow-2',
      isDark ? `rgba(${theme.secondaryRgb}, 0.15)` : `rgba(${theme.secondaryRgb}, 0.1)`
    );
  };

  const handleSelectTheme = (theme: AccentTheme) => {
    setActiveTheme(theme);
    applyTheme(theme);
    localStorage.setItem('accent-theme', JSON.stringify(theme));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-card-bg/50 hover:bg-card-bg border border-card-border transition-colors outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Customize Theme Accent"
        id="theme-customizer-btn"
      >
        <Palette className="w-5 h-5 text-foreground/80 hover:text-primary transition-colors" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-56 rounded-2xl bg-card-bg border border-card-border shadow-xl p-4 z-50 glass"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-3 px-1">
              Accent Color
            </h3>
            <div className="space-y-1.5">
              {accentThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-sm transition-all duration-200 cursor-pointer ${
                    activeTheme.id === theme.id
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'hover:bg-primary/5 text-foreground/85'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Visual Color Previews */}
                    <div className="flex -space-x-1.5 shrink-0">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-card-bg"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-card-bg"
                        style={{ backgroundColor: theme.secondary }}
                      />
                    </div>
                    <span>{theme.name}</span>
                  </div>
                  {activeTheme.id === theme.id && <Check className="w-4 h-4 text-primary shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
