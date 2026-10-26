import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../../utils/audioFeedback';
import { X, Keyboard, Terminal, Layers, FolderGit2, Mail, Volume2 } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      const targetTag = (e.target as HTMLElement).tagName.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea') return;

      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        soundManager.playKeyClick();
        if (isOpen) onClose();
        else {
          // Open via parent
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      } else if (e.key === 't' || e.key === 'T') {
        soundManager.playKeyClick();
        onNavigate('terminal');
        onClose();
      } else if (e.key === 'p' || e.key === 'P') {
        soundManager.playKeyClick();
        onNavigate('projects');
        onClose();
      } else if (e.key === 'a' || e.key === 'A') {
        soundManager.playKeyClick();
        onNavigate('architecture');
        onClose();
      } else if (e.key === 'c' || e.key === 'C') {
        soundManager.playKeyClick();
        onNavigate('contact');
        onClose();
      } else if (e.key === 'm' || e.key === 'M') {
        soundManager.toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: 'T', action: 'Jump to Terminal CLI', icon: Terminal, section: 'terminal' },
    { key: 'P', action: 'Explore Projects (ResQ & GymOS)', icon: FolderGit2, section: 'projects' },
    { key: 'A', action: 'Inspect System Architecture', icon: Layers, section: 'architecture' },
    { key: 'C', action: 'Open Contact Form', icon: Mail, section: 'contact' },
    { key: 'M', action: 'Toggle Key Click Audio FX', icon: Volume2 },
    { key: 'Esc', action: 'Close modal overlay' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-2xl border border-[#283828] bg-[#101410] p-6 shadow-2xl font-mono text-xs text-[#F4F1EA]"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#212f21]">
          <div className="flex items-center gap-2 text-[#78F28B]">
            <Keyboard className="w-4 h-4" />
            <span className="font-bold">Keyboard Navigation Shortcuts</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#1a251a] text-[#8E928C] hover:text-[#78F28B]"
            aria-label="Close shortcuts modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-[#1b271b] my-4">
          {shortcuts.map((sc) => {
            const Icon = sc.icon || Keyboard;
            return (
              <div
                key={sc.key}
                onClick={() => {
                  if (sc.section) {
                    onNavigate(sc.section);
                    onClose();
                  }
                }}
                className={`py-2.5 flex items-center justify-between hover:bg-[#151d15] px-2 rounded cursor-pointer transition-colors ${
                  sc.section ? 'text-[#e5ece5]' : 'text-[#8E928C]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#78F28B]" />
                  <span>{sc.action}</span>
                </div>
                <kbd className="px-2 py-1 rounded bg-[#1c271c] border border-[#2b3c2b] text-[#78F28B] font-bold text-[11px]">
                  {sc.key}
                </kbd>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-[10px] text-[#556955] text-center">
          Press <kbd className="px-1.5 py-0.5 rounded bg-[#182318] border border-[#243324] text-[#78F28B]">?</kbd> anywhere to toggle this menu.
        </div>
      </motion.div>
    </div>
  );
};
