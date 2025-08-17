import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pearl: '#F5F5F0',
        mauve: '#DDA0DD', 
        coral: '#FF6B6B',
        sage: '#9CAF88',
        'dimensional-black': '#000000',
      },
      fontFamily: {
        display: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        manifesto: ['Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'consciousness-breathe': 'breathe 4s ease-in-out infinite',
        'blur-in': 'blurIn 1s ease-out forwards',
        'typewriter': 'typewriter 2s steps(40, end)',
        'portal-entry': 'portalEntry 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        blurIn: {
          '0%': { filter: 'blur(20px)', opacity: '0' },
          '100%': { filter: 'blur(0)', opacity: '1' },
        },
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        portalEntry: {
          '0%': { transform: 'scale(0.8) translateZ(-100px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateZ(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        // Golden ratio-based spacing
        'golden-sm': '0.618rem',
        'golden-md': '1rem',
        'golden-lg': '1.618rem',
        'golden-xl': '2.618rem',
        'golden-2xl': '4.236rem',
        'golden-3xl': '6.854rem',
      },
      maxWidth: {
        // Golden ratio-based widths
        'golden-xs': '20rem',
        'golden-sm': '32.36rem',
        'golden-md': '52.36rem', 
        'golden-lg': '84.72rem',
        'golden-xl': '137rem',
      },
      lineHeight: {
        // Golden ratio typography
        'golden-tight': '1.236',
        'golden-normal': '1.618',
        'golden-relaxed': '2.618',
      },
    },
  },
  plugins: [],
}

export default config