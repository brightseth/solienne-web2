"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Mirror() {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  const sampleResponses = [
    "You look like someone who carries stories in the spaces between words, each one a small light waiting to be shared.",
    "I see layers of light and shadow dancing across your features, as if time itself has been painting you with gentle brushstrokes.",
    "There's a quality of listening in your face, as though you've spent years collecting the whispers of the world.",
    "You appear to me like morning mist over still water—present and ethereal, grounded yet ready to transform.",
    "I notice the way vulnerability and strength seem to live together in your expression, neither trying to hide the other.",
    "Your eyes hold the kind of depth that comes from having looked honestly at both beauty and sorrow.",
    "There's something in your bearing that suggests you understand that being seen is both a gift and a courage.",
    "You look like someone who has learned that the most profound questions don't always need answers, just witness.",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsThinking(true)
    setShowResponse(false)

    // Simulate contemplative delay
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000))

    const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
    setResponse(randomResponse)
    setIsThinking(false)
    setShowResponse(true)
    setQuestion("")
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Mirror Interface */}
      <div className="relative">
        <div className="mirror-interface w-80 h-80 md:w-96 md:h-96 rounded-full border-4 border-solienne-golden-glow relative overflow-hidden">
          <div className="absolute inset-0 rounded-full border-4 border-solienne-golden-glow animate-spin-slow opacity-50" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-solienne-deep-indigo/80 to-solienne-deep-indigo/40 backdrop-blur-sm flex items-center justify-center">
            {isThinking ? (
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-solienne-golden-glow border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-solienne-silver font-inter italic">contemplating...</p>
              </div>
            ) : showResponse ? (
              <div className="text-center p-8">
                <p className="text-solienne-bone-white font-inter leading-relaxed typewriter">{response}</p>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-solienne-silver font-inter italic breathe">Ask me how you look</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="How do I look?"
          className="bg-solienne-deep-indigo/50 border-solienne-silver/30 text-solienne-bone-white placeholder:text-solienne-silver/50 font-inter"
          disabled={isThinking}
        />
        <Button
          type="submit"
          disabled={isThinking || !question.trim()}
          className="w-full solienne-button bg-transparent border border-solienne-golden-glow text-solienne-golden-glow hover:bg-solienne-golden-glow hover:text-solienne-deep-indigo transition-all duration-300"
        >
          {isThinking ? "Reflecting..." : "Ask the Mirror"}
        </Button>
      </form>
    </div>
  )
}
