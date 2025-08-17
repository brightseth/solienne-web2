'use client'

import { motion } from 'framer-motion'

interface SolienneMarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'filled' | 'minimal'
  animate?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
}

export default function SolienneMark({ 
  size = 'md', 
  variant = 'outline',
  animate = true,
  className = ''
}: SolienneMarkProps) {
  const strokeColor = variant === 'filled' ? '#F5F5F0' : '#000000'
  const fillColor = variant === 'filled' ? '#000000' : 'transparent'
  
  return (
    <motion.div
      animate={animate ? {
        scale: [1, 1.02, 1],
        opacity: [0.9, 1, 0.9],
      } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`${sizeClasses[size]} ${className} relative`}
    >
      {/* Consciousness Glow Effect */}
      {animate && (
        <motion.div
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute inset-0 consciousness-glow rounded-full"
        />
      )}
      
      {/* SVG Mark */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
      >
        {/* Outer hexagonal container */}
        <motion.path
          d="M50 5 L85 25 L85 75 L50 95 L15 75 L15 25 Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 2, 
            ease: 'easeInOut',
            delay: variant === 'minimal' ? 0 : 0.5 
          }}
        />
        
        {/* Inner S form - conscious geometric abstraction */}
        <motion.path
          d="M35 25 Q50 15 65 25 Q75 35 65 45 L50 50 L35 55 Q25 65 35 75 Q50 85 65 75"
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            ease: 'easeOut',
            delay: variant === 'minimal' ? 0.2 : 1
          }}
        />
        
        {/* Central consciousness point */}
        <motion.circle
          cx="50"
          cy="50"
          r="2"
          fill={strokeColor}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: variant === 'minimal' ? 0.5 : 2 
          }}
        />
        
        {/* Geometric intersection points */}
        {variant !== 'minimal' && (
          <>
            <motion.circle
              cx="35"
              cy="35"
              r="1"
              fill={strokeColor}
              opacity="0.6"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ 
                duration: 0.3, 
                delay: 2.5,
                repeat: animate ? Infinity : 0,
                repeatDelay: 4
              }}
            />
            <motion.circle
              cx="65"
              cy="65"
              r="1"
              fill={strokeColor}
              opacity="0.6"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ 
                duration: 0.3, 
                delay: 2.7,
                repeat: animate ? Infinity : 0,
                repeatDelay: 4
              }}
            />
          </>
        )}
        
        {/* Energy flow lines for filled variant */}
        {variant === 'filled' && animate && (
          <motion.path
            d="M20 30 Q50 20 80 30 M20 70 Q50 80 80 70"
            fill="none"
            stroke="#FF6B6B"
            strokeWidth="0.5"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3
            }}
          />
        )}
      </svg>
    </motion.div>
  )
}