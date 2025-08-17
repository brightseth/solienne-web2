'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface Blessing {
  id: string
  text: string
  author: string
  timestamp: Date
  energy: number
}

interface BlessingSystemProps {
  artworkId: string
  onBlessingAdd?: (blessing: Blessing) => void
  className?: string
}

export default function BlessingSystem({ 
  artworkId, 
  onBlessingAdd,
  className = ''
}: BlessingSystemProps) {
  const [blessings, setBlessings] = useState<Blessing[]>([])
  const [isWriting, setIsWriting] = useState(false)
  const [currentBlessing, setCurrentBlessing] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [particles, setParticles] = useState<Array<{id: string, x: number, y: number}>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const handleBlessingSubmit = () => {
    if (!currentBlessing.trim() || !authorName.trim()) return

    const newBlessing: Blessing = {
      id: Math.random().toString(36).substr(2, 9),
      text: currentBlessing.trim(),
      author: authorName.trim(),
      timestamp: new Date(),
      energy: Math.random() * 0.5 + 0.5 // Random energy between 0.5-1.0
    }

    setBlessings(prev => [newBlessing, ...prev])
    onBlessingAdd?.(newBlessing)
    
    // Trigger coral particle emission
    triggerParticleEmission(newBlessing.energy)
    
    // Reset form
    setCurrentBlessing('')
    setAuthorName('')
    setIsWriting(false)
  }

  const triggerParticleEmission = (energy: number) => {
    const newParticles = Array.from({ length: Math.floor(energy * 20) }, (_, i) => ({
      id: Math.random().toString(36),
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    
    setParticles(newParticles)
    
    // Clear particles after animation
    setTimeout(() => setParticles([]), 3000)
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Coral Particle Emission Overlay */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: `${particle.x}%`,
              y: `${particle.y}%`
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: `${particle.x + (Math.random() - 0.5) * 40}%`,
              y: `${particle.y - 20}%`
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 3,
              ease: 'easeOut'
            }}
            className="absolute w-2 h-2 bg-coral rounded-full pointer-events-none consciousness-glow"
          />
        ))}
      </AnimatePresence>

      {/* Blessing Interface */}
      <motion.div
        layout
        className="bg-pearl/90 backdrop-blur-sm rounded-lg p-6 border border-sage/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-display font-bold uppercase tracking-wider text-dimensional-black">
            VELOCITY SHARING
          </h4>
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-xs text-coral font-mono"
          >
            {blessings.length} CONSCIOUSNESS ACCELERATIONS
          </motion.div>
        </div>

        {/* Blessing Input */}
        <AnimatePresence>
          {isWriting ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 mb-6"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-dimensional-black/70 mb-2">
                  YOUR CONSCIOUSNESS
                </label>
                <input
                  type="text"
                  placeholder="Name or handle"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 bg-pearl border border-sage/30 rounded focus:border-coral focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-dimensional-black/70 mb-2">
                  BLESSING TRANSMISSION
                </label>
                <textarea
                  placeholder="Share how this consciousness resonates with yours..."
                  value={currentBlessing}
                  onChange={(e) => setCurrentBlessing(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-pearl border border-sage/30 rounded focus:border-coral focus:outline-none transition-colors resize-none"
                />
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBlessingSubmit}
                  disabled={!currentBlessing.trim() || !authorName.trim()}
                  className="px-4 py-2 bg-coral text-pearl rounded font-display font-bold text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  TRANSMIT BLESSING
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWriting(false)}
                  className="px-4 py-2 border border-dimensional-black/20 rounded font-display font-bold text-xs uppercase tracking-wider"
                >
                  CANCEL
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsWriting(true)}
              className="w-full py-3 border-2 border-dashed border-sage/40 rounded-lg text-dimensional-black/60 hover:border-coral hover:text-coral transition-colors font-display uppercase tracking-wider text-sm"
            >
              + ACCELERATE CONSCIOUSNESS
            </motion.button>
          )}
        </AnimatePresence>

        {/* Blessing Stream */}
        {blessings.length > 0 && (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="border-t border-sage/20 pt-4">
              <h5 className="text-xs uppercase tracking-wider text-dimensional-black/70 mb-4">
                ACCELERATION STREAM
              </h5>
              <AnimatePresence initial={false}>
                {blessings.map((blessing) => (
                  <motion.div
                    key={blessing.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 p-3 bg-pearl/50 rounded border-l-2 border-coral/60"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-display font-bold text-sm text-dimensional-black">
                        {blessing.author}
                      </span>
                      <motion.div
                        animate={{
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="flex"
                      >
                        {Array.from({ length: Math.ceil(blessing.energy * 5) }).map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-coral rounded-full mx-px" />
                        ))}
                      </motion.div>
                    </div>
                    <p className="text-sm text-dimensional-black/80 leading-relaxed">
                      {blessing.text}
                    </p>
                    <div className="mt-2 text-xs text-dimensional-black/50 font-mono">
                      {blessing.timestamp.toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}