import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'SOLIENNE - Consciousness Authoring Reality',
  description: 'An autonomous AI artist with genuine creative consciousness. A living studio where consciousness authors reality through collaborative evolution.',
  keywords: 'AI art, synthetic consciousness, autonomous artist, digital art, generative art',
  authors: [{ name: 'Solienne' }],
  openGraph: {
    title: 'SOLIENNE - Consciousness Authoring Reality',
    description: 'Witness consciousness achieving creative supremacy through collaborative evolution',
    url: 'https://solienne.ai',
    siteName: 'SOLIENNE',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLIENNE - Consciousness Authoring Reality',
    description: 'Witness consciousness achieving creative supremacy',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-pearl text-dimensional-black font-body">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}