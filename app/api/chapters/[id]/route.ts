import { NextResponse } from 'next/server';
import { getChapterById } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const chapter = await getChapterById(parseInt(params.id));
    
    if (!chapter) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(chapter);
  } catch (error) {
    console.error('Error reading chapter data:', error);
    return NextResponse.json(
      { error: 'Failed to load chapter data' },
      { status: 500 }
    );
  }
}
