import React, { useState } from 'react';
import { ArrowRight, Database, Server, Smartphone, ShieldCheck, Activity, Zap } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const [activeProject, setActiveProject] = useState<'resq' | 'gymos'>('resq');
  const [selectedNode, setSelectedNode] = useState<number>(0);

  const resqNodes = [
    {
      id: 0,
      title: 'React Client',
      type: 'Frontend Layer',
      tech: 'React 19, TypeScript, Tailwind',
      icon: Smartphone,
      status: 'Implemented',
      details: 'High-contrast emergency triggers, geolocation retrieval, and responsive UI preventing blocking state during critical SOS actions.',
      payload: '{ userId: "usr_94a", severity: "HIGH", coords: { lat: 26.85, lng: 75.82 } }'
    },
    {
      id: 1,
      title: 'REST API Ingestion',
      type: 'Routing & Gateway',
      tech: 'Express.js Router, CORS, Helmet',
      icon: Server,
      status: 'Implemented',
      details: 'Validates emergency payloads, sanitizes input parameters, and verifies authenticated user sessions.',
      payload: 'POST /api/sos/trigger -> 201 Created (Dispatch ID issued in 38ms)'
    },
    {
      id: 2,
      title: 'Dispatch Coordinator',
      type: 'Backend Logic',
      tech: 'Node.js Service Worker',
      icon: Zap,
      status: 'Implemented',
      details: 'Evaluates severity priority levels and routes emergency request notifications to the internal dispatch pipeline.',
      payload: '{ dispatchId: "dsp_2018", status: "DISPATCH_PENDING", queueIndex: 1 }'
    },
    {
      id: 3,
      title: 'MongoDB Database',
      type: 'Persistence Layer',
      tech: 'MongoDB, Mongoose ODM',
      icon: Database,
      status: 'Implemented',
      details: 'Persists emergency records with ISO timestamps, coordinates, contact numbers, and status audit logs.',
      payload: 'Collection: emergency_requests (Indexed on timestamp & status)'
    }
  ];

  const gymosNodes = [
    {
      id: 0,
      title: 'Front-Desk & Member QR',
      type: 'Client & Scanner',
      tech: 'React SPA, HTML5 Canvas QR',
      icon: Smartphone,
      status: 'Implemented',
      details: 'Generates secure dynamic member QR identity cards and provides reception desk check-in interface.',
      payload: '{ qrSecret: "sec_token_9f81bc20", timestamp: 1729904400 }'
    },
    {
      id: 1,
      title: 'Express Gateway',
      type: 'API Endpoint',
      tech: 'Express.js Router',
      icon: Server,
      status: 'Implemented',
      details: 'Authenticates reception station requests and forwards token to membership validation engine.',
      payload: 'POST /api/attendance/check-in'
    },
    {
      id: 2,
      title: 'Membership Engine',
      type: 'Business Logic',
      tech: 'Node.js Controller',
      icon: ShieldCheck,
      status: 'Implemented',
      details: 'Calculates active status: checks plan dates, flags expired accounts, and authorizes turnstile entry in <120ms.',
      payload: '{ allowed: true, member: "Aditya S.", plan: "ANNUAL", daysLeft: 214 }'
    },
    {
      id: 3,
      title: 'MongoDB Cloud Store',
      type: 'Persistence Layer',
      tech: 'MongoDB Collections',
      icon: Database,
      status: 'Implemented',
      details: 'Stores Member profiles, Membership Plans, and daily Attendance Logs with compound indexes.',
      payload: 'Collections: members, attendance_logs (Indexed on memberId & checkInDate)'
    }
  ];

  const currentNodes = activeProject === 'resq' ? resqNodes : gymosNodes;
  const activeNodeData = currentNodes[selectedNode] || currentNodes[0];

  return (
    <div className="w-full rounded-2xl border border-[#273827] bg-[#101510] p-5 sm:p-7 shadow-xl">
      {/* Header and Project Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#202d20]">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#78F28B]" />
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#F4F1EA]">
              System Architecture Flow
            </h3>
          </div>
          <p className="text-xs text-[#8E928C] mt-1 font-mono">
            Interactive multi-tier client-to-database data contract visualization
          </p>
        </div>

        {/* Project Switcher */}
        <div className="flex items-center p-1 rounded-lg bg-[#151c15] border border-[#263726] self-start sm:self-auto">
          <button
            onClick={() => {
              setActiveProject('resq');
              setSelectedNode(0);
            }}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              activeProject === 'resq'
                ? 'bg-[#223322] text-[#78F28B] font-semibold shadow'
                : 'text-[#8E928C] hover:text-[#e0ede0]'
            }`}
          >
            ResQ 2.0 (Emergency)
          </button>
          <button
            onClick={() => {
              setActiveProject('gymos');
              setSelectedNode(0);
            }}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              activeProject === 'gymos'
                ? 'bg-[#223322] text-[#78F28B] font-semibold shadow'
                : 'text-[#8E928C] hover:text-[#e0ede0]'
            }`}
          >
            Day Night GymOS (SaaS)
          </button>
        </div>
      </div>

      {/* Visual Pipeline Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-6">
        {currentNodes.map((node, index) => {
          const isSelected = selectedNode === index;
          const NodeIcon = node.icon;
          return (
            <div key={node.id} className="relative group">
              <button
                onClick={() => setSelectedNode(index)}
                className={`w-full text-left p-4 rounded-xl border transition-all h-full flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#78F28B] bg-[#142014] shadow-md shadow-[#78F28B]/5'
                    : 'border-[#223222] bg-[#131913] hover:border-[#384e38] hover:bg-[#182218]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#78F28B] bg-[#1b2b1b] px-2 py-0.5 rounded">
                      STEP 0{index + 1}
                    </span>
                    <span className="text-[10px] font-mono text-[#5f755f]">
                      {node.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 my-2">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#78F28B] text-[#101510]' : 'bg-[#1e2a1e] text-[#78F28B]'}`}>
                      <NodeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#F4F1EA]">{node.title}</h4>
                      <p className="text-[11px] text-[#8E928C]">{node.type}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#1f2d1f] text-[10px] font-mono text-[#6c826c]">
                  {node.tech}
                </div>
              </button>

              {/* Arrow connector between desktop nodes */}
              {index < 3 && (
                <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-[#3d523d] pointer-events-none">
                  <ArrowRight className="w-4 h-4 text-[#78F28B]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Deep-Dive Inspection Panel */}
      <div className="rounded-xl border border-[#243324] bg-[#0c100c] p-4 sm:p-5 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1c271c]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#78F28B]" />
            <span className="text-[#F4F1EA] font-semibold text-sm">
              Node Details: {activeNodeData.title} ({activeNodeData.type})
            </span>
          </div>
          <span className="text-[#647c64] text-[11px]">
            {activeProject === 'resq' ? 'ResQ 2.0 Ingestion Pipeline' : 'Day Night GymOS Attendance Pipeline'}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-[11px] text-[#78F28B] uppercase tracking-wider mb-1">
              Engineering Architecture:
            </div>
            <p className="text-[#b5c7b5] leading-relaxed text-xs">
              {activeNodeData.details}
            </p>
          </div>

          <div>
            <div className="text-[11px] text-[#78F28B] uppercase tracking-wider mb-1">
              Payload / Data Contract:
            </div>
            <div className="p-2.5 rounded bg-[#131b13] border border-[#202e20] text-[#78F28B] overflow-x-auto text-[11px]">
              <code>{activeNodeData.payload}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
