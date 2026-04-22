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
          <Footer />
        </div>
      </body>
    </html>
  );
}
