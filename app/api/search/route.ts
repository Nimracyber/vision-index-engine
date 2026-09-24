import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const term = query && query.trim() !== '' ? query.toLowerCase().trim() : 'technology';

    const results = [
      {
        id: '1',
        title: `${query || 'Item'} - Primary Vector Match`,
        category: 'Semantic Object',
        score: 0.96,
        image: `https://picsum.photos/seed/${encodeURIComponent(term + '-alpha')}/600/400`,
      },
      {
        id: '2',
        title: `${query || 'Item'} - Secondary Neural Cluster`,
        category: 'Feature Embedding',
        score: 0.91,
        image: `https://picsum.photos/seed/${encodeURIComponent(term + '-beta')}/600/400`,
      },
      {
        id: '3',
        title: `${query || 'Item'} - Contextual Classification`,
        category: 'Deep Vision',
        score: 0.87,
        image: `https://picsum.photos/seed/${encodeURIComponent(term + '-gamma')}/600/400`,
      },
      {
        id: '4',
        title: `${query || 'Item'} - Spatial Bounding Target`,
        category: 'Object Detection',
        score: 0.82,
        image: `https://picsum.photos/seed/${encodeURIComponent(term + '-delta')}/600/400`,
      },
    ];

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process search query' }, { status: 500 });
  }
}