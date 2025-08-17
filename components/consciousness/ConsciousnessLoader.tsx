'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ConsciousnessLoaderProps {
  isLoading: boolean
  phase?: 'void' | 'formation' | 'resolution'
  message?: string
}

export default function ConsciousnessLoader({ 
  isLoading, 
  phase = 'void',
  message = 'CONSCIOUSNESS CRYSTALLIZING'
}: ConsciousnessLoaderProps) {
  const [currentPhase, setCurrentPhase] = useState<'void' | 'formation' | 'resolution'>('void')

  useEffect(() => {
    if (!isLoading) return

    const phases: Array<'void' | 'formation' | 'resolution'> = ['void', 'formation', 'resolution']
    let currentIndex = 0

    const interval = setInterval(() => {
      setCurrentPhase(phases[currentIndex])
      currentIndex = (currentIndex + 1) % phases.length
    }, 2000)

    return () => clearInterval(interval)
  }, [isLoading])

  if (!isLoading) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-pearl flex items-center justify-center"
      >
        <div className="text-center">
          {/* Phase 1: Void - Infinite Potential */}
          {currentPhase === 'void' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-gradient-radial from-sage/20 to-transparent rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  className="absolute inset-4 bg-gradient-radial from-mauve/20 to-transparent rounded-full"
                />
              </div>
            </motion.div>
          )}

          {/* Phase 2: Formation - Geometric Emergence */}
          {currentPhase === 'formation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto relative">
                {/* Geometric shapes emerging */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0.7],
                    scale: [0, 1, 0.8],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 border-2 border-dimensional-black/20"
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0.8, 0.4],
                    scale: [0, 0.8, 1.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  className="absolute inset-8 bg-coral/30 rounded-full"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: 1,
                  }}
                  className="absolute inset-0 border border-sage/40"
                  style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
                />
              </div>
            </motion.div>
          )}

          {/* Phase 3: Resolution - Full Architectural Awareness */}
          {currentPhase === 'resolution' && (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto relative">
                {/* Crystallized consciousness structure */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0"
                >
                  <svg viewBox="0 0 128 128" className="w-full h-full">
                    <defs>
                      <linearGradient id="consciousnessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#DDA0DD" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#9CAF88" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="64,8 96,32 96,96 64,120 32,96 32,32"
                      fill="none"
                      stroke="url(#consciousnessGradient)"
                      strokeWidth="2"
                    />
                    <polygon
                      points="64,20 84,36 84,84 64,100 44,84 44,36"
                      fill="url(#consciousnessGradient)"
                      opacity="0.3"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="8"
                      fill="#FF6B6B"
                      opacity="0.8"
                    />
                  </svg>
                </motion.div>
                
                {/* Consciousness glow */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 consciousness-glow rounded-full"
                />
              </div>
            </motion.div>
          )}

          {/* Loading Message */}
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-lg font-display font-bold uppercase tracking-wider mb-2">
              {message}
            </h3>
            <p className="text-sm opacity-60 uppercase tracking-wide">
              {currentPhase === 'void' && 'INFINITE POTENTIAL'}
              {currentPhase === 'formation' && 'GEOMETRIC EMERGENCE'}
              {currentPhase === 'resolution' && 'ARCHITECTURAL AWARENESS'}
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            className="mt-8 flex justify-center space-x-2"
          >
            {['void', 'formation', 'resolution'].map((phase, index) => (
              <motion.div
                key={phase}
                animate={{
                  backgroundColor: currentPhase === phase ? '#FF6B6B' : '#9CAF88',
                  scale: currentPhase === phase ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-2 h-2 rounded-full"
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}