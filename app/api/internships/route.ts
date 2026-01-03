import { NextResponse } from 'next/server';
import { getInternshipsData } from '@/lib/data';

export async function GET() {
  try {
    const internships = await getInternshipsData();
    return NextResponse.json(internships);
  } catch (error) {
    console.error('Error reading internships data:', error);
    return NextResponse.json(
      { error: 'Failed to load internships data' },
      { status: 500 }
    );
  }
}
