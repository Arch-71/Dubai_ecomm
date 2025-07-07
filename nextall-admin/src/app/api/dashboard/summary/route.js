import { NextResponse } from 'next/server';

export async function GET() {
  // Replace with real DB logic
  return NextResponse.json({
    dailyEarning: 0,
    dailyOrders: 0,
    totalUsers: 8,
    totalProducts: 5,
    totalVendors: 2,
    totalShops: 2,
    pendingOrders: 0,
    returnedOrders: 0
  });
}
