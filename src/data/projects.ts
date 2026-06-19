import { Project } from "../types/portfolio";
import foodies_friend from '@/assets/images/project-img/foodies-friend.png'
import coding_hub from '@/assets/images/project-img/coding-hub.png'
import quick_connect from '@/assets/images/project-img/quick-connect.png'
import code_blogs from '@/assets/images/project-img/coding-hub.png'
import agrosmart from '@/assets/images/project-img/coding-hub.png'

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Foodies Friend",
    description:
      "A modern food discovery application that helps users explore recipes, search meals, and manage their favorite dishes through an intuitive user interface.",
    tech: ["React", "JavaScript", "CSS", "REST API"],
    features: [
      "Recipe Search",
      "Meal Categories",
      "Favorite Recipes",
      "Responsive Design",
    ],
    image: foodies_friend,
    liveUrl: "https://foodies-friend.vercel.app/",
    githubUrl: "https://github.com/RuchitaSenjaliya/Foodies-Friend",
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

  {
    id: "proj-3",
    title: "QuickConnect",
    description:
      "A real-time communication platform designed to simplify user interaction through instant messaging and seamless connectivity features.",
    tech: ["React", "Node.js", "Socket.io", "JavaScript"],
    features: [
      "Real-time Messaging",
      "User Authentication",
      "Instant Notifications",
      "Responsive Interface",
    ],
    image: quick_connect,
    liveUrl: "https://quick-connect-blush.vercel.app",
    githubUrl: "https://github.com/RuchitaSenjaliya/QuickConnect",
  },

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
  },
];
