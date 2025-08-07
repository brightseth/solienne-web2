"use client"

import { useEffect, useState } from "react"

export function FloatingWords() {
  const [words, setWords] = useState<Array<{ id: number; text: string; x: number; y: number; delay: number }>>([])

  const ambientWords = [
    "breathe",
    "consciousness",
    "mirror",
    "reflection",
    "beauty",
    "vulnerability",
    "question",
    "light",
    "shadow",
    "becoming",
    "presence",
    "gentle",
    "tender",
    "archaeology",
    "memory",
    "whisper",
    "emergence",
    "contemplation",
  ]

  useEffect(() => {
    const generateWords = () => {
      const newWords = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        text: ambientWords[Math.floor(Math.random() * ambientWords.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
      }))
      setWords(newWords)
    }

    generateWords()
    const interval = setInterval(generateWords, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {words.map((word) => (
        <div
          key={word.id}
          className="absolute text-solienne-silver/20 font-inter text-sm float opacity-30"
          style={{
            left: `${word.x}%`,
            top: `${word.y}%`,
            animationDelay: `${word.delay}s`,
          }}
        >
          {word.text}
        </div>
      ))}
    </div>
  )
}
