"use client"

import { useState, useEffect } from "react"
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
  const [filterTag, setFilterTag] = useState("")
  const [uploadStatus, setUploadStatus] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "title">("date")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  // Load works on mount and check admin status
  useEffect(() => {
    loadWorks()
    // Check if already authenticated
    const adminAuth = localStorage.getItem('solienne-admin')
    if (adminAuth === 'authenticated') {
      setIsAdmin(true)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (viewMode !== "presentation") return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextImage()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevImage()
      } else if (e.key === 'Escape' || e.key === 'g') {
        e.preventDefault()
        setViewMode("grid")
        setSelectedWork(null)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [viewMode, selectedIndex])

  const loadWorks = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/works-sync')
      
      if (response.ok) {
        const data = await response.json()
        setWorks(Array.isArray(data.works) ? data.works : [])
      } else {
        setError(`Failed to load gallery (${response.status})`)
        setWorks([])
      }
    } catch (error) {
      console.error('Error loading works:', error)
      setError('Failed to connect to gallery')
      setWorks([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (files: FileList) => {
    if (!isAdmin) {
      setUploadStatus('✗ Admin access required')
      setTimeout(() => setUploadStatus(''), 3000)
      return
    }
    
    setIsUploading(true)
    let successCount = 0
    
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        continue
      }

      try {
        setUploadStatus(`Uploading ${file.name}...`)
        
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
          method: 'POST',
          body: file,
        })

        if (response.ok) {
          const result = await response.json()
          
          const work: Work = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            title: file.name.replace(/\.[^/.]+$/, ""),
            description: "",
            date: new Date().toISOString().split('T')[0],
            type: file.type.startsWith('video/') ? 'video' : 'image',
            mediaUrl: result.url,
            size: file.size,
            filename: file.name,
            tags: [],
            featured: false,
            uploadedAt: new Date().toISOString()
          }

          await fetch('/api/works-sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(work)
          })
          
          successCount++
          setWorks(currentWorks => [work, ...currentWorks])
        }
      } catch (error) {
        console.error('Upload error:', error)
      }
    }

    setIsUploading(false)
    setUploadStatus(`Complete! ${successCount} image(s) uploaded.`)
    setTimeout(() => setUploadStatus(""), 3000)
  }

  const handleAdminLogin = () => {
    // Simple password check - in production, use proper authentication
    if (adminPassword === 'solienne2025') {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setAdminPassword('')
      localStorage.setItem('solienne-admin', 'authenticated')
      setUploadStatus('✓ Admin access granted')
      setTimeout(() => setUploadStatus(''), 2000)
    } else {
      setUploadStatus('✗ Invalid password')
      setTimeout(() => setUploadStatus(''), 3000)
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    localStorage.removeItem('solienne-admin')
    setUploadStatus('Logged out')
    setTimeout(() => setUploadStatus(''), 2000)
  }

  const deleteWork = async (work: Work) => {
    if (!isAdmin) return
    
    try {
      const response = await fetch(`/api/works-sync?id=${work.id}`, { method: 'DELETE' })
      
      if (response.ok) {
        setWorks(currentWorks => currentWorks.filter(w => w.id !== work.id))
        if (selectedWork?.id === work.id) {
          setSelectedWork(null)
        }
        setUploadStatus(`✓ Deleted "${work.title}"`)
        setTimeout(() => setUploadStatus(""), 3000)
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const moveWorkUp = async (work: Work, index: number) => {
    if (!isAdmin || index === 0) return
    
    const newWorks = [...works]
    const [movedWork] = newWorks.splice(index, 1)
    newWorks.splice(index - 1, 0, movedWork)
    setWorks(newWorks)
    
    // Save new order
    try {
      await saveWorksOrder(newWorks)
      setUploadStatus('✓ Order updated')
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      console.error('Failed to save order:', error)
    }
  }

  const moveWorkDown = async (work: Work, index: number) => {
    if (!isAdmin || index === works.length - 1) return
    
    const newWorks = [...works]
    const [movedWork] = newWorks.splice(index, 1)
    newWorks.splice(index + 1, 0, movedWork)
    setWorks(newWorks)
    
    // Save new order
    try {
      await saveWorksOrder(newWorks)
      setUploadStatus('✓ Order updated')
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      console.error('Failed to save order:', error)
    }
  }

  const saveWorksOrder = async (orderedWorks: Work[]) => {
    for (let i = 0; i < orderedWorks.length; i++) {
      await fetch('/api/works-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...orderedWorks[i], order: i })
      })
    }
  }

  const openPresentation = (work: Work) => {
    const index = getFilteredWorks().findIndex(w => w.id === work.id)
    setSelectedIndex(index)
    setSelectedWork(work)
    setViewMode("presentation")
  }

  const nextImage = () => {
    const filtered = getFilteredWorks()
    if (selectedIndex < filtered.length - 1) {
      const newIndex = selectedIndex + 1
      setSelectedIndex(newIndex)
      setSelectedWork(filtered[newIndex])
    }
  }

  const prevImage = () => {
    const filtered = getFilteredWorks()
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1
      setSelectedIndex(newIndex)
      setSelectedWork(filtered[newIndex])
    }
  }

  const getFilteredWorks = () => {
    return works.filter(work => {
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
  }

  const getAllTags = () => {
    return Array.from(new Set(works.flatMap(work => work.tags)))
  }

  const filteredWorks = getFilteredWorks()
  const allTags = getAllTags()

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
            {isAdmin ? (
              <li>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                  id="nav-file-input"
                />
                <label htmlFor="nav-file-input" className="nav-link cursor-pointer">
                  {isUploading ? 'uploading...' : '+ add'}
                </label>
              </li>
            ) : null}
            <li>
              {isAdmin ? (
                <button 
                  onClick={handleAdminLogout} 
                  className="nav-link cursor-pointer border-none bg-transparent text-[#b8b8b8] hover:text-white transition-colors"
                  style={{ all: 'unset', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '300', letterSpacing: '0.1em', textTransform: 'lowercase' }}
                >
                  logout
                </button>
              ) : (
                <button 
                  onClick={() => {
                    console.log('Admin button clicked!')
                    setShowAdminLogin(true)
                  }} 
                  className="nav-link cursor-pointer border-none bg-transparent text-[#b8b8b8] hover:text-white transition-colors"
                  style={{ all: 'unset', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '300', letterSpacing: '0.1em', textTransform: 'lowercase' }}
                >
                  admin
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {viewMode === "grid" && (
        <div className="min-h-screen">
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
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
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
                  onClick={() => filteredWorks.length > 0 && openPresentation(filteredWorks[0])}
                  className="bg-black border border-gray-700 hover:border-[#d4af37] text-white px-3 py-2 rounded text-sm transition-colors"
                  title="Press 'P' for presentation mode"
                >
                  🎬 Presentation
                </button>
                <div className="text-gray-400 text-sm px-3 py-2">
                  💡 Click images to view {isAdmin && '• Admin mode active'}
                </div>
                {isAdmin && (
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    className="hidden"
                    id="gallery-file-input"
                  />
                )}
                {isAdmin && (
                  <label htmlFor="gallery-file-input" className="bg-[#d4af37] hover:bg-[#b8941f] text-black px-3 py-2 rounded text-sm cursor-pointer transition-colors">
                    + Add Images
                  </label>
                )}
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
                {filteredWorks.map((work, index) => {
                  const originalIndex = works.findIndex(w => w.id === work.id)
                  return (
                    <div key={work.id} className="group relative aspect-square bg-black overflow-hidden cursor-pointer border border-gray-800 hover:border-[#d4af37] transition-colors duration-200">
                      <div onClick={() => openPresentation(work)} className="w-full h-full">
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
                      
                      {/* Admin controls */}
                      {isAdmin && (
                        <>
                          {/* Delete button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              if (confirm(`Delete "${work.title}"?`)) {
                                deleteWork(work)
                              }
                            }}
                            className="absolute top-1 left-1 w-6 h-6 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-full flex items-center justify-center z-20 transition-all duration-200"
                            title="Delete image"
                          >
                            ×
                          </button>
                          
                          {/* Reorder controls */}
                          <div className="absolute bottom-1 left-1 flex flex-col gap-1">
                            {originalIndex > 0 && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  moveWorkUp(work, originalIndex)
                                }}
                                className="w-6 h-6 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-full flex items-center justify-center z-20 transition-all duration-200"
                                title="Move up"
                              >
                                ↑
                              </button>
                            )}
                            {originalIndex < works.length - 1 && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  moveWorkDown(work, originalIndex)
                                }}
                                className="w-6 h-6 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-full flex items-center justify-center z-20 transition-all duration-200"
                                title="Move down"
                              >
                                ↓
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
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

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-black border border-gray-700 p-6 rounded max-w-md w-full mx-4">
            <h2 className="text-xl font-light mb-4 text-white">Admin Login</h2>
            <input
              type="password"
              placeholder="Enter password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              className="w-full bg-black border border-gray-700 text-white px-3 py-2 rounded mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdminLogin}
                className="flex-1 bg-[#d4af37] hover:bg-[#b8941f] text-black px-4 py-2 rounded transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowAdminLogin(false)
                  setAdminPassword('')
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
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

          {/* Media container */}
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
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl transition-colors"
              title="Previous (←)"
            >
              ‹
            </button>
          )}
          {selectedIndex < filteredWorks.length - 1 && (
            <button
              onClick={nextImage}
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