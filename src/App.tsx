import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from './components/sections/Navigation';
import { HeroWorkstation } from './components/developer/HeroWorkstation';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ArchitectureDiagram } from './components/developer/ArchitectureDiagram';
import { CodeEditorPanel } from './components/developer/CodeEditorPanel';
import { InteractiveTerminal } from './components/developer/InteractiveTerminal';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { ScrollProgress } from './components/common/ScrollProgress';
import { DevStatusTicker } from './components/common/DevStatusTicker';
import { CrtBootLoader } from './components/common/CrtBootLoader';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';
import { useLenis } from './hooks/useLenis';

export default function App() {
  useLenis();
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [initialTerminalCmd, setInitialTerminalCmd] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Check if ?autostart=1 or if user previously completed boot in current session
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1' || sessionStorage.getItem('crt_booted') === 'true') {
      setIsBooting(false);
    }
  }, []);

  const handleBootComplete = () => {
    setIsBooting(false);
    sessionStorage.setItem('crt_booted', 'true');
  };

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTerminalWithCmd = (cmd?: string) => {
    if (cmd) setInitialTerminalCmd(cmd);
    handleNavigateToSection('terminal');
  };

  return (
    <div className="min-h-screen bg-[#121512] text-[#F4F1EA] selection:bg-[#78F28B] selection:text-[#101510] flex flex-col">
      {/* Creative 3D CRT Boot Sequence Loading Page */}
      <AnimatePresence>
        {isBooting && <CrtBootLoader onComplete={handleBootComplete} />}
      </AnimatePresence>

      {/* Sleek Hairline Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navigation Header */}
      <Navigation onOpenTerminal={() => handleOpenTerminalWithCmd('help')} />

      {/* Live Developer Telemetry Ticker */}
      <div className="pt-16 sm:pt-20">
        <DevStatusTicker onOpenShortcuts={() => setIsShortcutsOpen(true)} />
      </div>

      <main className="flex-grow">
        {/* Hero Section: The Developer Workstation with 3D CRT Monitor */}
        <HeroWorkstation onOpenTerminal={() => handleOpenTerminalWithCmd('npm run dev')} />

        {/* Featured Case Studies: ResQ 2.0 & Day Night GymOS */}
        <ProjectsSection />

        {/* Real Application Architecture Visualization */}
        <section id="architecture" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ArchitectureDiagram />
        </section>

        {/* Interactive Code Lab: Real Source Snippets & Tabs */}
        <section id="code-lab" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-[#233123] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#78F28B] mb-2 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#78F28B]" />
                Source Code Lab
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4F1EA]">
                Real Engineering Snippets
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8E928C] max-w-md font-mono">
              Inspect verified Express route controllers, Mongoose schemas, and React components from active repositories.
            </p>
          </div>

          <CodeEditorPanel />
        </section>

        {/* Developer Workstation Terminal Component */}
        <section id="terminal" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-[#233123] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#78F28B] mb-2 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#78F28B]" />
                Command Line Interface
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4F1EA]">
                Interactive Developer Terminal
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8E928C] max-w-md font-mono">
              Execute sandboxed development commands (<code className="text-[#78F28B]">git status</code>, <code className="text-[#78F28B]">npm run dev</code>, <code className="text-[#78F28B]">cat profile</code>) to explore my system.
            </p>
          </div>

          <InteractiveTerminal initialCommand={initialTerminalCmd} />
        </section>

        {/* About Me & Academic Education */}
        <AboutSection />

        {/* Categorized Technical Skills */}
        <SkillsSection />

        {/* Experience Timeline (Education, Xebia, Adobe Hackathon, Milestones) */}
        <ExperienceSection />

        {/* Certifications Section */}
        <CertificationsSection />

        {/* Contact Form & Professional Channels */}
        <ContactSection />
      </main>

      {/* Keyboard Shortcuts Overlay Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        onNavigate={handleNavigateToSection}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
