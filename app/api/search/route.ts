import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const term = query && query.trim() !== '' ? query.toLowerCase() : 'artificial intelligence';

    const results = [
      {
        id: '1',
        title: `${query || 'Search Item'} - Primary Vector Match`,
        category: 'Semantic Object',
        score: 0.96,
        image: `https://picsum.photos/seed/${encodeURIComponent(term + '1')}/600/400`,
      },
      {
        id: '2',
        title: `${query || 'Search Item'} - Secondary Neural Cluster`,
        category: 'Feature Embedding',
        score: 0.91,
        image: `https://picsum.photos/seed/${encodeURIComponent(term + '2')}/600/400`,
      },
      {
        id: '3',
        title: `${query || 'Search Item'} - Contextual Classification`,
        category: 'Deep Vision',
        score: 0.87,
        image: `https://picsum.photos/seed/${encodeURIComponent(term + '3')}/600/400`,
      },
      {
        id: '4',
        title: `${query || 'Search Item'} - Spatial Bounding Target`,
        category: 'Object Detection',
        score: 0.82,
        image: `https://picsum.photos/seed/${encodeURIComponent(term + '4')}/600/400`,
      },
    ];

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process dynamic search' }, { status: 500 });
  }
}