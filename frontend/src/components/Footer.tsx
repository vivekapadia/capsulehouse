import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass p-12 md:p-20 rounded-[4rem] shadow-2xl border-white/40">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-1">
              <span className="text-3xl font-black text-blue-600 tracking-tighter">
                CAPSULE<span className="text-gray-900">HOUSE</span>
              </span>
              <p className="mt-8 text-gray-500 font-medium leading-relaxed">
                Premium, smart, and durable prefabricated houses delivered Pan-India. Experience the future of living with our enterprise-grade solutions.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="glass-dark px-3 py-1 rounded-lg text-[10px] font-black text-gray-800 uppercase tracking-widest">ISO 9001</span>
                <span className="glass-dark px-3 py-1 rounded-lg text-[10px] font-black text-blue-600 uppercase tracking-widest">Make in India</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Products</h3>
              <ul className="space-y-4">
                <li><Link href="/products?category=Luxury" className="text-gray-600 hover:text-blue-600 font-bold transition-colors">Space Capsules</Link></li>
                <li><Link href="/products?category=Utility" className="text-gray-600 hover:text-blue-600 font-bold transition-colors">Apple Cabins</Link></li>
                <li><Link href="/products?category=Off-Grid" className="text-gray-600 hover:text-blue-600 font-bold transition-colors">Modular Homes</Link></li>
                <li><Link href="/products?category=Resort" className="text-gray-600 hover:text-blue-600 font-bold transition-colors">Glamping Pods</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Company</h3>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-gray-600 hover:text-blue-600 font-bold transition-colors">About Us</Link></li>
                <li><Link href="/portfolio" className="text-gray-600 hover:text-blue-600 font-bold transition-colors">Portfolio</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-blue-600 font-bold transition-colors">Contact</Link></li>
                <li><Link href="/admin" className="text-gray-400 hover:text-blue-600 font-bold transition-colors text-sm">Admin Portal</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Connect</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="glass-dark p-2 rounded-lg"><MapPin className="h-5 w-5 text-blue-600" /></div>
                  <span className="text-gray-600 font-bold text-sm">Mumbai, Maharashtra, India</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="glass-dark p-2 rounded-lg"><Phone className="h-5 w-5 text-blue-600" /></div>
                  <span className="text-gray-600 font-bold text-sm">+91 98765 43210</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="glass-dark p-2 rounded-lg"><Mail className="h-5 w-5 text-blue-600" /></div>
                  <span className="text-gray-600 font-bold text-sm">sales@capsulehouse.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-20 pt-10 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Capsule House Manufacturing. All rights reserved.
            </p>
            <div className="flex gap-8">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors">Privacy Policy</span>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
