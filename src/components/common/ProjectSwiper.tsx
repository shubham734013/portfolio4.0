import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Project } from '../../types/portfolio';
import { ArrowUpRight, Github, ShieldAlert, QrCode } from 'lucide-react';

interface ProjectSwiperProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  onSimulateSos: () => void;
  sosStatus: 'idle' | 'transmitting' | 'dispatched';
  onSimulateScan: (name: string, plan: string, valid: boolean) => void;
  qrMemberStatus: {
    member: string;
    plan: string;
    valid: boolean;
    time: string;
  } | null;
}

export const ProjectSwiper: React.FC<ProjectSwiperProps> = ({
  projects,
  onSelectProject,
  onSimulateSos,
  sosStatus,
  onSimulateScan,
  qrMemberStatus,
}) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="rounded-3xl !pb-12"
      >
        {projects.map((project, idx) => {
          const isResQ = project.id === 'resq-2';

          return (
            <SwiperSlide key={project.id}>
              <div className="rounded-3xl border border-[#273827] bg-[#121712] overflow-hidden shadow-2xl transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10">
                  {/* Left Narrative */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#213321] text-[#78F28B] border border-[#2e472e]">
                          {project.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono text-[#E5A84B] bg-[#2a2313] border border-[#44381e]">
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA]">
                        {project.title}
                      </h3>
                      <p className="text-sm font-mono text-[#78F28B]">
                        {project.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-[#a3b3a3] leading-relaxed">
                        {project.overview}
                      </p>

                      {/* Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#162016] text-[#b6cbb6] border border-[#233123]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#1e2a1e]">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="px-5 py-2.5 rounded-xl bg-[#78F28B] hover:bg-[#8df99e] text-[#101510] text-xs font-mono font-bold transition-all flex items-center gap-2 shadow cursor-pointer"
                      >
                        <span>Inspect Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#192419] hover:bg-[#233223] text-[#F4F1EA] hover:text-[#78F28B] border border-[#2d3e2d] text-xs font-mono transition-colors flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Interactive Prototype */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    {isResQ ? (
                      <div className="rounded-2xl border border-[#2b3a2b] bg-[#0c100c] p-5 shadow-inner font-mono text-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[#202c20]">
                          <div className="flex items-center gap-2 text-[#ff6b6b]">
                            <ShieldAlert className="w-4 h-4" />
                            <span className="font-bold tracking-wider">RESQ 2.0 PROTOCOL</span>
                          </div>
                          <span className="text-[10px] text-[#556955]">LIVE TRIGGER</span>
                        </div>

                        <div className="space-y-1.5 text-[11px] text-[#9ab09a]">
                          <div className="flex justify-between">
                            <span>Triage Priority:</span>
                            <span className="text-[#78F28B]">Immediate Dispatch</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Routing:</span>
                            <span className="text-[#F4F1EA]">Nearest Hospital Node</span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={onSimulateSos}
                            disabled={sosStatus === 'transmitting'}
                            className={`w-full py-3.5 rounded-xl font-bold font-mono text-xs transition-all flex items-center justify-center gap-2 ${
                              sosStatus === 'idle'
                                ? 'bg-red-700 hover:bg-red-600 text-white shadow-lg shadow-red-900/30'
                                : sosStatus === 'transmitting'
                                ? 'bg-[#293629] text-[#78F28B]'
                                : 'bg-[#182818] border border-[#78F28B] text-[#78F28B]'
                            }`}
                          >
                            {sosStatus === 'idle' && 'TRIGGER EMERGENCY SOS'}
                            {sosStatus === 'transmitting' && 'INGESTING TO EXPRESS REST API...'}
                            {sosStatus === 'dispatched' && '✓ DISPATCHED (LATENCY: 38ms)'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-[#2b3a2b] bg-[#0c100c] p-5 shadow-inner font-mono text-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[#202c20]">
                          <div className="flex items-center gap-2 text-[#78F28B]">
                            <QrCode className="w-4 h-4" />
                            <span className="font-bold tracking-wider">GYMOS RECEPTION</span>
                          </div>
                          <span className="text-[10px] text-[#556955]">QR CHECK-IN</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onSimulateScan('Aarav Sharma', 'Annual Plan', true)}
                            className="p-2.5 rounded-lg bg-[#152015] hover:bg-[#1d2d1d] border border-[#283828] text-left transition-colors"
                          >
                            <div className="text-[10px] text-[#78F28B]">Valid Member</div>
                            <div className="text-xs text-[#F4F1EA] font-semibold">Aarav S.</div>
                          </button>

                          <button
                            onClick={() => onSimulateScan('Pooja Verma', 'Monthly Plan', false)}
                            className="p-2.5 rounded-lg bg-[#201717] hover:bg-[#2d1e1e] border border-[#3f2929] text-left transition-colors"
                          >
                            <div className="text-[10px] text-[#ff7b72]">Overdue Member</div>
                            <div className="text-xs text-[#F4F1EA] font-semibold">Pooja V.</div>
                          </button>
                        </div>

                        {qrMemberStatus && (
                          <div
                            className={`p-3 rounded-xl border text-[11px] space-y-1 ${
                              qrMemberStatus.valid
                                ? 'bg-[#121c12] border-[#294229] text-[#a7d6a7]'
                                : 'bg-[#211414] border-[#442323] text-[#f7a6a6]'
                            }`}
                          >
                            <div className="font-bold">
                              {qrMemberStatus.valid ? '✓ ACCESS GRANTED' : '✕ ACCESS DENIED (PLAN EXPIRED)'}
                            </div>
                            <div>{qrMemberStatus.member} — {qrMemberStatus.plan}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
