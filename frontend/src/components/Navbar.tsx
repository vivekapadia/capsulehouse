"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed left-1/2 -translate-x-1/2 transition-all duration-500 z-[100] ${
      scrolled 
      ? "top-2 w-[95%] max-w-7xl" 
      : "top-6 w-[90%] max-w-7xl"
    }`}>
      <div className={`rounded-[2rem] px-8 py-4 flex justify-between items-center transition-all duration-500 border border-transparent shadow-2xl ${
        scrolled 
        ? "bg-white/90 backdrop-blur-2xl border-white/40" 
        : "bg-white/45 backdrop-blur-xl border-white/30"
      }`}>
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-black tracking-tighter text-blue-600 outline-none">
            CAPSULE<span className="text-gray-900">HOUSE</span>
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/products" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">Products</Link>
          <Link href="/portfolio" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">Portfolio</Link>
          <Link href="/configurator" className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:opacity-80 transition-all">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            3D Studio
          </Link>
          <Link href="/contact" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
          <Link 
            href="/configurator" 
            className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-2">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 glass rounded-3xl p-8 space-y-6 shadow-2xl border-white/30 animate-in fade-in slide-in-from-top-4">
          <Link href="/products" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gray-800">Products</Link>
          <Link href="/portfolio" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gray-800">Portfolio</Link>
          <Link href="/configurator" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-blue-600">3D Studio</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gray-800">Contact</Link>
          <Link href="/configurator" onClick={() => setIsOpen(false)} className="block w-full bg-blue-600 text-white text-center py-4 rounded-2xl font-bold">Get Quote</Link>
        </div>
      )}
    </nav>
  );
}
