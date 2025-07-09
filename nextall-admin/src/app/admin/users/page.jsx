'use client'

import { useState, useEffect } from 'react'
import { getUserByAdminsByAdmin } from '@/services/index'
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
  Avatar,
  Chip,
  Switch
} from '@mui/material'
import { FiEye } from 'react-icons/fi'

// Mock data for users


const roleColors = {
  admin: 'error',
  vendor: 'warning',
  customer: 'info'
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from backend on mount
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        // You can add pagination/search as needed
        const res = await getUserByAdminsByAdmin(1, '');
        if (res && res.success && Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          setError('No users found');
        }
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || 'Failed to fetch users');
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const handleStatusChange = (userId) => {
    setUsers(users.map(user => 
      user._id === userId ? { ...user, status: !user.status } : user
    ))
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Users</Typography>
        </Box>
        <Card>
          {loading ? (
            <Box p={4} textAlign="center">
              <Typography>Loading users...</Typography>
            </Box>
          ) : error ? (
            <Box p={4} textAlign="center">
              <Typography color="error">{error}</Typography>
            </Box>
          ) : users.length === 0 ? (
            <Box p={4} textAlign="center">
              <Typography>No users found.</Typography>
            </Box>
          ) : (
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
                    <TableCell>User</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            src={user.cover?.url || ''}
                            alt={user.firstName + ' ' + user.lastName}
                            sx={{ width: 40, height: 40, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle2">{user.firstName} {user.lastName}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role || 'customer'}
                          color={roleColors[user.role] || 'info'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.gender}</TableCell>
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
          )}
        </Card>
      </Box>
    </Container>
  );
} 