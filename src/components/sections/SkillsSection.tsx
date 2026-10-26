import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES, DEVELOPMENT_FOCUS_AREAS } from '../../data/skills';
import { Layers, Network, Database, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const focusIcons = [Layers, Network, Database];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-[#233123] pb-6"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#78F28B] mb-2 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#78F28B]" />
            Technical Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4F1EA]">
            Skills Grounded in Real Projects
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#8E928C] max-w-md font-mono">
          Structured by production use cases in ResQ 2.0 and Day Night GymOS. No arbitrary percentage bars.
        </p>
      </motion.div>

      {/* Focus Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {DEVELOPMENT_FOCUS_AREAS.map((area, idx) => {
          const Icon = focusIcons[idx] || Layers;
          return (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl border border-[#273827] bg-[#121812] space-y-2 hover:border-[#385238] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1a251a] border border-[#2d402d] flex items-center justify-center text-[#78F28B]">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-sm text-[#F4F1EA]">
                {area.title}
              </h3>
              <p className="text-xs text-[#8E928C] leading-relaxed">
                {area.summary}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Categorized Skills Tabbed Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-[#273827] bg-[#101410] overflow-hidden shadow-xl"
      >
        {/* Category Tabs */}
        <div className="flex items-center gap-1 p-2 bg-[#141b14] border-b border-[#212f21] overflow-x-auto relative">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap cursor-pointer z-10 ${
                activeCategoryIndex === idx ? 'text-[#78F28B] font-bold' : 'text-[#8E928C] hover:text-[#d3e2d3]'
              }`}
            >
              {activeCategoryIndex === idx && (
                <motion.span
                  layoutId="skillTab"
                  className="absolute inset-0 rounded-xl bg-[#223322] border border-[#2f422f] -z-10 shadow"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                />
              )}
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-xs sm:text-sm text-[#8E928C] font-mono">
            {SKILL_CATEGORIES[activeCategoryIndex].description}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategoryIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {SKILL_CATEGORIES[activeCategoryIndex].items.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 rounded-xl border border-[#223122] bg-[#131913] space-y-2 hover:border-[#385038] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#78F28B]" />
                      <h4 className="font-bold text-sm text-[#F4F1EA] font-mono">
                        {skill.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1b261b] text-[#78F28B]">
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-xs text-[#9eb09e] leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="pt-2 border-t border-[#1d291d] flex items-center gap-1.5 text-[10px] font-mono text-[#617761]">
                    <span>In:</span>
                    <div className="flex flex-wrap gap-1">
                      {skill.projectsUsedIn.map((proj, pIdx) => (
                        <span key={pIdx} className="text-[#a4c2a4] bg-[#192419] px-1.5 py-0.5 rounded">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
