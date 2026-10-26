import React, { useState, useRef, useEffect } from 'react';
import { executeTerminalCommand, TerminalOutputLine } from '../../utils/terminalLogic';
import { Terminal, Copy, Check, CornerDownLeft, Sparkles } from 'lucide-react';

interface InteractiveTerminalProps {
  initialCommand?: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ initialCommand }) => {
  const [history, setHistory] = useState<TerminalOutputLine[]>([
    { id: '1', type: 'system', content: 'Shubham Vaishnav Developer Workstation Terminal [v2.4.0]' },
    { id: '2', type: 'system', content: 'Host: JECRC-CSE-2028 | Kernel: Linux x86_64 | Session: zsh' },
    { id: '3', type: 'output', content: 'Type "help" to view available developer commands, or "projects" to inspect repositories.' },
    { id: '4', type: 'input', content: '$ git status' },
    { id: '5', type: 'success', content: 'On branch main: all services operational (ResQ 2.0 & Day Night GymOS)' }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialCommand) {
      handleRunCommand(initialCommand);
    }
  }, [initialCommand]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleRunCommand = (cmdText: string) => {
    const { newLines, shouldClear } = executeTerminalCommand(cmdText, history);
    if (shouldClear) {
      setHistory([
        { id: `init-${Date.now()}`, type: 'system', content: 'Terminal display cleared. Type "help" for options.' }
      ]);
    } else {
      setHistory(prev => [...prev, ...newLines]);
    }
    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleRunCommand(inputValue);
  };

  const handleCopyHistory = () => {
    const plainText = history.map(h => h.content).join('\n');
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSuggestionClick = (cmd: string) => {
    handleRunCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full rounded-xl border border-[#2a382a] bg-[#0c100c] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141a14] border-b border-[#233023] select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 inline-block" />
          </div>
          <span className="ml-2 font-mono text-xs text-[#8E928C] flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#78F28B]" />
            shubham@workstation:~ (zsh)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHistory}
            className="flex items-center gap-1 text-[11px] text-[#8E928C] hover:text-[#78F28B] transition-colors px-2 py-0.5 rounded hover:bg-[#1a231a]"
            title="Copy terminal buffer"
            aria-label="Copy terminal buffer"
          >
            {copied ? <Check className="w-3 h-3 text-[#78F28B]" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1c291c] text-[#78F28B] font-semibold">
            Interactive
          </span>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div ref={containerRef} className="p-4 sm:p-5 h-72 sm:h-80 overflow-y-auto space-y-1.5 crt-screen-overlay">
        {history.map((line) => {
          let colorClass = 'text-[#d6dfd6]';
          if (line.type === 'input') colorClass = 'text-[#78F28B] font-semibold';
          else if (line.type === 'system') colorClass = 'text-[#6b856b]';
          else if (line.type === 'success') colorClass = 'text-[#78F28B]';
          else if (line.type === 'error') colorClass = 'text-[#ff7b72]';

          return (
            <div key={line.id} className={`leading-relaxed break-words whitespace-pre-wrap ${colorClass}`}>
              {line.content}
            </div>
          );
        })}
      </div>

      {/* Suggested Quick Commands */}
      <div className="px-4 py-2 bg-[#101510] border-t border-[#1e281e] flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-[#5b6f5b] whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#78F28B]" /> Try:
        </span>
        {['npm run dev', 'git status', 'cat profile', 'projects', 'stack', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleSuggestionClick(cmd)}
            className="px-2 py-0.5 rounded bg-[#182118] text-[#9fc29f] hover:text-[#78F28B] hover:bg-[#202d20] border border-[#273727] whitespace-nowrap transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Active Input Line */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 bg-[#0c100c] border-t border-[#233023]">
        <span className="text-[#78F28B] font-bold select-none">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type 'help' or any command..."
          className="flex-1 bg-transparent text-[#78F28B] placeholder-[#435243] focus:outline-none font-mono text-xs sm:text-sm"
          aria-label="Terminal command prompt input"
        />
        <button
          type="submit"
          className="p-1 rounded bg-[#1c291c] text-[#78F28B] hover:bg-[#283b28] transition-colors"
          title="Send command"
          aria-label="Send terminal command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
