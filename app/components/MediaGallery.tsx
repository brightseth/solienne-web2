/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  uploadedAt: Date;
}

interface MediaGalleryProps {
  items: MediaItem[];
  onReorder: (newItems: MediaItem[]) => void;
}

export default function MediaGallery({ items, onReorder }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const newIndex = selectedIndex > 0 ? selectedIndex - 1 : items.length - 1;
        setSelectedIndex(newIndex);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const newIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
        setSelectedIndex(newIndex);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedIndex(null);
      }
    };

    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedIndex, items.length]);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : items.length - 1;
    setSelectedIndex(newIndex);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    const newIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
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

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    
    // Remove the dragged item
    newItems.splice(draggedIndex, 1);
    
    // Insert at the new position
    newItems.splice(dropIndex, 0, draggedItem);
    
    onReorder(newItems);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`relative aspect-square bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-all duration-200 ${
              draggedIndex === index ? 'opacity-50 scale-95' : ''
            } ${
              dragOverIndex === index && draggedIndex !== index
                ? 'ring-2 ring-blue-400 scale-105'
                : ''
            }`}
            onClick={() => handleItemClick(index)}
          >
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt="Review output"
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <video
                src={item.url}
                className="w-full h-full object-cover"
                muted
                loop
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
              />
            )}
            <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs">
              {item.type === 'video' ? '▶️' : '🖼️'}
            </div>
            <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-gray-300">
              {index + 1}
            </div>
            {draggedIndex !== index && (
              <div className="absolute bottom-2 left-2 opacity-0 hover:opacity-100 transition-opacity">
                <div className="text-white/70 text-xs">📋 Drag to reorder</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="max-w-6xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === 'image' ? (
              <img
                src={selectedItem.url}
                alt="Review output"
                className="max-w-full max-h-[90vh] object-contain"
              />
            ) : (
              <video
                src={selectedItem.url}
                className="max-w-full max-h-[90vh]"
                controls
                autoPlay
              />
            )}
            
            {/* Navigation arrows */}
            {items.length > 1 && (
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

            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:opacity-70 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full text-white text-sm">
              {selectedIndex + 1} of {items.length}
            </div>

            {/* Keyboard shortcuts hint */}
            <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-2 rounded text-white text-xs">
              Use ← → keys or ESC to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}