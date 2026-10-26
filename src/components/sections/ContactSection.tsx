import React, { useState } from 'react';
import { PROFILE } from '../../data/profile';
import { validateContactForm, ContactFormData } from '../../utils/contactValidation';
import { Mail, Github, Linkedin, Copy, Check, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    // Simulated transmission with state machine
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[#233123] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#78F28B] mb-2 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#78F28B]" />
            Direct Communication Channel
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4F1EA]">
            Let's Build Something Together
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#8E928C] max-w-md font-mono">
          Actively seeking a Full-Stack Developer internship or software engineering role. Open for technical discussions and project collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info & Channels */}
        <div className="lg:col-span-5 space-y-6 font-mono">
          <div className="p-6 rounded-2xl border border-[#273827] bg-[#121712] space-y-6 shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#556955] font-bold">
                PRIMARY EMAIL
              </span>
              <div className="flex items-center justify-between gap-2 pt-1">
                <a
                  href={`mailto:${PROFILE.contact.email}`}
                  className="text-sm font-semibold text-[#78F28B] hover:underline break-all"
                >
                  {PROFILE.contact.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-[#192419] hover:bg-[#233323] text-[#8E928C] hover:text-[#78F28B] transition-colors shrink-0"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#78F28B]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Social / Professional Profiles */}
            <div className="space-y-3 pt-4 border-t border-[#1e2a1e]">
              <span className="text-[10px] uppercase tracking-wider text-[#556955] font-bold">
                PROFESSIONAL PROFILES
              </span>

              <div className="flex flex-col gap-2.5">
                <a
                  href={PROFILE.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#151c15] hover:bg-[#1f2b1f] border border-[#233223] text-xs transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-[#78F28B]" />
                    <span className="text-[#F4F1EA] font-semibold">GitHub Profile</span>
                  </div>
                  <span className="text-[11px] text-[#6b826b] group-hover:text-[#78F28B]">
                    shubham734013 →
                  </span>
                </a>

                <a
                  href={PROFILE.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#151c15] hover:bg-[#1f2b1f] border border-[#233223] text-xs transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-[#78F28B]" />
                    <span className="text-[#F4F1EA] font-semibold">LinkedIn Network</span>
                  </div>
                  <span className="text-[11px] text-[#6b826b] group-hover:text-[#78F28B]">
                    shubham-vaishnav →
                  </span>
                </a>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="p-3.5 rounded-xl bg-[#0f140f] border border-[#202e20] text-xs text-[#8E928C]">
              <div className="flex items-center gap-2 text-[#78F28B] font-bold text-[11px] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#78F28B] animate-pulse" />
                <span>INTERNSHIP STATUS</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {PROFILE.contact.availability}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Validated Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl border border-[#273827] bg-[#121712] space-y-4 shadow-xl"
            noValidate
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#212e21]">
              <h3 className="font-display font-bold text-lg text-[#F4F1EA]">
                Send Direct Message
              </h3>
              <span className="text-[10px] font-mono text-[#556955]">
                END-TO-END VALIDATED
              </span>
            </div>

            {/* Success banner */}
            {isSuccess && (
              <div className="p-4 rounded-xl bg-[#132213] border border-[#2b442b] text-[#78F28B] text-xs font-mono flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-bold">Message Dispatched Successfully!</p>
                  <p className="text-[11px] text-[#a4c9a4] mt-0.5">
                    Thank you for reaching out. I will review your message and reply promptly.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label htmlFor="contact-name" className="block text-xs font-mono text-[#8E928C]">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0e120e] border text-xs text-[#F4F1EA] placeholder-[#415241] focus:outline-none focus:ring-1 transition-all ${
                    errors.name ? 'border-red-500/80 focus:ring-red-500' : 'border-[#243324] focus:ring-[#78F28B]'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="contact-email" className="block text-xs font-mono text-[#8E928C]">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0e120e] border text-xs text-[#F4F1EA] placeholder-[#415241] focus:outline-none focus:ring-1 transition-all ${
                    errors.email ? 'border-red-500/80 focus:ring-red-500' : 'border-[#243324] focus:ring-[#78F28B]'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label htmlFor="contact-subject" className="block text-xs font-mono text-[#8E928C]">
                Subject *
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Internship Opportunity / Project Inquiry"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0e120e] border text-xs text-[#F4F1EA] placeholder-[#415241] focus:outline-none focus:ring-1 transition-all ${
                  errors.subject ? 'border-red-500/80 focus:ring-red-500' : 'border-[#243324] focus:ring-[#78F28B]'
                }`}
              />
              {errors.subject && (
                <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.subject}</span>
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label htmlFor="contact-message" className="block text-xs font-mono text-[#8E928C]">
                Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your note, role details, or collaboration ideas..."
                className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0e120e] border text-xs text-[#F4F1EA] placeholder-[#415241] focus:outline-none focus:ring-1 transition-all resize-none ${
                  errors.message ? 'border-red-500/80 focus:ring-red-500' : 'border-[#243324] focus:ring-[#78F28B]'
                }`}
              />
              {errors.message && (
                <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#78F28B] hover:bg-[#8ef89f] text-[#101510] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#78F28B]/10 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-[#101510] border-t-transparent animate-spin" />
                  <span>SENDING TRANSMISSION...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND MESSAGE</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
