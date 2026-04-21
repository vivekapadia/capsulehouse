"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, Home as HomeIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/space-capsule.jpg"
          alt="Luxury Space Capsule"
          fill
          priority
          className="object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              The Future of <span className="text-blue-600">Smart Living</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed font-medium">
              Premium, sustainable, and intelligent capsule homes delivered anywhere in India. Elevate your lifestyle or business with our cutting-edge prefab solutions.
            </p>
            <div className="mt-10 flex space-x-4">
              <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Explore Models
              </Link>
              <Link href="/contact" className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-md">
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Engineered for Excellence</h2>
            <p className="mt-4 text-gray-600 text-lg">Every capsule house is manufactured in India using premium materials to withstand extreme weather while providing maximum comfort.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Shield, title: "Tata Steel Frame", desc: "Built with high-grade galvanized Tata Steel ensuring decades of structural integrity and earthquake resistance." },
              { icon: Zap, title: "Smart Automation", desc: "Integrated voice-controlled lighting, climate, and curtain systems for a truly modern living experience." },
              { icon: HomeIcon, title: "Pan-India Delivery", desc: "Manufactured in our state-of-the-art facility and delivered directly to your site anywhere in India within weeks." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/apple-cabin.jpg" alt="Basic Cabin" fill className="object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Versatile Apple Cabins</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our entry-level series is perfect for remote offices, eco-resorts, or additional living spaces. Fast deployment, high utility, and cost-effective without compromising on aesthetics.
              </p>
              <ul className="space-y-4 mb-8">
                {['100% Weatherproof', 'Fully Insulated', 'Plug & Play Installation'].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 font-medium">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/products" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800">
                View Specifications →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
