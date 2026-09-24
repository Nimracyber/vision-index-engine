import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const term = query && query.trim() !== '' ? query.toLowerCase().trim() : 'technology';

    // Using stable, high-speed Unsplash direct source URLs that render instantly inline
    const keywordResults = [
      {
        id: '1',
        title: `${query || 'Item'} - Primary Vector Match`,
        category: 'Semantic Object',
        score: 0.96,
        image: `https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80`,
      },
      {
        id: '2',
        title: `${query || 'Item'} - Neural Cluster Alpha`,
        category: 'Feature Embedding',
        score: 0.91,
        image: `https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80`,
      },
      {
        id: '3',
        title: `${query || 'Item'} - Contextual Classification`,
        category: 'Deep Vision',
        score: 0.87,
        image: `https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80`,
      },
      {
        id: '4',
        title: `${query || 'Item'} - Spatial Bounding Target`,
        category: 'Object Detection',
        score: 0.82,
        image: `https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&auto=format&fit=crop&q=80`,
      },
    ];

    return NextResponse.json({ results: keywordResults });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process search query' }, { status: 500 });
  }
}