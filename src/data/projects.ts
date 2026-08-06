import { Project } from "../types/portfolio";
import intelli_agent from "@/assets/images/project-img/intelli-agent.png";
import coding_hub from "@/assets/images/project-img/coding-hub.png";
import quick_connect from "@/assets/images/project-img/quick-connect.png";
import agrosmart from "@/assets/images/project-img/agrosmart.png";

export const projects: Project[] = [
  {
    id: "intelliagent",
    title: "IntelliAgent - AI Chat Platform",
    description:
      "A premium, design-first AI chat application featuring custom liquid glassmorphic animations, coordinate-based circular theme transitions, and a search-enabled Express backend powered by Groq and Tavily APIs.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Node.js",
      "Express",
      "Groq Cloud API",
      "Tavily Search API",
    ],
    features: [
      "Liquid Glass Design",
      "Radial Theme Transitions",
      "Real-time Web Search",
      "Router Auth Guards",
    ],
    image: intelli_agent,
    liveUrl: "https://intelliagent.vercel.app/", // Replace with your deployment link
    githubUrl: "https://github.com/RuchitaSenjaliya/IntelliAgent",
  },

  {
    id: "proj-2",
    title: "Coding Hub",
    description:
      "A developer-focused platform that provides coding resources, learning materials, and programming-related content in a centralized dashboard.",
    tech: ["React", "JavaScript", "HTML", "CSS"],
    features: [
      "Coding Resources",
      "Topic Categorization",
      "Search Functionality",
      "Responsive UI",
    ],
    image: coding_hub,
    liveUrl: "https://coding-hub-steel.vercel.app/",
    githubUrl: "https://github.com/RuchitaSenjaliya/Coding-Hub",
  },

  // {
  //   id: "proj-3",
  //   title: "QuickConnect",
  //   description:
  //     "A real-time communication platform designed to simplify user interaction through instant messaging and seamless connectivity features.",
  //   tech: ["React", "Node.js", "Socket.io", "JavaScript"],
  //   features: [
  //     "Real-time Messaging",
  //     "User Authentication",
  //     "Instant Notifications",
  //     "Responsive Interface",
  //   ],
  //   image: quick_connect,
  //   liveUrl: "https://quick-connect-blush.vercel.app",
  //   githubUrl: "https://github.com/RuchitaSenjaliya/QuickConnect",
  // },

  // {
  //   id: "proj-4",
  //   title: "Code Blogs AI",
  //   description:
  //     "An AI-powered blog generation platform that creates SEO-friendly technical articles from user-provided topics and prompts.",
  //   tech: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
  //   features: [
  //     "AI Blog Generation",
  //     "SEO Optimized Content",
  //     "Custom Prompts",
  //     "Modern Responsive UI",
  //   ],
  //   image: code_blogs,
  //   liveUrl: "https://code-blogs-dusky.vercel.app/",
  //   githubUrl: "https://github.com/RuchitaSenjaliya/code-blogs",
  // },
  {
    id: "proj-4",
    title: "AgroSmart",
    description:
      "A robust mobile application built with React Native for farmers to list crops, coordinate order logistics directly with buyers, get weather alerts, and communicate via WhatsApp.",
    tech: ["React Native", "Expo", "Firebase", "Redux Toolkit", "React Query"],
    features: [
      "Agritech Product Listings & Inventory",
      "Direct Order Placement & Flow",
      "Push Notifications for Price Alerts",
      "One-Tap WhatsApp Buyer-Seller Chat",
    ],
    image: agrosmart,
    liveUrl: "https://expo.dev/@ruchita/projects/agrosmart",
    githubUrl: "https://github.com/RuchitaSenjaliya/AgroSmart",
    isMobile: true,
  },
];
