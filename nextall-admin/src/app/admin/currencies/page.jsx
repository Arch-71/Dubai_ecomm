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
  Switch
} from '@mui/material'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'

// Mock data for currencies
const mockCurrencies = [
  {
    id: 1,
    name: 'US Dollar',
    code: 'USD',
    symbol: '$',
    exchangeRate: 1.00,
    isDefault: true,
    status: true
  },
  {
    id: 2,
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
    exchangeRate: 0.92,
    isDefault: false,
    status: true
  },
  {
    id: 3,
    name: 'British Pound',
    code: 'GBP',
    symbol: '£',
    exchangeRate: 0.79,
    isDefault: false,
    status: true
  },
  {
    id: 4,
    name: 'Japanese Yen',
    code: 'JPY',
    symbol: '¥',
    exchangeRate: 150.25,
    isDefault: false,
    status: true
  },
  {
    id: 5,
    name: 'Australian Dollar',
    code: 'AUD',
    symbol: 'A$',
    exchangeRate: 1.52,
    isDefault: false,
    status: false
  }
]

export default function CurrenciesPage() {
  const [currencies, setCurrencies] = useState(mockCurrencies)

  const handleStatusChange = (currencyId) => {
    setCurrencies(currencies.map(currency => 
      currency.id === currencyId ? { ...currency, status: !currency.status } : currency
    ))
  }

  const handleDefaultChange = (currencyId) => {
    if (currencyId === currencies.find(c => c.isDefault)?.id) return
    
    setCurrencies(currencies.map(currency => ({
      ...currency,
      isDefault: currency.id === currencyId
    })))
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <Typography variant="h4">Currencies</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <a href="/admin/dashboard" style={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer' }}>Dashboard</a>
            <span style={{ margin: '0 4px' }}>{'>'}</span>
            <span style={{ color: '#6c757d' }}>Currencies</span>
          </Box>
          <Button
            variant="contained"
            startIcon={<IoMdAdd />}
            onClick={() => {}}
          >
            New Currency
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
                  <TableCell>Code</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="right">Exchange Rate</TableCell>
                  <TableCell align="center">Default</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currencies.map((currency) => (
                  <TableRow key={currency.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{currency.name}</Typography>
                    </TableCell>
                    <TableCell>{currency.code}</TableCell>
                    <TableCell>{currency.symbol}</TableCell>
                    <TableCell align="right">{currency.exchangeRate.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={currency.isDefault}
                        onChange={() => handleDefaultChange(currency.id)}
                        color="warning"
                        disabled={currency.isDefault}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={currency.status}
                        onChange={() => handleStatusChange(currency.id)}
                        color="success"
                        disabled={currency.isDefault}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => {}}>
                          <FiEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          onClick={() => {}}
                          disabled={currency.isDefault}
                        >
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