import React from 'react';
import { motion } from 'motion/react';
import { TIMELINE_ENTRIES } from '../../data/timeline';
import { GitCommit, GitBranch, Briefcase, Award, GraduationCap, Calendar } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[#233123] pb-6"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#78F28B] mb-2 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#78F28B]" />
            Timeline & Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4F1EA]">
            Education, Internship & Milestones
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#8E928C] max-w-md font-mono">
          Verified academic track record, enterprise virtual internship, and hackathon participation.
        </p>
      </motion.div>

      {/* Git-Inspired Timeline visual */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#243524] space-y-12">
        {TIMELINE_ENTRIES.map((entry, idx) => {
          let Icon = GitCommit;
          if (entry.type === 'education') Icon = GraduationCap;
          else if (entry.type === 'internship') Icon = Briefcase;
          else if (entry.type === 'hackathon') Icon = Award;
          else if (entry.type === 'milestone') Icon = GitBranch;

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#111611] border-2 border-[#78F28B] flex items-center justify-center text-[#78F28B] group-hover:bg-[#78F28B] group-hover:text-[#101510] transition-colors shadow-sm">
                <Icon className="w-3 h-3" />
              </div>

              {/* Card Container */}
              <div className="p-5 sm:p-6 rounded-2xl border border-[#273827] bg-[#121712] space-y-3 shadow-lg hover:border-[#3a523a] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#78F28B] px-2.5 py-0.5 rounded bg-[#1a291a] uppercase">
                      {entry.type}
                    </span>
                    <span className="text-sm font-bold text-[#F4F1EA] font-display">
                      {entry.organization}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#8E928C]">
                    <Calendar className="w-3.5 h-3.5 text-[#556955]" />
                    <span>{entry.date}</span>
                    {entry.commitHash && (
                      <span className="ml-2 text-[10px] text-[#78F28B] bg-[#172417] px-2 py-0.5 rounded font-mono">
                        {entry.commitHash}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#F4F1EA] font-mono">
                  {entry.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#9cb19c] font-sans leading-relaxed">
                  {entry.description}
                </p>

                {/* Bullet highlights */}
                {entry.highlights && (
                  <ul className="space-y-1 pt-1 text-xs text-[#8E928C] font-mono">
                    {entry.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#78F28B]">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#182218] text-[#93b393] border border-[#243324]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
