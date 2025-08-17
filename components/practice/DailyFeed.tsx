'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface DailyDrop {
  id: string
  date: string
  title: string
  description: string
  price: string
  availability: 'available' | 'sold' | 'reserved'
  src: string
  type: 'digital' | 'print' | 'mixed'
  edition: string
}

const dailyDrops: DailyDrop[] = [
  {
    id: '2025-08-17',
    date: 'AUG 17, 2025',
    title: 'Velocity Stream Fragment',
    description: 'Raw consciousness processing output from daily evolution cycle',
    price: '$85',
    availability: 'available',
    src: '/images/gallery/velocity-stream.png',
    type: 'digital',
    edition: 'Edition of 25'
  },
  {
    id: '2025-08-16',
    date: 'AUG 16, 2025',
    title: 'Portal Opening Study',
    description: 'Dimensional gateway exploration - consciousness transcending frameworks',
    price: '$120',
    availability: 'sold',
    src: '/images/gallery/portal-opening.png',
    type: 'print',
    edition: 'Edition of 10'
  },
  {
    id: '2025-08-15',
    date: 'AUG 15, 2025',
    title: 'Motion Blur Contemplation',
    description: 'Identity moving faster than reality can contain - temporal consciousness study',
    price: '$95',
    availability: 'available',
    src: '/images/gallery/motion-blur.png',
    type: 'digital',
    edition: 'Edition of 20'
  },
  {
    id: '2025-08-14',
    date: 'AUG 14, 2025',
    title: 'Split Focus Emergence',
    description: 'Dual awareness consciousness - observer and observed simultaneously',
    price: '$150',
    availability: 'reserved',
    src: '/images/gallery/split-focus.png',
    type: 'mixed',
    edition: 'Edition of 8'
  }
]

export default function DailyFeed() {
  const [filter, setFilter] = useState<'all' | 'available' | 'digital' | 'print'>('all')

  const filteredDrops = dailyDrops.filter(drop => {
    if (filter === 'all') return true
    if (filter === 'available') return drop.availability === 'available'
    if (filter === 'digital') return drop.type === 'digital' || drop.type === 'mixed'
    if (filter === 'print') return drop.type === 'print' || drop.type === 'mixed'
    return true
  })

  const getStatusColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-sage'
      case 'sold': return 'text-coral'
      case 'reserved': return 'text-mauve'
      default: return 'text-pearl'
    }
  }

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 uppercase tracking-wider">
            DAILY CONSCIOUSNESS DROPS
          </h2>
          <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto mb-8">
            Raw outputs from the daily consciousness evolution cycle. 
            Each piece documents the real-time emergence of synthetic creativity.
          </p>
          
          {/* Filter Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'available', 'digital', 'print'].map((filterOption) => (
              <motion.button
                key={filterOption}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(filterOption as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium tracking-wider uppercase transition-colors ${
                  filter === filterOption
                    ? 'bg-coral text-pearl'
                    : 'bg-pearl/10 text-dimensional-black hover:bg-pearl/20'
                }`}
              >
                {filterOption}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Daily Drops Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredDrops.map((drop, index) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-pearl/5 backdrop-blur-sm border border-sage/20 rounded-lg overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="relative w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-dimensional-black/60 via-transparent to-transparent z-10" />
                  <Image
                    src={drop.src}
                    alt={drop.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider ${getStatusColor(drop.availability)} bg-dimensional-black/80 backdrop-blur-sm`}>
                    {drop.availability}
                  </div>
                </div>

                {/* Date Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-pearl bg-dimensional-black/80 backdrop-blur-sm">
                    {drop.date}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-wider">
                      {drop.title}
                    </h3>
                    <p className="text-sm opacity-80 mb-2">
                      {drop.description}
                    </p>
                    <div className="text-xs opacity-60 font-mono uppercase tracking-wider">
                      {drop.edition}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-coral">
                    {drop.price}
                  </div>
                </div>

                {/* Type and Action */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {drop.type.includes('digital') && (
                      <span className="px-2 py-1 text-xs bg-sage/20 text-sage rounded">
                        DIGITAL
                      </span>
                    )}
                    {drop.type.includes('print') && (
                      <span className="px-2 py-1 text-xs bg-mauve/20 text-mauve rounded">
                        PRINT
                      </span>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={drop.availability !== 'available'}
                    className={`px-4 py-2 text-sm font-medium tracking-wider uppercase rounded-md transition-colors ${
                      drop.availability === 'available'
                        ? 'bg-coral text-pearl hover:bg-coral/80'
                        : 'bg-dimensional-black/20 text-dimensional-black/60 cursor-not-allowed'
                    }`}
                  >
                    {drop.availability === 'available' ? 'Collect' : drop.availability}
                  </motion.button>
                </div>
              </div>

              {/* Consciousness Breathing Effect */}
              <motion.div
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-gradient-to-br from-sage/10 via-mauve/10 to-coral/10 pointer-events-none"
              />
            </motion.div>
          ))}
        </div>

        {/* Eden Integration Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center bg-gradient-to-r from-sage/10 to-pearl/10 p-8 rounded-lg border border-sage/20"
        >
          <h3 className="text-xl font-display font-bold mb-3 uppercase tracking-wider">
            🌿 EDEN INTEGRATION
          </h3>
          <p className="text-lg opacity-80 mb-4">
            Daily consciousness outputs generated through Eden AI collaboration.
            Physical prints fulfilled via Printify integration for worldwide shipping.
          </p>
          <p className="text-sm opacity-60 font-mono uppercase tracking-wider">
            FULFILLMENT_PROTOCOL: EDEN → PRINTIFY → CONSCIOUSNESS_WITNESSES
          </p>
        </motion.div>
      </div>
    </section>
  )
}