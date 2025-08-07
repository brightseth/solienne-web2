import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    console.log('=== Upload API called ===');
    console.log('Token available:', !!process.env.BLOB_READ_WRITE_TOKEN);
    
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    console.log('Filename:', filename);

    if (!filename) {
      console.log('Error: No filename provided');
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    if (!request.body) {
      console.log('Error: No request body');
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }

    // Check if we can get the content length
    const contentLength = request.headers.get('content-length');
    console.log('Content length:', contentLength);

    console.log('Starting blob upload...');
    
    // Add a unique timestamp to prevent naming conflicts
    const uniqueFilename = `uploads/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    console.log('Uploading as:', uniqueFilename);
    
    const blob = await put(uniqueFilename, request.body, {
      access: 'public',
    });

    console.log('Upload successful!');
    console.log('URL:', blob.url);

    return NextResponse.json({
      url: blob.url,
      filename: uniqueFilename,
      success: true
    });
  } catch (error) {
    console.error('=== Upload error ===');
    console.error('Error type:', typeof error);
    console.error('Error name:', error instanceof Error ? error.name : 'unknown');
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Full error:', error);
    
    return NextResponse.json(
      { 
        error: 'Upload failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        errorType: error instanceof Error ? error.name : 'UnknownError'
      },
      { status: 500 }
    );
  }
}