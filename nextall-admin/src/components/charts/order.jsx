'use client';
import PropTypes from 'prop-types';
// mui
import { Card, CardHeader, Box, Typography } from '@mui/material';
// chart
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

OrderChart.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool
};

export default function OrderChart({ data = {}, isLoading }) {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: 'transparent'
    },
    colors: [
      theme.palette.error.main,
      theme.palette.info.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.secondary.main
    ],
    labels: ['Pending', 'On the way', 'Delivered', 'Returned', 'Cancelled'],
    stroke: {
      colors: [theme.palette.background.paper]
    },
    legend: {
      floating: true,
      position: 'bottom',
      labels: {
        colors: theme.palette.text.secondary
      }
    },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false }
    },
    tooltip: {
      theme: theme.palette.mode,
      fillSeriesColor: false
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false
          }
        }
      }
    }
  };

  const chartSeries = [
    data.pending || 0,
    data.processing || 0,
    data.delivered || 0,
    data.returned || 0,
    data.cancelled || 0
  ];

  return (
    <Card
      sx={{
        height: '100%',
        bgcolor: 'transparent',
        boxShadow: 'none'
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" sx={{ color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700' }}>
            Order Report
          </Typography>
        }
      />
      <Box sx={{ p: 3, pb: 1 }}>
        <ReactApexChart
          type="donut"
          series={chartSeries}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
} 