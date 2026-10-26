import React from 'react';
import { PROFILE } from '../../data/profile';
import { GraduationCap, Code, Compass, Terminal, Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#78F28B] mb-2 uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-[#78F28B]" />
        Professional Profile & Background
      </div>
      <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4F1EA] mb-8">
        Engineering Philosophy & Education
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editorial Summary */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl border border-[#273827] bg-[#121612] text-sm sm:text-base leading-relaxed text-[#c3d1c3] font-sans shadow-lg">
            <p className="first-letter:text-4xl first-letter:font-display first-letter:font-bold first-letter:text-[#78F28B] first-letter:mr-2 first-letter:float-left">
              {PROFILE.bio}
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-[#243324] bg-[#111711] space-y-2 font-mono">
              <div className="flex items-center gap-2 text-[#78F28B] text-xs font-bold">
                <Compass className="w-4 h-4" />
                <span>Architecture-First Thinking</span>
              </div>
              <p className="text-xs text-[#8E928C] font-sans leading-relaxed">
                Separating concerns across client presentation, REST routing, and MongoDB document schemas to ensure code remains maintainable and testable.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#243324] bg-[#111711] space-y-2 font-mono">
              <div className="flex items-center gap-2 text-[#78F28B] text-xs font-bold">
                <Cpu className="w-4 h-4" />
                <span>Practical Problem Solving</span>
              </div>
              <p className="text-xs text-[#8E928C] font-sans leading-relaxed">
                Building applications designed around real scenarios—whether coordinating urgent healthcare dispatch or organizing gym memberships without friction.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Academic Details & Centralized Config Info */}
        <div className="lg:col-span-5 space-y-6 font-mono">
          {/* Education Card */}
          <div className="p-6 rounded-2xl border border-[#273827] bg-[#131913] space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#212e21]">
              <div className="flex items-center gap-2 text-[#78F28B] text-xs font-bold">
                <GraduationCap className="w-4 h-4" />
                <span>FORMAL EDUCATION</span>
              </div>
              <span className="text-[11px] text-[#E5A84B] px-2 py-0.5 rounded bg-[#231e13]">
                2024 — 2028
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#F4F1EA] font-display">
                {PROFILE.education.institution}
              </h3>
              <div className="text-xs text-[#78F28B] mt-0.5 font-semibold">
                {PROFILE.education.degree} in {PROFILE.education.major}
              </div>
              <p className="text-[11px] text-[#8E928C] mt-2">
                Expected Graduation: {PROFILE.education.expectedGraduation}
              </p>
            </div>

            {/* Coursework Topics */}
            <div className="pt-3 border-t border-[#1f2c1f]">
              <div className="text-[10px] text-[#556955] uppercase tracking-wider mb-2 font-bold">
                Core Academic Focus:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PROFILE.education.focusAreas.map((area, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[10px] bg-[#1a231a] text-[#a4baa4] border border-[#273727]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dev Quote Card */}
          <div className="p-5 rounded-2xl border border-[#233123] bg-[#0c100c] text-xs text-[#78F28B] space-y-2 crt-screen-overlay">
            <div className="flex items-center gap-2 text-[#5b725b] text-[10px]">
              <Terminal className="w-3.5 h-3.5 text-[#78F28B]" />
              <span>DEVELOPER PRINCIPLE</span>
            </div>
            <p className="italic text-[#d6eed6]">
              "{PROFILE.devQuote}"
            </p>
            <div className="text-[10px] text-[#5b725b] text-right">— Shubham Vaishnav</div>
          </div>
        </div>
      </div>
    </section>
  );
};
