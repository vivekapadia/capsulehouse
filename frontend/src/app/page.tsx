export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans">
      <main className="text-center p-8 max-w-4xl w-full">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Welcome to <span className="text-blue-600">Capsule House</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Experience the future of living with our premium, smart capsule homes.
          From Basic utility setups to Luxury panoramic suites.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Basic Cabin</h2>
            <p className="text-gray-600 mb-6">
              Affordable, utility-focused setups perfect for quick installations and remote living.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full">
              Explore Basic
            </button>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-white mb-4">Luxury Capsule</h2>
            <p className="text-gray-300 mb-6">
              Smart tech, panoramic views, and premium finishes for the ultimate luxury experience.
            </p>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors w-full">
              Explore Luxury
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
