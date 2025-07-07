import { NextResponse } from 'next/server';

export async function GET() {
  // Replace with real DB logic
  return NextResponse.json({
    products: [
      { name: 'Nike Air Jordan Sw', image: '/images/products/nike-air-jordan-sw.png', sold: 0 },
      { name: 'Varsity Jacket Ora', image: '/images/products/varsity-jacket-ora.png', sold: 0 },
      { name: 'Air Jordan 1 Low S', image: '/images/products/air-jordan-1-low-s.png', sold: 0 },
      { name: 'Air Jordan 1 Low', image: '/images/products/air-jordan-1-low.png', sold: 0 }
    ]
  });
}
