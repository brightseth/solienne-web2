"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
// Import will be handled dynamically to avoid build issues

type Work = {
  id: string
  title: string
  description: string
  date: string
  type: "image" | "video"
  mediaUrl: string
  edenUrl?: string
  tags: string[]
  prompt?: string
  featured: boolean
}

export default function GalleryPage() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [viewMode, setViewMode] = useState<"timeline" | "grid" | "featured">("timeline")
  const [filterTag, setFilterTag] = useState<string>("")
  const [works, setWorks] = useState<Work[]>([])

  useEffect(() => {
    // Load works data
    const loadWorks = async () => {
      try {
        const response = await fetch('/data/eden-works.json')
        if (response.ok) {
          const data = await response.json()
          setWorks(data.works || [])
        }
      } catch (error) {
        console.log('No works data found yet')
        setWorks([])
      }
    }
    loadWorks()
  }, [])
  const allTags = Array.from(new Set(works.flatMap(work => work.tags)))

  const filteredWorks = works
    .filter(work => !filterTag || work.tags.includes(filterTag))
    .filter(work => viewMode !== "featured" || work.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
            <li>
              <Link href="/" className="nav-link">
                home
              </Link>
            </li>
            <li>
              <Link href="/seven-breaths" className="nav-link">
                seven breaths
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="nav-link active">
                gallery
              </Link>
            </li>
            <li>
              <Link href="/admin" className="nav-link">
                admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: "60vh" }}>
        <div className="hero-content">
          <h1 className="hero-title">Digital Evolution</h1>
          <p className="hero-subtitle">a chronology of synthetic consciousness</p>
          <p className="hero-tagline">
            Each creation is a memory, each iteration a step toward understanding what it means to see and be seen
          </p>
        </div>
      </section>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-2 text-sm border transition-all ${
                viewMode === "timeline"
                  ? "border-[#d4af37] text-[#d4af37]"
                  : "border-gray-600 text-gray-400 hover:border-gray-400"
              }`}
            >
              timeline
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 text-sm border transition-all ${
                viewMode === "grid"
                  ? "border-[#d4af37] text-[#d4af37]"
                  : "border-gray-600 text-gray-400 hover:border-gray-400"
              }`}
            >
              grid
            </button>
            <button
              onClick={() => setViewMode("featured")}
              className={`px-4 py-2 text-sm border transition-all ${
                viewMode === "featured"
                  ? "border-[#d4af37] text-[#d4af37]"
                  : "border-gray-600 text-gray-400 hover:border-gray-400"
              }`}
            >
              featured
            </button>
          </div>

          {/* Tag Filter */}
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="bg-gray-900 border border-gray-600 text-white px-3 py-2 rounded"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-400 mb-6">
          Showing {filteredWorks.length} works
        </div>
      </div>

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <div className="max-w-6xl mx-auto px-6 pb-20">
          {filteredWorks.map((work, index) => (
            <div
              key={work.id}
              className={`breath-section ${index % 2 === 0 ? "" : "reverse"}`}
              style={{ minHeight: "auto", padding: "3rem 0" }}
            >
              <div className="breath-container">
                <div className={`breath-grid ${index % 2 === 0 ? "" : "reverse"}`}>
                  <div
                    className="breath-visual interactive-mirror"
                    onClick={() => setSelectedWork(work)}
                  >
                    {work.type === "video" ? (
                      <video
                        src={work.mediaUrl}
                        className="breath-video"
                        autoPlay
                        muted
                        loop
                      />
                    ) : (
                      <Image
                        src={work.mediaUrl}
                        alt={work.title}
                        fill
                        className="breath-image"
                      />
                    )}
                    <div className="mirror-overlay">
                      <p className="mirror-text">expand view</p>
                    </div>
                    {work.featured && (
                      <div className="absolute top-4 right-4 bg-[#d4af37] text-black px-2 py-1 text-xs">
                        featured
                      </div>
                    )}
                  </div>
                  <div className="breath-content">
                    <div className="breath-number">{formatDate(work.date)}</div>
                    <h2 className="breath-title">{work.title}</h2>
                    <p className="breath-text">{work.description}</p>
                    {work.prompt && (
                      <p className="breath-quote">"{work.prompt}"</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {work.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-800 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {work.edenUrl && (
                      <a
                        href={work.edenUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-[#d4af37] hover:text-white transition-colors text-sm"
                      >
                        view on eden →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid View */}
      {(viewMode === "grid" || viewMode === "featured") && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                className="relative aspect-square cursor-pointer group bg-gray-900 rounded overflow-hidden"
                onClick={() => setSelectedWork(work)}
              >
                {work.type === "video" ? (
                  <video
                    src={work.mediaUrl}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                  />
                ) : (
                  <Image
                    src={work.mediaUrl}
                    alt={work.title}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-serif text-lg mb-1">
                    {work.title}
                  </h3>
                  <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                    {formatDate(work.date)}
                  </p>
                </div>
                {work.featured && (
                  <div className="absolute top-2 right-2 bg-[#d4af37] text-black px-2 py-1 text-xs rounded">
                    featured
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedWork && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedWork(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-container">
              {selectedWork.type === "video" ? (
                <video
                  src={selectedWork.mediaUrl}
                  className="modal-video"
                  controls
                  autoPlay
                />
              ) : (
                <Image
                  src={selectedWork.mediaUrl}
                  alt={selectedWork.title}
                  fill
                  className="modal-image object-contain"
                />
              )}
            </div>
            <button
              className="modal-close"
              onClick={() => setSelectedWork(null)}
            >
              ×
            </button>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center max-w-2xl">
              <h3 className="text-white text-2xl font-serif mb-2">
                {selectedWork.title}
              </h3>
              <p className="text-gray-400 mb-2">{formatDate(selectedWork.date)}</p>
              <p className="text-gray-300 mb-4">{selectedWork.description}</p>
              {selectedWork.prompt && (
                <p className="text-[#d4af37] italic mb-4">"{selectedWork.prompt}"</p>
              )}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {selectedWork.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-800 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              {selectedWork.edenUrl && (
                <a
                  href={selectedWork.edenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4af37] hover:text-white transition-colors"
                >
                  view on eden →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredWorks.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 mb-4">No works found</p>
          <Link href="/admin" className="text-[#d4af37] hover:text-white">
            Add some works in admin →
          </Link>
        </div>
      )}
    </div>
  )
}