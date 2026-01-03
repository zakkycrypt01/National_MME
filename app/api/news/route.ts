import { NextResponse } from 'next/server';
import { getNewsData } from '@/lib/data';

export async function GET() {
  try {
    const news = await getNewsData();
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error reading news data:', error);
    return NextResponse.json(
      { error: 'Failed to load news data' },
      { status: 500 }
    );
  }
}
