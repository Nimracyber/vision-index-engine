import { NextResponse } from 'next/server';

export const runtime = 'edge';

const MOCK_DATABASE = [
  { id: '1', title: 'Industrial Safety Helmet (Yellow)', category: 'Safety Gear', score: 0.94, image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400' },
  { id: '2', title: 'High-Visibility Safety Vest', category: 'Safety Gear', score: 0.89, image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400' },
  { id: '3', title: 'Raspberry Pi 4 Model B Board', category: 'Electronics', score: 0.85, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400' },
  { id: '4', title: 'Microcontroller Sensor Module', category: 'Electronics', score: 0.81, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
];

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || query.trim() === '') {
      return NextResponse.json({ results: MOCK_DATABASE });
    }

    const filtered = MOCK_DATABASE.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.category.toLowerCase().includes(query.toLowerCase())
    );

    return NextResponse.json({ results: filtered });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process search query' }, { status: 500 });
  }
}