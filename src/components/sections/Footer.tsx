import React from 'react';
import { PROFILE } from '../../data/profile';
import { Code, Terminal, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#233123] bg-[#0c100c] text-xs font-mono text-[#8E928C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#1b251b]">
          {/* Brand */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#182318] border border-[#2e402e] flex items-center justify-center text-[#78F28B]">
                <Code className="w-3.5 h-3.5" />
              </div>
              <span className="font-display font-bold text-sm text-[#F4F1EA]">
                {PROFILE.name.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-[#5e745e]">
              Full-Stack Developer • BTech CSE @ JECRC University (Class of 2028)
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href={PROFILE.contact.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#78F28B] transition-colors"
            >
              GitHub
            </a>
            <span className="text-[#334433]">•</span>
            <a
              href={PROFILE.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#78F28B] transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-[#334433]">•</span>
            <a
              href={`mailto:${PROFILE.contact.email}`}
              className="hover:text-[#78F28B] transition-colors"
            >
              Email
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141b14] border border-[#253625] text-[#8E928C] hover:text-[#78F28B] hover:bg-[#1a241a] transition-all cursor-pointer self-start md:self-auto"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#556955]">
          <div>
            © {new Date().getFullYear()} Shubham Vaishnav. Engineered with React, Three.js & Tailwind CSS.
          </div>
          <div className="flex items-center gap-1">
            <span>Terminal Green:</span>
            <span className="text-[#78F28B]">#78F28B</span>
            <span className="ml-2">Status: Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
