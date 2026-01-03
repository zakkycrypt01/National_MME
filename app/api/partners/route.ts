import { NextResponse } from 'next/server';
import { getPartnersData } from '@/lib/data';

export async function GET() {
  try {
    const partners = await getPartnersData();
    return NextResponse.json(partners);
  } catch (error) {
    console.error('Error reading partners data:', error);
    return NextResponse.json(
      { error: 'Failed to load partners data' },
      { status: 500 }
    );
  }
}
