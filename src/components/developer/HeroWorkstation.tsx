import React, { useState } from 'react';
import { VintageCrtScene } from '../3d/VintageCrtScene';
import { PROFILE } from '../../data/profile';
import { ArrowDown, Code2, Terminal, ExternalLink, Sparkles, Database } from 'lucide-react';

interface HeroWorkstationProps {
  onOpenTerminal?: () => void;
}

export const HeroWorkstation: React.FC<HeroWorkstationProps> = ({ onOpenTerminal }) => {
  const [activePresetNotice, setActivePresetNotice] = useState<string>('ResQ 2.0 Dispatch');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Subtle Grid & CRT Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f2e1f_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

      {/* Main Grid: Left Identity & Right 3D CRT Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Personal Brand, Title, Bio & Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Engineering Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151c15] border border-[#273827] text-xs font-mono text-[#8E928C]">
            <span className="w-2 h-2 rounded-full bg-[#78F28B] shadow-sm shadow-[#78F28B]" />
            <span className="text-[#F4F1EA] font-medium">BTech CSE @ JECRC University</span>
            <span className="text-[#556955]">• '28</span>
          </div>

          {/* Name & Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#F4F1EA] leading-[1.08]">
              SHUBHAM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#78F28B] to-[#9effab]">
                VAISHNAV
              </span>
            </h1>
            <div className="flex items-center gap-2 text-lg sm:text-xl font-mono text-[#78F28B] pt-1">
              <span>Full-Stack Developer</span>
              <span className="text-[#435243]">/</span>
              <span className="text-xs text-[#8E928C] font-normal uppercase tracking-wider">Software Builder</span>
            </div>
          </div>

          {/* Bio copy grounded in user profile */}
          <p className="text-sm sm:text-base text-[#9ea39d] leading-relaxed max-w-xl">
            Building practical web systems, emergency assistance software, and developer tools with modern TypeScript, Node.js, and React. Focused on clean architecture, resilient data contracts, and user-centered solutions.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-5 py-3 rounded-xl bg-[#78F28B] text-[#101510] font-mono text-xs sm:text-sm font-bold hover:bg-[#8bf79c] transition-all flex items-center gap-2 shadow-lg shadow-[#78F28B]/10 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-3 rounded-xl bg-[#182018] text-[#F4F1EA] hover:text-[#78F28B] hover:bg-[#202c20] border border-[#2b3a2b] font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              Contact Me
            </button>

            <button
              onClick={() => {
                if (onOpenTerminal) onOpenTerminal();
                else scrollToSection('terminal');
              }}
              className="px-4 py-3 rounded-xl bg-transparent text-[#8E928C] hover:text-[#78F28B] font-mono text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-[#78F28B]" />
              <span>Terminal CLI</span>
            </button>
          </div>

          {/* Core Technical Highlights Matrix */}
          <div className="pt-4 border-t border-[#202920] grid grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-[#141a14] border border-[#212d21]">
              <div className="text-[#556b55] text-[10px]">FRONTEND</div>
              <div className="text-[#F4F1EA] font-semibold mt-0.5">React & TS</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#141a14] border border-[#212d21]">
              <div className="text-[#556b55] text-[10px]">BACKEND</div>
              <div className="text-[#F4F1EA] font-semibold mt-0.5">Node.js & REST</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#141a14] border border-[#212d21]">
              <div className="text-[#556b55] text-[10px]">DATABASE</div>
              <div className="text-[#F4F1EA] font-semibold mt-0.5">MongoDB</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Vintage CRT Monitor Centerpiece */}
        <div className="lg:col-span-7 relative flex flex-col items-center">
          {/* Subtle Top Spec Label */}
          <div className="w-full flex items-center justify-between mb-2 px-2 text-[11px] font-mono text-[#5f745f]">
            <div className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#78F28B]" />
              <span>DISPLAY: 3D VINTAGE CRT // PHOSPHOR SCREEN</span>
            </div>
            <span className="text-[#78F28B] bg-[#162116] px-2 py-0.5 rounded border border-[#253525]">
              Active: {activePresetNotice}
            </span>
          </div>

          {/* The 3D Scene Viewport */}
          <div className="w-full relative rounded-2xl border border-[#263726] bg-[#0c100c] shadow-2xl overflow-hidden">
            <VintageCrtScene onCodePresetChange={(name) => setActivePresetNotice(name)} />
          </div>

          {/* Secondary Floating Engineering Annotation Card */}
          <div className="w-full mt-4 p-3 rounded-xl bg-[#141a14]/90 border border-[#253525] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#8E928C]">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#78F28B] shrink-0" />
              <span>
                Verified Full-Stack Projects: <strong className="text-[#F4F1EA]">ResQ 2.0</strong> & <strong className="text-[#F4F1EA]">Day Night GymOS</strong>
              </span>
            </div>
            <a
              href="https://github.com/shubham734013"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#78F28B] hover:underline whitespace-nowrap self-start sm:self-auto"
            >
              <span>github.com/shubham734013</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
