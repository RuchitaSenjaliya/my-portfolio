import { Project } from "../types/portfolio";

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Employee Management System",
    description:
      "A comprehensive web application designed for HR departments to streamline user management, onboarding workflows, track performance, and view company analytics from a single unified dashboard.",
    tech: ["React", "Redux", "Material UI", "Node.js", "Express", "PostgreSQL"],
    features: [
      "User Management & Role Assignment",
      "Secure JWT Authentication",
      "Interactive Analytics Dashboard",
      "Activity Tracking & Reporting",
    ],
    image: "employee_mgmt",
    liveUrl: "https://employee-mgmt.ruchita.dev",
    githubUrl: "https://github.com/RuchitaSenjaliya/employee-management-system",
  },
  // {
  //   id: 'proj-2',
  //   title: 'Hotel Management System',
  //   description: 'A responsive hybrid web and mobile application built for hotels to manage bookings, track check-ins/check-outs, manage room statuses, and view financial summary reports.',
  //   tech: ['Angular', 'Ionic', 'TypeScript', 'RxJS', 'Firebase'],
  //   features: ['Room Allocation & Status Tracking', 'Interactive Booking Calendar', 'Real-time Push Notifications', 'Dynamic PDF Billing & Reports'],
  //   image: 'hotel_mgmt',
  //   liveUrl: 'https://hotel-booking.ruchita.dev',
  //   githubUrl: 'https://github.com/ruchita-senjaliya/hotel-management-system'
  // },
  // {
  //   id: "proj-3",
  //   title: "Code Blogs",
  //   description:
  //     "A modern blog platform built with Next.js that showcases programming tutorials, frontend development concepts, and technical articles with a clean and responsive user experience.",
  //   tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
  //   features: [
  //     "Responsive and mobile-friendly design",
  //     "Dynamic blog post pages with optimized routing",
  //     "Fast page loading using Next.js App Router",
  //     "SEO-friendly structure for better search visibility",
  //     "Clean and modern UI built with Tailwind CSS",
  //     "Deployed on Vercel with continuous deployment",
  //   ],
  //   image: "code_blogs",
  //   liveUrl: "https://code-blogs-dusky.vercel.app/",
  //   githubUrl: "https://github.com/RuchitaSenjaliya/code-blogs",
  // },
  {
    id: "proj-4",
    title: "AgroSmart",
    description:
      "A robust mobile application built with React Native for farmers to list crops, coordinate order logistics directly with buyers, get weather alerts, and communicate via WhatsApp.",
    tech: ["React Native", "Expo", "Firebase", "Redux Toolkit", "WhatsApp API"],
    features: [
      "Agritech Product Listings & Inventory",
      "Direct Order Placement & Flow",
      "Push Notifications for Price Alerts",
      "One-Tap WhatsApp Buyer-Seller Chat",
    ],
    image: "agrosmart",
    liveUrl: "https://expo.dev/@ruchita/projects/agrosmart",
    githubUrl: "https://github.com/RuchitaSenjaliya/AgroSmart",
  },
];
