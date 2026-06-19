"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop,
  Code,
  Cpu,
  Database,
  Terminal,
  Binary,
  GitBranch,
  FileCode,
  Globe,
  Paintbrush,
  Palette,
  PaintBucket,
  Pencil,
  PenTool,
  Sparkles,
  Feather,
  Image as ImageIcon,
} from "lucide-react";

interface FloatingItem {
  Icon: React.ComponentType<any>;
  top: string;
  left?: string;
  right?: string;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
}

const codeItems: FloatingItem[] = [
  {
    Icon: Laptop,
    top: "12%",
    left: "4%",
    size: 40,
    delay: 0,
    duration: 25,
    driftX: 15,
    driftY: 20,
  },
  {
    Icon: Code,
    top: "25%",
    right: "5%",
    size: 36,
    delay: 2,
    duration: 28,
    driftX: -20,
    driftY: 15,
  },
  {
    Icon: Cpu,
    top: "42%",
    left: "6%",
    size: 32,
    delay: 1,
    duration: 22,
    driftX: 10,
    driftY: -25,
  },
  {
    Icon: Database,
    top: "60%",
    right: "6%",
    size: 36,
    delay: 4,
    duration: 30,
    driftX: -15,
    driftY: 20,
  },
  {
    Icon: Terminal,
    top: "78%",
    left: "5%",
    size: 32,
    delay: 3,
    duration: 24,
    driftX: 20,
    driftY: -15,
  },
  {
    Icon: Binary,
    top: "32%",
    right: "8%",
    size: 28,
    delay: 0.5,
    duration: 20,
    driftX: -12,
    driftY: 12,
  },
  {
    Icon: GitBranch,
    top: "50%",
    left: "8%",
    size: 36,
    delay: 1.5,
    duration: 26,
    driftX: 18,
    driftY: 18,
  },
  {
    Icon: FileCode,
    top: "70%",
    right: "4%",
    size: 38,
    delay: 2.5,
    duration: 32,
    driftX: -22,
    driftY: 15,
  },
  {
    Icon: Globe,
    top: "88%",
    left: "3%",
    size: 34,
    delay: 5,
    duration: 27,
    driftX: 15,
    driftY: -20,
  },
];

const canvasItems: FloatingItem[] = [
  {
    Icon: Paintbrush,
    top: "15%",
    left: "5%",
    size: 38,
    delay: 0,
    duration: 26,
    driftX: 18,
    driftY: -15,
  },
  {
    Icon: Palette,
    top: "28%",
    right: "6%",
    size: 42,
    delay: 1.5,
    duration: 30,
    driftX: -22,
    driftY: 18,
  },
  {
    Icon: PaintBucket,
    top: "45%",
    left: "4%",
    size: 36,
    delay: 3,
    duration: 24,
    driftX: 12,
    driftY: 22,
  },
  {
    Icon: Pencil,
    top: "62%",
    right: "4%",
    size: 32,
    delay: 0.5,
    duration: 22,
    driftX: -15,
    driftY: -18,
  },
  {
    Icon: PenTool,
    top: "78%",
    left: "6%",
    size: 34,
    delay: 2,
    duration: 28,
    driftX: 20,
    driftY: 15,
  },
  {
    Icon: Sparkles,
    top: "35%",
    left: "8%",
    size: 30,
    delay: 4,
    duration: 20,
    driftX: 10,
    driftY: -12,
  },
  {
    Icon: Feather,
    top: "52%",
    right: "8%",
    size: 36,
    delay: 1,
    duration: 32,
    driftX: -18,
    driftY: 20,
  },
  {
    Icon: ImageIcon,
    top: "70%",
    left: "3%",
    size: 38,
    delay: 2.5,
    duration: 27,
    driftX: 15,
    driftY: -22,
  },
  {
    Icon: Paintbrush,
    top: "88%",
    right: "5%",
    size: 34,
    delay: 5,
    duration: 25,
    driftX: -12,
    driftY: 18,
  },
];

export default function FloatingElements({
  mode,
}: {
  mode: "code" | "canvas";
}) {
  const items = mode === "code" ? codeItems : canvasItems;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          {items.map((item, idx) => {
            const Icon = item.Icon;
            const stylePosition = item.left
              ? { top: item.top, left: item.left }
              : { top: item.top, right: item.right };

            return (
              <motion.div
                key={idx}
                style={{
                  position: "absolute",
                  ...stylePosition,
                  color: "currentColor",
                }}
                className="text-foreground/10 dark:text-foreground/5 select-none"
                animate={{
                  x: [0, item.driftX, -item.driftX, 0],
                  y: [0, item.driftY, -item.driftY, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: item.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
              >
                <Icon
                  style={{ width: item.size, height: item.size }}
                  className="stroke-[1.25]"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
