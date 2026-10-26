import React, { useState } from 'react';
import { PROJECTS } from '../../data/projects';
import { Project } from '../../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, Github, AlertCircle, QrCode, CheckCircle2, ShieldAlert, Layers } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Interactive Live Demo states for ResQ 2.0
  const [sosStatus, setSosStatus] = useState<'idle' | 'transmitting' | 'dispatched'>('idle');

  // Interactive Live Demo states for Day Night GymOS
  const [qrMemberStatus, setQrMemberStatus] = useState<{
    member: string;
    plan: string;
    valid: boolean;
    time: string;
  } | null>(null);

  const handleSimulateSos = () => {
    setSosStatus('transmitting');
    setTimeout(() => {
      setSosStatus('dispatched');
    }, 1200);
  };

  const handleSimulateScan = (name: string, plan: string, valid: boolean) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setQrMemberStatus({ member: name, plan, valid, time });
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[#233123] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#78F28B] mb-2 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#78F28B]" />
            Engineering Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4F1EA]">
            Featured Full-Stack Systems
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#8E928C] max-w-md font-mono">
          Real web application prototypes built with verified client-to-database contracts, clean APIs, and thoughtful interaction design.
        </p>
      </div>

      {/* Projects Showcase: 2 Rich Cards */}
      <div className="space-y-16">
        {/* Project 1: ResQ 2.0 */}
        <div className="rounded-3xl border border-[#273827] bg-[#121712] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10">
            {/* Left Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#213321] text-[#78F28B] border border-[#2e472e]">
                    Emergency Assistance Application
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono text-[#E5A84B] bg-[#2a2313] border border-[#44381e]">
                    Status: Working Prototype
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA]">
                  ResQ 2.0
                </h3>
                <p className="text-sm font-mono text-[#78F28B]">
                  Emergency assistance and healthcare service coordination
                </p>

                <p className="text-xs sm:text-sm text-[#a3b3a3] leading-relaxed">
                  ResQ 2.0 is an emergency assistance and healthcare coordination web application designed to connect users quickly with nearby medical services, emergency SOS suggestions, and hospital service request workflows.
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {PROJECTS[0].tags.map((tag) => (
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
                  onClick={() => setSelectedProject(PROJECTS[0])}
                  className="px-5 py-2.5 rounded-xl bg-[#78F28B] hover:bg-[#8df99e] text-[#101510] text-xs font-mono font-bold transition-all flex items-center gap-2 shadow cursor-pointer"
                >
                  <span>Detailed Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={PROJECTS[0].repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#192419] hover:bg-[#233223] text-[#F4F1EA] hover:text-[#78F28B] border border-[#2d3e2d] text-xs font-mono transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Prototype Preview */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="rounded-2xl border border-[#2b3a2b] bg-[#0c100c] p-5 shadow-inner font-mono text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#202c20]">
                  <div className="flex items-center gap-2 text-[#ff6b6b]">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="font-bold tracking-wider">RESQ 2.0 SOS TRIGGER</span>
                  </div>
                  <span className="text-[10px] text-[#556955]">SIMULATED CLIENT</span>
                </div>

                <div className="space-y-2 text-[#9ab09a]">
                  <div className="flex justify-between text-[11px]">
                    <span>Triage Channel:</span>
                    <span className="text-[#78F28B]">Priority High (Hospital Ingestion)</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span>GPS Coordinates:</span>
                    <span className="text-[#F4F1EA]">26.8524° N, 75.8231° E</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span>Target Endpoint:</span>
                    <span className="text-[#8E928C]">POST /api/sos/trigger</span>
                  </div>
                </div>

                {/* Simulated Emergency Dispatch Trigger Button */}
                <div className="pt-2">
                  <button
                    onClick={handleSimulateSos}
                    disabled={sosStatus === 'transmitting'}
                    className={`w-full py-3.5 rounded-xl font-bold font-mono text-xs transition-all flex items-center justify-center gap-2 ${
                      sosStatus === 'idle'
                        ? 'bg-red-700 hover:bg-red-600 text-white shadow-lg shadow-red-900/30'
                        : sosStatus === 'transmitting'
                        ? 'bg-[#293629] text-[#78F28B]'
                        : 'bg-[#182818] border border-[#78F28B] text-[#78F28B]'
                    }`}
                  >
                    {sosStatus === 'idle' && (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        <span>TRIGGER EMERGENCY SOS</span>
                      </>
                    )}
                    {sosStatus === 'transmitting' && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-[#78F28B] animate-ping" />
                        <span>INGESTING EVENT ON REST API...</span>
                      </>
                    )}
                    {sosStatus === 'dispatched' && (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#78F28B]" />
                        <span>DISPATCHED TO NEAREST UNIT (ID #DSP-948)</span>
                      </>
                    )}
                  </button>
                </div>

                {sosStatus === 'dispatched' && (
                  <div className="p-2.5 rounded bg-[#121c12] border border-[#223522] text-[11px] text-[#78F28B]">
                    ✓ Express controller recorded event in MongoDB (Latency: 42ms). Status: DISPATCH_PENDING.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project 2: Day Night GymOS */}
        <div className="rounded-3xl border border-[#273827] bg-[#121712] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10">
            {/* Left Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#213321] text-[#78F28B] border border-[#2e472e]">
                    Gym Management SaaS
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono text-[#78c2ad] bg-[#122822] border border-[#1b3f35]">
                    Status: In Development
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F1EA]">
                  Day Night GymOS
                </h3>
                <p className="text-sm font-mono text-[#78F28B]">
                  Gym management SaaS application & contactless QR check-in
                </p>

                <p className="text-xs sm:text-sm text-[#a3b3a3] leading-relaxed">
                  Day Night GymOS is a software project focused on digitizing gym management workflows, including exploration of attendance management and QR-based member interactions.
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {PROJECTS[1].tags.map((tag) => (
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
                  onClick={() => setSelectedProject(PROJECTS[1])}
                  className="px-5 py-2.5 rounded-xl bg-[#78F28B] hover:bg-[#8df99e] text-[#101510] text-xs font-mono font-bold transition-all flex items-center gap-2 shadow cursor-pointer"
                >
                  <span>Detailed Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={PROJECTS[1].repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#192419] hover:bg-[#233223] text-[#F4F1EA] hover:text-[#78F28B] border border-[#2d3e2d] text-xs font-mono transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Prototype Preview: QR Check-in Simulator */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="rounded-2xl border border-[#2b3a2b] bg-[#0c100c] p-5 shadow-inner font-mono text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#202c20]">
                  <div className="flex items-center gap-2 text-[#78F28B]">
                    <QrCode className="w-4 h-4" />
                    <span className="font-bold tracking-wider">GYMOS RECEPTION TERMINAL</span>
                  </div>
                  <span className="text-[10px] text-[#556955]">MEMBER CHECK-IN</span>
                </div>

                <p className="text-[11px] text-[#8E928C]">
                  Simulate scanning active or expired member credentials against the attendance verification logic:
                </p>

                {/* Sample Member Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSimulateScan('Aarav Sharma', 'Annual Plan', true)}
                    className="p-2.5 rounded-lg bg-[#152015] hover:bg-[#1d2d1d] border border-[#283828] text-left transition-colors"
                  >
                    <div className="text-[10px] text-[#78F28B]">Active Member</div>
                    <div className="text-xs text-[#F4F1EA] font-semibold">Aarav Sharma</div>
                    <div className="text-[10px] text-[#788e78]">Annual (Valid)</div>
                  </button>

                  <button
                    onClick={() => handleSimulateScan('Pooja Verma', 'Monthly Plan', false)}
                    className="p-2.5 rounded-lg bg-[#201717] hover:bg-[#2d1e1e] border border-[#3f2929] text-left transition-colors"
                  >
                    <div className="text-[10px] text-[#ff7b72]">Expired Member</div>
                    <div className="text-xs text-[#F4F1EA] font-semibold">Pooja Verma</div>
                    <div className="text-[10px] text-[#a57a7a]">Monthly (Overdue)</div>
                  </button>
                </div>

                {/* Attendance Result Feedback */}
                {qrMemberStatus && (
                  <div
                    className={`p-3 rounded-xl border text-[11px] space-y-1 ${
                      qrMemberStatus.valid
                        ? 'bg-[#121c12] border-[#294229] text-[#a7d6a7]'
                        : 'bg-[#211414] border-[#442323] text-[#f7a6a6]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>{qrMemberStatus.valid ? '✓ ACCESS GRANTED' : '✕ ACCESS DENIED'}</span>
                      <span className="text-[10px] font-mono">{qrMemberStatus.time}</span>
                    </div>
                    <div>Member: {qrMemberStatus.member} ({qrMemberStatus.plan})</div>
                    <div className="text-[10px] text-[#8E928C]">
                      {qrMemberStatus.valid
                        ? 'Entry recorded in MongoDB attendance_logs collection.'
                        : 'Rule triggered: Membership plan expired. Overdue reminder flagged.'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
