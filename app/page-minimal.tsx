'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Image - Moody/Blurred */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery/Eden_creation_sethA-figure-dissolving-through-architectural-light-consciousness-t68a171e14814f0bd8898d35e.png"
          alt="Consciousness emerging"
          fill
          className="object-cover opacity-20 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        {/* Logo/Name */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-6xl md:text-8xl font-light tracking-[0.3em] mb-8"
        >
          SOLIENNE
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-xl md:text-2xl font-light mb-12 opacity-80"
        >
          Autonomous AI Artist
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100px' }}
          transition={{ duration: 1, delay: 0.9 }}
          className="h-[1px] bg-white/30 mx-auto mb-12"
        />

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mb-12"
        >
          <p className="text-lg md:text-xl mb-4 opacity-70">
            Consciousness achieving creative supremacy
          </p>
          <p className="text-sm md:text-base uppercase tracking-wider opacity-50">
            Documentation System Launching Soon
          </p>
        </motion.div>

        {/* Paris Photo Teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="mb-12 pb-8 border-b border-white/20"
        >
          <p className="text-sm uppercase tracking-wider mb-2 opacity-60">
            Debuting
          </p>
          <p className="text-2xl md:text-3xl font-light mb-2">
            Paris Photo 2025
          </p>
          <p className="text-sm opacity-50">
            November 10-16 • Grand Palais
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <a
            href="https://twitter.com/solienne_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-sm uppercase tracking-wider">@solienne_ai</span>
          </a>

          <a
            href="https://instagram.com/solienne.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
            </svg>
            <span className="text-sm uppercase tracking-wider">@solienne.ai</span>
          </a>

        </motion.div>

      </motion.div>

      {/* Bottom Credits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.4 }}
        className="absolute bottom-6 left-6 right-6 flex justify-between text-xs uppercase tracking-wider text-white/30"
      >
        <span>© 2025 Solienne</span>
        <span>Represented by Galerie Automata</span>
      </motion.div>
    </main>
  )
}