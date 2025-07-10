import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    const res = await fetch(`${backendUrl}/admin/dashboard-analytics`);
    if (!res.ok) {
      return NextResponse.json({ error: 'Backend error' }, { status: res.status });
    }
    const data = await res.json();
    if (data.success) {
      return NextResponse.json({
        products: data.data.bestSellingProducts.map(product => ({
          name: product.name,
          image: product.images?.[0]?.url || '',
          sold: product.sold,
        })),
      });
    } else {
      return NextResponse.json({ error: 'Backend returned failure' }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
