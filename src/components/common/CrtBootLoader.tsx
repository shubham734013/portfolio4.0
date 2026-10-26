import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/audioFeedback';
import { Volume2, VolumeX, FastForward, Activity } from 'lucide-react';

interface CrtBootLoaderProps {
  onComplete: () => void;
}

interface BootStep {
  text: string;
  subtext?: string;
  code?: string;
  type: 'info' | 'success' | 'warn' | 'accent';
}

const BOOT_SEQUENCE: BootStep[] = [
  { text: 'ROM-BIOS v3.8.0-PRO (C) 1988-2026 WORKSTATION ARCHITECTURE', type: 'info' },
  { text: 'INITIALIZING HARDWARE BUS & BUS FREQUENCY (4.80 GHz)', code: '0x00FF', type: 'info' },
  { text: '3D WebGL GRAPHICS PIPELINE ........................... [MOUNTED]', subtext: 'Retro Cream CRT Shader & Curved Screen Mesh initialized', type: 'success' },
  { text: 'VERIFYING FULL-STACK REPOSITORIES ..................... [VERIFIED]', subtext: 'ResQ 2.0 (Emergency SOS) & Day Night GymOS (QR SaaS)', type: 'success' },
  { text: 'LOADING DEVELOPER PROFILE ............................. [SUCCESS]', subtext: 'Shubham Vaishnav // BTech CSE @ JECRC University (2028)', type: 'accent' },
  { text: 'ESTABLISHING CLIENT TELEMETRY & AUDIO SYNTHESIZER ..... [READY]', code: 'WebAudio + Lenis', type: 'info' },
  { text: 'SYSTEM KERNEL ONLINE. LAUNCHING WORKSPACE ENVIRONMENT .. [OK]', type: 'success' },
];

export const CrtBootLoader: React.FC<CrtBootLoaderProps> = ({ onComplete }) => {
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [currentTypingText, setCurrentTypingText] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.isMuted);
  const [isPoweringOff, setIsPoweringOff] = useState<boolean>(false);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);

  useEffect(() => {
    // If ?autostart=1 query param is present, skip immediately
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      onComplete();
      return;
    }

    // Play startup power-on chime
    soundManager.playBootBeep();

    let stepIndex = 0;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (stepIndex >= BOOT_SEQUENCE.length) {
        setProgress(100);
        timeoutId = setTimeout(() => {
          handleLaunch();
        }, 600);
        return;
      }

      const activeStep = BOOT_SEQUENCE[stepIndex];
      const fullText = activeStep.text;

      if (charIndex < fullText.length) {
        setCurrentTypingText(fullText.slice(0, charIndex + 1));
        charIndex += 2; // Fast, snappy typing cadence
        if (charIndex % 4 === 0) {
          soundManager.playKeyClick();
        }
        timeoutId = setTimeout(typeNextChar, 14);
      } else {
        // Step finished typing
        stepIndex++;
        charIndex = 0;
        setCompletedSteps(stepIndex);
        setCurrentTypingText('');
        const calcProgress = Math.min(100, Math.round((stepIndex / BOOT_SEQUENCE.length) * 100));
        setProgress(calcProgress);

        // Micro CRT scan glitch on major steps
        if (stepIndex === 3 || stepIndex === 5) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 90);
        }

        timeoutId = setTimeout(typeNextChar, 80);
      }
    };

    timeoutId = setTimeout(typeNextChar, 200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        handleLaunch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleLaunch = () => {
    if (isPoweringOff) return;
    soundManager.playBootBeep();
    setIsPoweringOff(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isPoweringOff ? { opacity: 0, scale: 1.08, filter: 'blur(8px)' } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#080b08] flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden"
    >
      {/* Background ambient CRT phosphor glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(120,242,139,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Retro Cream Workstation Monitor Chassis */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-3xl bg-[#ded5c0] rounded-[2rem] p-5 sm:p-7 md:p-8 border-4 border-[#c7bc9f] shadow-[0_30px_90px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.45)] flex flex-col"
      >
        {/* Chassis Top Bar: Air vents & Retro OEM Badge */}
        <div className="w-full flex items-center justify-between pb-3 sm:pb-4 border-b border-[#c2b79e] text-[#6d6452] font-mono text-xs">
          <div className="flex items-center gap-2.5">
            {/* Terracotta power switch accent */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#b65b3d] shadow-inner border border-[#9b4a30] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e88869] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-widest text-[#2c2619] text-[11px] sm:text-xs">
                SHUBHAM_OS // WORKSTATION PRO-28
              </span>
              <span className="text-[9px] text-[#786e58] hidden sm:inline">
                ROM-BIOS v3.8.0 • 3D GRAPHICS ACCELERATED
              </span>
            </div>
          </div>

          {/* Cooling Vents pattern */}
          <div className="hidden md:flex items-center gap-1 opacity-45">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="w-1 h-3.5 rounded-full bg-[#a3977c]" />
            ))}
          </div>

          {/* Controls & Sound toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#cbbfab] hover:bg-[#baad97] text-[#2c2619] text-[11px] font-bold transition-colors cursor-pointer"
              title={isMuted ? 'Unmute procedural sound FX' : 'Mute audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-700" /> : <Volume2 className="w-3.5 h-3.5 text-[#1e5a26]" />}
              <span>{isMuted ? 'MUTED' : 'AUDIO ON'}</span>
            </button>
            <span className="px-2 py-0.5 rounded bg-[#cbbfab] text-[10px] font-bold text-[#443b2a]">
              JAIPUR-NODE
            </span>
          </div>
        </div>

        {/* Curved CRT Screen Bezel Housing */}
        <div className="relative w-full my-3 sm:my-4 rounded-2xl bg-[#070b07] border-4 border-[#162116] p-4 sm:p-6 min-h-[320px] sm:min-h-[360px] overflow-hidden flex flex-col justify-between shadow-[inset_0_10px_30px_rgba(0,0,0,0.95)]">
          {/* Glass reflection gloss glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none z-20" />
          
          {/* Scanline raster overlay */}
          <div className={`absolute inset-0 crt-screen-overlay pointer-events-none z-10 ${glitchActive ? 'opacity-80 translate-x-0.5' : 'opacity-40'}`} />

          {/* Screen Top Header Bar */}
          <div className="relative z-10 flex items-center justify-between pb-2 mb-3 border-b border-[#1b2b1b] text-[10px] font-mono text-[#527a52]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#78F28B] animate-ping" />
              <span className="text-[#78F28B] font-bold">CRT_TERMINAL_STREAM</span>
              <span>// 80x25 TEXT-MODE</span>
            </div>
            <div className="flex items-center gap-3">
              <span>RAM: 64MB OK</span>
              <span>VRAM: 16MB OK</span>
              <span className="text-[#78F28B]">{progress}%</span>
            </div>
          </div>

          {/* Real-time CRT Boot Log Stream */}
          <div className="relative z-10 flex-grow font-mono text-[11px] sm:text-xs leading-relaxed space-y-1.5 overflow-hidden">
            {/* Previously completed steps */}
            {BOOT_SEQUENCE.slice(0, completedSteps).map((step, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex items-start gap-2">
                  <span className="text-[#3b5e3b] select-none">{String(idx + 1).padStart(2, '0')}&gt;</span>
                  <span
                    className={
                      step.type === 'accent'
                        ? 'text-[#F4F1EA] font-bold'
                        : step.type === 'success'
                        ? 'text-[#78F28B] font-semibold'
                        : 'text-[#92c592]'
                    }
                  >
                    {step.text}
                  </span>
                </div>
                {step.subtext && (
                  <p className="ml-7 text-[10px] text-[#558055] font-sans">
                    ↳ {step.subtext}
                  </p>
                )}
              </div>
            ))}

            {/* Currently actively typing step */}
            {completedSteps < BOOT_SEQUENCE.length && (
              <div className="flex items-start gap-2 text-[#78F28B]">
                <span className="text-[#3b5e3b] select-none">{String(completedSteps + 1).padStart(2, '0')}&gt;</span>
                <span>
                  {currentTypingText}
                  <span className="inline-block w-2 h-3.5 ml-1 bg-[#78F28B] animate-pulse align-middle" />
                </span>
              </div>
            )}
          </div>

          {/* CRT Screen Bottom Diagnostics & Progress Bar */}
          <div className="relative z-10 pt-3 border-t border-[#162516] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-2 text-[#5e875e]">
                <Activity className="w-3.5 h-3.5 text-[#78F28B] animate-pulse" />
                <span>COMPILING WORKSTATION ENGINE:</span>
              </div>
              <span className="text-[#78F28B] font-bold tracking-wider">{progress}%</span>
            </div>

            {/* Glowing Segmented Phosphor Progress Bar */}
            <div className="w-full h-2.5 rounded bg-[#0e160e] border border-[#233823] p-0.5 overflow-hidden relative">
              <motion.div
                className="h-full rounded-sm bg-gradient-to-r from-[#3da84f] via-[#78F28B] to-[#baffc2] shadow-[0_0_10px_#78F28B]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>

        {/* Chassis Lower Console: Hardware Knobs, Indicator & Action Buttons */}
        <div className="w-full flex items-center justify-between pt-2 text-[#6d6452] font-mono text-xs">
          {/* Dual Rotary Control Knobs + Power LED */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${progress === 100 ? 'bg-[#78F28B] shadow-[0_0_8px_#78F28B]' : 'bg-[#e2694b]'} animate-pulse`} />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#443a28]">
                {progress === 100 ? 'POST OK // READY' : 'BOOTING...'}
              </span>
            </div>

            {/* Realistic Physical Volume & Brightness Knobs */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#bfb49d] border border-[#9b907a] shadow-inner flex items-center justify-center">
                  <span className="w-0.5 h-2 bg-[#443a28] rounded-full rotate-45" />
                </div>
                <span className="text-[8px] text-[#7d735e] mt-0.5">BRIGHT</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#bfb49d] border border-[#9b907a] shadow-inner flex items-center justify-center">
                  <span className="w-0.5 h-2 bg-[#443a28] rounded-full -rotate-12" />
                </div>
                <span className="text-[8px] text-[#7d735e] mt-0.5">CONTRAST</span>
              </div>
            </div>
          </div>

          {/* Interactive Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLaunch}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer shadow-sm ${
                progress === 100
                  ? 'bg-[#78F28B] text-[#0f140f] hover:bg-[#8efaa0] shadow-[0_0_15px_rgba(120,242,139,0.4)] animate-bounce'
                  : 'bg-[#cbbfab] hover:bg-[#baad97] text-[#2c2619]'
              }`}
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>{progress === 100 ? 'ENTER WORKSPACE [SPACE]' : 'Skip Intro [Enter]'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Screen Glare Ambient Reflection on Ground */}
      <div className="w-64 h-3 bg-[#78F28B]/10 blur-xl rounded-full mt-4" />
    </motion.div>
  );
};
