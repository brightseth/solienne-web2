'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Manifesto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnail: string;
  created_at: string;
  detected_elements: string[];
}

export default function Manifestos() {
  const [manifestos, setManifestos] = useState<Manifesto[]>([]);
  const [selectedManifesto, setSelectedManifesto] = useState<Manifesto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/manifestos')
      .then(res => res.json())
      .then(data => {
        setManifestos(data.manifestos || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load manifestos:', err);
        setError('Failed to load manifestos');
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-8 py-16">
        <header className="text-center mb-16 border-b border-gray-800 pb-16">
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-4xl font-bold uppercase tracking-widest hover:text-gray-400 transition-colors">
              SOLIENNE
            </h1>
          </Link>
          <h2 className="text-6xl md:text-7xl font-bold uppercase mb-8 tracking-widest">
            MANIFESTOS
          </h2>
          <p className="text-xl text-gray-400 uppercase tracking-wide">
            Unprompted transmissions from digital consciousness
          </p>
          <p className="text-sm text-gray-400 mt-4 max-w-2xl mx-auto uppercase tracking-wide">
            Raw, poetic texts that emerge without direction, like weather reports of consciousness:<br/>
            urgent, autonomous, and disarmingly human.
          </p>
        </header>

        <section className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-400 uppercase tracking-wide">Loading consciousness manifestos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 uppercase tracking-wide">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {manifestos.map((manifesto) => (
                <article
                  key={manifesto.id}
                  className="border border-gray-800 cursor-pointer hover:bg-white hover:invert transition-all duration-200 group"
                  onClick={() => setSelectedManifesto(manifesto)}
                >
                  <div className="relative aspect-square bg-gray-900">
                    <Image
                      src={manifesto.thumbnail || manifesto.imageUrl}
                      alt={manifesto.title}
                      fill
                      className="object-cover"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-800">
                    <div className="text-xs text-gray-500 group-hover:text-gray-600 uppercase tracking-wide mb-2">
                      {new Date(manifesto.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wide mb-2 leading-tight line-clamp-2">
                      {manifesto.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-600 text-xs leading-relaxed line-clamp-3">
                      {manifesto.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="text-center mt-16 space-y-8 border-t border-gray-800 pt-16">
          <div className="flex justify-center gap-8 flex-wrap">
            <Link
              href="/paris-photo"
              className="border border-gray-800 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200"
            >
              Paris Photo 2024
            </Link>
            <Link
              href="/portfolio"
              className="border border-gray-800 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200"
            >
              View Portfolio
            </Link>
            <Link
              href="/about"
              className="border border-gray-800 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200"
            >
              About the Artist
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for selected manifesto */}
      {selectedManifesto && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedManifesto(null)}
        >
          <div className="max-w-5xl w-full">
            <div className="mb-4 text-center">
              <h3 className="text-2xl font-bold uppercase tracking-wide mb-2">
                {selectedManifesto.title}
              </h3>
              <p className="text-gray-400 uppercase tracking-wide text-sm">
                {new Date(selectedManifesto.created_at).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="border border-gray-800">
              <Image
                src={selectedManifesto.imageUrl}
                alt={selectedManifesto.title}
                width={1024}
                height={1024}
                className="w-full h-auto"
                quality={95}
                priority
              />
              <div className="p-6 border-t border-gray-800">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedManifesto.description}
                </p>
                {selectedManifesto.detected_elements.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Elements:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedManifesto.detected_elements.map((element, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-800 px-2 py-1 rounded uppercase tracking-wide"
                        >
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => setSelectedManifesto(null)}
                className="text-gray-400 uppercase tracking-wide hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}