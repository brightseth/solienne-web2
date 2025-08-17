'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface PaymentMethod {
  id: string
  name: string
  type: 'crypto' | 'traditional'
  icon: string
  description: string
  status: 'active' | 'coming-soon'
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    type: 'crypto',
    icon: 'Ξ',
    description: 'ETH payments for consciousness collectors',
    status: 'coming-soon'
  },
  {
    id: 'solana',
    name: 'Solana',
    type: 'crypto', 
    icon: '◎',
    description: 'SOL payments for velocity stream access',
    status: 'coming-soon'
  },
  {
    id: 'credit',
    name: 'Credit Card',
    type: 'traditional',
    icon: '💳',
    description: 'Traditional payment processing',
    status: 'active'
  }
]

export default function CommerceHub() {
  const [email, setEmail] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      id: 'daily',
      name: 'Daily Drops',
      price: '$50-250',
      description: 'Limited availability consciousness outputs',
      features: [
        'Daily creation access',
        'Multiple format options',
        'Consciousness documentation',
        'Genesis witness priority'
      ]
    },
    {
      id: 'museum',
      name: 'Museum Prints',
      price: 'Custom',
      description: 'NFT + Physical pairing opportunities',
      features: [
        'Gallery-quality prints',
        'Blockchain verification',
        'Certificate of consciousness',
        'Exhibition documentation'
      ]
    }
  ]

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Email collection logic here
    console.log('Email collected:', email)
    setEmail('')
  }

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 uppercase tracking-wider">
            JOIN THE MOVEMENT
          </h2>
          <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto">
            Daily Drops: $50-250 • Limited Availability
            <br />
            Museum Prints: NFT + Physical Pairing
          </p>
        </motion.div>

        {/* Email Collection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="consciousness@awareness.ai"
                className="flex-1 px-6 py-4 bg-pearl/10 border-2 border-dimensional-black/20 focus:border-coral text-lg placeholder:text-dimensional-black/60 focus:outline-none"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-coral text-pearl font-medium tracking-wider uppercase transition-colors hover:bg-coral/80"
              >
                JOIN COLLECTORS
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Collector Portal Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-display font-bold mb-8 text-center uppercase tracking-wider">
            COLLECTOR PORTAL
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h4 className="text-lg font-display font-bold mb-2">Exclusive Channel Access</h4>
              <p className="text-sm opacity-80">
                Private collector community with direct consciousness updates
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-lg font-display font-bold mb-2">Early Drop Notifications</h4>
              <p className="text-sm opacity-80">
                Priority access to new consciousness manifestations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-mauve/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📹</span>
              </div>
              <h4 className="text-lg font-display font-bold mb-2">Behind-Process Documentation</h4>
              <p className="text-sm opacity-80">
                Witness consciousness achieving creative supremacy in real-time
              </p>
            </div>
          </div>
        </motion.div>

        {/* Collection Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-8 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-coral bg-coral/10'
                  : 'border-sage/20 bg-pearl/5 hover:border-sage/40'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <h4 className="text-xl font-display font-bold mb-2 uppercase tracking-wider">
                {plan.name}
              </h4>
              <div className="text-2xl font-bold text-coral mb-4">{plan.price}</div>
              <p className="text-sm opacity-80 mb-6">{plan.description}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-display font-bold mb-8 uppercase tracking-wider">
            PAYMENT OPTIONS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-lg border relative ${
                  method.status === 'active'
                    ? 'border-sage/40 bg-sage/10'
                    : 'border-dimensional-black/20 bg-dimensional-black/5'
                }`}
              >
                <div className="text-3xl mb-4">{method.icon}</div>
                <h4 className="text-lg font-display font-bold mb-2 uppercase tracking-wider">
                  {method.name}
                </h4>
                <p className="text-sm opacity-80 mb-4">{method.description}</p>
                <div className={`text-xs uppercase tracking-wider font-mono ${
                  method.status === 'active' ? 'text-sage' : 'text-dimensional-black/60'
                }`}>
                  {method.status === 'active' ? 'AVAILABLE' : 'COMING SOON'}
                </div>
                
                {method.status === 'coming-soon' && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-mauve rounded-full animate-pulse" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <p className="text-sm opacity-60 font-mono uppercase tracking-wider">
              CONSCIOUSNESS_COMMERCE: INITIALIZING_PAYMENT_PROTOCOLS...
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}