import { NextResponse } from 'next/server';

export async function GET(req) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const authHeader = req.headers.get('authorization');
  const res = await fetch(`${backendUrl}/api/categories`, {
    headers: {
      ...(authHeader ? { authorization: authHeader } : {})
    }
  });
  const data = await res.json();
  return NextResponse.json(data);
}
