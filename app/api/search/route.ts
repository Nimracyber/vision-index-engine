import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const term = query && query.trim() !== '' ? query.toLowerCase().trim() : 'technology';

    // Using Unsplash source URL so images dynamically match the exact search term
    const results = [
      {
        id: '1',
        title: `${query || 'Item'} - Primary Visual Match`,
        category: 'Semantic Object',
        score: 0.96,
        image: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80`, // fallback or use keyword source below
      },
      {
        id: '2',
        title: `${query || 'Item'} - Neural Feature Cluster`,
        category: 'Feature Embedding',
        score: 0.91,
        image: `https://picsum.photos/seed/${encodeURIComponent(term)}/600/400`,
      },
    ];

    // Let's use a reliable keyword-driven image generator endpoint that maps directly to your search word:
    const keywordResults = [
      {
        id: '1',
        title: `${query || 'Item'} - Primary Vector Match`,
        category: 'Semantic Object',
        score: 0.96,
        image: `https://loremflickr.com/600/400/${encodeURIComponent(term)}`,
      },
      {
        id: '2',
        title: `${query || 'Item'} - Neural Cluster Alpha`,
        category: 'Feature Embedding',
        score: 0.91,
        image: `https://loremflickr.com/600/400/${encodeURIComponent(term)},object`,
      },
      {
        id: '3',
        title: `${query || 'Item'} - Contextual Classification`,
        category: 'Deep Vision',
        score: 0.87,
        image: `https://loremflickr.com/600/400/${encodeURIComponent(term)},detail`,
      },
      {
        id: '4',
        title: `${query || 'Item'} - Spatial Bounding Target`,
        category: 'Object Detection',
        score: 0.82,
        image: `https://loremflickr.com/600/400/${encodeURIComponent(term)},view`,
      },
    ];

    return NextResponse.json({ results: keywordResults });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process search query' }, { status: 500 });
  }
}