"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Check, X, Scale } from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  specifications: string;
  image_url: string;
};

export default function ComparePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [p1, setP1] = useState<Product | null>(null);
  const [p2, setP2] = useState<Product | null>(null);
  const [p3, setP3] = useState<Product | null>(null);
  const [p4, setP4] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
        if (res.data.length >= 4) {
            setP1(res.data[0]);
            setP2(res.data[1]);
            setP3(res.data[2]);
            setP4(res.data[3]);
        } else if (res.data.length >= 2) {
            setP1(res.data[0]);
            setP2(res.data[1]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getSpecValue = (specStr: string, key: string) => {
    if (!specStr) return "N/A";
    const specs = specStr.split("|");
    const found = specs.find(s => s.toLowerCase().includes(key.toLowerCase()));
    if (!found || !found.includes(":")) return "N/A";
    return found.split(":")[1].trim();
  };

  const specKeys = ["Dimensions", "Weight", "Insulation", "Wind Resistance"];

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  const ProductCard = ({ product, setProduct }: { product: Product | null, setProduct: (p: Product) => void }) => (
    <div className="space-y-6">
        <div className="glass rounded-[2rem] p-6 border-white/20">
            <select 
            className="w-full glass border-white/30 rounded-xl px-3 py-2.5 font-bold text-gray-800 outline-none text-xs"
            value={product?.id}
            onChange={(e) => setProduct(products.find(p => p.id == e.target.value) || products[0])}
            >
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
        </div>
        {product && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="glass rounded-[2.5rem] overflow-hidden border-white/20 shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-40">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 text-center">
                    <h4 className="text-sm font-black text-gray-900 truncate">{product.name}</h4>
                    <p className="text-blue-600 font-black text-sm">₹{(product.price/100000).toFixed(1)}L</p>
                </div>
            </motion.div>
        )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 glass rounded-2xl text-blue-600 mb-4">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Quad-Model Comparison</h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">Analyze our entire engineering lineup side-by-side.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard product={p1} setProduct={setP1} />
          <ProductCard product={p2} setProduct={setP2} />
          <ProductCard product={p3} setProduct={setP3} />
          <ProductCard product={p4} setProduct={setP4} />

          {/* Comparison Grid */}
          <div className="col-span-full mt-12">
            <div className="glass rounded-[3rem] overflow-hidden border-white/20 shadow-2xl overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest sticky left-0 bg-gray-900 z-10">Technical Data</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center">{p1?.name}</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center">{p2?.name}</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center">{p3?.name}</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-center">{p4?.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {specKeys.map(key => (
                    <tr key={key} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-8 py-6 font-bold text-gray-400 text-xs uppercase tracking-wider sticky left-0 bg-white/80 backdrop-blur-md z-10">{key}</td>
                      <td className="px-8 py-6 text-center font-black text-gray-900">{p1 ? getSpecValue(p1.specifications, key) : "-"}</td>
                      <td className="px-8 py-6 text-center font-black text-gray-900">{p2 ? getSpecValue(p2.specifications, key) : "-"}</td>
                      <td className="px-8 py-6 text-center font-black text-gray-900">{p3 ? getSpecValue(p3.specifications, key) : "-"}</td>
                      <td className="px-8 py-6 text-center font-black text-gray-900">{p4 ? getSpecValue(p4.specifications, key) : "-"}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-8 py-8 font-bold text-gray-400 text-xs uppercase tracking-wider sticky left-0 bg-white/80 backdrop-blur-md z-10">Smart Ready</td>
                    <td className="px-8 py-8 text-center text-green-600 font-black"><Check className="w-5 h-5 mx-auto"/></td>
                    <td className="px-8 py-8 text-center text-green-600 font-black"><Check className="w-5 h-5 mx-auto"/></td>
                    <td className="px-8 py-8 text-center text-green-600 font-black"><Check className="w-5 h-5 mx-auto"/></td>
                    <td className="px-8 py-8 text-center text-green-600 font-black"><Check className="w-5 h-5 mx-auto"/></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
