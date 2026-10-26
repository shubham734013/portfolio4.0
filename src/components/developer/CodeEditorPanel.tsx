import React, { useState } from 'react';
import { PROJECTS } from '../../data/projects';
import { FileCode, Folder, Copy, Check, ChevronRight } from 'lucide-react';

export const CodeEditorPanel: React.FC = () => {
  const snippets = [
    {
      id: 'resq-ctrl',
      projectName: 'ResQ 2.0',
      tabName: 'emergencyController.ts',
      path: 'src/controllers/emergencyController.ts',
      snippet: PROJECTS[0].codeSnippets[0],
    },
    {
      id: 'resq-ui',
      projectName: 'ResQ 2.0',
      tabName: 'SosActionPanel.tsx',
      path: 'src/components/SosActionPanel.tsx',
      snippet: PROJECTS[0].codeSnippets[1],
    },
    {
      id: 'gymos-model',
      projectName: 'Day Night GymOS',
      tabName: 'Member.ts',
      path: 'backend/models/Member.ts',
      snippet: PROJECTS[1].codeSnippets[0],
    },
    {
      id: 'gymos-routes',
      projectName: 'Day Night GymOS',
      tabName: 'attendanceRoutes.ts',
      path: 'backend/routes/attendanceRoutes.ts',
      snippet: PROJECTS[1].codeSnippets[1],
    },
  ];

  const [activeTabId, setActiveTabId] = useState<string>('resq-ctrl');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = snippets.find((s) => s.id === activeTabId) || snippets[0];
  const lines = activeSnippet.snippet.code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl border border-[#283828] bg-[#0e120e] shadow-2xl overflow-hidden font-mono text-xs">
      {/* Editor Top Bar with File Tabs */}
      <div className="flex items-center justify-between bg-[#151c15] border-b border-[#243324] px-3 py-2">
        <div className="flex items-center gap-1 overflow-x-auto max-w-[80%]">
          {snippets.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-t text-xs font-mono transition-all whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'bg-[#0e120e] text-[#78F28B] border-[#78F28B]'
                    : 'bg-transparent text-[#8E928C] hover:text-[#d0ded0] hover:bg-[#1a241a] border-transparent'
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-[#78F28B]' : 'text-[#6b7c6b]'}`} />
                <span>{tab.tabName}</span>
                <span className="text-[10px] text-[#556955] px-1 bg-[#1c271c] rounded">
                  {tab.projectName.includes('ResQ') ? 'ResQ' : 'GymOS'}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1c281c] text-[#8E928C] hover:text-[#78F28B] hover:bg-[#253625] transition-colors"
          title="Copy code to clipboard"
          aria-label="Copy snippet code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#78F28B]" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Editor Body with File Tree & Code Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 min-h-[380px]">
        {/* Left Mini Explorer */}
        <div className="hidden md:block col-span-1 bg-[#101510] border-r border-[#223022] p-3 text-[11px] text-[#7a8c7a] select-none">
          <div className="uppercase tracking-wider text-[10px] text-[#4f634f] font-semibold mb-2">
            Workspace Files
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[#a8bda8]">
              <Folder className="w-3.5 h-3.5 text-[#78F28B]" />
              <span>shubham-repos/</span>
            </div>
            <div className="pl-3 space-y-1 border-l border-[#1f2c1f]">
              <div className="text-[#647c64] font-semibold text-[10px] pt-1">ResQ 2.0</div>
              <button
                onClick={() => setActiveTabId('resq-ctrl')}
                className={`w-full text-left flex items-center gap-1 px-1.5 py-0.5 rounded ${
                  activeTabId === 'resq-ctrl' ? 'bg-[#1b261b] text-[#78F28B]' : 'hover:text-[#c4d6c4]'
                }`}
              >
                <ChevronRight className="w-3 h-3 text-[#4f634f]" />
                emergencyController.ts
              </button>
              <button
                onClick={() => setActiveTabId('resq-ui')}
                className={`w-full text-left flex items-center gap-1 px-1.5 py-0.5 rounded ${
                  activeTabId === 'resq-ui' ? 'bg-[#1b261b] text-[#78F28B]' : 'hover:text-[#c4d6c4]'
                }`}
              >
                <ChevronRight className="w-3 h-3 text-[#4f634f]" />
                SosActionPanel.tsx
              </button>

              <div className="text-[#647c64] font-semibold text-[10px] pt-2">Day Night GymOS</div>
              <button
                onClick={() => setActiveTabId('gymos-model')}
                className={`w-full text-left flex items-center gap-1 px-1.5 py-0.5 rounded ${
                  activeTabId === 'gymos-model' ? 'bg-[#1b261b] text-[#78F28B]' : 'hover:text-[#c4d6c4]'
                }`}
              >
                <ChevronRight className="w-3 h-3 text-[#4f634f]" />
                Member.ts
              </button>
              <button
                onClick={() => setActiveTabId('gymos-routes')}
                className={`w-full text-left flex items-center gap-1 px-1.5 py-0.5 rounded ${
                  activeTabId === 'gymos-routes' ? 'bg-[#1b261b] text-[#78F28B]' : 'hover:text-[#c4d6c4]'
                }`}
              >
                <ChevronRight className="w-3 h-3 text-[#4f634f]" />
                attendanceRoutes.ts
              </button>
            </div>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="col-span-1 md:col-span-3 p-4 bg-[#0c100c] overflow-x-auto crt-screen-overlay">
          {/* Breadcrumb info */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#1b261b] text-[11px] text-[#6b826b]">
            <span>{activeSnippet.path}</span>
            <span className="text-[#78F28B] bg-[#162216] px-2 py-0.5 rounded">
              {activeSnippet.snippet.description}
            </span>
          </div>

          {/* Syntax Highlighted Lines */}
          <div className="font-mono text-xs leading-relaxed">
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              return (
                <div key={idx} className="flex hover:bg-[#162016] py-0.5 px-1 rounded transition-colors group">
                  <span className="code-line-gutter w-9 text-right pr-4 shrink-0 text-[#425442] group-hover:text-[#78F28B]">
                    {lineNum}
                  </span>
                  <pre className="text-[#d8e4d8] overflow-visible whitespace-pre font-mono">
                    <CodeSyntaxHighlight line={line} />
                  </pre>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Editor Footer Status */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#121812] border-t border-[#223022] text-[11px] text-[#688068]">
        <div className="flex items-center gap-3">
          <span>LF</span>
          <span>UTF-8</span>
          <span className="text-[#78F28B]">{lines.length} lines</span>
        </div>
        <div>TypeScript / Mongoose ODM</div>
      </div>
    </div>
  );
};

// Simple syntax colorizer for keywords, strings, comments
function CodeSyntaxHighlight({ line }: { line: string }) {
  if (line.trim().startsWith('//')) {
    return <span className="text-[#4e7d54] italic">{line}</span>;
  }

  // Basic token identification
  const parts = line.split(/(\b(?:const|let|var|async|await|function|import|export|from|return|if|else|try|catch|new|interface|type)\b|"[^"]*"|'[^']*'|\/\*[\s\S]*?\*\/)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (/^(const|let|var|async|await|function|import|export|from|return|if|else|try|catch|new|interface|type)$/.test(part)) {
          return <span key={i} className="text-[#78F28B] font-semibold">{part}</span>;
        }
        if (part.startsWith('"') || part.startsWith("'")) {
          return <span key={i} className="text-[#a5f3bc]">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
