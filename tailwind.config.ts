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
    },
  },
  plugins: [],
}

export default config