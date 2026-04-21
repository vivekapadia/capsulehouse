"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import LeadForm from "@/components/LeadForm";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price_inr: number;
  dimensions: string;
  features: string;
  image_url: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  useEffect(() => {
    // In Docker, Next.js client can hit the public API or localhost mapping.
    // For local dev with docker-compose, localhost:8080 is mapped to backend.
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Our Capsule Series</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            From basic utility cabins to luxurious space capsules, find the perfect prefabricated home for your needs.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {products.map((product, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={product.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="relative h-64 w-full">
                  <Image 
                    src={product.image_url} 
                    alt={product.name} 
                    fill 
                    className="object-cover"
                    unoptimized // using local images, skip next/image optimization for simplicity
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-blue-600 uppercase tracking-wide">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="block text-gray-500 mb-1">Dimensions</span>
                      <span className="font-semibold text-gray-900">{product.dimensions}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 mb-1">Base Price</span>
                      <span className="font-semibold text-blue-600 text-lg">₹{(product.price_inr / 100000).toFixed(1)} Lakhs</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <span className="block text-gray-500 mb-2 text-sm">Key Features</span>
                    <ul className="flex flex-wrap gap-2">
                      {product.features.split(',').map((feature, i) => (
                        <li key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          {feature.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => setSelectedProduct(product.name)}
                    className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Request Quote for {product.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lead Generation Form Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
                <h3 className="text-xl font-bold text-gray-900">Request a Quote</h3>
                <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
              <div className="p-6">
                <LeadForm selectedModel={selectedProduct} onSuccess={() => setSelectedProduct(null)} />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
