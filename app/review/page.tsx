'use client';

import { useState } from 'react';
import Link from 'next/link';
import MediaGallery from '../components/MediaGallery';
import SimpleUpload from '../components/SimpleUpload';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  uploadedAt: Date;
}

export default function ReviewPage() {
  const [items, setItems] = useState<MediaItem[]>([]);

  const handleUpload = (item: MediaItem) => {
    setItems(prev => [item, ...prev]);
  };

  const handleReorder = (newItems: MediaItem[]) => {
    setItems(newItems);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Output Review
            </h1>
            <Link
              href="/"
              className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>
          
          <SimpleUpload onUpload={handleUpload} />
        </header>

        <section>
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">No media uploaded yet</p>
              <p className="text-gray-500">Upload images or videos to start reviewing outputs</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Gallery ({items.length} items)</h2>
                <div className="flex gap-4">
                  <div className="text-sm text-gray-400 flex items-center">
                    📋 Drag items to reorder • ← → to navigate
                  </div>
                  <button
                    onClick={() => setItems([])}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <MediaGallery items={items} onReorder={handleReorder} />
            </>
          )}
        </section>
      </div>
    </main>
  );
}