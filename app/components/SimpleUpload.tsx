'use client';

import { useState } from 'react';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  uploadedAt: Date;
}

interface SimpleUploadProps {
  onUpload: (item: MediaItem) => void;
}

export default function SimpleUpload({ onUpload }: SimpleUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList) => {
    setUploading(true);
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          const item: MediaItem = {
            id: Math.random().toString(36).substr(2, 9),
            url,
            type: file.type.startsWith('video/') ? 'video' : 'image',
            name: file.name,
            uploadedAt: new Date(),
          };
          onUpload(item);
        };
        reader.readAsDataURL(file);
      }
    });
    
    setTimeout(() => setUploading(false), 500);
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
    <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold mb-4">Upload Media</h2>
      
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-400/10' 
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
          multiple
          onChange={handleFileInput}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        
        <div className="space-y-4">
          <div className="text-4xl">📁</div>
          
          {uploading ? (
            <div className="space-y-2">
              <div className="text-blue-400">Processing files...</div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full animate-pulse w-full"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-lg">Drop files here or click to upload</p>
              <p className="text-gray-400 text-sm">
                Supports images (JPG, PNG, GIF, WebP) and videos (MP4, MOV, WebM)
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        Files are processed locally in your browser - no server upload required
      </div>
    </div>
  );
}