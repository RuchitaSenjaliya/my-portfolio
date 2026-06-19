'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide scrollbar during loading
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 1800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center">
            {/* Elegant Ring Animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="w-24 h-24 rounded-full border-2 border-transparent border-t-primary border-b-secondary"
            />
            
            {/* Initials Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-widest"
              >
                RS
              </motion.span>
            </div>

            {/* Developer Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-sm font-medium tracking-widest uppercase text-foreground/60"
            >
              Ruchita Senjaliya
            </motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeInOut' }}
              className="h-[2px] mt-2 bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
