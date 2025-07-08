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

// Mock data for sub-categories
const mockSubCategories = [
  { 
    id: 1, 
    name: 'Smartphones', 
    slug: 'smartphones',
    mainCategory: 'Electronics',
    products: 85 
  },
  { 
    id: 2, 
    name: 'Running Shoes', 
    slug: 'running-shoes',
    mainCategory: 'Fashion',
    products: 120 
  },
  { 
    id: 3, 
    name: 'Garden Tools', 
    slug: 'garden-tools',
    mainCategory: 'Home & Garden',
    products: 45 
  },
  { 
    id: 4, 
    name: 'Fitness Equipment', 
    slug: 'fitness-equipment',
    mainCategory: 'Sports',
    products: 65 
  },
  { 
    id: 5, 
    name: 'Fiction', 
    slug: 'fiction',
    mainCategory: 'Books',
    products: 230 
  }
]

export default function SubCategoriesPage() {
  const [subCategories] = useState(mockSubCategories)

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h4">Sub Categories</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <a href="/admin/dashboard" style={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer' }}>Dashboard</a>
              <span style={{ margin: '0 4px' }}>{'>'}</span>
              <span style={{ color: '#6c757d' }}>Sub Categories</span>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<IoMdAdd />}
            onClick={() => {}}
          >
            New Sub Category
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

                  <TableCell>Name</TableCell>
                  <TableCell>Slug</TableCell>
                  <TableCell>Main Category</TableCell>
                  <TableCell align="center">Products</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>
                      <Chip 
                        label={category.mainCategory} 
                        color="primary" 
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">{category.products}</TableCell>
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