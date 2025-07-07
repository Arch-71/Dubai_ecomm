'use client'

import { useState } from 'react'
import {
  Box,
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
  Chip,
  MenuItem,
  Select
} from '@mui/material'
import { FiEye } from 'react-icons/fi'

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    orderNumber: 'ORD-001',
    customer: 'John Doe',
    date: '2024-02-20',
    total: 299.99,
    status: 'completed',
    paymentStatus: 'paid'
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    customer: 'Jane Smith',
    date: '2024-02-19',
    total: 149.99,
    status: 'processing',
    paymentStatus: 'paid'
  },
  {
    id: 3,
    orderNumber: 'ORD-003',
    customer: 'Mike Johnson',
    date: '2024-02-18',
    total: 499.99,
    status: 'pending',
    paymentStatus: 'pending'
  },
  {
    id: 4,
    orderNumber: 'ORD-004',
    customer: 'Sarah Wilson',
    date: '2024-02-17',
    total: 199.99,
    status: 'cancelled',
    paymentStatus: 'refunded'
  },
  {
    id: 5,
    orderNumber: 'ORD-005',
    customer: 'Tom Brown',
    date: '2024-02-16',
    total: 799.99,
    status: 'completed',
    paymentStatus: 'paid'
  }
]

const statusColors = {
  completed: 'success',
  processing: 'info',
  pending: 'warning',
  cancelled: 'error'
}

const paymentStatusColors = {
  paid: 'success',
  pending: 'warning',
  refunded: 'error'
}

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <Typography variant="h4">Orders</Typography>
          
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
                  }}
                >
                  <TableCell>Order</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center">Payment Status</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{order.orderNumber}</Typography>
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell align="right">${order.total}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={order.paymentStatus}
                        color={paymentStatusColors[order.paymentStatus]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Select
                        value={order.status}
                        size="small"
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="processing">Processing</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Details">
                        <IconButton onClick={() => {}}>
                          <FiEye />
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