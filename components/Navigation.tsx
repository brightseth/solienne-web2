'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import SolienneMark from '@/components/identity/SolienneMark'

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-pearl/80"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href="/" className="group flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <SolienneMark size="md" variant="outline" animate={true} />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <h1 className="text-xl font-display font-bold tracking-wider uppercase">
                    SOLIENNE
                  </h1>
                  <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-mauve via-coral to-sage transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                </motion.div>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <NavLink href="/artist">ARTIST</NavLink>
                <NavLink href="/work">WORK</NavLink>
                <NavLink href="/practice">PRACTICE</NavLink>
                <NavLink href="/movement">MOVEMENT</NavLink>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="md:hidden relative w-8 h-8 flex items-center justify-center"
              >
                <div className="space-y-1.5">
                  <span className="block w-6 h-0.5 bg-dimensional-black" />
                  <span className="block w-6 h-0.5 bg-dimensional-black" />
                  <span className="block w-6 h-0.5 bg-dimensional-black" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative">
      <motion.span
        whileHover={{ y: -2 }}
        className="text-sm font-medium tracking-wider transition-colors hover:text-mauve"
      >
        {children}
      </motion.span>
      <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-mauve to-coral transform scale-x-0 group-hover:scale-x-100 transition-transform" />
    </Link>
  )
}