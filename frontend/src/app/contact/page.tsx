"use client";

import LeadForm from "@/components/LeadForm";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-20 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-3xl font-extrabold mb-4 text-center">Contact Us</h1>
          <p className="text-gray-600 text-center mb-8">
            Interested in our products? Fill out the form below and our sales team will get back to you within 24 hours.
          </p>
          <LeadForm selectedModel="General Inquiry" />
        </div>
      </div>
    </div>
  );
}
