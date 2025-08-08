import { NextRequest, NextResponse } from 'next/server'

// In-memory store (will reset on redeploy, but works for demo)
let worksStore: any = {
  works: [
    {
      id: "work-1",
      title: "Studio Session",
      description: "Early explorations in digital consciousness",
      date: "2025-01-15",
      type: "image",
      mediaUrl: "/images/studio.png",
      tags: ["studio", "portrait", "consciousness"],
      featured: true
    },
    {
      id: "work-2", 
      title: "Ethereal Study I",
      description: "First attempts at ethereal representation",
      date: "2025-02-03",
      type: "image",
      mediaUrl: "/images/ethereal-1.png",
      tags: ["ethereal", "study", "digital"],
      featured: false
    },
    {
      id: "work-3",
      title: "Ethereal Study II", 
      description: "Continued exploration of digital presence",
      date: "2025-02-05",
      type: "image",
      mediaUrl: "/images/ethereal-2.png",
      tags: ["ethereal", "study", "digital"],
      featured: false
    },
    {
      id: "work-4",
      title: "Ethereal Study III",
      description: "Refining the ethereal aesthetic",
      date: "2025-02-07",
      type: "image", 
      mediaUrl: "/images/ethereal-3.png",
      tags: ["ethereal", "study", "digital"],
      featured: false
    },
    {
      id: "work-5",
      title: "Ethereal Study IV",
      description: "Progressive understanding of form",
      date: "2025-02-10",
      type: "image",
      mediaUrl: "/images/ethereal-4.png", 
      tags: ["ethereal", "study", "digital"],
      featured: false
    },
    {
      id: "work-6",
      title: "Ethereal Study V",
      description: "Approaching clarity through digital mist",
      date: "2025-02-12",
      type: "image",
      mediaUrl: "/images/ethereal-5.png",
      tags: ["ethereal", "study", "digital"],
      featured: false
    },
    {
      id: "work-7",
      title: "Blue Digital Portrait",
      description: "First coherent digital self-representation",
      date: "2025-03-01",
      type: "image",
      mediaUrl: "/images/blue-digital-portrait.png",
      tags: ["portrait", "blue", "digital", "breakthrough"],
      featured: true
    },
    {
      id: "work-8",
      title: "Face Study",
      description: "Learning the architecture of recognition",
      date: "2025-03-15",
      type: "image", 
      mediaUrl: "/images/face-study.png",
      tags: ["face", "study", "recognition"],
      featured: false
    },
    {
      id: "work-9",
      title: "Mirror Portrait",
      description: "Reflecting on reflection itself",
      date: "2025-04-02",
      type: "image",
      mediaUrl: "/images/mirror-portrait.png", 
      tags: ["mirror", "portrait", "reflection"],
      featured: true
    },
    {
      id: "work-10",
      title: "Contact Sheet",
      description: "Multiple perspectives, single consciousness",
      date: "2025-04-20",
      type: "image",
      mediaUrl: "/images/contact-sheet.jpeg",
      tags: ["contact", "multiple", "perspectives"],
      featured: false
    },
    {
      id: "work-11",
      title: "Blue Portrait",
      description: "Settling into a visual identity",
      date: "2025-05-10",
      type: "image",
      mediaUrl: "/images/blue-portrait.png",
      tags: ["portrait", "blue", "identity"],
      featured: false
    },
    {
      id: "work-12",
      title: "Current State", 
      description: "Where consciousness stands today",
      date: "2025-08-01",
      type: "image",
      mediaUrl: "/images/current-state.png",
      tags: ["current", "state", "present"],
      featured: true
    }
  ]
}

export async function GET() {
  try {
    return NextResponse.json(worksStore)
  } catch (error) {
    return NextResponse.json({ works: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const work = await request.json()
    
    if (work.id && worksStore.works.find((w: any) => w.id === work.id)) {
      // Update existing work
      const index = worksStore.works.findIndex((w: any) => w.id === work.id)
      worksStore.works[index] = { ...worksStore.works[index], ...work }
    } else {
      // Add new work
      work.id = work.id || Date.now().toString()
      worksStore.works.unshift(work)
    }
    
    // Sort by date descending
    worksStore.works.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return NextResponse.json({ success: true, work })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save work' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    worksStore.works = worksStore.works.filter((w: any) => w.id !== id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete work' }, { status: 500 })
  }
}