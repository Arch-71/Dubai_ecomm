import { NextResponse } from 'next/server';

export async function GET(req) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const authHeader = req.headers.get('authorization');
  const res = await fetch(`${backendUrl}/api/shops`, {
    headers: {
      ...(authHeader ? { authorization: authHeader } : {})
    }
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req) {
  // Call your real backend here
  return NextResponse.json({ message: 'Use backend for POST shop' }, { status: 501 });
}

