import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', 'eden-works.json')
    const data = await readFile(dataPath, 'utf8').catch(() => '{"works": []}')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    return NextResponse.json({ works: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const work = await request.json()
    
    const dataPath = path.join(process.cwd(), 'public', 'data', 'eden-works.json')
    const existingData = await readFile(dataPath, 'utf8').catch(() => '{"works": []}')
    const data = JSON.parse(existingData)
    
    if (work.id && data.works.find((w: any) => w.id === work.id)) {
      // Update existing work
      const index = data.works.findIndex((w: any) => w.id === work.id)
      data.works[index] = { ...data.works[index], ...work }
    } else {
      // Add new work
      work.id = work.id || Date.now().toString()
      data.works.unshift(work)
    }
    
    // Sort by date descending
    data.works.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    await writeFile(dataPath, JSON.stringify(data, null, 2))
    
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
    
    const dataPath = path.join(process.cwd(), 'public', 'data', 'eden-works.json')
    const existingData = await readFile(dataPath, 'utf8').catch(() => '{"works": []}')
    const data = JSON.parse(existingData)
    
    data.works = data.works.filter((w: any) => w.id !== id)
    
    await writeFile(dataPath, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete work' }, { status: 500 })
  }
}