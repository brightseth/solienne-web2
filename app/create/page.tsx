'use client';
import GenerationStudio from '../components/GenerationStudio';
import Link from 'next/link';

export default function CreatePage() {
  return (
    <main className="bg-black text-white min-h-screen" style={{fontFamily: 'Helvetica Neue, Arial, sans-serif'}}>
      <div className="border-b border-gray-800 p-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold uppercase tracking-widest hover:text-gray-400 transition-colors duration-200">
            ← SOLIENNE
          </Link>
          <div className="text-right">
            <h1 className="text-6xl font-bold uppercase tracking-widest">
              CREATE
            </h1>
          </div>
        </div>
      </div>

      <GenerationStudio />

      <footer className="border-t border-gray-800 p-8">
        <div className="flex justify-center gap-8 mb-6">
          <Link
            href="/"
            className="border border-white bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-white transition-all duration-200"
          >
            RETURN TO GALLERY
          </Link>
          <Link
            href="/portfolio"
            className="border border-gray-800 px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-200"
          >
            VIEW PORTFOLIO
          </Link>
        </div>
        <p className="text-center text-gray-400 text-xs uppercase tracking-wide">
          POWERED BY SUE&apos;S CURATORIAL ANALYSIS • PART OF THE EDEN ECOSYSTEM
        </p>
      </footer>
    </main>
  );
}