import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ruchita.dev'),
  title: 'Ruchita Senjaliya | Professional Frontend Developer Portfolio',
  description: 'Passionate Frontend Developer with 2+ years of experience specializing in React, React Native, Angular, Ionic, Next.js, and TypeScript. Explore projects, skills, and professional certifications.',
  keywords: [
    'Ruchita Senjaliya',
    'Frontend Developer',
    'React Developer',
    'React Native Developer',
    'Angular Developer',
    'Ionic Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Portfolio Website'
  ],
  authors: [{ name: 'Ruchita Senjaliya' }],
  creator: 'Ruchita Senjaliya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ruchita.dev',
    title: 'Ruchita Senjaliya | Frontend Developer Portfolio',
    description: 'Passionate Frontend Developer building scalable web & mobile applications using React, React Native, Angular, Next.js, and TypeScript.',
    siteName: 'Ruchita Senjaliya Portfolio',
    images: [
      {
        url: '/og-image.png', // Fallback or general og-image. If we don't have it, it is fine
        width: 1200,
        height: 630,
        alt: 'Ruchita Senjaliya Portfolio Screenshot'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruchita Senjaliya | Frontend Developer',
    description: 'Passionate Frontend Developer building scalable web & mobile apps.',
    creator: '@ruchita_senjaliya',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: 'https://ruchita.dev'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`} suppressHydrationWarning>
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
