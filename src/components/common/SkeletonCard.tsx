import React from 'react';

export const SkeletonCard: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = ''
}) => {
  return (
    <div className={`p-6 rounded-2xl border border-[#223122] bg-[#121712] space-y-4 animate-pulse ${className}`}>
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 bg-[#1e2a1e] rounded-md" />
        <div className="h-4 w-16 bg-[#1e2a1e] rounded-md" />
      </div>
      <div className="h-6 w-3/4 bg-[#233323] rounded-md" />
      <div className="space-y-2 pt-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-[#182318] rounded"
            style={{ width: `${85 - i * 15}%` }}
          />
        ))}
      </div>
      <div className="pt-4 flex gap-2">
        <div className="h-8 w-24 bg-[#1e2a1e] rounded-xl" />
        <div className="h-8 w-24 bg-[#1e2a1e] rounded-xl" />
      </div>
    </div>
  );
};
