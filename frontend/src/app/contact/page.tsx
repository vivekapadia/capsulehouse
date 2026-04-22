"use client";

import LeadForm from "@/components/LeadForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-32 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass p-12 md:p-16 rounded-[3rem] shadow-2xl border-white/40">
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-center tracking-tighter">Contact Our <span className="text-blue-600">Enterprise Team</span></h1>
          <p className="text-gray-500 text-center mb-12 text-lg font-medium leading-relaxed">
            Interested in scaling your resort or adding a smart home to your backyard? Fill out the form below and our experts will get back to you within 24 hours.
          </p>
          <LeadForm selectedModel="General Inquiry" />
        </div>
      </div>
    </div>
  );
}
