"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import LeadForm from "@/components/LeadForm";

// Lazy load the heavy 3D canvas so it doesn't block initial page load
const Capsule3D = dynamic(() => import("@/components/Capsule3D"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-2xl animate-pulse"><p className="text-gray-500 font-medium">Loading 3D Experience...</p></div>
});

const materials = [
  { id: "arctic", name: "Arctic Frost", color: "#f8f9fa", price: 850000, perf: "95% Thermal Reflective" },
  { id: "stealth", name: "Midnight Stealth", color: "#121212", price: 920000, perf: "Anti-Corrosive Armor" },
  { id: "chrome", name: "Lunar Chrome", color: "#6c757d", price: 980000, perf: "Aerospace Grade Finish" },
  { id: "gold", name: "Desert Gold", color: "#c5a059", price: 1150000, perf: "UV-Resistant Shield" },
  { id: "emerald", name: "Emerald Eco", color: "#1a3a3a", price: 1050000, perf: "Nature-Integrated Coat" },
];

export default function ConfiguratorPage() {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [smartPack, setSmartPack] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  const totalPrice = selectedMaterial.price + (smartPack ? 150000 : 0);

  const shareToWhatsApp = () => {
    const msg = `Hi! I've designed a Capsule House with ${selectedMaterial.name} finish ${smartPack ? "and the Smart-Tech Package" : ""}. Total Estimate: ₹${(totalPrice / 100000).toFixed(2)}L. Can we discuss?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-2">Design Studio</h1>
            <p className="text-gray-500 font-medium tracking-tight">Configure your architectural masterpiece.</p>
          </div>
          <button 
            onClick={shareToWhatsApp}
            className="flex items-center gap-3 glass px-6 py-3 rounded-2xl text-sm font-black text-green-600 hover:bg-green-50 transition-all border-green-100"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Share to WhatsApp
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* 3D Viewer Area */}
          <div className="lg:col-span-2 glass rounded-[3rem] h-[650px] relative overflow-hidden group border-white/20 shadow-inner">
            <div className="absolute top-8 left-8 z-20 flex gap-3">
              <button 
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  autoRotate ? "bg-blue-600 text-white shadow-xl" : "glass text-gray-800 hover:bg-white"
                }`}
              >
                {autoRotate ? "● Orbiting" : "Static View"}
              </button>
              <div className="glass-dark px-6 py-3 rounded-full text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Raytraced Output
              </div>
            </div>
            <Capsule3D color={selectedMaterial.color} autoRotate={autoRotate} />
            <div className="absolute bottom-8 left-8 glass px-6 py-4 rounded-3xl border-white/40">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Shell</p>
                <p className="text-sm font-black text-gray-900">{selectedMaterial.name}</p>
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="glass rounded-[3rem] p-10 space-y-10 border-white/20">
            <div>
              <h3 className="text-xs font-black text-gray-400 mb-6 uppercase tracking-[0.2em]">Exterior Performance</h3>
              
              <div className="space-y-3">
                {materials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full flex items-center gap-4 p-5 rounded-3xl transition-all border-2 ${
                      selectedMaterial.id === mat.id 
                      ? "border-blue-600 bg-blue-50/50 shadow-lg scale-[1.02]" 
                      : "border-transparent bg-white/40 hover:bg-white"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full border-4 border-white shadow-xl" style={{ backgroundColor: mat.color }}></div>
                    <div className="text-left">
                        <p className="font-black text-gray-900 text-sm">{mat.name}</p>
                        <p className="text-[10px] font-bold text-blue-600/70 uppercase tracking-tighter">{mat.perf}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 bg-indigo-50/50 rounded-[2rem] border border-indigo-100">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h4 className="text-sm font-black text-indigo-900">Smart-Tech Pack</h4>
                        <p className="text-[10px] font-bold text-indigo-600 uppercase">IoT • Voice • Automation</p>
                    </div>
                    <button 
                        onClick={() => setSmartPack(!smartPack)}
                        className={`w-14 h-8 rounded-full transition-all relative ${smartPack ? "bg-indigo-600" : "bg-gray-200"}`}
                    >
                        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${smartPack ? "left-7" : "left-1"}`}></div>
                    </button>
                </div>
                <p className="text-[11px] text-indigo-800/70 leading-relaxed font-medium">Adds automated curtains, voice-controlled lighting, and smart thermal management.</p>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Project Estimate</p>
              <h3 className="text-5xl font-black text-blue-600 mb-8 tracking-tighter">
                ₹{(totalPrice / 100000).toFixed(2)} <span className="text-lg text-gray-400 font-bold">Lakhs</span>
              </h3>

              <button 
                onClick={() => setShowForm(true)}
                className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl hover:bg-black transition-all shadow-2xl hover:scale-[1.02] active:scale-95 uppercase tracking-widest text-xs"
              >
                Finalize Configuration
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">Custom Quote</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-800 transition-colors">
                ✕
              </button>
            </div>
            <div className="p-8">
              <p className="text-sm text-gray-500 mb-6">You are requesting a quote for the <strong className="text-gray-900">{selectedMaterial.name}</strong> configuration.</p>
              <LeadForm selectedModel={`Custom Build: ${selectedMaterial.name}`} onSuccess={() => setShowForm(false)} />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
