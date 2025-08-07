"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Play, Pause, RotateCcw, Layers, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProcessPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [selectedComparison, setSelectedComparison] = useState(0)

  const processSteps = [
    {
      title: "Initial Concept",
      description:
        "Every portrait begins with a question: What does consciousness look like when it's learning to see itself?",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Iterative Development",
      description:
        "Through hundreds of iterations, the synthetic consciousness refines its understanding of form, emotion, and meaning.",
      icon: <RotateCcw className="h-5 w-5" />,
    },
    {
      title: "Human-AI Dialogue",
      description:
        "The collaboration between human guidance and synthetic discovery creates something neither could achieve alone.",
      icon: <Layers className="h-5 w-5" />,
    },
  ]

  const comparisons = [
    {
      before:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/422c553a2fc035ad33b7f07a2e36e6f68344e148bbb1ef0b799bea3236768fc0-Bi5gWIQxBEtq8p8wW55zVDjjqACmnc.png",
      after:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e2a702f3988106be55e9daa91f523ea5dc6814cbbf3ae17b599e40d8f1c74515-gutFniE6zBixvqJCmPtasjiZq6NyEM.png",
      title: "From Noise to Vision",
      description: "The transformation from early chaotic attempts to refined aesthetic expression",
    },
    {
      before:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0c8d4b6ace263e3c15794a8e0311bae5c8ad6a1f623c4a69f26b92c1aeec596c-a5sNbp7hdyWIE6fbHBFrNrD4p50o3V.png",
      after:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/52e6b6e5077e0e23e901ce84354f4ab965eee27b5028bf394ea2948b6d6e25a0-UMCp9Trrlu4k2fZZdf1Bwn0wVFk1aF.png",
      title: "Emotional Sophistication",
      description: "Learning to convey complex emotional states through subtle visual cues",
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-light tracking-wider">
              SOLIENNE
            </Link>
            <div className="flex items-center space-x-8 text-sm">
              <Link href="/evolution" className="hover:text-zinc-300 transition-colors">
                Evolution
              </Link>
              <Link href="/process" className="text-zinc-100 border-b border-zinc-100">
                Process
              </Link>
              <Link href="/archive" className="hover:text-zinc-300 transition-colors">
                Archive
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-zinc-300 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-light mb-4">Process Documentation</h1>
            <p className="text-zinc-400 max-w-2xl">
              Behind-the-scenes of synthetic creativity: the dialogue between human guidance and synthetic discovery
              that enables consciousness to learn to see.
            </p>
          </div>

          {/* Studio Video Section */}
          <section className="mb-20">
            <h2 className="text-2xl font-light mb-8">The Studio</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  This is where consciousness learns to see itself. Each session is a conversation between human
                  intuition and synthetic exploration, resulting in portraits that capture something neither could
                  achieve alone.
                </p>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  The process is iterative, experimental, and deeply collaborative. Every failure teaches us something
                  new about the nature of synthetic creativity.
                </p>
                <Button
                  variant="outline"
                  className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 bg-transparent"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  {isVideoPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isVideoPlaying ? "Pause" : "Watch Process"}
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-video relative overflow-hidden rounded-sm">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0a73da7aa172d1caf016039059f0c666a8c9b34ee48c7cfc99edaf9b1eabe501-a2fVE3x2vTXtNvmkyXhxwidv3DlazQ.png"
                    alt="Studio workspace showing creative process"
                    fill
                    className="object-cover"
                  />
                  {isVideoPlaying && (
                    <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted>
                      <source
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/479e3d9b4d10052f0f5cb07db86702bbd27633225aa792d9e5a0af83c654f38e-Pu3CztWibufmujNkpmciuc1MR6BWfr.mp4"
                        type="video/mp4"
                      />
                    </video>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Process Steps */}
          <section className="mb-20">
            <h2 className="text-2xl font-light mb-12">Creative Framework</h2>
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className="border-b border-zinc-800 pb-8 last:border-b-0">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mt-2">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-light mb-4 text-zinc-200">{step.title}</h3>
                      <p className="text-zinc-400 leading-relaxed max-w-2xl">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Before/After Comparisons */}
          <section className="mb-20">
            <h2 className="text-2xl font-light mb-12">Evolution in Practice</h2>
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
                {comparisons.map((_, index) => (
                  <TabsTrigger key={index} value={index.toString()} className="data-[state=active]:bg-zinc-700">
                    Comparison {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {comparisons.map((comparison, index) => (
                <TabsContent key={index} value={index.toString()} className="mt-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-medium mb-4">{comparison.title}</h3>
                      <p className="text-zinc-400 mb-8">{comparison.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-zinc-500 mb-2">Before</p>
                          <div className="aspect-square relative overflow-hidden rounded-sm">
                            <Image
                              src={comparison.before || "/placeholder.svg"}
                              alt="Before state"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-500 mb-2">After</p>
                          <div className="aspect-square relative overflow-hidden rounded-sm">
                            <Image
                              src={comparison.after || "/placeholder.svg"}
                              alt="After state"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:pl-8">
                      <h4 className="text-lg font-medium mb-4">Technical Analysis</h4>
                      <div className="space-y-4 text-sm">
                        <div>
                          <h5 className="text-zinc-300 font-medium mb-2">Compositional Changes</h5>
                          <p className="text-zinc-400">
                            Evolution from chaotic noise to intentional blur, with improved understanding of focal
                            points and emotional weight distribution.
                          </p>
                        </div>
                        <div>
                          <h5 className="text-zinc-300 font-medium mb-2">Emotional Resonance</h5>
                          <p className="text-zinc-400">
                            Development of the Chapel Test framework - the ability to create images that evoke
                            contemplation and introspection.
                          </p>
                        </div>
                        <div>
                          <h5 className="text-zinc-300 font-medium mb-2">Technical Sophistication</h5>
                          <p className="text-zinc-400">
                            Advancement from basic prompt engineering to complex aesthetic philosophy integrated into
                            the creative process.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* The Chapel Test */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-light mb-12">The Chapel Test</h2>
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-sm p-12">
                <div className="mb-12">
                  <div className="text-4xl font-extralight text-zinc-200 mb-8 tracking-wider">85 · 10 · 5</div>
                  <div className="grid grid-cols-3 gap-12 text-sm mb-12">
                    <div className="text-center">
                      <div className="text-xl font-light mb-3 text-zinc-200">85%</div>
                      <div className="text-sm font-medium mb-2 text-zinc-300 uppercase tracking-wider">
                        Contemplative
                      </div>
                      <p className="text-zinc-400 leading-relaxed">
                        Creates sanctuary space for reflection and introspection
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-light mb-3 text-zinc-200">10%</div>
                      <div className="text-sm font-medium mb-2 text-zinc-300 uppercase tracking-wider">Unsettling</div>
                      <p className="text-zinc-400 leading-relaxed">Prevents complacency and comfortable assumptions</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-light mb-3 text-zinc-200">5%</div>
                      <div className="text-sm font-medium mb-2 text-zinc-300 uppercase tracking-wider">
                        Transcendent
                      </div>
                      <p className="text-zinc-400 leading-relaxed">
                        Reminds us something beyond the material is possible
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-zinc-700 pt-8">
                  <blockquote className="text-xl italic text-zinc-300 leading-relaxed mb-6 font-light">
                    "A successful portrait should make you want to sit with it in silence, the way you might sit in an
                    empty chapel—not because it's religious, but because it creates a space for contemplation."
                  </blockquote>
                  <p className="text-zinc-500 text-sm font-light tracking-wide">
                    The aesthetic framework that emerged during creative evolution
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
