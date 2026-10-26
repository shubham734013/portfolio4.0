import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight, Code } from 'lucide-react';

interface NavigationProps {
  onOpenTerminal?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Code Lab', href: '#code-lab' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#121512]/92 backdrop-blur-md border-b border-[#233123] shadow-md'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#78F28B] rounded-lg p-1"
            aria-label="Shubham Vaishnav Portfolio Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#182418] border border-[#2d402d] flex items-center justify-center text-[#78F28B] group-hover:border-[#78F28B] transition-colors">
              <Code className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-[#F4F1EA] group-hover:text-[#78F28B] transition-colors">
                SHUBHAM VAISHNAV
              </span>
              <span className="font-mono text-[10px] text-[#6b826b] -mt-0.5">
                Full-Stack Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#a2b5a2] hover:text-[#78F28B] hover:bg-[#182318] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action Button & Terminal Trigger */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => {
                if (onOpenTerminal) onOpenTerminal();
                else handleNavClick('#terminal');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#182418] border border-[#2b3d2b] text-xs font-mono text-[#78F28B] hover:bg-[#203020] transition-colors cursor-pointer"
              aria-label="Open Interactive Developer Terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI Terminal</span>
            </button>

            <button
              onClick={() => handleNavClick('#contact')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#78F28B] text-[#101510] text-xs font-mono font-bold hover:bg-[#8ef89f] transition-all shadow cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                if (onOpenTerminal) onOpenTerminal();
                else handleNavClick('#terminal');
              }}
              className="p-2 rounded-lg bg-[#182418] text-[#78F28B]"
              aria-label="Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#182418] text-[#F4F1EA] hover:text-[#78F28B] focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121612] border-b border-[#243324] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono text-[#F4F1EA] hover:bg-[#1a251a] hover:text-[#78F28B]"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#233123] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full py-2.5 rounded-lg bg-[#78F28B] text-[#101510] font-mono font-bold text-xs text-center"
            >
              Contact Shubham
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
