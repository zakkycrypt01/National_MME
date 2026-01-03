import { NextResponse } from 'next/server';
import { getCouncilData } from '@/lib/data';

export async function GET() {
  try {
    const council = await getCouncilData();
    return NextResponse.json(council);
  } catch (error) {
    console.error('Error reading council data:', error);
    return NextResponse.json(
      { error: 'Failed to load council data' },
      { status: 500 }
    );
  }
}
