import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/audioFeedback';
import { Volume2, VolumeX, Keyboard, Radio, Clock, Cpu } from 'lucide-react';

interface DevStatusTickerProps {
  onOpenShortcuts: () => void;
}

export const DevStatusTicker: React.FC<DevStatusTickerProps> = ({ onOpenShortcuts }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.isMuted);

  useEffect(() => {
    const updateTime = () => {
      // Format India Standard Time (IST)
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playKeyClick();
    }
  };

  return (
    <div className="w-full bg-[#0a0d0a] border-y border-[#1c281c] py-2 px-4 sm:px-8 text-[11px] font-mono text-[#789078] flex flex-wrap items-center justify-between gap-3 select-none">
      {/* Left: Ticker Stats */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-[#F4F1EA]">
          <span className="w-2 h-2 rounded-full bg-[#78F28B] shadow-[0_0_6px_#78F28B] animate-pulse" />
          <span className="font-semibold">STATION ONLINE</span>
        </div>

        <div className="flex items-center gap-1 text-[#8E928C]">
          <Clock className="w-3.5 h-3.5 text-[#556955]" />
          <span>JAIPUR (IST): <strong className="text-[#a4cca4]">{currentTime || '12:00:00'}</strong></span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[#8E928C]">
          <Cpu className="w-3.5 h-3.5 text-[#556955]" />
          <span>HEAP: 48MB / 128MB • 60 FPS</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-[#8E928C]">
          <Radio className="w-3 h-3 text-[#78F28B]" />
          <span>BRANCH: <code className="text-[#78F28B]">main*</code> [v2.4.0]</span>
        </div>
      </div>

      {/* Right: Sound & Shortcuts Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleToggleAudio}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#131b13] hover:bg-[#1a251a] border border-[#233123] text-[#F4F1EA] hover:text-[#78F28B] transition-colors cursor-pointer"
          title="Toggle audio sound feedback"
          aria-label="Toggle audio effects"
        >
          {isMuted ? <VolumeX className="w-3 h-3 text-[#ff7b72]" /> : <Volume2 className="w-3 h-3 text-[#78F28B]" />}
          <span>{isMuted ? 'Muted' : 'Sound FX'}</span>
        </button>

        <button
          onClick={onOpenShortcuts}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#131b13] hover:bg-[#1a251a] border border-[#233123] text-[#F4F1EA] hover:text-[#78F28B] transition-colors cursor-pointer"
          title="View Keyboard Shortcuts"
          aria-label="View keyboard shortcuts"
        >
          <Keyboard className="w-3 h-3 text-[#78F28B]" />
          <span>Keys [?]</span>
        </button>
      </div>
    </div>
  );
};
