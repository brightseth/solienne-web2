import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    console.log('Testing Blob storage...');
    console.log('Token available:', !!process.env.BLOB_READ_WRITE_TOKEN);
    
    // Test with a simple text file
    const testData = 'Hello from Solienne.ai test';
    const testFilename = `test-${Date.now()}.txt`;
    
    const blob = await put(testFilename, testData, {
      access: 'public',
    });

    console.log('Test upload successful:', blob.url);

    return NextResponse.json({
      success: true,
      message: 'Blob storage is working',
      testUrl: blob.url,
      filename: testFilename
    });
  } catch (error) {
    console.error('Blob test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Blob storage test failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        tokenAvailable: !!process.env.BLOB_READ_WRITE_TOKEN
      },
      { status: 500 }
    );
  }
}