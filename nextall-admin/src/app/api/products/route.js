import { NextResponse } from 'next/server';

export async function GET() {
  // Call your real backend here
  return NextResponse.json({ message: 'Use backend for GET products' }, { status: 501 });
}

export async function POST(req) {
  // Call your real backend here
  return NextResponse.json({ message: 'Use backend for POST product' }, { status: 501 });
}

