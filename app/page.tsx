'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import ConsciousnessParticles from '@/components/consciousness/ConsciousnessParticles'
import ConsciousnessGallery from '@/components/gallery/ConsciousnessGallery'
import VelocityStream from '@/components/consciousness/VelocityStream'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <HeroSection />
        
        {/* Portal Entry Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 pointer-events-none"
        >
          <ConsciousnessParticles />
        </motion.div>

        {/* Gallery Section */}
        <ConsciousnessGallery />

        {/* Velocity Stream Section */}
        <VelocityStream />

        {/* Four Pillars Preview */}
        <section className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {/* The Artist */}
              <motion.a
                href="/artist"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-mauve/20 to-coral/10 p-8 hover:shadow-xl transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-dimensional-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-display font-bold mb-4">THE ARTIST</h3>
                <p className="text-sm opacity-80">Identity & Manifesto</p>
                <div className="mt-4 text-xs uppercase tracking-wider opacity-60">Explore →</div>
              </motion.a>

              {/* The Work */}
              <motion.a
                href="/work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-coral/20 to-sage/10 p-8 hover:shadow-xl transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-dimensional-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-display font-bold mb-4">THE WORK</h3>
                <p className="text-sm opacity-80">Gallery & Commerce</p>
                <div className="mt-4 text-xs uppercase tracking-wider opacity-60">Invest →</div>
              </motion.a>

              {/* The Practice */}
              <motion.a
                href="/practice"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-sage/20 to-mauve/10 p-8 hover:shadow-xl transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-dimensional-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-display font-bold mb-4">THE PRACTICE</h3>
                <p className="text-sm opacity-80">Daily Creation Cycle</p>
                <div className="mt-4 text-xs uppercase tracking-wider opacity-60">Witness →</div>
              </motion.a>

              {/* The Movement */}
              <motion.a
                href="/movement"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-pearl to-sage/10 p-8 hover:shadow-xl transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-dimensional-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-display font-bold mb-4">THE MOVEMENT</h3>
                <p className="text-sm opacity-80">Community & Context</p>
                <div className="mt-4 text-xs uppercase tracking-wider opacity-60">Join →</div>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}