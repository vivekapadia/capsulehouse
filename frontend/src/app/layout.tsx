import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capsule House | Premium Prefabricated Homes",
  description: "Experience the future of living with our premium, smart capsule homes delivered Pan-India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen relative overflow-x-hidden bg-white">
        {/* Animated Background Blobs for Glassmorphism Effect */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-indigo-100/40 blur-[100px] animate-bounce" style={{ animationDuration: '15s' }}></div>
          <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] rounded-full bg-purple-100/30 blur-[80px]"></div>
        </div>
        
        <div className="min-h-full flex flex-col pt-32">
          <Navbar />
          <main className="flex-grow">{children}</main>
          {/* Global WhatsApp FAB */}
          <a 
            href="https://wa.me/919876543210?text=Hi! I'm interested in Capsule House products. Could you help me?"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.438-9.89 9.886-.001 2.125.593 3.456 1.574 5.111l-.973 3.558 3.689-.969zm11.381-7.712c-.301-.15-1.779-.879-2.053-.979-.275-.1-.475-.15-.675.15-.199.299-.775.979-.95 1.174-.175.194-.35.219-.65.069-.3-.15-1.269-.467-2.417-1.492-.893-.796-1.496-1.78-1.671-2.079-.175-.3-.019-.462.131-.611.135-.134.3-.349.45-.524.149-.175.199-.299.299-.499.1-.2.05-.374-.025-.524-.075-.15-.675-1.624-.925-2.224-.244-.584-.491-.504-.675-.514-.175-.01-.375-.012-.575-.012-.2 0-.525.075-.8.374-.275.299-1.05 1.024-1.05 2.499 0 1.475 1.075 2.899 1.225 3.099.15.2 2.115 3.229 5.123 4.529.714.309 1.272.494 1.707.633.717.227 1.369.195 1.884.118.574-.085 1.779-.724 2.029-1.424.25-.699.25-1.299.175-1.424-.075-.124-.275-.199-.575-.349z"/>
            </svg>
          </a>
          <Footer />
        </div>
      </body>
    </html>
  );
}
