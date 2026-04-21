import Image from "next/image";

export default function PortfolioPage() {
  return (
    <div className="bg-white min-h-screen py-20 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">Our Portfolio</h1>
        <p className="max-w-2xl text-xl text-gray-600 mx-auto mb-16">
          See our Space Capsules and Apple Cabins installed in real-world locations across India.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden shadow-lg h-80 relative">
            <Image src="/images/space-capsule.jpg" alt="Space Capsule Resort" fill className="object-cover" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-left">
              <h3 className="text-white font-bold text-xl">Eco-Resort, Lonavala</h3>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg h-80 relative">
            <Image src="/images/apple-cabin.jpg" alt="Apple Cabin Office" fill className="object-cover" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-left">
              <h3 className="text-white font-bold text-xl">Remote Workspace, Bangalore</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
