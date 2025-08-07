'use client';

import { useState } from 'react';
import type { Artwork } from '../gallery/page';

interface ArtworkUploadProps {
  onUpload: (artwork: Artwork) => void;
}

export default function ArtworkUpload({ onUpload }: ArtworkUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentFile, setCurrentFile] = useState<{ file: File; url: string } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'concept' as 'concept' | 'draft' | 'final' | 'experiment',
    rating: 3,
    notes: '',
    tags: ''
  });

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setCurrentFile({ file, url });
        setFormData(prev => ({ 
          ...prev, 
          title: file.name.replace(/\.[^/.]+$/, '') // Remove extension
        }));
        setShowForm(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFile) return;

    setUploading(true);

    const artwork: Artwork = {
      id: Math.random().toString(36).substr(2, 9),
      url: currentFile.url,
      type: currentFile.file.type.startsWith('video/') ? 'video' : 'image',
      title: formData.title || 'Untitled',
      category: formData.category,
      rating: formData.rating,
      notes: formData.notes,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      uploadedAt: new Date(),
    };

    onUpload(artwork);
    
    // Reset form
    setCurrentFile(null);
    setShowForm(false);
    setFormData({
      title: '',
      category: 'concept',
      rating: 3,
      notes: '',
      tags: ''
    });
    setUploading(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <>
      <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Upload Artwork</h2>
        
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive 
              ? 'border-purple-400 bg-purple-400/10' 
              : 'border-white/20 hover:border-white/40'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="text-4xl">🎨</div>
            <div className="space-y-2">
              <p className="text-lg">Drop artwork here or click to upload</p>
              <p className="text-gray-400 text-sm">
                Upload concepts, drafts, finals, or experiments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Form Modal */}
      {showForm && currentFile && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-shrink-0 w-32 h-32 bg-slate-700 rounded-lg overflow-hidden">
                {currentFile.file.type.startsWith('video/') ? (
                  <video 
                    src={currentFile.url} 
                    className="w-full h-full object-cover" 
                    muted 
                    autoPlay 
                    loop
                  />
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={currentFile.url} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">Add Artwork Details</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-400 outline-none"
                      placeholder="Artwork title..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'concept' | 'draft' | 'final' | 'experiment' }))}
                        className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-400 outline-none"
                      >
                        <option value="concept">💭 Concept</option>
                        <option value="draft">📝 Draft</option>
                        <option value="final">✨ Final</option>
                        <option value="experiment">🧪 Experiment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                            className={`text-2xl ${
                              star <= formData.rating ? 'text-yellow-400' : 'text-gray-600'
                            }`}
                          >
                            ⭐
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-400 outline-none"
                      placeholder="Add notes about this artwork..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-400 outline-none"
                      placeholder="portrait, digital, sketch..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {uploading ? 'Adding...' : 'Add to Gallery'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setCurrentFile(null);
                      }}
                      className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}