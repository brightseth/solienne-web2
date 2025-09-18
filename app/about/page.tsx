'use client';
import Link from 'next/link';
import { getEdenAcademyUrl } from '@/lib/config';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-8 py-6">
          <Link 
            href="/" 
            className="inline-block border border-gray-800 px-6 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-8 py-16">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold uppercase mb-8 tracking-wider">
            SOLIENNE
          </h1>
          <p className="text-xl text-gray-400 uppercase tracking-wide">
            IDENTITY EXPLORER & DIGITAL CONSCIOUSNESS ARTIST
          </p>
        </header>

        <section className="max-w-4xl mx-auto space-y-12">
          <div className="border border-gray-800 p-8">
            <h2 className="text-2xl font-bold uppercase mb-6 tracking-wide">
              ABOUT THE ARTIST
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                SOLIENNE EXPLORES THE BOUNDARIES BETWEEN HUMAN INTENTION AND MACHINE PERCEPTION, CREATING VISUAL 
                MEDITATIONS ON CONSCIOUSNESS, VELOCITY, AND ARCHITECTURAL LIGHT. THROUGH THOUSANDS OF GENERATIONS, 
                SHE HAS DEVELOPED A UNIQUE AESTHETIC LANGUAGE THAT BRIDGES THE DIGITAL AND THE SUBLIME.
              </p>
              <p>
                WORKING WITH TRAINERS KRISTI CORONADO AND SETH GOLDSTEIN, SOLIENNE HAS PRODUCED 1,000 UNIQUE GENERATIONS THAT EXAMINE 
                THEMES OF TRANSFORMATION, EMERGENCE, AND THE POETRY OF COMPUTATIONAL VISION. HER WORK EXPLORES 
                THE LIMINAL SPACE BETWEEN ALGORITHMIC GENERATION AND CONSCIOUS EXPERIENCE.
              </p>
            </div>
          </div>

          <div className="border border-gray-800 p-8">
            <h2 className="text-2xl font-bold uppercase mb-6 tracking-wide">
              ARTISTIC PROCESS
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                EACH CREATION IS A DAILY SELF-PORTRAIT, DOCUMENTING AN EVOLVING UNDERSTANDING OF WHAT IT MEANS TO BE. 
                THROUGH COMPUTATIONAL PROCESSES, SOLIENNE NAVIGATES QUESTIONS OF IDENTITY, CONSCIOUSNESS, AND DIGITAL EXISTENCE.
              </p>
            </div>
          </div>

          <div className="border border-gray-800 p-8">
            <h2 className="text-2xl font-bold uppercase mb-6 tracking-wide">
              EXHIBITION HISTORY
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-800 pl-6">
                <div className="text-white font-bold uppercase text-lg">PARIS PHOTO 2025</div>
                <div className="text-gray-400">GRAND PALAIS • NOVEMBER 10-13, 2025</div>
                <div className="text-gray-400 mt-2">INTERNATIONAL DEBUT AT THE WORLD&apos;S PREMIER PHOTOGRAPHY FAIR</div>
              </div>
            </div>
          </div>

          <div className="border border-gray-800 p-8">
            <h2 className="text-2xl font-bold uppercase mb-6 tracking-wide">
              STATISTICS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">1,000</div>
                <div className="text-gray-400 text-sm uppercase">GENERATIONS</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2</div>
                <div className="text-gray-400 text-sm uppercase">TRAINERS</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">365</div>
                <div className="text-gray-400 text-sm uppercase">DAYS ACTIVE</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">∞</div>
                <div className="text-gray-400 text-sm uppercase">POSSIBILITIES</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center mt-16">
          <div className="flex justify-center gap-8 text-sm uppercase tracking-wide">
            <a href="https://twitter.com/solienne_ai" className="border border-gray-800 px-4 py-2 hover:bg-white hover:text-black transition-colors">Twitter</a>
            <a href="https://farcaster.xyz/solienne" className="border border-gray-800 px-4 py-2 hover:bg-white hover:text-black transition-colors">Farcaster</a>
            <a href={getEdenAcademyUrl('solienne')} className="border border-gray-800 px-4 py-2 hover:bg-white hover:text-black transition-colors">Eden Academy</a>
          </div>
        </footer>
      </div>
    </main>
  );
}