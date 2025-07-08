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
  Avatar,
  Chip,
  Rating
} from '@mui/material'
import { FiEye, FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'

import { useEffect } from 'react';
import http from '@/services/http';

import TopProgressBar from 'src/components/TopProgressBar';

export default function ShopsPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    http.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/shops`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      setShops(Array.isArray(res.data.data) ? res.data.data : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const statusColors = {
    active: 'success',
    pending: 'warning',
    suspended: 'error'
  }

  const router = require('next/navigation').useRouter();
return (
    <>
      <TopProgressBar loading={loading} />
      <Container maxWidth="xl">
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Shops</Typography>
          <Button
            variant="contained"
            startIcon={<IoMdAdd />}
            onClick={() => router.push('/admin/shops/add')}
          >
            New Shop
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

                  <TableCell>Shop</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell align="center">Products</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell align="right">Balance</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(shops) && shops.length > 0 ? (
  shops.map((shop) => (
                  <TableRow key={shop.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={shop.logo}
                          alt={shop.name}
                          variant="rounded"
                          sx={{ width: 40, height: 40, mr: 2 }}
                        />
                        <Typography variant="subtitle2">{shop.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{shop.owner}</TableCell>
                    <TableCell align="center">{shop.products}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Rating value={shop.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({shop.rating})
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">${shop.balance.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={shop.status}
                        color={statusColors[shop.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View">
                        <IconButton onClick={() => {}}>
                          <FiEye />
                        </IconButton>
                      </Tooltip>
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
                ))
) : (
  <TableRow>
    <TableCell colSpan={7} align="center">
      No shops found.
    </TableCell>
  </TableRow>
)}
</TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </Container>
    </>
  );
} 