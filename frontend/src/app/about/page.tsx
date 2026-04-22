"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-32 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            Pioneering Smart Housing
          </motion.h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
            Founded with a vision to revolutionize urban and rural living in India, Capsule House Manufacturing combines high-grade aerospace engineering with sustainable architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="glass p-12 rounded-[3rem] shadow-2xl">
            <h2 className="text-3xl font-black mb-6 tracking-tight text-gray-900">Our Mission</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              To provide high-quality, smart, and durable housing solutions that can be deployed anywhere, from the highest peaks of the Himalayas to the coastal shores of Goa. 
            </p>
            <div className="space-y-6">
              {[
                { label: "Founded", value: "2018" },
                { label: "Manufacturing", value: "Mumbai & Pune" },
                { label: "Global Standard", value: "ISO 9001 Certified" }
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">{stat.label}</span>
                  <span className="font-black text-blue-600">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image src="/images/p1.png" alt="Manufacturing Facility" fill className="object-cover" />
            <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-[1px]"></div>
          </div>
        </div>

        <div className="glass rounded-[4rem] p-16 md:p-24 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter">Manufacturing Excellence</h2>
          <p className="max-w-4xl mx-auto text-gray-500 text-xl font-medium leading-relaxed mb-12">
            Every capsule is built using a galvanized Tata Steel frame, aerospace-grade aluminum cladding, and smart glass technology. Our facility in India ensures that we maintain the highest quality control while offering competitive pricing for the global market.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "100+", sub: "Units Delivered" },
              { label: "50+", sub: "Enterprises Served" },
              { label: "15+", sub: "Cities Reached" },
              { label: "24/7", sub: "Support System" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black text-blue-600 mb-2">{stat.label}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
