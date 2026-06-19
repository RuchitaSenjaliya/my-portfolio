import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Terminal,
  Code2,
  Laptop,
  Cpu,
  Database,
  GitBranch,
  Paintbrush,
  Palette,
  PaintBucket,
  Pencil,
  Sparkles,
  Image as ImageIcon,
  LucideProps,
} from "lucide-react";

interface FloatingHeroIcon {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  top: string;
  left?: string;
  right?: string;
  size: number;
  colorClass: string;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
}

export const codeHeroIcons: FloatingHeroIcon[] = [
  {
    Icon: Laptop,
    top: "12%",
    left: "48%",
    size: 42,
    colorClass: "text-purple-500 dark:text-purple-400",
    delay: 0,
    duration: 18,
    driftX: 15,
    driftY: 15,
  },
  {
    Icon: Code2,
    top: "20%",
    right: "10%",
    size: 36,
    colorClass: "text-amber-500 dark:text-amber-400",
    delay: 2,
    duration: 22,
    driftX: -15,
    driftY: 10,
  },
  {
    Icon: Cpu,
    top: "42%",
    left: "6%",
    size: 32,
    colorClass: "text-rose-500 dark:text-rose-400",
    delay: 1,
    duration: 16,
    driftX: 10,
    driftY: -15,
  },
  {
    Icon: Database,
    top: "58%",
    right: "42%",
    size: 36,
    colorClass: "text-emerald-500 dark:text-emerald-400",
    delay: 3,
    duration: 24,
    driftX: -12,
    driftY: 18,
  },
  {
    Icon: Terminal,
    top: "75%",
    left: "38%",
    size: 34,
    colorClass: "text-cyan-500 dark:text-cyan-400",
    delay: 1.5,
    duration: 20,
    driftX: 15,
    driftY: -12,
  },
  {
    Icon: GitBranch,
    top: "45%",
    right: "6%",
    size: 32,
    colorClass: "text-pink-500 dark:text-pink-400",
    delay: 4,
    duration: 19,
    driftX: -10,
    driftY: 12,
  },
];

export const canvasHeroIcons: FloatingHeroIcon[] = [
  {
    Icon: Paintbrush,
    top: "12%",
    left: "40%",
    size: 40,
    colorClass: "text-rose-500 dark:text-rose-400",
    delay: 0,
    duration: 18,
    driftX: 12,
    driftY: -12,
  },
  {
    Icon: Palette,
    top: "20%",
    right: "24%",
    size: 44,
    colorClass: "text-amber-500 dark:text-amber-400",
    delay: 2,
    duration: 22,
    driftX: -18,
    driftY: 15,
  },
  {
    Icon: PaintBucket,
    top: "42%",
    left: "4%",
    size: 34,
    colorClass: "text-blue-500 dark:text-blue-400",
    delay: 1,
    duration: 16,
    driftX: 15,
    driftY: 15,
  },
  {
    Icon: Pencil,
    top: "85%",
    right: "28%",
    size: 32,
    colorClass: "text-emerald-500 dark:text-emerald-400",
    delay: 3,
    duration: 24,
    driftX: -12,
    driftY: -12,
  },
  {
    Icon: Sparkles,
    top: "78%",
    left: "42%",
    size: 36,
    colorClass: "text-purple-500 dark:text-purple-400",
    delay: 1.5,
    duration: 20,
    driftX: 15,
    driftY: 10,
  },
  {
    Icon: ImageIcon,
    top: "48%",
    right: "6%",
    size: 34,
    colorClass: "text-teal-500 dark:text-teal-400",
    delay: 4,
    duration: 19,
    driftX: -10,
    driftY: 15,
  },
];

export const DEV_WORDS = [
  "Frontend Developer",
  "React Developer",
  "React Native Developer",
];

export const ART_WORDS = ["Canvas Art", "Mandala Art"];
