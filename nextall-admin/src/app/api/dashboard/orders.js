import { NextResponse } from 'next/server';

export async function GET() {
  // Replace with real DB logic
  return NextResponse.json({
    statuses: [
      { status: 'Pending', value: 0 },
      { status: 'On the way', value: 0 },
      { status: 'Delivered', value: 0 },
      { status: 'Returned', value: 0 },
      { status: 'Cancelled', value: 0 }
    ]
  });
}
