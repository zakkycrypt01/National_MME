import { NextResponse } from 'next/server';
import { getChaptersData } from '@/lib/data';

export async function GET() {
  try {
    const chapters = await getChaptersData();
    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Error reading chapters data:', error);
    return NextResponse.json(
      { error: 'Failed to load chapters data' },
      { status: 500 }
    );
  }
}
