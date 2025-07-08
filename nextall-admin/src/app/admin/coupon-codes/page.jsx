'use client'

import { Container, Typography, Card, Box } from '@mui/material'

// Removed mock data and action buttons

export default function CouponCodesPage() {
  // No data, so just show message
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <Typography variant="h4">Coupon Codes</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <a href="/admin/dashboard" style={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer' }}>Dashboard</a>
            <span style={{ margin: '0 4px' }}>{'>'}</span>
            <span style={{ color: '#6c757d' }}>Coupon Codes</span>
          </Box>
        </Box>
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">No data available</Typography>
        </Card>
      </Box>
    </Container>
  );
}