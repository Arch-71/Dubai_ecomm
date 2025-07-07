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
  Avatar,
  Chip,
  Switch
} from '@mui/material'
import { FiEye } from 'react-icons/fi'

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://placehold.co/100x100',
    role: 'admin',
    status: true,
    lastLogin: '2024-02-20 10:30 AM'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://placehold.co/100x100',
    role: 'vendor',
    status: true,
    lastLogin: '2024-02-19 03:45 PM'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://placehold.co/100x100',
    role: 'customer',
    status: false,
    lastLogin: '2024-02-18 09:15 AM'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: 'https://placehold.co/100x100',
    role: 'vendor',
    status: true,
    lastLogin: '2024-02-17 11:20 AM'
  },
  {
    id: 5,
    name: 'Tom Brown',
    email: 'tom@example.com',
    avatar: 'https://placehold.co/100x100',
    role: 'customer',
    status: true,
    lastLogin: '2024-02-16 02:10 PM'
  }
]

const roleColors = {
  admin: 'error',
  vendor: 'warning',
  customer: 'info'
}

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)

  const handleStatusChange = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: !user.status } : user
    ))
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Users</Typography>
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

                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          sx={{ width: 40, height: 40, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="subtitle2">{user.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={roleColors[user.role]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={user.status}
                        onChange={() => handleStatusChange(user.id)}
                        color="success"
                      />
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