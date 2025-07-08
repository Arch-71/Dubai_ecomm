'use client';

import { Typography } from '@mui/material';

export default function Logo() {
  return (
    <Typography
      variant="h6"
      component="div"
      sx={{
        fontWeight: 700,
        color: 'primary.main',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      NextAll Admin
    </Typography>
  );
} 