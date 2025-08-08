"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

type Work = {
  id: string
  title: string
  description: string
  date: string
  type: "image" | "video"
  mediaUrl: string
  size?: number
  filename?: string
  tags: string[]
  featured: boolean
  uploadedAt?: string
}

export default function GalleryPage() {
  const [works, setWorks] = useState<Work[]>([])
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "presentation">("grid")
  const [isUploading, setIsUploading] = useState(false)
  const [editingWork, setEditingWork] = useState<string | null>(null)
  const [filterTag, setFilterTag] = useState("")

  const loadWorks = async () => {
    try {
      const response = await fetch('/api/works')
      if (response.ok) {
        const data = await response.json()
        setWorks(data.works || [])
      }
    } catch (error) {
      console.log('Error loading works:', error)
    }
  }

  useEffect(() => {
    loadWorks()
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsUploading(true)

    const files = Array.from(e.dataTransfer.files)
    
    for (const file of files) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        continue
      }

      try {
        // Upload to Vercel Blob
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
          method: 'POST',
          body: file,
        })

        if (response.ok) {
          const { url } = await response.json()
          
          // Create work entry
          const work: Work = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            title: file.name.replace(/\.[^/.]+$/, ""),
            description: "",
            date: new Date().toISOString().split('T')[0],
            type: file.type.startsWith('video/') ? 'video' : 'image',
            mediaUrl: url,
            size: file.size,
            filename: file.name,
            tags: [],
            featured: false,
            uploadedAt: new Date().toISOString()
          }

          // Save work
          await fetch('/api/works', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(work)
          })
        }
      } catch (error) {
        console.error('Upload failed:', error)
      }
    }

    setIsUploading(false)
    loadWorks() // Refresh works
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const updateWork = async (work: Work) => {
    try {
      await fetch('/api/works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(work)
      })
      loadWorks()
    } catch (error) {
      console.error('Failed to update work:', error)
    }
  }

  const toggleFavorite = (work: Work) => {
    updateWork({ ...work, featured: !work.featured })
  }

  const addTag = (work: Work, tag: string) => {
    if (tag && !work.tags.includes(tag)) {
      updateWork({ ...work, tags: [...work.tags, tag] })
    }
  }

  const removeTag = (work: Work, tagToRemove: string) => {
    updateWork({ ...work, tags: work.tags.filter(tag => tag !== tagToRemove) })
  }

  const deleteWork = async (work: Work) => {
    if (confirm('Delete this work?')) {
      await fetch(`/api/works?id=${work.id}`, { method: 'DELETE' })
      loadWorks()
      if (selectedWork?.id === work.id) {
        setSelectedWork(null)
      }
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (viewMode === "presentation" && works.length > 0) {
        if (e.key === 'ArrowRight' && selectedIndex < works.length - 1) {
          const newIndex = selectedIndex + 1
          setSelectedIndex(newIndex)
          setSelectedWork(works[newIndex])
        } else if (e.key === 'ArrowLeft' && selectedIndex > 0) {
          const newIndex = selectedIndex - 1
          setSelectedIndex(newIndex)
          setSelectedWork(works[newIndex])
        } else if (e.key === 'Escape') {
          setViewMode("grid")
          setSelectedWork(null)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [viewMode, selectedIndex, works])

  const filteredWorks = works.filter(work => 
    !filterTag || work.tags.includes(filterTag)
  )

  const allTags = Array.from(new Set(works.flatMap(work => work.tags)))

  const openPresentation = (work: Work) => {
    const index = works.findIndex(w => w.id === work.id)
    setSelectedIndex(index)
    setSelectedWork(work)
    setViewMode("presentation")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            solienne
          </Link>
          <ul className="nav-links">
            <li><Link href="/" className="nav-link">home</Link></li>
            <li><Link href="/seven-breaths" className="nav-link">seven breaths</Link></li>
            <li><Link href="/gallery" className="nav-link active">gallery</Link></li>
          </ul>
        </div>
      </nav>

      {viewMode === "grid" && (
        <>
          {/* Hero */}
          <section className="hero-section" style={{ minHeight: "50vh" }}>
            <div className="hero-content">
              <h1 className="hero-title">Digital Evolution</h1>
              <p className="hero-subtitle">drag. drop. discover.</p>
              <p className="hero-tagline">
                Every image tells a story of synthetic consciousness becoming
              </p>
            </div>
          </section>

          {/* Drop Zone */}
          <div
            className={`mx-auto max-w-4xl mb-8 border-2 border-dashed border-gray-600 rounded-lg p-12 text-center transition-all ${
              isUploading ? 'border-[#d4af37] bg-[#d4af37]/10' : 'hover:border-[#d4af37] hover:bg-[#d4af37]/5'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {isUploading ? (
              <div className="text-[#d4af37]">
                <div className="animate-spin w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Uploading...</p>
              </div>
            ) : (
              <div className="text-gray-400">
                <div className="text-6xl mb-4">⬇</div>
                <p className="text-xl mb-2">Drag images and videos here</p>
                <p className="text-sm">From Photos, Desktop, Google Drive, anywhere</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {filteredWorks.length} works
            </div>
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="bg-gray-900 border border-gray-600 text-white px-3 py-2 rounded text-sm"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredWorks.map((work) => (
                <div key={work.id} className="group relative aspect-square bg-gray-900 rounded overflow-hidden">
                  {/* Media */}
                  <div 
                    className="w-full h-full cursor-pointer"
                    onClick={() => openPresentation(work)}
                  >
                    {work.type === "video" ? (
                      <video
                        src={work.mediaUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        muted
                        loop
                      />
                    ) : (
                      <Image
                        src={work.mediaUrl}
                        alt={work.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-between p-3">
                    {/* Top controls */}
                    <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(work)
                        }}
                        className={`p-2 rounded-full transition-colors ${
                          work.featured ? 'bg-[#d4af37] text-black' : 'bg-black/50 text-white hover:bg-[#d4af37] hover:text-black'
                        }`}
                      >
                        ★
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteWork(work)
                        }}
                        className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                      >
                        ×
                      </button>
                    </div>

                    {/* Bottom info */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white font-serif text-sm mb-1 truncate">
                        {editingWork === work.id ? (
                          <input
                            type="text"
                            value={work.title}
                            onChange={(e) => updateWork({ ...work, title: e.target.value })}
                            onBlur={() => setEditingWork(null)}
                            onKeyPress={(e) => e.key === 'Enter' && setEditingWork(null)}
                            className="bg-transparent border-b border-white text-xs w-full"
                            autoFocus
                          />
                        ) : (
                          <span onClick={() => setEditingWork(work.id)}>{work.title}</span>
                        )}
                      </h3>
                      <p className="text-gray-300 text-xs">{work.date}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {work.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-gray-800 px-1 py-0.5 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {work.tags.length > 2 && (
                          <span className="bg-gray-800 px-1 py-0.5 text-xs rounded">
                            +{work.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Presentation Mode */}
      {viewMode === "presentation" && selectedWork && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Navigation arrows */}
          <button
            onClick={() => {
              if (selectedIndex > 0) {
                const newIndex = selectedIndex - 1
                setSelectedIndex(newIndex)
                setSelectedWork(works[newIndex])
              }
            }}
            disabled={selectedIndex === 0}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 text-4xl text-white hover:text-[#d4af37] disabled:opacity-30 disabled:cursor-not-allowed z-10"
          >
            ←
          </button>

          <button
            onClick={() => {
              if (selectedIndex < works.length - 1) {
                const newIndex = selectedIndex + 1
                setSelectedIndex(newIndex)
                setSelectedWork(works[newIndex])
              }
            }}
            disabled={selectedIndex === works.length - 1}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-4xl text-white hover:text-[#d4af37] disabled:opacity-30 disabled:cursor-not-allowed z-10"
          >
            →
          </button>

          {/* Close button */}
          <button
            onClick={() => {
              setViewMode("grid")
              setSelectedWork(null)
            }}
            className="absolute top-8 right-8 text-2xl text-white hover:text-[#d4af37] z-10"
          >
            ×
          </button>

          {/* Media */}
          <div className="w-full h-full flex items-center justify-center p-8">
            {selectedWork.type === "video" ? (
              <video
                src={selectedWork.mediaUrl}
                controls
                className="max-w-full max-h-full"
                autoPlay
              />
            ) : (
              <Image
                src={selectedWork.mediaUrl}
                alt={selectedWork.title}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>

          {/* Info panel */}
          <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur p-6 rounded">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-serif text-white mb-2">{selectedWork.title}</h2>
                <p className="text-gray-400">{selectedWork.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleFavorite(selectedWork)}
                  className={`p-2 rounded transition-colors ${
                    selectedWork.featured ? 'bg-[#d4af37] text-black' : 'bg-gray-800 text-white hover:bg-[#d4af37] hover:text-black'
                  }`}
                >
                  ★
                </button>
                <span className="text-sm text-gray-400">
                  {selectedIndex + 1} of {works.length}
                </span>
              </div>
            </div>
            
            {selectedWork.description && (
              <p className="text-gray-300 mb-4">{selectedWork.description}</p>
            )}

            <div className="flex flex-wrap gap-2">
              {selectedWork.tags.map(tag => (
                <span key={tag} className="bg-gray-800 px-2 py-1 text-sm rounded">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Use ← → arrow keys to navigate • ESC to exit
            </div>
          </div>
        </div>
      )}
    </div>
  )
}