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
  Tooltip
} from '@mui/material'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'
import { useRouter } from 'next/navigation';




import { useEffect } from 'react';
import http from '@/services/http';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    http.get('/admin/categories')
      .then(res => {
        setCategories(Array.isArray(res.data.data) ? res.data.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  const router = useRouter();

  // Handler for editing a category
  const handleEdit = (slug) => {
    router.push(`/admin/categories/edit/${slug}`);
  }

  // Handler for deleting a category
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await http.delete(`/admin/categories/id/${id}`);
      setCategories(prev => prev.filter(category => category._id !== id));
    } catch (err) {
      alert('Failed to delete category: ' + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
  <Box>
    <Typography variant="h4">Categories</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
      <a href="/admin/dashboard" style={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer' }}>Dashboard</a>
      <span style={{ margin: '0 4px' }}>{'>'}</span>
      <span style={{ color: '#6c757d' }}>Categories</span>
    </Box>
  </Box>
 

<Button
  variant="contained"
  startIcon={<IoMdAdd />}
  onClick={() => router.push('/admin/categories/add')}
>
  New Category
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
  }}>

                  <TableCell>Name</TableCell>
                  <TableCell>Slug</TableCell>
                  <TableCell align="center">Products</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(categories) && categories.length > 0 ? (
  categories.map((category) => (
    <TableRow key={category._id}>
      <TableCell>{category.name}</TableCell>
      <TableCell>{category.slug}</TableCell>
      <TableCell align="center">{category.products}</TableCell>
      <TableCell align="right">
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEdit(category.slug)}>
            <FiEdit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDelete(category._id)}>
            <RiDeleteBin6Line />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan={4} align="center">
      No categories found.
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