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
  const [uploadStatus, setUploadStatus] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "title">("date")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [draggedItem, setDraggedItem] = useState<Work | null>(null)
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null)

  const loadWorks = async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log('Loading works from /api/works-sync...')
      const response = await fetch('/api/works-sync')
      console.log('Load response:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Loaded works data:', data)
        console.log('Number of works:', data.works?.length || 0)
        setWorks(data.works || [])
      } else {
        console.error('Failed to load works:', response.status, response.statusText)
        setError(`Failed to load gallery (${response.status})`)
        setWorks([])
      }
    } catch (error) {
      console.log('Error loading works:', error)
      setError('Failed to connect to gallery')
      setWorks([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadWorks()
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    
    // Check if this is a file drop or an image reorder
    if (draggedItem) {
      // This is an image reorder, ignore
      return
    }
    
    console.log('Drop triggered!')
    
    const files = Array.from(e.dataTransfer.files)
    console.log('Files dropped:', files.length, files.map(f => f.name))
    
    if (files.length === 0) return
    
    setIsUploading(true)
    setUploadStatus(`Uploading ${files.length} file(s)...`)
    
    let successCount = 0
    
    for (const file of files) {
      console.log('Processing file:', file.name, file.type)
      
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        console.log('Skipping non-media file:', file.name)
        setUploadStatus(`Skipping ${file.name} (not an image/video)`)
        continue
      }

      try {
        setUploadStatus(`Uploading ${file.name}...`)
        console.log('Uploading to Vercel Blob:', file.name)
        
        // Upload to Vercel Blob storage
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
          method: 'POST',
          body: file,
        })

        console.log('Upload response:', response.status, response.statusText)

        if (response.ok) {
          const result = await response.json()
          console.log('Upload successful, blob URL:', result.url)
          
          // Create work entry with Blob URL
          const work: Work = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            title: file.name.replace(/\.[^/.]+$/, ""),
            description: "",
            date: new Date().toISOString().split('T')[0],
            type: file.type.startsWith('video/') ? 'video' : 'image',
            mediaUrl: result.url, // Use Vercel Blob URL
            size: file.size,
            filename: file.name,
            tags: [],
            featured: false,
            uploadedAt: new Date().toISOString()
          }

          setUploadStatus(`Saving ${file.name}...`)
          console.log('Saving work to server:', work.title)

          // Save work to server
          const saveResponse = await fetch('/api/works-sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(work)
          })
          
          console.log('Save response:', saveResponse.status)
          
          if (saveResponse.ok) {
            successCount++
            setUploadStatus(`✓ Uploaded ${file.name}`)
            // Add locally for immediate feedback
            setWorks(currentWorks => [work, ...currentWorks])
            console.log('Work added to local state, total works:', works.length + 1)
          } else {
            const errorText = await saveResponse.text()
            console.error('Save failed:', saveResponse.status, errorText)
            setUploadStatus(`✗ Failed to save ${file.name}`)
          }
        } else {
          const errorText = await response.text()
          console.error('Blob upload failed:', response.status, errorText)
          setUploadStatus(`✗ Upload failed: ${file.name}`)
        }
      } catch (error) {
        console.error('Upload error:', error)
        setUploadStatus(`✗ Error uploading ${file.name}`)
      }
    }

    setIsUploading(false)
    setUploadStatus(`Complete! ${successCount} image(s) uploaded.`)
    
    console.log('Upload complete, refreshing works list...')
    
    // Force refresh from server
    await loadWorks()
    
    console.log('Works after refresh:', works.length)
    
    // Clear status after 5 seconds
    setTimeout(() => setUploadStatus(""), 5000)
  }, [draggedItem])

  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const updateWork = async (work: Work) => {
    try {
      // Save to server
      await fetch('/api/works-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(work)
      })
      
      // Update locally
      setWorks(currentWorks => 
        currentWorks.map(w => w.id === work.id ? work : w)
      )
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
    try {
      console.log('Deleting work:', work.id, work.title)
      
      // Delete from server
      const response = await fetch(`/api/works-sync?id=${work.id}`, { method: 'DELETE' })
      console.log('Delete response:', response.status)
      
      if (response.ok) {
        // Remove locally
        setWorks(currentWorks => currentWorks.filter(w => w.id !== work.id))
        if (selectedWork?.id === work.id) {
          setSelectedWork(null)
        }
        setUploadStatus(`✓ Deleted "${work.title}"`)
        setTimeout(() => setUploadStatus(""), 3000)
      } else {
        console.error('Delete failed:', response.status)
        setUploadStatus(`✗ Failed to delete "${work.title}"`)
        setTimeout(() => setUploadStatus(""), 5000)
      }
    } catch (error) {
      console.error('Delete error:', error)
      setUploadStatus(`✗ Error deleting "${work.title}"`)
      setTimeout(() => setUploadStatus(""), 5000)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (viewMode === "presentation" && filteredWorks.length > 0) {
        if ((e.key === 'ArrowRight' || e.key === ' ') && selectedIndex < filteredWorks.length - 1) {
          e.preventDefault()
          const newIndex = selectedIndex + 1
          setSelectedIndex(newIndex)
          setSelectedWork(filteredWorks[newIndex])
        } else if (e.key === 'ArrowLeft' && selectedIndex > 0) {
          e.preventDefault()
          const newIndex = selectedIndex - 1
          setSelectedIndex(newIndex)
          setSelectedWork(filteredWorks[newIndex])
        } else if (e.key === 'Escape' || e.key === 'g') {
          e.preventDefault()
          setViewMode("grid")
          setSelectedWork(null)
        }
      } else if (viewMode === "grid" && e.key === 'p' && filteredWorks.length > 0) {
        e.preventDefault()
        openPresentation(filteredWorks[0])
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [viewMode, selectedIndex, filteredWorks])

  const filteredWorks = works.filter(work => {
    const matchesTag = !filterTag || work.tags.includes(filterTag)
    const matchesSearch = !searchQuery || 
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  }).sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return a.title.localeCompare(b.title)
    }
  })

  const allTags = Array.from(new Set(works.flatMap(work => work.tags)))

  const openPresentation = (work: Work) => {
    const index = filteredWorks.findIndex(w => w.id === work.id)
    setSelectedIndex(index)
    setSelectedWork(work)
    setViewMode("presentation")
  }

  const handleDragStart = (e: React.DragEvent, work: Work) => {
    console.log('Drag start:', work.title)
    setDraggedItem(work)
    e.dataTransfer.effectAllowed = 'move'
    // Add drag image
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement
    dragImage.style.opacity = '0.5'
    e.dataTransfer.setDragImage(dragImage, e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'move'
    setDraggedOverIndex(index)
  }

  const handleDragEnd = () => {
    console.log('Drag end')
    setDraggedItem(null)
    setDraggedOverIndex(null)
  }

  const handleDropOnItem = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('Drop on item:', dropIndex)
    
    if (!draggedItem) return
    
    const draggedIndex = filteredWorks.findIndex(w => w.id === draggedItem.id)
    if (draggedIndex === dropIndex) return
    
    console.log(`Moving from ${draggedIndex} to ${dropIndex}`)
    
    // Reorder the filtered works
    const newFilteredWorks = [...filteredWorks]
    const [removed] = newFilteredWorks.splice(draggedIndex, 1)
    newFilteredWorks.splice(dropIndex, 0, removed)
    
    // Update the main works array
    const workIds = newFilteredWorks.map(w => w.id)
    const otherWorks = works.filter(w => !workIds.includes(w.id))
    const newWorks = [...newFilteredWorks, ...otherWorks]
    
    setWorks(newWorks)
    setDraggedItem(null)
    setDraggedOverIndex(null)
    
    // Save new order to server
    try {
      // Update each work with new order index
      for (let i = 0; i < newWorks.length; i++) {
        await fetch('/api/works-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newWorks[i], order: i })
        })
      }
      setUploadStatus('✓ Order saved')
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      console.error('Failed to save order:', error)
      setUploadStatus('✗ Failed to save order')
      setTimeout(() => setUploadStatus(''), 3000)
    }
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
            <li><Link href="/gallery" className="nav-link active">gallery</Link></li>
            <li>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={async (e) => {
                  const files = Array.from(e.target.files || [])
                  if (files.length > 0) {
                    const fakeEvent = {
                      preventDefault: () => {},
                      dataTransfer: { files }
                    } as any
                    handleDrop(fakeEvent)
                  }
                }}
                className="hidden"
                id="nav-file-input"
              />
              <label htmlFor="nav-file-input" className="nav-link cursor-pointer">
                {isUploading ? 'uploading...' : '+ add'}
              </label>
            </li>
          </ul>
        </div>
      </nav>

      {viewMode === "grid" && (
        <div
          className="min-h-screen"
          onDrop={handleDrop}
          onDragOver={handleFileDragOver}
        >
          {isUploading && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
              <div className="text-[#d4af37] text-center">
                <div className="animate-spin w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-xl">Uploading...</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="animate-spin w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-400">Loading gallery...</p>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {error && !isLoading && (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center text-red-400">
                <div className="text-4xl mb-4">⚠</div>
                <p className="text-lg mb-4">{error}</p>
                <button 
                  onClick={loadWorks}
                  className="text-[#d4af37] hover:text-white border border-[#d4af37] px-4 py-2 rounded"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
          
          {/* Empty State */}
          {works.length === 0 && !isUploading && !isLoading && !error && (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-4">+</div>
                <p className="text-lg mb-4">Drag images here to begin</p>
                <p className="text-sm mb-4">or</p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || [])
                    if (files.length > 0) {
                      const fakeEvent = {
                        preventDefault: () => {},
                        dataTransfer: { files }
                      } as any
                      handleDrop(fakeEvent)
                    }
                  }}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer text-[#d4af37] hover:text-white border border-[#d4af37] px-4 py-2 rounded">
                  Choose Files
                </label>
              </div>
            </div>
          )}

          {/* Search and Filter Controls */}
          {works.length > 0 && (
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-6">
              <div className="gallery-controls flex flex-wrap gap-4 mb-6">
                <button
                  onClick={() => viewMode === "grid" && filteredWorks.length > 0 && openPresentation(filteredWorks[0])}
                  className="bg-black border border-gray-700 hover:border-[#d4af37] text-white px-3 py-2 rounded text-sm transition-colors"
                  title="Press 'P' for presentation mode"
                >
                  🎬 Presentation
                </button>
                <div className="text-gray-400 text-sm px-3 py-2">
                  💡 Drag images to reorder
                </div>
                <input
                  type="text"
                  placeholder="Search works..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black border border-gray-700 text-white px-3 py-2 rounded text-sm flex-1 min-w-[200px]"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "date" | "title")}
                  className="bg-black border border-gray-700 text-white px-3 py-2 rounded text-sm"
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                </select>
                <select
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                  className="bg-black border border-gray-700 text-white px-3 py-2 rounded text-sm"
                >
                  <option value="">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
              {searchQuery && (
                <p className="text-gray-400 text-sm mb-4">
                  {filteredWorks.length} result{filteredWorks.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              )}
            </div>
          )}

          {/* Grid */}
          {works.length > 0 && !isLoading && (
            <div className="max-w-7xl mx-auto px-6 pb-32">
              <div className="gallery-grid grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {filteredWorks.map((work, index) => (
                  <div 
                    key={work.id} 
                    className={`group relative aspect-square bg-black overflow-hidden cursor-move border transition-all duration-200 ${
                      draggedOverIndex === index ? 'border-[#d4af37] scale-105' : 'border-gray-800 hover:border-[#d4af37]'
                    } ${draggedItem?.id === work.id ? 'opacity-50' : ''}`}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, work)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDropOnItem(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <div 
                      onClick={() => openPresentation(work)} 
                      className="w-full h-full"
                      style={{ pointerEvents: draggedItem ? 'none' : 'auto' }}
                    >
                      {work.type === "video" ? (
                        <video
                          src={work.mediaUrl}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                          muted
                          playsInline
                          preload="metadata"
                          draggable="false"
                        />
                      ) : (
                        <img
                          src={work.mediaUrl}
                          alt={work.title}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                          loading="lazy"
                          draggable="false"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.visibility = 'hidden'
                          }}
                        />
                      )}
                    </div>
                    
                    {work.featured && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-[#d4af37] rounded-full"></div>
                    )}
                    
                    {/* Delete button - always visible on mobile, hover on desktop */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (confirm(`Delete "${work.title}"?`)) {
                          deleteWork(work)
                        }
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="delete-btn absolute top-1 left-1 w-7 h-7 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-full flex items-center justify-center z-20 transition-all duration-200 opacity-70 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      title="Delete image"
                      draggable="false"
                    >
                      ×
                    </button>
                    
                    {/* Drag handle indicator */}
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                        <path d="M7 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM17 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM17 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM17 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                      </svg>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Upload Status Toast */}
      {uploadStatus && (
        <div className="fixed top-20 right-4 bg-black/90 backdrop-blur border border-gray-700 text-white px-4 py-2 rounded text-sm z-30">
          {uploadStatus}
        </div>
      )}

      {/* Presentation Mode */}
      {viewMode === "presentation" && selectedWork && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10">
            <div className="flex justify-between items-center">
              <div className="text-white">
                <span className="text-sm opacity-70">{selectedIndex + 1} / {filteredWorks.length}</span>
                <h2 className="text-lg font-light">{selectedWork.title}</h2>
              </div>
              <button
                onClick={() => setViewMode("grid")}
                className="text-white/70 hover:text-white text-2xl transition-colors"
                title="Back to grid (Escape or G)"
              >
                ×
              </button>
            </div>
          </div>

          {/* Media container - full screen */}
          <div className="w-full h-full flex items-center justify-center p-8">
            {selectedWork.type === "video" ? (
              <video
                src={selectedWork.mediaUrl}
                controls
                className="max-w-full max-h-full"
                autoPlay
              />
            ) : (
              <img
                src={selectedWork.mediaUrl}
                alt={selectedWork.title}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            )}
          </div>

          {/* Navigation arrows */}
          {selectedIndex > 0 && (
            <button
              onClick={() => {
                const newIndex = selectedIndex - 1
                setSelectedIndex(newIndex)
                setSelectedWork(filteredWorks[newIndex])
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl transition-colors"
              title="Previous (←)"
            >
              ‹
            </button>
          )}
          {selectedIndex < filteredWorks.length - 1 && (
            <button
              onClick={() => {
                const newIndex = selectedIndex + 1
                setSelectedIndex(newIndex)
                setSelectedWork(filteredWorks[newIndex])
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl transition-colors"
              title="Next (→ or Space)"
            >
              ›
            </button>
          )}

          {/* Bottom controls hint */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
            <p className="text-white/50 text-sm">
              Use ← → or Space to navigate • Press Escape or G to return to grid
            </p>
          </div>
        </div>
      )}
    </div>
  )
}