'use client'

import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Avatar
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ReplayIcon from '@mui/icons-material/Replay';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';

const cardConfigs = [
  { label: 'Daily Earning', key: 'dailyEarning', icon: <MonetizationOnIcon />, bg: '#3b1827', iconBg: '#e0467b', iconColor: '#fff', text: '$' },
  { label: 'Daily Orders', key: 'dailyOrders', icon: <ShoppingCartIcon />, bg: '#10223b', iconBg: '#2e6fc3', iconColor: '#fff' },
  { label: 'Total Users', key: 'totalUsers', icon: <PeopleIcon />, bg: '#3b3610', iconBg: '#e7c84b', iconColor: '#fff' },
  { label: 'Total Products', key: 'totalProducts', icon: <InventoryIcon />, bg: '#3b1827', iconBg: '#e0467b', iconColor: '#fff' },
  { label: 'Total Vendors', key: 'totalVendors', icon: <GroupIcon />, bg: '#133b2d', iconBg: '#2ecea7', iconColor: '#fff' },
  { label: 'Total Shops', key: 'totalShops', icon: <StoreIcon />, bg: '#10223b', iconBg: '#2e6fc3', iconColor: '#fff' },
  { label: 'Pending Orders', key: 'pendingOrders', icon: <HourglassEmptyIcon />, bg: '#10223b', iconBg: '#2e6fc3', iconColor: '#fff' },
  { label: 'Returned Orders', key: 'returnedOrders', icon: <ReplayIcon />, bg: '#393b10', iconBg: '#c7d53b', iconColor: '#fff' }
];

const orderStatusColors = ['#ff6384', '#36a2eb', '#4bc0c0', '#ffce56', '#8884d8', '#f44336'];

export default function DashboardPage() {
  const [summary, setSummary] = useState({});
  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bestselling, setBestselling] = useState([]);
  const [income, setIncome] = useState({ week: [], month: [], year: [], commissionWeek: [], commissionMonth: [], commissionYear: [] });
  const [incomeView, setIncomeView] = useState('week');

  useEffect(() => {
    async function fetchAll() {
      const [summaryRes, salesRes, ordersRes, bestRes, incomeRes] = await Promise.all([
        fetch('/api/dashboard/summary').then(r => r.json()),
        fetch('/api/dashboard/sales').then(r => r.json()),
        fetch('/api/dashboard/orders').then(r => r.json()),
        fetch('/api/dashboard/bestselling').then(r => r.json()),
        fetch('/api/dashboard/income').then(r => r.json()),
      ]);
      setSummary(summaryRes);
      setSales(salesRes.sales);
      setOrders(ordersRes.statuses);
      setBestselling(bestRes.products);
      setIncome(incomeRes);
    }
    fetchAll();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ background: '#181b23', minHeight: '100vh', py: 3 }}>
       <Typography variant="h5" mb={1} fontWeight={600} color="#fff">
          Dashboard
        </Typography>
      <Box sx={{ py: 3 }}>
        <Grid container spacing={2}>
          {cardConfigs.map((card, idx) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={card.key}>
              <Card sx={{
                display: 'flex',
                alignItems: 'center',
                background: card.bg || '#232634',
                boxShadow: 'none',
                borderRadius: 2,
                px: 2,
                minHeight: 80,
                border: '1px solid #26293a',
                mb: 1
              }}>
                <Avatar sx={{ bgcolor: card.iconBg || '#232634', color: card.iconColor || '#fff', mr: 2, width: 44, height: 44, border: '2px solid #232634' }}>{card.icon}</Avatar>
                <Box>
                  <Typography fontSize={14} fontWeight={600} color="#fff" sx={{ opacity: 0.7 }}>{card.label}</Typography>
                  <Typography variant="h5" fontWeight={800} color="#fff">
                    {card.text || ''}{summary[card.key] ?? 0}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2, minHeight: 320, background: '#232634', boxShadow: 'none', border: '1px solid #26293a' }}>
              <Typography fontWeight={700} fontSize={18} mb={2} color="#fff">Sales Report</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={sales} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#5c6a7a" tick={{ fill: '#7d8ca1', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis
                    stroke="#5c6a7a"
                    tick={{ fill: '#7d8ca1', fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 'auto']}
                    ticks={[0]}
                    tickFormatter={v => v === 0 ? '0' : ''}
                  />
                  {/* Only show a dashed grid line at y=0 */}
                  <Line type="monotone" dataKey="value" stroke="#7f7fff" strokeWidth={3} dot={false} />
                  <line x1="0" x2="100%" y1="100%" y2="100%" stroke="#7d8ca1" strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, minHeight: 320, background: '#232634', boxShadow: 'none', border: '1px solid #26293a' }}>
              <Typography fontWeight={700} fontSize={18} mb={2} color="#fff">Order Report</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={orders} dataKey="value" nameKey="status" cx="50%" cy="50%" outerRadius={70} innerRadius={45} label={{ fill: '#fff' }}>
                    {orders.map((entry, idx) => (
                      <Cell key={entry.status} fill={orderStatusColors[idx % orderStatusColors.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
              <Box mt={2} textAlign="center">
                <Typography variant="h6" color="#fff">Total</Typography>
                <Typography variant="h4" fontWeight={800} color="#fff">
                  {orders.reduce((a, b) => a + (b.value || 0), 0)}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, minHeight: 320, background: '#232634', boxShadow: 'none', border: '1px solid #26293a' }}>
              <Typography fontWeight={700} fontSize={18} mb={2} color="#fff">Best Selling</Typography>
              <Box>
                {bestselling.map((item, idx) => (
                  <Box key={item.name} display="flex" alignItems="center" mb={2}>
                    <Avatar src={item.image} alt={item.name} sx={{ width: 48, height: 48, mr: 2, bgcolor: '#232634', border: '1px solid #444' }} />
                    <Box flexGrow={1}>
                      <Typography fontWeight={600} color="#fff">{item.name}</Typography>
                      <Typography fontSize={13} color="#bbb">{item.sold} sold</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2, minHeight: 320, background: '#232634', boxShadow: 'none', border: '1px solid #26293a' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography fontWeight={700} fontSize={18} color="#fff">Income Report</Typography>
                <ToggleButtonGroup
                  value={incomeView}
                  exclusive
                  onChange={(_, val) => val && setIncomeView(val)}
                  size="small"
                  sx={{ background: '#232634', borderRadius: 1, border: '1px solid #444' }}
                >
                  <ToggleButton value="week" sx={{ color: '#fff', '&.Mui-selected': { background: '#393b4a', color: '#fff' } }}>Week</ToggleButton>
                  <ToggleButton value="month" sx={{ color: '#fff', '&.Mui-selected': { background: '#393b4a', color: '#fff' } }}>Month</ToggleButton>
                  <ToggleButton value="year" sx={{ color: '#fff', '&.Mui-selected': { background: '#393b4a', color: '#fff' } }}>Year</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={(incomeView === 'week' ? income.week : incomeView === 'month' ? income.month : income.year).map((v, i) => ({
                    name: (incomeView === 'week' ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] : incomeView === 'month' ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] : ['2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029'])[i],
                    Income: v,
                    Commission: (incomeView === 'week' ? income.commissionWeek : incomeView === 'month' ? income.commissionMonth : income.commissionYear)[i] || 0
                  }))}
                  margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="name" stroke="#5c6a7a" tick={{ fill: '#7d8ca1', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis
                    stroke="#5c6a7a"
                    tick={{ fill: '#7d8ca1', fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 'auto']}
                    ticks={[0]}
                    tickFormatter={v => v === 0 ? '0' : ''}
                  />
                  {/* Only show a dashed grid line at y=0 */}
                  <Bar dataKey="Income" fill="#8884d8" />
                  <Bar dataKey="Commission" fill="#ff00cc" />
                  <line x1="0" x2="100%" y1="100%" y2="100%" stroke="#7d8ca1" strokeDasharray="4 4" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 