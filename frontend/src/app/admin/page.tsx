"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type Lead = {
  id: string;
  name: string;
  phone: string;
  location: string;
  interested_model: string;
  additional_message: string;
  created_datetime: string;
};

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await axios.get("/api/leads");
      setLeads(res.data);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { // Temporary simple auth
      setAuthenticated(true);
      fetchLeads();
    } else {
      alert("Invalid password");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-[3rem] w-full max-w-md shadow-2xl border-white/40"
        >
          <h1 className="text-3xl font-black mb-8 text-center tracking-tighter">Admin <span className="text-blue-600">Portal</span></h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-white/30 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium"
            />
            <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Customer <span className="text-blue-600">Leads</span></h1>
          <button 
            onClick={() => setAuthenticated(false)}
            className="glass-dark px-6 py-2.5 rounded-xl text-gray-700 hover:text-blue-600 font-bold text-sm transition-all shadow-sm"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="glass rounded-[3rem] overflow-hidden shadow-2xl border-white/40">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-white/40 border-b border-white/20">
                    <th className="px-8 py-6 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Name</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Contact</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Model</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/40 transition-colors group">
                      <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-400">
                        {new Date(lead.created_datetime).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-lg font-black text-gray-900">{lead.name}</td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-600">{lead.phone}</td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm">
                        <span className="px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-600 font-black text-xs shadow-sm border border-blue-600/10">
                          {lead.interested_model}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-600">{lead.location}</td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold italic">No leads captured yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
