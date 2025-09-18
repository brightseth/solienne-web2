import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', 'consolidated_solienne_data.json');
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const allData = JSON.parse(fileContent);

    // Filter for manifestos only and convert object to array
    const manifestos = Object.values(allData)
      .filter((item: any) => item.category === 'manifesto')
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .map((item: any) => ({
        id: item.id,
        title: item.name?.substring(0, 100) + (item.name?.length > 100 ? '...' : '') || 'Untitled Manifesto',
        description: item.description,
        imageUrl: item.url,
        thumbnail: item.thumbnail,
        created_at: item.created_at,
        detected_elements: item.detected_elements || []
      }));

    return NextResponse.json({
      manifestos,
      total: manifestos.length
    });
  } catch (error) {
    console.error('Error loading manifestos:', error);
    return NextResponse.json(
      { error: 'Failed to load manifestos' },
      { status: 500 }
    );
  }
}