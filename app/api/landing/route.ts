import { NextResponse } from 'next/server';
import { getLandingData } from '@/lib/data';

export async function GET() {
  try {
    const data = await getLandingData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading landing data:', error);
    return NextResponse.json(
      { error: 'Failed to load landing data' },
      { status: 500 }
    );
  }
}
