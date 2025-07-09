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
        dailyEarning: data.data.dailyEarning,
        dailyOrders: data.data.dailyOrders,
        totalUsers: data.data.totalUsers,
        totalProducts: data.data.totalProducts,
        totalVendors: data.data.totalVendors,
        totalShops: data.data.totalShops,
        pendingOrders: data.data.totalPendingOrders,
        returnedOrders: data.data.totalReturnOrders,
      });
    } else {
      return NextResponse.json({ error: 'Backend returned failure' }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
