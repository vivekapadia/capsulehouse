"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

type PortfolioItem = {
  id: string;
  title: string;
  location: string;
  description: string;
  image_url: string;
  units: number;
};

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get("/api/portfolio");
        setPortfolio(res.data);
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen py-24 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Our Portfolio</h1>
          <p className="max-w-2xl text-xl text-gray-600 mx-auto">
            Explore our real-world installations across diverse terrains and climates.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {portfolio.map((item) => (
              <div key={item.id} className="group rounded-[2.5rem] overflow-hidden glass hover:shadow-2xl transition-all duration-300 bg-white/30">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={item.image_url} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    {item.units} Units
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-blue-600 text-sm font-bold uppercase tracking-wider mb-2">{item.location}</p>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
