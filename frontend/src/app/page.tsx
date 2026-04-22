"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, Home as HomeIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="font-sans text-gray-900 pt-16">
      {/* Hero Section */}
      <section className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/p1.png"
          alt="Luxury Space Capsule"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent backdrop-blur-[2px]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl glass p-12 rounded-[3rem] shadow-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tighter mb-6">
              The Future of <span className="text-blue-600">Smart Living</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed font-bold mb-10">
              Premium, sustainable, and intelligent capsule homes delivered anywhere in India. Elevate your lifestyle with our cutting-edge prefab solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
                Explore Models
              </Link>
              <Link href="/configurator" className="glass-dark text-blue-600 px-10 py-4 rounded-2xl font-black hover:bg-white transition-all shadow-md">
                3D Studio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-6">Engineered for Excellence</h2>
            <p className="text-gray-500 text-xl font-medium leading-relaxed">Every capsule house is manufactured in India using premium materials to withstand extreme weather while providing maximum comfort.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: "Tata Steel Frame", desc: "Built with high-grade galvanized Tata Steel ensuring decades of structural integrity and earthquake resistance." },
              { icon: Zap, title: "Smart Automation", desc: "Integrated voice-controlled lighting, climate, and curtain systems for a truly modern living experience." },
              { icon: HomeIcon, title: "Pan-India Delivery", desc: "Manufactured in our state-of-the-art facility and delivered directly to your site anywhere in India within weeks." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="glass p-10 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 border-white/40"
              >
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlight */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-[4rem] overflow-hidden p-12 md:p-20 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
                <Image src="/images/p2.png" alt="Basic Cabin" fill className="object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tighter">Versatile Utility Series</h2>
              <p className="text-gray-500 text-xl mb-10 leading-relaxed font-medium">
                Our entry-level series is perfect for remote offices, eco-resorts, or additional living spaces. Fast deployment, high utility, and cost-effective without compromising on aesthetics.
              </p>
              <ul className="space-y-6 mb-12">
                {['100% Weatherproof Coating', 'High-Density Insulation', 'Plug & Play Installation'].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-800 font-bold text-lg">
                    <span className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mr-4 text-sm shadow-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/products" className="inline-flex items-center text-blue-600 font-black text-xl hover:translate-x-2 transition-transform">
                View Specifications →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
