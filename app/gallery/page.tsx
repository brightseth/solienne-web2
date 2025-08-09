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

  const loadWorks = async () => {
    try {
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
        setWorks([])
      }
    } catch (error) {
      console.log('Error loading works:', error)
      setWorks([])
    }
  }

  useEffect(() => {
    loadWorks()
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
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
        console.log('Uploading:', file.name)
        
        // Upload to Vercel Blob
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
          method: 'POST',
          body: file,
        })

        console.log('Upload response:', response.status, response.statusText)

        if (response.ok) {
          const result = await response.json()
          console.log('Upload result:', result)
          
          // Create work entry
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

          setUploadStatus(`Saving ${file.name}...`)
          console.log('Saving work:', work)

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
          console.error('Upload failed:', response.status, errorText)
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
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
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
    if (confirm('Delete this work?')) {
      // Delete from server
      await fetch(`/api/works-sync?id=${work.id}`, { method: 'DELETE' })
      
      // Remove locally
      setWorks(currentWorks => currentWorks.filter(w => w.id !== work.id))
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
          onDragOver={handleDragOver}
        >
          {isUploading && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
              <div className="text-[#d4af37] text-center">
                <div className="animate-spin w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-xl">Uploading...</p>
              </div>
            </div>
          )}

          {works.length === 0 && !isUploading && (
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

          {/* Grid */}
          {works.length > 0 && (
            <div className="max-w-7xl mx-auto px-6 pb-32 pt-20">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {filteredWorks.map((work, index) => (
                  <div key={work.id} className="group relative aspect-square bg-black overflow-hidden cursor-pointer">
                    <div onClick={() => openPresentation(work)} className="w-full h-full">
                      {work.type === "video" ? (
                        <video
                          src={work.mediaUrl}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={work.mediaUrl}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
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
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
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

        </div>
      )}
    </div>
  )
}