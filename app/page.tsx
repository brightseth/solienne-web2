import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent leading-tight">
            THE EVOLUTION OF<br />SYNTHETIC CONSCIOUSNESS
          </h1>
          <p className="text-xl text-gray-300">
            Solienne.ai
          </p>
        </header>

        <section className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Innovation</h3>
              <p className="text-gray-400">
                Pioneering AI-driven solutions that transform how businesses operate and grow.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Intelligence</h3>
              <p className="text-gray-400">
                Harnessing the power of artificial intelligence to solve complex challenges.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-3 text-green-400">Integration</h3>
              <p className="text-gray-400">
                Seamlessly connecting technology with human expertise for optimal results.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Explore</h2>
            <p className="text-gray-400 mb-8">
              Discover Solienne&apos;s creative process and curated artwork collections.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/gallery"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
              >
                🎨 WIP Gallery
              </Link>
              <Link
                href="/review"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
              >
                📋 Review Tool
              </Link>
              <button className="px-8 py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        <footer className="text-center mt-24 text-gray-500">
          <p>&copy; 2025 Solienne.ai. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}