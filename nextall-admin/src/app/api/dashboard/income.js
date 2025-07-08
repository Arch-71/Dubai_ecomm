import { NextResponse } from 'next/server';

export async function GET() {
  // Replace with real DB logic
  return NextResponse.json({
    week: [12, 16, 8, 10, 6, 12, 8],
    month: [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170],
    year: [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200],
    commissionWeek: [2, 3, 1, 2, 2, 3, 1],
    commissionMonth: [10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38],
    commissionYear: [200, 220, 250, 280, 300, 320, 350, 380, 400, 420, 450, 480]
  });
}
