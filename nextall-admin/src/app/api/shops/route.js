import { NextResponse } from 'next/server';

export async function GET() {
  // Call your real backend here
  return NextResponse.json({ message: 'Use backend for GET shops' }, { status: 501 });
}

export async function POST(req) {
  // Call your real backend here
  return NextResponse.json({ message: 'Use backend for POST shop' }, { status: 501 });
}

