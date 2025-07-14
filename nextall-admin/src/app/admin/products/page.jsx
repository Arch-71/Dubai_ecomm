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
  Chip
} from '@mui/material'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'

import { useEffect } from 'react';
import http from '@/services/http';

import { useRouter } from 'next/navigation';

import PaginationBar from 'src/components/PaginationBar';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    import('src/services/http').then(({ default: http }) => {
      http.get(`/api/products?page=${page}&limit=${limit}`).then(res => {
        setProducts(Array.isArray(res.data.data) ? res.data.data : []);
        setTotal(res.data.total || 0);
        setLoading(false);
      });
    });
  }, [page]);

  return (
    <Container maxWidth="xl">
       <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
  <Box>
    <Typography variant="h4" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#888' : '#222' }}>
     Products
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
      <a href="/admin/dashboard" style={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer' }}>Dashboard</a>
      <span style={{ margin: '0 4px' }}>{'>'}</span>
      <span style={{ color: (theme) => theme.palette.mode === 'dark' ? '#888' : '#222' }}>Products</span>
    </Box>
  </Box>
 
          <Button
            variant="contained"
            startIcon={<IoMdAdd />}
            onClick={() => router.push('/admin/products/add')}
          >
            New Product
          </Button>
        </Box>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
  sx={{
    background: 'linear-gradient(90deg, #a700ff 0%, #ff00cc 100%)',
    color: '#fff',
    textShadow: '0 0 8px #ff00cc, 0 0 16px #a700ff',
    borderBottom: '2px solid #ff00cc',
    boxShadow: '0 0 10px #a700ff, 0 0 20px #ff00cc',
  }}
>
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Stock</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(products) && products.length > 0 ? (
  products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={product.image}
                          alt={product.name}
                          variant="rounded"
                          sx={{ width: 48, height: 48, mr: 2 }}
                        />
                        <Typography variant="subtitle2">{product.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align="right">${product.price}</TableCell>
                    <TableCell align="center">{product.stock}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={product.status === 'active' ? 'Active' : 'Out of Stock'}
                        color={product.status === 'active' ? 'success' : 'error'}
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
                ))
) : (
  <TableRow>
    <TableCell colSpan={6} align="center">
      No products found.
    </TableCell>
  </TableRow>
)}
</TableBody>
            </Table>
          </TableContainer>
        </Card>
        <PaginationBar
          page={page}
          count={Math.ceil(total / limit)}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Container>
  )
}
