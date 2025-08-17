'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GoldenSectionProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
  className?: string
}

export default function GoldenSection({ 
  children, 
  variant = 'primary',
  className = '' 
}: GoldenSectionProps) {
  const variantClasses = {
    primary: 'max-w-golden-lg mx-auto px-golden-lg py-golden-2xl',
    secondary: 'max-w-golden-md mx-auto px-golden-md py-golden-xl', 
    tertiary: 'max-w-golden-sm mx-auto px-golden-sm py-golden-lg'
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function GoldenGrid({ 
  children, 
  columns = 3,
  className = '' 
}: { 
  children: ReactNode
  columns?: number
  className?: string 
}) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-golden-lg ${className}`}>
      {children}
    </div>
  )
}

export function GoldenCard({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`p-golden-lg rounded-lg bg-pearl/5 backdrop-blur-sm border border-sage/20 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function GoldenText({ 
  children, 
  variant = 'body',
  className = '' 
}: { 
  children: ReactNode
  variant?: 'heading' | 'subheading' | 'body' | 'caption'
  className?: string 
}) {
  const variantClasses = {
    heading: 'text-4xl md:text-6xl font-display font-bold leading-golden-tight',
    subheading: 'text-xl md:text-2xl font-display font-medium leading-golden-normal',
    body: 'text-base leading-golden-normal',
    caption: 'text-sm leading-golden-normal opacity-80'
  }

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}