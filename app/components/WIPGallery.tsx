/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import type { Artwork } from '../gallery/page';

interface WIPGalleryProps {
  artworks: Artwork[];
  onReorder: (newArtworks: Artwork[]) => void;
  onUpdate: (artwork: Artwork) => void;
}

interface EditData {
  title?: string;
  category?: 'concept' | 'draft' | 'final' | 'experiment';
  rating?: number;
  notes?: string;
  tags?: string;
}

export default function WIPGallery({ artworks, onReorder, onUpdate }: WIPGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<EditData>({});

  const selectedArtwork = selectedIndex !== null ? artworks[selectedIndex] : null;

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null || editMode) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const newIndex = selectedIndex > 0 ? selectedIndex - 1 : artworks.length - 1;
        setSelectedIndex(newIndex);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const newIndex = selectedIndex < artworks.length - 1 ? selectedIndex + 1 : 0;
        setSelectedIndex(newIndex);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (editMode) {
          setEditMode(false);
          setEditData({});
        } else {
          setSelectedIndex(null);
        }
      }
    };

    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedIndex, artworks.length, editMode]);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setEditMode(false);
    setEditData({});
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : artworks.length - 1;
    setSelectedIndex(newIndex);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex < artworks.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
  };

  const startEdit = () => {
    if (!selectedArtwork) return;
    setEditData({
      title: selectedArtwork.title,
      category: selectedArtwork.category,
      rating: selectedArtwork.rating,
      notes: selectedArtwork.notes,
      tags: selectedArtwork.tags.join(', ')
    });
    setEditMode(true);
  };

  const saveEdit = () => {
    if (!selectedArtwork || !editData) return;
    
    const updatedArtwork: Artwork = {
      ...selectedArtwork,
      title: editData.title || selectedArtwork.title,
      category: editData.category || selectedArtwork.category,
      rating: editData.rating || selectedArtwork.rating,
      notes: editData.notes || selectedArtwork.notes,
      tags: typeof editData.tags === 'string' 
        ? editData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : selectedArtwork.tags
    };

    onUpdate(updatedArtwork);
    setEditMode(false);
    setEditData({});
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newArtworks = [...artworks];
    const draggedItem = newArtworks[draggedIndex];
    
    newArtworks.splice(draggedIndex, 1);
    newArtworks.splice(dropIndex, 0, draggedItem);
    
    onReorder(newArtworks);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'concept': return 'purple';
      case 'draft': return 'blue';
      case 'final': return 'green';
      case 'experiment': return 'orange';
      default: return 'gray';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'concept': return '💭';
      case 'draft': return '📝';
      case 'final': return '✨';
      case 'experiment': return '🧪';
      default: return '📄';
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artworks.map((artwork, index) => {
          const color = getCategoryColor(artwork.category);
          return (
            <div
              key={artwork.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-200 ${
                draggedIndex === index ? 'opacity-50 scale-95' : ''
              } ${
                dragOverIndex === index && draggedIndex !== index
                  ? `ring-2 ring-${color}-400 scale-110`
                  : ''
              }`}
              onClick={() => handleItemClick(index)}
            >
              <div className="aspect-square overflow-hidden">
                {artwork.type === 'image' ? (
                  <img
                    src={artwork.url}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <video
                    src={artwork.url}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                )}
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm truncate flex-1 mr-2">{artwork.title}</h3>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-xs ${i < artwork.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded bg-${color}-500/10 text-${color}-300 text-xs`}>
                    <span>{getCategoryIcon(artwork.category)}</span>
                    <span className="capitalize">{artwork.category}</span>
                  </div>
                  <div className="text-xs text-gray-400">#{index + 1}</div>
                </div>

                {artwork.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {artwork.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs bg-white/10 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    {artwork.tags.length > 3 && (
                      <span className="text-xs text-gray-400">+{artwork.tags.length - 3}</span>
                    )}
                  </div>
                )}

                {artwork.notes && (
                  <p className="text-xs text-gray-400 line-clamp-2">{artwork.notes}</p>
                )}
              </div>

              <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs">
                {artwork.type === 'video' ? '▶️' : '🖼️'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedArtwork && selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="max-w-7xl w-full h-full flex gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Image/Video */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative max-w-full max-h-full">
                {selectedArtwork.type === 'image' ? (
                  <img
                    src={selectedArtwork.url}
                    alt={selectedArtwork.title}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                ) : (
                  <video
                    src={selectedArtwork.url}
                    className="max-w-full max-h-[80vh]"
                    controls
                    autoPlay
                  />
                )}

                {/* Navigation arrows */}
                {artworks.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:opacity-70 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
                    >
                      ←
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:opacity-70 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 bg-slate-800 rounded-xl p-6 overflow-y-auto">
              {editMode ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Edit Artwork</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={editData.title || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:border-purple-400 outline-none"
                    placeholder="Title"
                  />

                  <select
                    value={editData.category || selectedArtwork.category}
                    onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value as 'concept' | 'draft' | 'final' | 'experiment' }))}
                    className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:border-purple-400 outline-none"
                  >
                    <option value="concept">💭 Concept</option>
                    <option value="draft">📝 Draft</option>
                    <option value="final">✨ Final</option>
                    <option value="experiment">🧪 Experiment</option>
                  </select>

                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditData(prev => ({ ...prev, rating: star }))}
                          className={`text-2xl ${
                            star <= (editData.rating || selectedArtwork.rating) ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={editData.notes || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:border-purple-400 outline-none"
                    placeholder="Notes..."
                  />

                  <input
                    type="text"
                    value={editData.tags || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:border-purple-400 outline-none"
                    placeholder="Tags (comma-separated)"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{selectedArtwork.title}</h3>
                    <button
                      onClick={startEdit}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      ✏️
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>{getCategoryIcon(selectedArtwork.category)}</span>
                    <span className="capitalize text-sm">{selectedArtwork.category}</span>
                  </div>

                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-xl ${i < selectedArtwork.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>

                  {selectedArtwork.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedArtwork.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-sm bg-white/10 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {selectedArtwork.notes && (
                    <div>
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">{selectedArtwork.notes}</p>
                    </div>
                  )}

                  <div className="text-xs text-gray-500">
                    Uploaded {selectedArtwork.uploadedAt.toLocaleDateString()}
                  </div>
                </div>
              )}

              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white text-2xl hover:opacity-70 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
                onClick={closeModal}
              >
                ✕
              </button>

              {/* Image counter and shortcuts */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 px-4 py-2 rounded text-center text-sm text-white mb-2">
                  {selectedIndex + 1} of {artworks.length}
                </div>
                <div className="bg-black/70 px-3 py-2 rounded text-center text-xs text-white">
                  ← → to navigate • ESC to close
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}