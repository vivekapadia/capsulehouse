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
  price: number;
  specifications: string;
  image_url: string;
};

const categories = ["All", "Premium Series", "Utility Series", "Modular Homes", "Apple Cabins"];

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

  const openWhatsApp = (productName?: string) => {
    const message = productName 
      ? `Hi! I'm interested in the ${productName}. Could you provide more details?`
      : "Hi! I'm interested in Capsule House products. Could you help me?";
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 pt-24 relative">
      {/* Floating WhatsApp Button */}
      <button 
        onClick={() => openWhatsApp()}
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.438-9.89 9.886-.001 2.125.593 3.456 1.574 5.111l-.973 3.558 3.689-.969zm11.381-7.712c-.301-.15-1.779-.879-2.053-.979-.275-.1-.475-.15-.675.15-.199.299-.775.979-.95 1.174-.175.194-.35.219-.65.069-.3-.15-1.269-.467-2.417-1.492-.893-.796-1.496-1.78-1.671-2.079-.175-.3-.019-.462.131-.611.135-.134.3-.349.45-.524.149-.175.199-.299.299-.499.1-.2.05-.374-.025-.524-.075-.15-.675-1.624-.925-2.224-.244-.584-.491-.504-.675-.514-.175-.01-.375-.012-.575-.012-.2 0-.525.075-.8.374-.275.299-1.05 1.024-1.05 2.499 0 1.475 1.075 2.899 1.225 3.099.15.2 2.115 3.229 5.123 4.529.714.309 1.272.494 1.707.633.717.227 1.369.195 1.884.118.574-.085 1.779-.724 2.029-1.424.25-.699.25-1.299.175-1.424-.075-.124-.275-.199-.575-.349z"/>
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold ml-2 whitespace-nowrap text-sm">Chat with Expert</span>
      </button>

      {/* Hero Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-blue-900">
            Capsule Collections
          </h1>
          <p className="max-w-2xl text-xl text-gray-500 mx-auto font-medium">
            Architectural masterpieces engineered for the future of living.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-wider transition-all border ${
                activeCategory === cat 
                ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200 scale-105" 
                : "glass text-gray-500 border-white/50 hover:bg-white"
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
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="glass rounded-[2.5rem] hover:shadow-2xl transition-all flex flex-col group h-full overflow-hidden border-white/20"
                >
                  <div className="relative h-56 w-full overflow-hidden rounded-t-[2rem]">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                      {product.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black text-gray-900 leading-tight">{product.name}</h3>
                      <div className="text-right">
                        <p className="text-blue-600 font-black text-xl">₹{(product.price / 100000).toFixed(1)}L</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Base Price</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2 font-medium leading-relaxed">{product.description}</p>
                    
                    {/* Technical Specs Tab-like display */}
                    <div className="mb-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Technical Specs</h4>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                        {product.specifications ? product.specifications.split("|").slice(0, 4).map((spec, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="text-[9px] text-gray-400 font-bold">{spec.split(":")[0]}</span>
                            <span className="text-xs text-gray-800 font-black truncate">{spec.split(":")[1]}</span>
                          </div>
                        )) : (
                          <div className="col-span-2 text-[9px] text-gray-400 font-bold italic">Specifications pending...</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-auto flex gap-2">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="flex-grow bg-blue-600 text-white font-black py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 text-xs uppercase tracking-widest"
                      >
                        Request Quote
                      </button>
                      <button 
                        onClick={() => openWhatsApp(product.name)}
                        className="p-3.5 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-all shadow-lg"
                        title="Chat about this model"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.438-9.89 9.886-.001 2.125.593 3.456 1.574 5.111l-.973 3.558 3.689-.969zm11.381-7.712c-.301-.15-1.779-.879-2.053-.979-.275-.1-.475-.15-.675.15-.199.299-.775.979-.95 1.174-.175.194-.35.219-.65.069-.3-.15-1.269-.467-2.417-1.492-.893-.796-1.496-1.78-1.671-2.079-.175-.3-.019-.462.131-.611.135-.134.3-.349.45-.524.149-.175.199-.299.299-.499.1-.2.05-.374-.025-.524-.075-.15-.675-1.624-.925-2.224-.244-.584-.491-.504-.675-.514-.175-.01-.375-.012-.575-.012-.2 0-.525.075-.8.374-.275.299-1.05 1.024-1.05 2.499 0 1.475 1.075 2.899 1.225 3.099.15.2 2.115 3.229 5.123 4.529.714.309 1.272.494 1.707.633.717.227 1.369.195 1.884.118.574-.085 1.779-.724 2.029-1.424.25-.699.25-1.299.175-1.424-.075-.124-.275-.199-.575-.349z"/>
                        </svg>
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-white/20"
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-black text-gray-900">Custom Quote</h3>
              <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-gray-800 transition-colors p-2">
                ✕
              </button>
            </div>
            <div className="p-10 pb-20">
              <div className="mb-8 p-6 bg-blue-50 rounded-3xl">
                <p className="text-sm text-blue-900 font-bold mb-2 uppercase tracking-widest text-[10px]">Product Selection</p>
                <h4 className="text-xl font-black text-blue-900 mb-2">{selectedProduct.name}</h4>
                <p className="text-xs text-blue-700 font-medium">{selectedProduct.specifications ? selectedProduct.specifications.split("|")[0] : ""}</p>
              </div>
              <LeadForm selectedModel={selectedProduct.name} onSuccess={() => setSelectedProduct(null)} />
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <button 
                  onClick={() => openWhatsApp(selectedProduct.name)}
                  className="w-full flex items-center justify-center gap-3 text-sm font-black text-gray-500 hover:text-[#25D366] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.438-9.89 9.886-.001 2.125.593 3.456 1.574 5.111l-.973 3.558 3.689-.969zm11.381-7.712c-.301-.15-1.779-.879-2.053-.979-.275-.1-.475-.15-.675.15-.199.299-.775.979-.95 1.174-.175.194-.35.219-.65.069-.3-.15-1.269-.467-2.417-1.492-.893-.796-1.496-1.78-1.671-2.079-.175-.3-.019-.462.131-.611.135-.134.3-.349.45-.524.149-.175.199-.299.299-.499.1-.2.05-.374-.025-.524-.075-.15-.675-1.624-.925-2.224-.244-.584-.491-.504-.675-.514-.175-.01-.375-.012-.575-.012-.2 0-.525.075-.8.374-.275.299-1.05 1.024-1.05 2.499 0 1.475 1.075 2.899 1.225 3.099.15.2 2.115 3.229 5.123 4.529.714.309 1.272.494 1.707.633.717.227 1.369.195 1.884.118.574-.085 1.779-.724 2.029-1.424.25-.699.25-1.299.175-1.424-.075-.124-.275-.199-.575-.349z"/>
                  </svg>
                  Chat with Sales Expert
                </button>
              </div>
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
