import React, { useState } from 'react';
import { Project } from '../../types/portfolio';
import { X, ExternalLink, Github, CheckCircle2, Clock, AlertTriangle, Layers, Database, Shield, Cpu } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#101410] border border-[#273827] rounded-2xl shadow-2xl overflow-y-auto flex flex-col text-[#F4F1EA]">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#141a14]/95 border-b border-[#233323] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#1e2c1e] text-[#78F28B] border border-[#2c3d2c]">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#8E928C]">
              {project.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#182318] hover:bg-[#253725] text-[#8E928C] hover:text-[#78F28B] transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8 font-mono">
          {/* Title & Tagline */}
          <div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-display font-extrabold text-[#F4F1EA]">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#78F28B] mt-1 font-mono">
              {project.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#9ea99e] mt-3 leading-relaxed font-sans">
              {project.overview}
            </p>
          </div>

          {/* Quick Stats Grid */}
          {project.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.stats.map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#141b14] border border-[#223122]">
                  <div className="text-[10px] text-[#6b826b] uppercase">{s.label}</div>
                  <div className="text-xs font-bold text-[#F4F1EA] mt-1">{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Problem & Contribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[#131913] border border-[#223022] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ffb703]">
                <AlertTriangle className="w-4 h-4" />
                <span>The Challenge / Problem Statement</span>
              </div>
              <p className="text-xs text-[#9eb09e] leading-relaxed font-sans">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#131913] border border-[#223022] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#78F28B]">
                <Cpu className="w-4 h-4" />
                <span>My Architectural Contribution</span>
              </div>
              <p className="text-xs text-[#9eb09e] leading-relaxed font-sans">
                {project.myContribution}
              </p>
            </div>
          </div>

          {/* Verified Multi-tier Solution Architecture */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#F4F1EA]">
              <Layers className="w-4 h-4 text-[#78F28B]" />
              <span>Full-Stack Architecture Contracts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#141b14] border border-[#202e20]">
                <div className="text-[#78F28B] font-semibold">1. Client / Frontend</div>
                <p className="text-[#8E928C] mt-1 text-[11px] font-sans">
                  {project.solutionArchitecture.frontendLayer}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#141b14] border border-[#202e20]">
                <div className="text-[#78F28B] font-semibold">2. API Gateway</div>
                <p className="text-[#8E928C] mt-1 text-[11px] font-sans">
                  {project.solutionArchitecture.apiLayer}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#141b14] border border-[#202e20]">
                <div className="text-[#78F28B] font-semibold">3. Server & Logic</div>
                <p className="text-[#8E928C] mt-1 text-[11px] font-sans">
                  {project.solutionArchitecture.backendLayer}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#141b14] border border-[#202e20]">
                <div className="text-[#78F28B] font-semibold">4. MongoDB Schema</div>
                <p className="text-[#8E928C] mt-1 text-[11px] font-sans">
                  {project.solutionArchitecture.databaseLayer}
                </p>
              </div>
            </div>
          </div>

          {/* Code Snippets Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F4F1EA]">
                <Database className="w-4 h-4 text-[#78F28B]" />
                <span>Verified Source Code Snippet</span>
              </div>
              <div className="flex gap-2">
                {project.codeSnippets.map((cs, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSnippetIdx(idx)}
                    className={`px-2 py-1 rounded text-[11px] transition-colors ${
                      activeSnippetIdx === idx
                        ? 'bg-[#78F28B] text-[#101510] font-bold'
                        : 'bg-[#182318] text-[#8E928C] hover:text-[#d0ded0]'
                    }`}
                  >
                    {cs.filename}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#243324] bg-[#0c100c] p-4 text-xs overflow-x-auto">
              <div className="text-[11px] text-[#6b826b] pb-2 mb-2 border-b border-[#1c291c]">
                {project.codeSnippets[activeSnippetIdx].description}
              </div>
              <pre className="text-[#78F28B] font-mono text-[11px] leading-relaxed whitespace-pre">
                {project.codeSnippets[activeSnippetIdx].code}
              </pre>
            </div>
          </div>

          {/* Implemented vs Planned vs Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Implemented */}
            <div className="p-4 rounded-xl bg-[#131b13] border border-[#213021] space-y-2">
              <div className="flex items-center gap-2 text-[#78F28B] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Implemented & Verified Features</span>
              </div>
              <ul className="space-y-1.5 text-[#9cb09c] font-sans">
                {project.implementedFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#78F28B] font-mono">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Limitations & Future Roadmap */}
            <div className="p-4 rounded-xl bg-[#151715] border border-[#2d2929] space-y-3">
              <div>
                <div className="flex items-center gap-2 text-[#E5A84B] font-bold mb-1.5">
                  <Clock className="w-4 h-4" />
                  <span>Current Limitations & Sandbox Scope</span>
                </div>
                <ul className="space-y-1.5 text-[#a89b9b] font-sans">
                  {project.currentLimitations.map((l, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#E5A84B] font-mono">•</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[#252222]">
                <div className="text-[#78F28B] font-bold text-[11px] mb-1">
                  Upcoming Roadmap:
                </div>
                <ul className="space-y-1 text-[#8E928C] font-sans text-[11px]">
                  {project.plannedFeatures.map((pf, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#78F28B] font-mono">→</span>
                      <span>{pf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Links & Close */}
          <div className="flex items-center justify-between pt-4 border-t border-[#202e20]">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b251b] hover:bg-[#253525] text-[#78F28B] border border-[#2b3c2b] text-xs font-bold transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Inspect on GitHub</span>
            </a>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#78F28B] text-[#101510] text-xs font-bold hover:bg-[#8bf79c] transition-colors"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
