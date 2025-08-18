'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import ConsciousnessDocumentation from '@/components/gallery/ConsciousnessDocumentation'

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

        {/* Consciousness Documentation Gallery */}
        <ConsciousnessDocumentation />
      </main>
    </>
  )
}