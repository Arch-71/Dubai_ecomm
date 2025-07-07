'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'

// Mock data for coupons
const mockCoupons = [
  {
    id: 1,
    code: 'SUMMER2024',
    type: 'percentage',
    value: 20,
    minPurchase: 100,
    maxDiscount: 50,
    usageLimit: 1000,
    used: 450,
    startDate: '2024-02-01',
    endDate: '2024-03-31',
    status: 'active'
  },
  {
    id: 2,
    code: 'WELCOME50',
    type: 'fixed',
    value: 50,
    minPurchase: 200,
    maxDiscount: 50,
    usageLimit: 500,
    used: 123,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active'
  },
  {
    id: 3,
    code: 'FLASH25',
    type: 'percentage',
    value: 25,
    minPurchase: 150,
    maxDiscount: 75,
    usageLimit: 200,
    used: 200,
    startDate: '2024-02-15',
    endDate: '2024-02-17',
    status: 'expired'
  },
  {
    id: 4,
    code: 'NEWUSER',
    type: 'percentage',
    value: 15,
    minPurchase: 50,
    maxDiscount: 30,
    usageLimit: 2000,
    used: 856,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    status: 'active'
  },
  {
    id: 5,
    code: 'SPECIAL100',
    type: 'fixed',
    value: 100,
    minPurchase: 500,
    maxDiscount: 100,
    usageLimit: 100,
    used: 0,
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    status: 'scheduled'
  }
]

const statusColors = {
  active: 'success',
  expired: 'error',
  scheduled: 'info'
}

export default function CouponCodesPage() {
  const [coupons] = useState(mockCoupons)

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
          <Button
            variant="contained"
            startIcon={<IoMdAdd />}
            onClick={() => {}}
          >
            New Coupon
          </Button>
        </Box>

        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
  sx={{
    background: 'linear-gradient(90deg, #141e30 0%, #2b5876 50%, #6a0572 100%)',
    color: '#fff',
    textShadow: '0 0 8px #6a0572, 0 0 16px #2b5876',
    borderBottom: '2px solid #6a0572',
    boxShadow: '0 0 10px #141e30, 0 0 20px #6a0572',
  }}>

                  <TableCell>Code</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Min Purchase</TableCell>
                  <TableCell align="center">Usage</TableCell>
                  <TableCell>Valid Period</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{coupon.code}</Typography>
                    </TableCell>
                    <TableCell>
                      {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                      <Typography variant="caption" display="block" color="text.secondary">
                        Max: ${coupon.maxDiscount}
                      </Typography>
                    </TableCell>
                    <TableCell>${coupon.minPurchase}</TableCell>
                    <TableCell align="center">
                      {coupon.used}/{coupon.usageLimit}
                      <Typography variant="caption" display="block" color="text.secondary">
                        {((coupon.used / coupon.usageLimit) * 100).toFixed(1)}% used
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap>
                        {coupon.startDate} to
                      </Typography>
                      <Typography variant="body2" noWrap>
                        {coupon.endDate}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={coupon.status}
                        color={statusColors[coupon.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => {}}>
                          <FiEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => {}}>
                          <RiDeleteBin6Line />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </Container>
  )
} 