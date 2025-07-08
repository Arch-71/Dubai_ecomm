'use client';

import { Box, Typography } from '@mui/material';
import { TbMoodEmpty } from 'react-icons/tb';

export default function NoDataFoundIllustration() {
  return (
    <Box
      sx={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <TbMoodEmpty size={40} />
      <Typography variant="body2" color="text.secondary">
        No data found
      </Typography>
    </Box>
  );
} 