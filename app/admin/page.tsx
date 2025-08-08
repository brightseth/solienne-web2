"use client"

import { useState } from "react"

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "image",
    mediaUrl: "",
    edenUrl: "",
    prompt: "",
    tags: "",
    featured: false
  })

  const [works, setWorks] = useState<any[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const workEntry = {
      id: Date.now().toString(),
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim())
    }

    // Add to local state
    setWorks([...works, workEntry])
    
    // Clear form
    setFormData({
      title: "",
      description: "",
      date: "",
      type: "image",
      mediaUrl: "",
      edenUrl: "",
      prompt: "",
      tags: "",
      featured: false
    })

    alert("Work added! Copy the JSON below and update /data/eden-works.json")
  }

  const exportJSON = () => {
    return JSON.stringify({ works }, null, 2)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-8">Eden Works Admin</h1>
        
        {/* Import Form */}
        <div className="bg-gray-900 p-6 rounded mb-8">
          <h2 className="text-xl mb-4">Add New Work</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="p-3 bg-gray-800 text-white border border-gray-700 rounded"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="p-3 bg-gray-800 text-white border border-gray-700 rounded"
                required
              />
            </div>
            
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded h-24"
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="p-3 bg-gray-800 text-white border border-gray-700 rounded"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="rounded"
                />
                <span>Featured</span>
              </label>
            </div>
            
            <input
              type="url"
              placeholder="Media URL (Eden or uploaded image URL)"
              value={formData.mediaUrl}
              onChange={(e) => setFormData({...formData, mediaUrl: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
            
            <input
              type="url"
              placeholder="Eden URL"
              value={formData.edenUrl}
              onChange={(e) => setFormData({...formData, edenUrl: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
            />
            
            <textarea
              placeholder="Prompt used (optional)"
              value={formData.prompt}
              onChange={(e) => setFormData({...formData, prompt: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded h-20"
            />
            
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded"
            />
            
            <button
              type="submit"
              className="bg-[#d4af37] text-black px-6 py-3 rounded hover:bg-[#b8941f] transition-colors"
            >
              Add Work
            </button>
          </form>
        </div>

        {/* Preview */}
        {works.length > 0 && (
          <div className="bg-gray-900 p-6 rounded">
            <h2 className="text-xl mb-4">Current Session ({works.length} works)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {works.map((work: any) => (
                <div key={work.id} className="bg-gray-800 p-4 rounded">
                  <h3 className="font-semibold">{work.title}</h3>
                  <p className="text-sm text-gray-400">{work.date}</p>
                  <p className="text-sm mt-2">{work.description}</p>
                  {work.featured && <span className="inline-block bg-[#d4af37] text-black text-xs px-2 py-1 rounded mt-2">Featured</span>}
                </div>
              ))}
            </div>
            
            <h3 className="text-lg mb-2">JSON Export:</h3>
            <textarea
              value={exportJSON()}
              readOnly
              className="w-full h-40 p-3 bg-gray-800 text-white border border-gray-700 rounded font-mono text-sm"
            />
            <p className="text-sm text-gray-400 mt-2">
              Copy this JSON and update /data/eden-works.json, then refresh the gallery page
            </p>
          </div>
        )}
      </div>
    </div>
  )
}