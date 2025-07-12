'use client'
import { useRouter } from 'next/navigation';
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
  Switch
} from '@mui/material'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'

import { useEffect } from 'react';
import http from '@/services/http';

export default function BrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    http.get('/admin/brands')
      .then(res => {
        setBrands(Array.isArray(res.data.data) ? res.data.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusChange = (brandId) => {
    setBrands(brands.map(brand => 
      brand.id === brandId ? { ...brand, status: !brand.status } : brand
    ))
  }

  const handleFeaturedChange = (brandId) => {
    setBrands(brands.map(brand => 
      brand.id === brandId ? { ...brand, featured: !brand.featured } : brand
    ))
  }

  // Handler for editing a brand
  const handleEdit = (slug) => {
    router.push(`/admin/brands/edit/${slug}`);
  }

  // Handler for deleting a brand
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) return;
    try {
      await http.delete(`/admin/brands/id/${id}`);
      setBrands(prev => prev.filter(brand => brand._id !== id));
    } catch (err) {
      alert('Failed to delete brand: ' + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
          <Typography
  variant="h4"
  sx={{
    mb: 5
  }}
>
 Brands
</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <a href="/admin/dashboard" style={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer' }}>Dashboard</a>
              <span style={{ margin: '0 4px' }}>{'>'}</span>
              <span style={{ color: '#6c757d' }}>Brands</span>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<IoMdAdd />}
            onClick={() => router.push('/admin/brands/add')}
          >
            New Brand
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

                  <TableCell>Brand</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Featured</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(brands) && brands.length > 0 ? (
  brands.map((brand) => (
    <TableRow key={brand._id}>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={brand.logo}
            alt={brand.name}
            variant="rounded"
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Typography variant="subtitle2">{brand.name}</Typography>
        </Box>
      </TableCell>
      <TableCell align="center">{brand.description}</TableCell>
      <TableCell align="center">
        <Switch
          checked={brand.featured}
          onChange={() => handleFeaturedChange(brand._id)}
          color="primary"
        />
      </TableCell>
      <TableCell align="center">
        <Switch
          checked={brand.status}
          onChange={() => handleStatusChange(brand._id)}
          color="primary"
        />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEdit(brand.slug)}>
            <FiEdit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDelete(brand._id)}>
            <RiDeleteBin6Line />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan={5} align="center">
      No brands found.
    </TableCell>
  </TableRow>
)}
</TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </Container>
  )
} 