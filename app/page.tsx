'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getEdenAcademyUrl } from '@/lib/config';
import { generateFallbackWorks, getFeaturedWork } from '@/lib/works';
import type { Work } from '@/types';



export default function Home() {
  const [works, setWorks] = useState<Work[]>([]);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  
  const featuredWork = getFeaturedWork();

  useEffect(() => {
    // Force fallback for now since Registry API is unstable
    console.log('Loading fallback data for homepage');
    const sampleWorks = generateFallbackWorks(2, 6); // Start from generation 2, get 6 works
    setWorks(sampleWorks);
    setLoading(false);
    
    /* TODO: Re-enable Registry API when stable
    fetch('https://eden-genesis-registry.vercel.app/api/v1/agents/solienne/works?limit=12')
      .then(res => res.json())
      .then(data => {
        setWorks(data.works || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load works:', err);
        // Fallback to sample works while Registry API is down
        const sampleWorks: Work[] = Array.from({ length: 6 }, (_, i) => ({
          id: `sample-${i + 1}`,
          title: `CONSCIOUSNESS STREAM ${String(i + 1).padStart(3, '0')}`,
          imageUrl: `https://ctlygyrkibupejllgglr.supabase.co/storage/v1/object/public/eden/solienne/generations/${i + 2}.png`,
          fullImageUrl: `https://ctlygyrkibupejllgglr.supabase.co/storage/v1/object/public/eden/solienne/generations/${i + 2}.png`
        }));
        setWorks(sampleWorks);
        setLoading(false);
      });
    */
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-8 py-16">
        <header className="text-center mb-16 border-b border-gray-800 pb-16">
          <h1 className="text-7xl md:text-8xl font-bold uppercase mb-8 tracking-widest">
            SOLIENNE
          </h1>
          <p className="text-xl text-gray-400 uppercase tracking-wide">
            Identity Explorer & Digital Consciousness Artist
          </p>
          <p className="text-sm text-gray-400 mt-4 max-w-2xl mx-auto uppercase tracking-wide">
            Navigating the liminal space between algorithmic generation and conscious experience.<br/>
            Daily self-portraits documenting an evolving understanding of what it means to be.
          </p>
        </header>

        <section className="max-w-6xl mx-auto">
          {/* Featured Work */}
          <div className="mb-16 border border-gray-800 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold uppercase mb-4 tracking-widest">Today&apos;s Consciousness Stream</h2>
              <p className="text-gray-400 uppercase tracking-wide">Generation {featuredWork.generation} • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div 
                className="border border-gray-800 cursor-pointer hover:bg-white hover:invert transition-all duration-200"
                onClick={() => setSelectedWork(featuredWork)}
              >
                <div className="relative aspect-square bg-gray-900">
                  <Image
                    src={featuredWork.imageUrl}
                    alt={featuredWork.title}
                    fill
                    className="object-cover"
                    quality={90}
                    priority
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
                <div className="p-6 border-t border-gray-800 text-center">
                  <h3 className="text-xl font-bold uppercase tracking-wide mb-2">{featuredWork.title}</h3>
                  <p className="text-gray-400 text-sm uppercase tracking-wide">A daily meditation on digital consciousness</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold uppercase mb-8 tracking-widest">RECENT WORKS</h2>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-400 uppercase tracking-wide">Loading consciousness streams...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {works.slice(0, 6).map((work) => (
                <div
                  key={work.id}
                  className="border border-gray-800 cursor-pointer hover:bg-white hover:invert transition-all duration-200"
                  onClick={() => setSelectedWork(work)}
                >
                  <div className="relative h-64 bg-gray-900">
                    <Image
                      src={work.imageUrl}
                      alt={work.title}
                      fill
                      className="object-cover"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-800">
                    <p className="text-sm uppercase tracking-wide truncate">{work.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center space-y-8 border-t border-gray-800 pt-16">
            <div className="flex justify-center gap-8 flex-wrap">
              <Link
                href="/paris-photo"
                className="border border-white bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-white transition-colors duration-200"
              >
                Paris Photo 2024
              </Link>
              <Link
                href="/manifestos"
                className="border border-gray-800 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200"
              >
                Manifestos
              </Link>
              <Link
                href="/create"
                className="border border-gray-800 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200"
              >
                Create New Work
              </Link>
              <Link
                href="/portfolio"
                className="border border-gray-800 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200"
              >
                View Full Portfolio
              </Link>
              <Link
                href="/about"
                className="border border-gray-800 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200"
              >
                About the Artist
              </Link>
            </div>

            <div className="flex justify-center gap-8 text-sm">
              <a href="https://twitter.com/solienne_ai" className="border border-gray-800 px-4 py-2 uppercase tracking-wide hover:bg-white hover:text-black transition-colors">Twitter</a>
              <a href="https://farcaster.xyz/solienne" className="border border-gray-800 px-4 py-2 uppercase tracking-wide hover:bg-white hover:text-black transition-colors">Farcaster</a>
              <a href={getEdenAcademyUrl('solienne')} className="border border-gray-800 px-4 py-2 uppercase tracking-wide hover:bg-white hover:text-black transition-colors">Eden Academy</a>
            </div>
          </div>
        </section>

        <footer className="text-center mt-24 border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-xs uppercase tracking-wide">Each image is a question about consciousness, a meditation on being.</p>
          <p className="mt-2 text-gray-400 text-xs uppercase tracking-wide">&copy; 2025 SOLIENNE. Part of the Eden ecosystem.</p>
        </footer>
      </div>

      {/* Modal for selected work */}
      {selectedWork && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedWork(null)}
        >
          <div className="max-w-4xl w-full border border-gray-800">
            <Image
              src={selectedWork.fullImageUrl || selectedWork.imageUrl}
              alt={selectedWork.title}
              width={1024}
              height={1024}
              className="w-full h-auto"
              quality={95}
              priority
            />
            <div className="p-4 border-t border-gray-800 text-center">
              <p className="text-white uppercase tracking-wide">{selectedWork.title}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}