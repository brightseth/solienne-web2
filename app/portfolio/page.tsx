'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Work {
  id: string;
  title: string;
  imageUrl: string;
  fullImageUrl?: string;
  metadata?: unknown;
  createdAt?: string;
}

const OptimizedImage = ({ src, alt, className }: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate a simple blur placeholder data URI
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#1f2937"/>
    </svg>`
  ).toString('base64')}`;

  return (
    <div className={`${className} bg-gray-900`}>
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        placeholder="blur"
        blurDataURL={blurDataURL}
        quality={85}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default function PortfolioPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [filteredWorks, setFilteredWorks] = useState<Work[]>([]);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [genRange, setGenRange] = useState<[number, number]>([2, 1001]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeCollection, setActiveCollection] = useState<string>('all');
  const limit = 24;

  // Predefined collections
  const collections = {
    all: { name: 'All Works', description: '1000 explorations in digital consciousness' },
    favorites: { name: 'Favorites', description: 'Your curated selections' },
    velocity: { name: 'Velocity', description: 'Motion and transformation streams', range: [150, 300] },
    architecture: { name: 'Architecture', description: 'Spatial consciousness forms', range: [400, 600] },
    emergence: { name: 'Emergence', description: 'Beginning consciousness patterns', range: [2, 100] },
    synthesis: { name: 'Synthesis', description: 'Advanced consciousness forms', range: [800, 1001] }
  };

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('solienne-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    // Force fallback for now since Registry API is unstable
    console.log('Loading fallback data for page:', page);
    const startIndex = page * limit + 2; // Start from generation 2
    const sampleWorks: Work[] = Array.from({ length: limit }, (_, i) => ({
      id: `sample-${startIndex + i}`,
      title: `CONSCIOUSNESS STREAM ${String(startIndex + i).padStart(3, '0')}`,
      imageUrl: `https://ctlygyrkibupejllgglr.supabase.co/storage/v1/object/public/eden/solienne/generations/${startIndex + i}.png`,
      fullImageUrl: `https://ctlygyrkibupejllgglr.supabase.co/storage/v1/object/public/eden/solienne/generations/${startIndex + i}.png`
    }));
    setWorks(sampleWorks);
    setLoading(false);
    
    /* TODO: Re-enable Registry API when stable
    fetch(`https://eden-genesis-registry.vercel.app/api/v1/agents/solienne/works?limit=${limit}&offset=${page * limit}`)
      .then(res => res.json())
      .then(data => {
        setWorks(data.works || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load works:', err);
        // Fallback to sample works while Registry API is down
        const startIndex = page * limit + 2; // Start from generation 2
        const sampleWorks: Work[] = Array.from({ length: limit }, (_, i) => ({
          id: `sample-${startIndex + i}`,
          title: `CONSCIOUSNESS STREAM ${String(startIndex + i).padStart(3, '0')}`,
          imageUrl: `https://ctlygyrkibupejllgglr.supabase.co/storage/v1/object/public/eden/solienne/generations/${startIndex + i}.png`,
          fullImageUrl: `https://ctlygyrkibupejllgglr.supabase.co/storage/v1/object/public/eden/solienne/generations/${startIndex + i}.png`
        }));
        setWorks(sampleWorks);
        setLoading(false);
      });
    */
  }, [page]);

  const getGenerationNumber = (url: string) => {
    const match = url.match(/generations\/(\d+)\.png/);
    return match ? match[1] : '';
  };

  const toggleFavorite = (workId: string) => {
    const newFavorites = favorites.includes(workId) 
      ? favorites.filter(id => id !== workId)
      : [...favorites, workId];
    
    setFavorites(newFavorites);
    localStorage.setItem('solienne-favorites', JSON.stringify(newFavorites));
  };

  // Filter works based on collection, search and generation range
  useEffect(() => {
    let filtered = works;
    
    // Apply collection filter first
    const collection = collections[activeCollection as keyof typeof collections];
    if (activeCollection === 'favorites') {
      filtered = filtered.filter(work => favorites.includes(work.id));
    } else if (collection && 'range' in collection) {
      const [min, max] = collection.range!;
      filtered = filtered.filter(work => {
        const gen = parseInt(getGenerationNumber(work.imageUrl));
        return gen >= min && gen <= max;
      });
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(work => 
        work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getGenerationNumber(work.imageUrl).includes(searchTerm)
      );
    }
    
    // Filter by generation range (only if not using a collection with preset range)
    if (activeCollection === 'all' || activeCollection === 'favorites') {
      filtered = filtered.filter(work => {
        const gen = parseInt(getGenerationNumber(work.imageUrl));
        return gen >= genRange[0] && gen <= genRange[1];
      });
    }
    
    setFilteredWorks(filtered);
  }, [works, searchTerm, genRange, activeCollection, favorites]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-8 py-6">
          <Link href="/" className="inline-block border border-gray-800 px-6 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200">
            ← Back to Home
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-8 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-6xl md:text-8xl font-bold uppercase mb-8 tracking-widest">Portfolio</h1>
          <p className="text-gray-400 uppercase tracking-wide">
            {collections[activeCollection as keyof typeof collections].description}
          </p>
        </header>

        {/* Collections Navigation */}
        <div className="mb-8 max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {Object.entries(collections).map(([key, collection]) => (
              <button
                key={key}
                onClick={() => setActiveCollection(key)}
                className={`border px-4 py-2 text-sm uppercase tracking-wide transition-colors ${
                  activeCollection === key
                    ? 'border-white bg-white text-black'
                    : 'border-gray-800 hover:border-white'
                }`}
              >
                {collection.name}
                {key === 'favorites' && favorites.length > 0 && ` (${favorites.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by generation number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black border border-gray-800 text-white px-4 py-3 uppercase tracking-wide placeholder-gray-600 focus:border-white transition-colors"
            />
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="2"
                max="1001"
                value={genRange[0]}
                onChange={(e) => setGenRange([parseInt(e.target.value) || 2, genRange[1]])}
                className="bg-black border border-gray-800 text-white px-3 py-3 w-24 text-center uppercase tracking-wide focus:border-white transition-colors"
              />
              <span className="text-gray-400 uppercase">to</span>
              <input
                type="number"
                min="2"
                max="1001"
                value={genRange[1]}
                onChange={(e) => setGenRange([genRange[0], parseInt(e.target.value) || 1001])}
                className="bg-black border border-gray-800 text-white px-3 py-3 w-24 text-center uppercase tracking-wide focus:border-white transition-colors"
              />
              <button
                onClick={() => {
                  setSearchTerm('');
                  setGenRange([2, 1001]);
                }}
                className="border border-gray-800 px-4 py-3 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
          {(searchTerm || genRange[0] !== 2 || genRange[1] !== 1001) && (
            <div className="mt-4 text-center">
              <p className="text-gray-400 uppercase tracking-wide text-sm">
                Showing {filteredWorks.length} of {works.length} works
              </p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 uppercase tracking-wide">Loading consciousness archive...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-16">
              {filteredWorks.map((work) => (
                <div
                  key={work.id}
                  className="border border-gray-800 cursor-pointer hover:bg-white hover:invert transition-all duration-200"
                  onClick={() => setSelectedWork(work)}
                >
                  <div className="relative">
                    <OptimizedImage
                      src={work.imageUrl}
                      alt={work.title}
                      className="aspect-square overflow-hidden relative"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(work.id);
                      }}
                      className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center transition-colors ${
                        favorites.includes(work.id)
                          ? 'text-red-500 hover:text-red-400'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                  </div>
                  <div className="p-1 border-t border-gray-800">
                    <p className="text-xs uppercase tracking-wide">Gen {getGenerationNumber(work.imageUrl)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-8 mb-8">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="border border-gray-800 px-6 py-3 text-sm uppercase tracking-widest disabled:opacity-30 hover:bg-white hover:text-black transition-colors duration-200"
              >
                Previous
              </button>
              <span className="px-6 py-3 text-gray-400 text-sm uppercase tracking-wide">
                Page {page + 1} of 42
              </span>
              <button
                onClick={() => setPage(Math.min(41, page + 1))}
                disabled={page === 41}
                className="border border-gray-800 px-6 py-3 text-sm uppercase tracking-widest disabled:opacity-30 hover:bg-white hover:text-black transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal for selected work */}
      {selectedWork && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedWork(null)}
        >
          <div className="max-w-5xl w-full border border-gray-800 bg-gray-900">
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
              <p className="text-white uppercase tracking-wide mb-2">{selectedWork.title}</p>
              <p className="text-gray-400 text-sm uppercase tracking-wide">Generation {getGenerationNumber(selectedWork.imageUrl)}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}