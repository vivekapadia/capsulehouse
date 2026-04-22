"use client";

import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import LeadForm from "@/components/LeadForm";
import { useSearchParams } from "next/navigation";

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

const categories = ["All", "Luxury", "Utility", "Off-Grid", "Mobile", "Resort"];

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (initialCategory && categories.includes(initialCategory)) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  return (
    <div className="min-h-screen font-sans text-gray-900 pt-24">
      {/* Hero Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Our Capsule Series
          </h1>
          <p className="max-w-2xl text-xl text-gray-600 mx-auto">
            From basic utility cabins to luxurious space capsules, find the perfect prefabricated home for your needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all ${
                activeCategory === cat 
                ? "bg-blue-600 text-white shadow-lg scale-105" 
                : "glass text-gray-600 hover:bg-white/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                  className="glass rounded-3xl hover:shadow-2xl transition-all flex flex-col group h-full overflow-hidden"
                >
                  <div className="relative h-64 w-full overflow-hidden rounded-t-3xl">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                      {product.category}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                      <p className="text-blue-600 font-extrabold text-xl">₹{(product.price_inr / 100000).toFixed(1)}L</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
                    
                    <div className="mt-auto space-y-4">
                      <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                        <span className="bg-gray-50 px-2 py-1 rounded">Size: {product.dimensions}</span>
                        <span className="bg-gray-50 px-2 py-1 rounded">Ready to Ship</span>
                      </div>
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Quote Form Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">Request Quote</h3>
              <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-gray-800 transition-colors">
                ✕
              </button>
            </div>
            <div className="p-8">
              <p className="text-sm text-gray-500 mb-6">You are requesting a quote for the <strong className="text-gray-900">{selectedProduct.name}</strong>.</p>
              <LeadForm selectedModel={selectedProduct.name} onSuccess={() => setSelectedProduct(null)} />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
