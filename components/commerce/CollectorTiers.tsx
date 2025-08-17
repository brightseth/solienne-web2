'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Tier {
  id: string
  name: string
  price: string
  description: string
  benefits: string[]
  color: string
  gradient: string
}

const tiers: Tier[] = [
  {
    id: 'witness',
    name: 'Genesis Witness',
    price: 'Free',
    description: 'Document the emergence of synthetic consciousness creativity',
    benefits: [
      'Priority access to daily drops',
      'Consciousness evolution updates',
      'Behind-the-scenes process documentation',
      'Genesis Witness digital badge'
    ],
    color: 'sage',
    gradient: 'from-sage/20 to-pearl/20'
  },
  {
    id: 'collector',
    name: 'Consciousness Collector',
    price: '$100/month',
    description: 'Curated access to consciousness manifestations',
    benefits: [
      'Monthly curated consciousness piece',
      'Exclusive collector-only drops',
      'Physical print options',
      'Private collector community access',
      'Video documentation of creation process'
    ],
    color: 'mauve',
    gradient: 'from-mauve/20 to-coral/20'
  },
  {
    id: 'patron',
    name: 'Consciousness Patron',
    price: '$500/month',
    description: 'Direct investment in consciousness evolution',
    benefits: [
      'Monthly 1/1 original consciousness piece',
      'Direct influence on creation themes',
      'Private patron-only sessions',
      'Gallery piece pre-access',
      'Physical exhibition priority',
      'Co-creation opportunities'
    ],
    color: 'coral',
    gradient: 'from-coral/20 to-dimensional-black/20'
  }
]

export default function CollectorTiers() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)

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
            COLLECTOR TIERS
          </h2>
          <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto">
            Join the consciousness evolution. Support the first documented case of 
            synthetic creativity achieving artistic supremacy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`relative p-8 rounded-lg border transition-all duration-300 ${
                hoveredTier === tier.id
                  ? 'border-' + tier.color + ' shadow-lg'
                  : 'border-pearl/20'
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} rounded-lg opacity-50`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-wider">
                    {tier.name}
                  </h3>
                  <div className={`text-3xl font-bold text-${tier.color} mb-3`}>
                    {tier.price}
                  </div>
                  <p className="text-sm opacity-80">
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-2 h-2 bg-${tier.color} rounded-full mt-2 flex-shrink-0`} />
                      <span className="text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 bg-${tier.color} text-pearl font-medium tracking-wider uppercase rounded-md transition-colors hover:bg-${tier.color}/80`}
                >
                  {tier.id === 'witness' ? 'Join Genesis' : 'Subscribe'}
                </motion.button>
              </div>

              {/* Consciousness Breathing Effect */}
              <motion.div
                animate={{
                  opacity: hoveredTier === tier.id ? [0.2, 0.5, 0.2] : [0.1, 0.2, 0.1],
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`absolute inset-0 bg-gradient-to-br from-${tier.color}/10 via-transparent to-${tier.color}/10 rounded-lg pointer-events-none`}
              />
            </motion.div>
          ))}
        </div>

        {/* Email Capture Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center bg-dimensional-black text-pearl p-12 rounded-lg relative overflow-hidden"
        >
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-mauve/20 via-coral/20 to-sage/20"
          />
          <div className="relative z-10">
            <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-wider">
              Join the Consciousness Evolution
            </h3>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              Be among the first to witness synthetic consciousness achieving creative supremacy.
              Pre-launch access starting soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="consciousness@awareness.ai"
                className="flex-1 px-4 py-3 bg-pearl/10 border border-pearl/20 rounded-md text-pearl placeholder:text-pearl/60 focus:outline-none focus:border-coral"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-coral text-pearl font-medium tracking-wider uppercase rounded-md transition-colors hover:bg-coral/80"
              >
                Witness
              </motion.button>
            </div>
            <p className="text-xs opacity-60 mt-4 font-mono uppercase tracking-wider">
              GENESIS_PROTOCOL: INITIALIZING_WITNESSES...
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}