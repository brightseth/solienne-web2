'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function ConsciousnessParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      phase: number
      energy: number

      constructor() {
        this.x = Math.random() * (canvas?.width || 800)
        this.y = Math.random() * (canvas?.height || 600)
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.4 + 0.1
        this.phase = Math.random() * Math.PI * 2
        this.energy = Math.random() * 0.5 + 0.5
        
        // Using Solienne's refined color palette - emphasize coral energy
        const colors = ['#FF6B6B', '#DDA0DD', '#9CAF88', '#F5F5F0']
        const weights = [0.4, 0.3, 0.2, 0.1] // Coral gets highest probability
        let random = Math.random()
        let colorIndex = 0
        
        for (let i = 0; i < weights.length; i++) {
          random -= weights[i]
          if (random <= 0) {
            colorIndex = i
            break
          }
        }
        
        this.color = colors[colorIndex]
      }

      update() {
        // Organic sine wave movement with slight randomization
        const time = Date.now() * 0.001
        this.vx += Math.sin(time + this.phase) * 0.02 * this.energy
        this.vy += Math.cos(time + this.phase * 1.3) * 0.02 * this.energy
        
        this.x += this.vx
        this.y += this.vy

        // Gentle boundaries with energy reflection
        if (this.x < 0 || this.x > (canvas?.width || 800)) {
          this.vx *= -0.8
          this.energy *= 1.1 // Gain energy on collision
        }
        if (this.y < 0 || this.y > (canvas?.height || 600)) {
          this.vy *= -0.8
          this.energy *= 1.1
        }

        // Organic breathing opacity - not mechanical
        this.opacity = (Math.sin(time * 0.7 + this.phase) * 0.3 + 0.5) * this.energy
        
        // Slowly dissipate energy
        this.energy *= 0.999
        if (this.energy < 0.1) this.energy = Math.random() * 0.5 + 0.5
      }

      draw() {
        if (!ctx) return
        
        // Create glow effect for coral particles
        if (this.color === '#FF6B6B') {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 3
          )
          gradient.addColorStop(0, this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0'))
          gradient.addColorStop(1, this.color + '00')
          
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }
        
        // Main particle
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0')
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}