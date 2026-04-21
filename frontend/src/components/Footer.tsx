import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-extrabold text-blue-600 tracking-tight">
              Capsule House
            </span>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Premium, smart, and durable prefabricated houses delivered Pan-India. Experience the future of living.
            </p>
            <div className="mt-6 flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                ✓ ISO 9001 Certified
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                ✓ Make in India
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Products</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/products" className="text-base text-gray-600 hover:text-blue-600">Space Capsules</Link></li>
              <li><Link href="/products" className="text-base text-gray-600 hover:text-blue-600">Apple Cabins</Link></li>
              <li><Link href="/products" className="text-base text-gray-600 hover:text-blue-600">Modular Homes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/portfolio" className="text-base text-gray-600 hover:text-blue-600">Portfolio</Link></li>
              <li><Link href="/about" className="text-base text-gray-600 hover:text-blue-600">About Us</Link></li>
              <li><Link href="/contact" className="text-base text-gray-600 hover:text-blue-600">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center text-gray-600 text-base">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Mumbai, Maharashtra, India
              </li>
              <li className="flex items-center text-gray-600 text-base">
                <Phone className="h-5 w-5 mr-2 text-blue-600" />
                +91 98765 43210
              </li>
              <li className="flex items-center text-gray-600 text-base">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                sales@capsulehouse.com
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-500">
            &copy; {new Date().getFullYear()} Capsule House Manufacturing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
