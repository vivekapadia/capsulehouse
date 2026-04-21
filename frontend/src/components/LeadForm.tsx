"use client";

import { useState } from "react";
import axios from "axios";

export default function LeadForm({ selectedModel, onSuccess }: { selectedModel: string, onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    interested_model: selectedModel || "",
    additional_message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      await axios.post(`/api/leads`, formData);
      setStatus("success");
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Quote Requested Successfully!</h3>
        <p className="text-gray-600">Our team will contact you shortly regarding the {selectedModel}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input 
          required
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input 
          required
          type="tel" 
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Installation Location (City, State)</label>
        <input 
          required
          type="text" 
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
          placeholder="E.g., Lonavala, Maharashtra"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Model Interested In</label>
        <input 
          readOnly
          type="text" 
          value={formData.interested_model}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 font-medium"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements (Optional)</label>
        <textarea 
          rows={3}
          value={formData.additional_message}
          onChange={(e) => setFormData({...formData, additional_message: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
          placeholder="Any specific customizations or timeframe?"
        ></textarea>
      </div>
      
      {status === "error" && (
        <div className="text-red-600 text-sm font-medium">Failed to submit request. Please try again or contact us directly.</div>
      )}

      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
