import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ownerInfo } from "@/data/contact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(ownerInfo.siteUrl),
  title: `${ownerInfo.name} | Professional ${ownerInfo.role} Portfolio`,
  description:
    `Passionate ${ownerInfo.role} with ${ownerInfo.experience} of experience specializing in React, React Native, Next.js, and TypeScript. Explore projects, skills, and professional certifications.`,
  keywords: [
    ownerInfo.name,
    ownerInfo.role,
    "React Developer",
    "React Native Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Portfolio Website",
  ],
  authors: [{ name: ownerInfo.name }],
  creator: ownerInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: ownerInfo.siteUrl,
    title: `${ownerInfo.name} | ${ownerInfo.role} Portfolio`,
    description:
      `Passionate ${ownerInfo.role} building scalable web & mobile applications using React, React Native, Next.js, and TypeScript.`,
    siteName: `${ownerInfo.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${ownerInfo.name} Portfolio Screenshot`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${ownerInfo.name} | ${ownerInfo.role}`,
    description:
      `Passionate ${ownerInfo.role} building scalable web & mobile apps.`,
    creator: ownerInfo.twitterHandle,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: ownerInfo.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash Dark/Light Mode Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }

                  const storedAccent = localStorage.getItem('accent-theme');
                  if (storedAccent) {
                    const accent = JSON.parse(storedAccent);
                    document.documentElement.style.setProperty('--primary', accent.primary);
                    document.documentElement.style.setProperty('--secondary', accent.secondary);
                    document.documentElement.style.setProperty('--primary-rgb', accent.primaryRgb);
                    document.documentElement.style.setProperty('--secondary-rgb', accent.secondaryRgb);
                    
                    const isDark = theme === 'dark';
                    document.documentElement.style.setProperty(
                      '--selection-bg',
                      isDark ? 'rgba(' + accent.secondaryRgb + ', 0.3)' : 'rgba(' + accent.primaryRgb + ', 0.15)'
                    );
                    document.documentElement.style.setProperty(
                      '--glow-1',
                      isDark ? 'rgba(' + accent.primaryRgb + ', 0.15)' : 'rgba(' + accent.primaryRgb + ', 0.1)'
                    );
                    document.documentElement.style.setProperty(
                      '--glow-2',
                      isDark ? 'rgba(' + accent.secondaryRgb + ', 0.15)' : 'rgba(' + accent.secondaryRgb + ', 0.1)'
                    );
                  }
                } catch (e) {
                  console.error('Theme injection error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
