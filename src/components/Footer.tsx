'use client';

import { smoothScrollToElement } from '@/utils/helper';
import { ownerInfo, socialLinks } from '@/data/contact';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    smoothScrollToElement(targetId, 80);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card-bg border-t border-card-border/80 py-16 relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px] bg-gradient-to-t from-primary/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-between">
          
          {/* Brand/Name info */}
          <div className="text-center md:text-left">
            <h2 
              onClick={handleScrollToTop}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer inline-block tracking-wider"
            >
              {ownerInfo.name}
            </h2>
            <p className="text-xs text-foreground/50 mt-2 font-medium tracking-wide">
              {ownerInfo.role} & Mobile App Engineer
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-semibold text-foreground/60 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex justify-center md:justify-end items-center gap-5">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-full bg-background border border-card-border/60 hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all duration-300 cursor-pointer"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-card-border/60 w-full my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-foreground/45 gap-4">
          <p>© {currentYear} {ownerInfo.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <span>Designed & Engineered with</span>
            <span className="text-red-500 font-bold">♥</span>
            <span>in {ownerInfo.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
