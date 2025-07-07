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
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdOutlineEmail } from 'react-icons/md'

// Mock data for newsletter subscribers
const mockSubscribers = [
  {
    id: 1,
    email: 'john.doe@example.com',
    subscribeDate: '2024-01-15',
    status: 'active',
    source: 'website',
    lastEmailSent: '2024-02-20'
  },
  {
    id: 2,
    email: 'sarah.wilson@example.com',
    subscribeDate: '2024-02-01',
    status: 'active',
    source: 'mobile app',
    lastEmailSent: '2024-02-20'
  },
  {
    id: 3,
    email: 'mike.brown@example.com',
    subscribeDate: '2024-01-20',
    status: 'unsubscribed',
    source: 'website',
    lastEmailSent: '2024-02-15'
  },
  {
    id: 4,
    email: 'emma.davis@example.com',
    subscribeDate: '2024-02-10',
    status: 'active',
    source: 'website',
    lastEmailSent: '2024-02-20'
  },
  {
    id: 5,
    email: 'david.smith@example.com',
    subscribeDate: '2024-02-05',
    status: 'bounced',
    source: 'mobile app',
    lastEmailSent: '2024-02-18'
  }
]

const statusColors = {
  active: 'success',
  unsubscribed: 'error',
  bounced: 'warning'
}

export default function NewsletterPage() {
  const [subscribers] = useState(mockSubscribers)

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <Typography variant="h4">Newsletter</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <a href="/admin/dashboard" style={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer' }}>Dashboard</a>
            <span style={{ margin: '0 4px' }}>{'>'}</span>
            <span style={{ color: '#6c757d' }}>Newsletter</span>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4">Newsletter Subscribers</Typography>
            <Button
              variant="contained"
              startIcon={<MdOutlineEmail />}
              onClick={() => {}}
            >
              Send Newsletter
            </Button>
          </Box>
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

                  <TableCell>Email</TableCell>
                  <TableCell>Subscribe Date</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Last Email Sent</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{subscriber.email}</Typography>
                    </TableCell>
                    <TableCell>{subscriber.subscribeDate}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {subscriber.source}
                      </Typography>
                    </TableCell>
                    <TableCell>{subscriber.lastEmailSent}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={subscriber.status}
                        color={statusColors[subscriber.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
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