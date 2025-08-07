'use client';

import { useState } from 'react';
import Link from 'next/link';
import WIPGallery from '../components/WIPGallery';
import ArtworkUpload from '../components/ArtworkUpload';

export interface Artwork {
  id: string;
  url: string;
  type: 'image' | 'video';
  title: string;
  category: 'concept' | 'draft' | 'final' | 'experiment';
  rating: number; // 1-5 stars
  notes: string;
  uploadedAt: Date;
  tags: string[];
}

export default function WIPGalleryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filter, setFilter] = useState<'all' | 'concept' | 'draft' | 'final' | 'experiment'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'title'>('date');

  const handleUpload = (artwork: Artwork) => {
    setArtworks(prev => [artwork, ...prev]);
  };

  const handleReorder = (newArtworks: Artwork[]) => {
    setArtworks(newArtworks);
  };

  const handleUpdate = (updatedArtwork: Artwork) => {
    setArtworks(prev => prev.map(art => 
      art.id === updatedArtwork.id ? updatedArtwork : art
    ));
  };

  const filteredArtworks = artworks
    .filter(artwork => filter === 'all' || artwork.category === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      }
    });

  const categoryStats = {
    concept: artworks.filter(a => a.category === 'concept').length,
    draft: artworks.filter(a => a.category === 'draft').length,
    final: artworks.filter(a => a.category === 'final').length,
    experiment: artworks.filter(a => a.category === 'experiment').length,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                WIP Gallery
              </h1>
              <p className="text-gray-400 text-lg">Curate and review Solienne&apos;s artwork</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{categoryStats.concept}</div>
              <div className="text-sm text-gray-400">Concepts</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{categoryStats.draft}</div>
              <div className="text-sm text-gray-400">Drafts</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{categoryStats.final}</div>
              <div className="text-sm text-gray-400">Finals</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{categoryStats.experiment}</div>
              <div className="text-sm text-gray-400">Experiments</div>
            </div>
          </div>
          
          <ArtworkUpload onUpload={handleUpload} />
        </header>

        {artworks.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-gray-400 text-xl mb-4">No artwork uploaded yet</p>
            <p className="text-gray-500">Upload images or videos to start curating the gallery</p>
          </div>
        ) : (
          <section>
            {/* Filters and Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === 'all' 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  All ({artworks.length})
                </button>
                <button
                  onClick={() => setFilter('concept')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === 'concept' 
                      ? 'bg-purple-500/20 text-purple-300' 
                      : 'bg-white/5 text-gray-400 hover:text-purple-300'
                  }`}
                >
                  Concepts ({categoryStats.concept})
                </button>
                <button
                  onClick={() => setFilter('draft')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === 'draft' 
                      ? 'bg-blue-500/20 text-blue-300' 
                      : 'bg-white/5 text-gray-400 hover:text-blue-300'
                  }`}
                >
                  Drafts ({categoryStats.draft})
                </button>
                <button
                  onClick={() => setFilter('final')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === 'final' 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-white/5 text-gray-400 hover:text-green-300'
                  }`}
                >
                  Finals ({categoryStats.final})
                </button>
                <button
                  onClick={() => setFilter('experiment')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === 'experiment' 
                      ? 'bg-orange-500/20 text-orange-300' 
                      : 'bg-white/5 text-gray-400 hover:text-orange-300'
                  }`}
                >
                  Experiments ({categoryStats.experiment})
                </button>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'rating' | 'title')}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                >
                  <option value="date">Sort by Date</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="title">Sort by Title</option>
                </select>
                <button
                  onClick={() => setArtworks([])}
                  className="text-red-400 hover:text-red-300 transition-colors px-4 py-2"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                {filter === 'all' ? 'All Artwork' : `${filter.charAt(0).toUpperCase() + filter.slice(1)}s`}
              </h2>
              <p className="text-gray-400 text-sm">
                📋 Drag items to reorder • ← → to navigate • Click to review
              </p>
            </div>

            <WIPGallery 
              artworks={filteredArtworks} 
              onReorder={handleReorder}
              onUpdate={handleUpdate}
            />
          </section>
        )}
      </div>
    </main>
  );
}