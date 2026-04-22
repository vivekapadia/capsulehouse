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
  { id: "arctic", name: "Arctic Frost", color: "#f8f9fa", price: 850000 },
  { id: "stealth", name: "Midnight Stealth", color: "#121212", price: 920000 },
  { id: "chrome", name: "Lunar Chrome", color: "#6c757d", price: 980000 },
  { id: "gold", name: "Desert Gold", color: "#c5a059", price: 1150000 },
  { id: "emerald", name: "Emerald Eco", color: "#1a3a3a", price: 1050000 },
];

export default function ConfiguratorPage() {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [showForm, setShowForm] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">3D Design Studio</h1>
          <p className="text-gray-500 font-medium tracking-tight">Enterprise-grade capsule visualization in real-time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* 3D Viewer Area */}
          <div className="lg:col-span-2 glass rounded-[3rem] h-[600px] relative overflow-hidden group border-white/20">
            <div className="absolute top-8 left-8 z-20 flex gap-3">
              <button 
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  autoRotate ? "bg-blue-600 text-white shadow-lg" : "glass text-gray-800 hover:bg-white"
                }`}
              >
                {autoRotate ? "● Auto-Rotate On" : "Auto-Rotate Off"}
              </button>
              <div className="glass-dark px-5 py-2.5 rounded-full text-xs font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                4K Rendering
              </div>
            </div>
            <Capsule3D color={selectedMaterial.color} autoRotate={autoRotate} />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-dark px-8 py-3 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Drag to Rotate • Scroll to Zoom
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="glass rounded-[3rem] p-10 space-y-10">
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider">Exterior Finish</h3>
              
              <div className="space-y-4">
                {materials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all border-2 ${
                      selectedMaterial.id === mat.id 
                      ? "border-blue-600 bg-blue-50/50 shadow-md scale-[1.02]" 
                      : "border-transparent bg-white/50 hover:bg-white"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full border border-gray-100 shadow-inner" style={{ backgroundColor: mat.color }}></div>
                    <span className="font-bold text-gray-800">{mat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Estimated Total</p>
              <h3 className="text-4xl font-extrabold text-blue-600 mb-8">
                ₹{(selectedMaterial.price / 100000).toFixed(2)} <span className="text-lg text-gray-500 font-medium">Lakhs</span>
              </h3>

              <button 
                onClick={() => setShowForm(true)}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Request Quote
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
