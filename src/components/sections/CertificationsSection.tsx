import React from 'react';
import { CERTIFICATIONS } from '../../data/timeline';
import { Award, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 text-xs font-mono text-[#78F28B] mb-2 uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-[#78F28B]" />
        Recognitions & Verifications
      </div>
      <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4F1EA] mb-8">
        Certifications & Participation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            className="p-6 rounded-2xl border border-[#273827] bg-[#121712] space-y-4 flex flex-col justify-between hover:border-[#3b553b] transition-all shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#1b261b] border border-[#2c3d2c] flex items-center justify-center text-[#78F28B]">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f2d1f] text-[#78F28B] border border-[#2d402d]">
                  {cert.status}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-[#F4F1EA]">
                  {cert.title}
                </h3>
                <div className="text-xs font-mono text-[#78F28B] mt-0.5">
                  Issued by {cert.issuer}
                </div>
              </div>

              <p className="text-xs text-[#9eb09e] leading-relaxed font-sans">
                {cert.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1e2a1e] flex flex-wrap gap-1">
              {cert.skillsTagged.map((s, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#172217] text-[#86a886]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
