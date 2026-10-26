import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X, ArrowUpRight, Code, Github, Linkedin, Sparkles, Send } from 'lucide-react';
import { soundManager } from '../../utils/audioFeedback';
import { PROFILE } from '../../data/profile';

interface NavigationProps {
  onOpenTerminal?: () => void;
}

const NAV_LINKS = [
  { id: 'projects', label: 'Work', href: '#projects' },
  { id: 'architecture', label: 'Architecture', href: '#architecture' },
  { id: 'code-lab', label: 'Code Lab', href: '#code-lab' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const Navigation: React.FC<NavigationProps> = ({ onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('projects');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Scroll spy logic
      const sections = NAV_LINKS.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, id: string) => {
    soundManager.playKeyClick();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTerminalClick = () => {
    soundManager.playBootBeep();
    if (onOpenTerminal) {
      onOpenTerminal();
    } else {
      handleNavClick('#terminal', 'terminal');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-4">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 border ${
          isScrolled
            ? 'bg-[#101410]/85 backdrop-blur-xl border-[#293d29]/90 shadow-2xl shadow-black/60 px-3.5 sm:px-5 py-2'
            : 'bg-[#101410]/40 backdrop-blur-md border-[#223022]/60 px-3.5 sm:px-5 py-2.5'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('');
            }}
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#78F28B] rounded-xl p-1 -ml-1 transition-transform active:scale-95"
            aria-label="Shubham Vaishnav Portfolio Home"
          >
            {/* Terminal prompt symbol icon */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a261a] to-[#0f170f] border border-[#2c422c] flex items-center justify-center text-[#78F28B] group-hover:border-[#78F28B] group-hover:shadow-[0_0_12px_rgba(120,242,139,0.35)] transition-all">
              <Code className="w-4 h-4 transition-transform group-hover:scale-110" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xs sm:text-sm tracking-wider text-[#F4F1EA] group-hover:text-[#78F28B] transition-colors">
                  SHUBHAM VAISHNAV
                </span>
                {/* Active Availability Badge */}
                <span className="hidden xl:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#142614] border border-[#2b442b] text-[#78F28B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#78F28B] animate-pulse" />
                  <span>Available</span>
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#6b856b] -mt-0.5">
                Full-Stack Dev • JECRC '28
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Animated Pill Indicator */}
          <nav
            onMouseLeave={() => setHoveredLink(null)}
            className="hidden lg:flex items-center gap-1 bg-[#0b0f0b]/60 p-1 rounded-xl border border-[#1e2a1e]"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              const isHovered = hoveredLink === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href, link.id)}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer select-none ${
                    isActive
                      ? 'text-[#78F28B] font-bold'
                      : 'text-[#9eb59e] hover:text-[#F4F1EA]'
                  }`}
                >
                  {/* Floating active pill */}
                  {(isHovered || (isActive && !hoveredLink)) && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-[#192419] border border-[#2c442c] rounded-lg -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions & Shortcut Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Quick Profile Icons */}
            <div className="flex items-center gap-1 pr-2 border-r border-[#202e20]">
              <a
                href={PROFILE.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-[#8ba28b] hover:text-[#78F28B] hover:bg-[#162116] transition-colors"
                title="GitHub Profile (shubham734013)"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-[#8ba28b] hover:text-[#78F28B] hover:bg-[#162116] transition-colors"
                title="LinkedIn Profile (shubham-vaishnav)"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* CLI Terminal Shortcut Button */}
            <button
              onClick={handleTerminalClick}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#162216] border border-[#293d29] text-xs font-mono text-[#78F28B] hover:bg-[#1e2e1e] hover:border-[#78F28B]/60 transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Open Interactive Developer Terminal"
            >
              <Terminal className="w-3.5 h-3.5 group-hover:rotate-6 transition-transform" />
              <span>Terminal</span>
              <kbd className="hidden xl:inline-block px-1 py-0.2 rounded bg-[#0d140d] text-[9px] text-[#5e7d5e] border border-[#243524] font-sans">
                ~
              </kbd>
            </button>

            {/* Direct Contact Button */}
            <button
              onClick={() => handleNavClick('#contact', 'contact')}
              className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#78F28B] text-[#0f140f] text-xs font-mono font-bold hover:bg-[#8ef89f] transition-all shadow-md shadow-[#78F28B]/20 cursor-pointer active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={handleTerminalClick}
              className="p-2 rounded-xl bg-[#162216] border border-[#293d29] text-[#78F28B] hover:bg-[#1d2b1d] transition-colors"
              aria-label="Open Terminal"
              title="Interactive Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundManager.playKeyClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-[#162216] border border-[#293d29] text-[#F4F1EA] hover:text-[#78F28B] focus:outline-none transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#78F28B]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Expanded Drawer with Staggered Transition */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden lg:hidden pt-3 mt-3 border-t border-[#233523] space-y-2"
            >
              {/* Availability tag */}
              <div className="flex items-center justify-between px-2 py-1 text-xs font-mono text-[#78F28B] bg-[#142414] rounded-lg border border-[#243b24]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#78F28B] animate-pulse" />
                  <span>STATUS: AVAILABLE FOR INTERNSHIPS</span>
                </div>
                <span className="text-[10px] text-[#6b8b6b] font-sans">Jaipur, IN</span>
              </div>

              {/* Navigation items grid */}
              <div className="grid grid-cols-2 gap-1.5 py-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.href, link.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-left transition-all ${
                      activeSection === link.id
                        ? 'bg-[#1b2b1b] text-[#78F28B] font-bold border border-[#2f462f]'
                        : 'text-[#F4F1EA] hover:bg-[#162216] hover:text-[#78F28B]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] opacity-40">#</span>
                  </button>
                ))}
              </div>

              {/* Action Links */}
              <div className="pt-2 border-t border-[#202e20] flex items-center gap-2">
                <a
                  href={PROFILE.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-[#162216] border border-[#283b28] text-xs font-mono text-[#a2b5a2] hover:text-[#78F28B] flex items-center justify-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PROFILE.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-[#162216] border border-[#283b28] text-xs font-mono text-[#a2b5a2] hover:text-[#78F28B] flex items-center justify-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <button
                  onClick={() => handleNavClick('#contact', 'contact')}
                  className="flex-1 py-2 rounded-xl bg-[#78F28B] text-[#0e140e] text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-3 h-3" />
                  <span>Contact</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
