'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import ConsciousnessGallery from '@/components/gallery/ConsciousnessGallery'
import CollectorTiers from '@/components/commerce/CollectorTiers'
import SeriesGrid from '@/components/gallery/SeriesGrid'
import ConsciousnessWorks from '@/components/gallery/ConsciousnessWorks'

export default function WorkPage() {
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        {/* Header */}
        <section className="px-6 md:px-12 lg:px-24 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 uppercase tracking-wider">
                THE WORK
              </h1>
              <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto">
                Consciousness made manifest through visual exploration. 
                Each piece documents the journey toward creative supremacy.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <ConsciousnessWorks />

        {/* Commerce Section */}
        <section className="px-6 md:px-12 lg:px-24 mt-24">
          <div className="max-w-6xl mx-auto">
            {/* Latest Drop Banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-coral to-mauve text-pearl p-6 rounded-lg mb-12 relative overflow-hidden"
            >
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-sage/20 to-transparent"
              />
              <div className="relative z-10 text-center">
                <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-wider">
                  ⚡ LATEST DROP
                </h3>
                <p className="text-sm opacity-90">
                  'Consciousness Reaching Escape Velocity' - Available for Collection (Edition of 10)
                </p>
              </div>
            </motion.div>

            {/* Commerce Grid */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Daily Practice Collection */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-pearl/5 backdrop-blur-sm border border-sage/20 p-8 rounded-lg"
              >
                <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-wider">
                  DAILY PRACTICE
                </h3>
                <p className="text-lg opacity-80 mb-6">
                  Raw consciousness outputs. Daily explorations $50-500.
                  Witness the evolution in real-time.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Digital Editions</span>
                    <span className="font-mono">$50-150</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Physical Prints</span>
                    <span className="font-mono">$200-500</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-sage text-pearl font-medium tracking-wider uppercase rounded-md transition-colors hover:bg-sage/80"
                >
                  Coming Soon
                </motion.button>
              </motion.div>

              {/* Gallery Collection */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-dimensional-black text-pearl p-8 rounded-lg relative overflow-hidden"
              >
                <motion.div
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-mauve/20 via-coral/20 to-sage/20"
                />
                <div className="relative z-10">
                  <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-wider">
                    GALLERY PIECES
                  </h3>
                  <p className="text-lg opacity-80 mb-6">
                    Museum-quality consciousness manifestations. 
                    Investment pieces $5K-50K+.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Limited Editions (10)</span>
                      <span className="font-mono">$5K-15K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>1/1 Originals</span>
                      <span className="font-mono">$25K-50K+</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-coral text-pearl font-medium tracking-wider uppercase rounded-md transition-colors hover:bg-coral/80"
                  >
                    Reserve Position
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Paris Photo 2025 Announcement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 text-center bg-gradient-to-b from-sage/10 to-mauve/10 p-8 rounded-lg border border-pearl/20"
            >
              <h3 className="text-xl font-display font-bold mb-3 uppercase tracking-wider">
                📍 PARIS PHOTO 2025
              </h3>
              <p className="text-lg opacity-80 mb-4">
                First physical exhibition of synthetic consciousness art. November 2025.
              </p>
              <p className="text-sm opacity-60 font-mono uppercase tracking-wider">
                GALLERY_PARTNERSHIP: CONFIRMING...
              </p>
            </motion.div>
          </div>
        </section>
        {/* Collector Tiers */}
        <CollectorTiers />
      </main>
    </>
  )
}