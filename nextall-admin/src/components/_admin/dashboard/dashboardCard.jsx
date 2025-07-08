import PropTypes from 'prop-types';
// mui
import { alpha } from '@mui/material/styles';
import { Box, Card, Typography, Button, Skeleton } from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';

DailyEaring.propTypes = {
  title: PropTypes.string.required,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoading: PropTypes.bool.isRequired,
  isAmount: PropTypes.bool,
  icon: PropTypes.any,
  color: PropTypes.string.isRequired
};

export default function DailyEaring({ title, value, isLoading, isAmount, icon, color }) {
  const isHex = color.includes('#');
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 3,
        py: 2,
        bgcolor: (theme) => theme.palette.mode === 'dark' 
          ? alpha(isHex ? color : theme.palette[color].main, 0.15)
          : alpha(isHex ? color : theme.palette[color].main, 0.1),
        border: (theme) => `1px solid ${alpha(isHex ? color : theme.palette[color].main, theme.palette.mode === 'dark' ? 0.3 : 0.2)}`,
        borderRadius: 2,
        backdropFilter: 'blur(6px)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => `0 4px 20px 0 ${alpha(isHex ? color : theme.palette[color].main, 0.3)}`,
          bgcolor: (theme) => theme.palette.mode === 'dark'
            ? alpha(isHex ? color : theme.palette[color].main, 0.25)
            : alpha(isHex ? color : theme.palette[color].main, 0.15),
        }
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 1,
            color: (theme) => theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
            fontWeight: 500
          }}
        >
          {isLoading ? <Skeleton variant="text" width="100px" /> : title}
        </Typography>
        <Typography 
          variant="h3"
          sx={{
            color: (theme) => theme.palette.mode === 'dark' ? '#fff' : 'grey.800',
            fontWeight: 600
          }}
        >
          {isLoading ? <Skeleton variant="text" width="100px" /> : isAmount ? fCurrency(value) : value}
        </Typography>
      </Box>
      <Button
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 60,
          height: 60,
          borderRadius: '50%',
          background: (theme) => `${alpha(isHex ? color : theme.palette[color].main, theme.palette.mode === 'dark' ? 0.9 : 0.8)}!important`,
          boxShadow: (theme) => `0 8px 16px 0 ${alpha(isHex ? color : theme.palette[color].main, 0.24)}`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            background: (theme) => `${alpha(isHex ? color : theme.palette[color].main, 1)}!important`,
            transform: 'scale(1.1)',
          },
          '& svg': {
            color: '#fff',
            fontSize: 24
          }
        }}
        variant="contained"
        color="primary"
      >
        {icon}
      </Button>
    </Card>
  );
}
